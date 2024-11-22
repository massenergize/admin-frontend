import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PBCanvas from "./PBCanvas";
import "./assets/css/pb-index.css";
import PBSidePanel from "./components/sidepanels/PBSidePanel";
import { usePBModal } from "./hooks/usePBModal";
import { usePBBottomSheet } from "./hooks/usePBBottomSheet";
import PBRichTextEditor from "./components/richtext/PBRichTextEditor";
import PBFloatingFooter from "./components/floating-footer/PBFloatingFooter";
import PBSection from "./components/sectionizer/PBSectionizer";
import PBBlockContainer from "./components/layouts/blocks/PBBlockContainer";
import PBPageSettings from "./pages/PBPageSettings";
import { BLOCKS } from "./utils/engine/blocks";
import { PROPERTY_TYPES } from "./components/sidepanels/PBPropertyTypes";
import PBPublishedRender from "./components/render/PBPublishedRender";
import { pruneProperties, pruneSections, reconfigurePruned } from "./utils/pb-utils";
const PAGE_SETTINGS_KEY = "PAGE_SETTINGS";
const BLOCK_SELECTOR_PAGE = "BLOCK_SELECTOR_PAGE";
const PUBLISH_CONFIRMATION_DIALOG = "PUBLISH_CONFIRMATION_DIALOG";
export const PBKEYS = {
  FOOTER: { SAVING: "SAVING", PUBLISHING: "PUBLISHING", PREVIEWING: "PREVIEWING" }
};
function PBEntry({
  footerOverrides,
  publishedProps,
  builderOverrides,
  tinyKey,
  openMediaLibrary,
  propsOverride,
  renderPageSettings,
  onChange,
  data
}) {
  const { modals: modalOverrides } = builderOverrides || {};
  const { Modal, open: openModal, close, modalProps, setModalProps } = usePBModal();
  const [sections, setSection] = useState([]);
  const [blockInFocus, setBlockInFocus] = useState(null);
  const [preview, setPreview] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loadingStates, setLoadingStates] = useState({});
  const recentlyUsedFieldRef = useRef();

  const setLoading = (key, value) => {
    setLoadingStates({ ...loadingStates, [key]: value });
  };
  const updateFocus = (oldBlock, newBlock) => {
    setBlockInFocus(newBlock);
    // setOutOfFocus(oldBlock);
  };
  const onFocused = useCallback((target) => {
    recentlyUsedFieldRef.current = target;
  }, []);

  const handlePropertyChange = (properties, options) => {
    const { isGrouped, rawValue, cssKey, groupIndex, propertyIndex } = options || {};
    const newProperties = [...properties];
    if (isGrouped) {
      const p = newProperties[propertyIndex];
      const { group } = p;
      const newGroup = [...group];
      const item = group[groupIndex];
      const newItem = { ...item, value: rawValue };
      newGroup.splice(groupIndex, 1, newItem);
      const newProp = { ...p, group: newGroup };
      newProperties.splice(propertyIndex, 1, newProp);
      return newProperties;
    }
    let propItem = properties[propertyIndex];
    propItem = { ...propItem, value: rawValue };
    newProperties.splice(propertyIndex, 1, propItem);
    return newProperties;
  };

  const mergeProps = (oldProps, valueObj, options) => {
    const { propAccessor, append, propIsObj, rawValue } = options || {};
    const newProps = { ...oldProps };
    let prop = oldProps[propAccessor] || {};
    if (propIsObj) {
      if (append) prop = { ...prop, ...valueObj };
      else prop = { ...valueObj };
    } else prop = rawValue;
    newProps[propAccessor] = prop;
    return newProps;
  };

  const applyProps = (block, valueObj, options) => {
    const { data } = options || {};

    const { block: blockItem, group, ...rest } = block;
    const { template, properties } = blockItem || {};
    //  ---- Handling Properties -----
    const newProperties = handlePropertyChange(properties, options);
    //  ---- Applying Properties to block
    const { element } = template || {};
    const { props } = element || {};
    const newProps = mergeProps(props, valueObj, options);
    const newElement = { ...element, props: { ...props, ...newProps } };
    const newBlock = {
      ...rest,
      block: { ...blockItem, properties: newProperties, template: { ...template, element: newElement } }
    };
    return newBlock;
  };

  const whenPropertyChanges = (data) => {
    const newSectionList = [...sections];
    const block = newSectionList.find((section) => section.block.id === data?.blockId);
    const valueTrain = { [data?.prop?.accessor]: data?.prop?.value };
    const newBlock = applyProps(blockInFocus, valueTrain, data?.prop);
    newSectionList.splice(block?.options?.position, 1, newBlock);
    setSection(newSectionList);
    updateFocus(blockInFocus, newBlock);
  };

  const selectBlock = (blockJson) => {
    const { position } = modalProps || {};
    const newSection = [...sections];
    const oldOptions = blockJson?.options || {};
    newSection.splice(position, 0, { ...blockJson, options: { ...oldOptions, position } });
    setSection(newSection);
    close();
  };

  const transfer = (key, value) => {
    let content = {};
    if (key) content = { [key]: value || null };
    if (onChange) onChange({ sections, ...content });
  };

  useEffect(() => {
    transfer();
  }, [sections?.toString()]);

  useEffect(() => {
    const configureForUser = data?.content;
    console.log("configureForUser", configureForUser);
    setSection(data?.content || []);
  }, [data?.content?.toString()]);

  const openSpecificModal = (modalKey, options) => {
    setModalProps({ ...modalProps, modalKey });
    openModal({ ...(options || {}), modalKey });
  };

  const closeModalWithKey = () => {
    setModalProps({ ...modalProps, modalKey: null });
    close();
  };

  const removeBlockItem = ({ blockId }) => {
    const newSection = sections.filter((section) => section.block.id !== blockId);
    setSection(newSection);
    updateFocus(blockInFocus, null);
  };
  // const IS_PAGE_SETTINGS = modalProps?.modalKey === PAGE_SETTINGS_KEY;

  const resetAnItem = () => {
    const { options } = blockInFocus || {};
    const newSection = [...sections];
    const freshVersion = BLOCKS.find((block) => block.key === blockInFocus?.block?.key);
    const newBlock = {
      block: { id: blockInFocus?.block?.id, ...(freshVersion || {}) },
      options: blockInFocus?.options
    };
    newSection.splice(options?.position, 1, newBlock);
    setSection(newSection);
    updateFocus(blockInFocus, newBlock);
  };

  const pageSettings = useCallback(() => {
    if (!renderPageSettings) return <PBPageSettings />;
    return renderPageSettings({ sections });
  }, [renderPageSettings]);

  const getModalComponentWithKey = useCallback(
    (key) => {
      const OBJ = {
        [PAGE_SETTINGS_KEY]: pageSettings,
        [BLOCK_SELECTOR_PAGE]: () => <PBBlockContainer onItemSelected={selectBlock} />,
        [PUBLISH_CONFIRMATION_DIALOG]: () => <h1> Include a modal override to show here instead...</h1>,
        ...(modalOverrides || {})
      };

      return OBJ[key] || (() => <i style={{ padding: 10 }}> Could not access the modal you were looking for...</i>);
    },
    [sections?.toString(), selectBlock, modalOverrides?.toString(), pageSettings]
  );

  const renderMComponent = useMemo(() => getModalComponentWithKey(modalProps?.modalKey), [
    getModalComponentWithKey,
    modalProps?.modalKey
  ]);

  const openBlockModal = (props) => {
    openSpecificModal(BLOCK_SELECTOR_PAGE, props);
    // More to come...
  };

  const save = () => {
    const { save } = footerOverrides || {};
    if (save)
      return save({
        setLoading: (value) => setLoading(PBKEYS.FOOTER.SAVING, value),
        sections,
        notify: setNotification,
        openPageSettings: () => openSpecificModal(PAGE_SETTINGS_KEY)
      });
  };

  return (
    <div className="pb-root">
      <Modal style={{ minHeight: 300 }}>
        {/* {IS_PAGE_SETTINGS ? pageSettings() : <PBBlockContainer onItemSelected={selectBlock} />} */}
        {renderMComponent()}
      </Modal>
      {preview ? (
        <PBPublishedRender sections={sections} />
      ) : (
        <>
          <PBCanvas setNotification={setNotification} notification={notification} publishedProps={publishedProps}>
            <PBSection
              readOnly={preview}
              blockInFocus={blockInFocus}
              focusOnBlock={(block) => updateFocus(blockInFocus, block)}
              sections={sections}
              onButtonClick={openBlockModal}
              openBlockModal={openBlockModal}
              removeBlockItem={removeBlockItem}
            />
          </PBCanvas>
          <div className="pb-right-panel">
            <PBSidePanel
              propsOverride={propsOverride}
              reset={resetAnItem}
              tinyKey={tinyKey}
              onFocused={onFocused}
              lastFocus={recentlyUsedFieldRef?.current}
              onPropertyChange={whenPropertyChanges}
              block={blockInFocus?.block}
              openMediaLibrary={openMediaLibrary}
            />
          </div>
        </>
      )}

      <PBFloatingFooter
        loadingStates={loadingStates || {}}
        footerOverrides={footerOverrides}
        inPreview={preview}
        sections={sections}
        preview={() => setPreview(!preview)}
        save={save}
        close={closeModalWithKey}
        openPageSettings={() => openSpecificModal(PAGE_SETTINGS_KEY)}
        publish={() => openSpecificModal(PUBLISH_CONFIRMATION_DIALOG)}
      />
    </div>
  );
}

PBEntry.PAGE_SETTINGS_MODAL_KEY = PAGE_SETTINGS_KEY;
PBEntry.BLOCK_SELECTOR_MODAL_KEY = BLOCK_SELECTOR_PAGE;
PBEntry.PUBLISH_CONFIRMATION_DIALOG_MODAL_KEY = PUBLISH_CONFIRMATION_DIALOG;
PBEntry.Functions = {
  pruneProperties,
  pruneSections,
  reconfigurePruned
};
PBEntry.KEYS = PBKEYS;
export default PBEntry;
