import React, { Suspense, useState, useEffect } from "react";
import Modal from "./../modal/Modal";
import SidePane from "../sidepane/SidePane";
import Upload from "../upload/Upload";
import MLButton from "../button/MLButton";
import Cropping from "../cropping/Cropping";
import { TABS } from "../../utils/values";
const Library = React.lazy(() => import("../library/Library")); // so that library component only loads when needed

function MediaLibraryModal({
  multiple = true,
  close,
  onUpload,
  images,
  sourceExtractor,
  selected,
  getSelected, // the function that is used to retrieve all selected items out of the modal
  uploadMultiple,
  uploading,
  loadMoreFunction,
  limited,
  excludeTabs,
  useAwait,
  awaitSeconds,
  accept,
  extras,
  cropLoot,
  currentTab,
  setCurrentTab,
  switchToCropping,
  files,
  setFiles,
  cropped,
  setCropped,
  finaliseCropping,
  croppedSource,
  setCroppedSource,
  allowCropping,
  fileLimit,
  maximumImageSize,
  compress,
  compressedQuality,
  sideExtraComponent,
  renderBeforeImages,
  TooltipWrapper,
  tabModifiers,
}) {
  // const [currentTab, setCurrentTab] = useState(defaultTab);
  const [showSidePane, setShowSidePane] = useState(false);
  const [previews, setPreviews] = useState([]);

  const [content, setSelectedContent] = useState(selected); // all the selected items from library will always be available in an array here
  const [state, setState] = useState({ uploading: uploading });
  const [loadingMore, setLoadingMore] = useState(false);
  const [shouldWait, setShouldWait] = useState(useAwait);

  excludeTabs = [
    ...(excludeTabs || []),
    allowCropping ? "" : TABS.CROPPING_TAB, // if allowCropping is false, exclude it from the tabs
  ];
  const clean = (files) => {
    // just a function that retrieves only the FileObject from the file jsons provided
    // the function also checks if the file has been cropped, and returns the cropped version instead of the main
    // file
    if (!files) return files;
    return files.map((obj) => {
      var file = obj.file;
      if ((cropped || {})[obj.id]) file = cropped[obj.id].file;
      return file;
    });
  };
  const handleUpload = () => {
    if (!onUpload) return;
    setState((prev) => ({ ...prev, uploading: true }));
    onUpload(clean(files), reset, close, setCurrentTab);
  };

  const handleInsert = () => {
    getSelected(content, reset);
    close();
  };

  const reset = () => {
    setPreviews([]);
    setFiles([]);
    setState({});
    setCroppedSource(null);
    setCropped({});
  };

  const fireLoadMoreFunction = () => {
    if (!loadMoreFunction) return;
    setLoadingMore(true);
    loadMoreFunction(() => setLoadingMore(false), close);
  };

  const customName = (key, _default) => {
    const modifier = (tabModifiers || {})[key];
    return modifier?.name || _default || "...";
  };

  var Tabs = [
    {
      headerName: customName(TABS.UPLOAD_TAB, "Upload"),
      key: TABS.UPLOAD_TAB,
      component: (
        <Upload
          maximumImageSize={maximumImageSize}
          compress={compress}
          compressedQuality={compressedQuality}
          previews={previews}
          setPreviews={setPreviews}
          files={files}
          setFiles={setFiles}
          multiple={uploadMultiple}
          uploading={state.uploading}
          upload={handleUpload}
          accept={accept}
          extras={extras}
          setCurrentTab={setCurrentTab}
          switchToCropping={switchToCropping}
          cropped={cropped}
          allowCropping={allowCropping}
          fileLimit={fileLimit}
        />
      ),
    },
    {
      headerName: customName(TABS.LIBRARY_TAB, "Library"),
      key: TABS.LIBRARY_TAB,
      component: (
        <Suspense fallback={<p>Loading...</p>}>
          <Library
            renderBeforeImages={renderBeforeImages}
            sourceExtractor={sourceExtractor}
            setSelectedContent={setSelectedContent}
            content={content}
            setShowSidePane={setShowSidePane}
            multiple={multiple}
            images={images}
            loadingMore={loadingMore}
            loadMoreFunction={fireLoadMoreFunction}
            limited={limited}
            shouldWait={shouldWait}
            setShouldWait={setShouldWait}
            awaitSeconds={awaitSeconds}
            fileLimit={fileLimit}
          />
        </Suspense>
      ),
    },
    {
      headerName: customName(TABS.CROPPING_TAB, "crop"),
      key: TABS.CROPPING_TAB,
      component: (
        <Cropping
          setCurrentTab={setCurrentTab}
          cropLoot={cropLoot}
          cropped={cropped}
          setCropped={setCropped}
          setCroppedSource={setCroppedSource}
          croppedSource={croppedSource}
        />
      ),
    },
  ];

  Tabs = Tabs.filter((tab) => !(excludeTabs || []).includes(tab.key));

  useEffect(() => {}, [images, shouldWait]);

  const TabComponent = Tabs.find((tab) => tab.key === currentTab).component;
  const last = content.length - 1;
  const activeImage = (content || [])[last]; // if multiple selection is active, just show the last selected item in the side pane

  return (
    <React.Fragment>
      <Modal
        close={close}
        size="md"
        style={{
          minHeight: 680,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        className="elevate-5"
      >
        <div style={{ position: "relative", height: "100%" }}>
          {showSidePane && (
            <SidePane
              activeImage={activeImage}
              setShowSidePane={setShowSidePane}
              sourceExtractor={sourceExtractor}
              sideExtraComponent={sideExtraComponent}
            />
          )}
          <div className="m-inner-container">
            <div className="m-title-bar">
              <h3 style={{ marginBottom: 0 }}>Media Library</h3>
              {/* --------------------- TAB HEADER AREA -------------- */}
              <div className="m-tab-header-area">
                {Tabs.map((tab) => {
                  // A simple logic to make sure the cropping tab button does not show, until an image is selected by a user to crop. (To reduce confusion)
                  const imageForCroppingNotSelectedYet =
                    currentTab !== TABS.CROPPING_TAB &&
                    tab.key === TABS.CROPPING_TAB;
                  if (imageForCroppingNotSelectedYet) return <></>;

                  const isCurrent = currentTab === tab.key;
                  return (
                    <div
                      key={tab.key}
                      className={`m-tab-header-item m-tab-header-item-${
                        isCurrent ? "selected" : "unselected"
                      }`}
                      onClick={() => {
                        setCurrentTab(tab.key);
                        setShowSidePane(false);
                      }}
                    >
                      <p style={{ margin: "15px 0px" }}>{tab.headerName}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ------------------------ MAIN TAB DISPLAY AREA ------------------- */}
            <div
              style={{ maxHeight: 530, minHeight: 530, overflowY: "scroll" }}
            >
              {TabComponent}
            </div>
          </div>
          <Footer
            TooltipWrapper={TooltipWrapper}
            images={images}
            files={files}
            content={content}
            multiple={multiple}
            cancel={close}
            insert={handleInsert}
            currentTab={currentTab}
            cropLoot={cropLoot}
            finaliseCropping={finaliseCropping}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
}

const Footer = ({
  content,
  cancel,
  insert,
  images,
  currentTab,
  cropLoot,
  finaliseCropping,
  TooltipWrapper,
}) => {
  const isCropping = currentTab === TABS.CROPPING_TAB;
  const isUploadTab = currentTab === TABS.UPLOAD_TAB;
  const tooltipMessageWhenDisabled = isUploadTab
    ? "Click the upload button to upload first, then you can insert your image"
    : "Select an image from the list to insert";
  const len = content && content.length;
  return (
    <div className="ml-footer">
      <h3
        style={{
          margin: 0,
          marginLeft: 10,
          color: "rgb(128 103 71)",
          fontSize: 12,
        }}
      >
        @massenergize
      </h3>
      {!isCropping && images && images.length && (
        <small style={{ fontWeight: "bold", marginLeft: 15 }}>
          [{(images && images.length) || 0} items]
        </small>
      )}
      <div style={{ marginLeft: "auto" }}>
        <MLButton backColor="maroon" btnColor="white" onClick={cancel}>
          CANCEL
        </MLButton>

        {isCropping ? (
          <button
            className="ml-footer-btn"
            style={{ "--btn-color": "white", "--btn-background": "green" }}
            onClick={(e) => {
              e.preventDefault();
              finaliseCropping && finaliseCropping();
            }}
            disabled={!cropLoot}
          >
            CROP
          </button>
        ) : (
          <button
            className="ml-footer-btn"
            style={{ "--btn-color": "white", "--btn-background": "green" }}
            onClick={(e) => {
              e.preventDefault();
              insert();
            }}
            disabled={!len}
          >
            {TooltipWrapper ? (
              <TooltipWrapper
                title={tooltipMessageWhenDisabled}
                placement="top"
              >
                <span>INSERT {len > 0 ? `(${len})` : ""}</span>
              </TooltipWrapper>
            ) : (
              `INSERT ${len > 0 ? `(${len})` : ""}`
            )}
          </button>
        )}
      </div>
    </div>
  );
};

MediaLibraryModal.defaultProps = {
  multiple: true,
  images: [],
  defaultTab: "library",
  selected: [],
};
export default MediaLibraryModal;
