import FileCopy from "@mui/icons-material/FileCopy";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState } from "react";
import MEChip from "../../../components/MECustom/MEChip";
import { getHumanFriendlyDate, smartString } from "../../../utils/common";
import { PAGE_PROPERTIES } from "../ME  Tools/MEConstants";
import METable from "../ME  Tools/table /METable";
import Loading from "dan-components/Loading";
import { Link } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { apiCall } from "../../../utils/messenger";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_ITEMS_PER_PAGE_OPTIONS, LOADING } from '../../../utils/constants';
import ThemeModal from "../../../components/Widget/ThemeModal";
import ListingComponent from "./ListingComponent";
const hasExpired = (date) => {
  if (!date) return false; // features that do not expire dont have dates so...
  const now = new Date().getTime();
  date = new Date(date).getTime();
  return date < now;
};
function ManageFeatureFlags({
  classes,
  editFeature,
  toggleDeleteConfirmation,
  putFlagsInRedux,
  featureFlags,
  toggleToast
}) {
  const [listingOptions, setShowListingModal] = useState({});

  if (featureFlags === LOADING) return <Loading />;
  var flags = featureFlags && featureFlags.features;
  if (!flags)
    return (
      <Paper style={{ padding: 40 }}>
        No flags are available yet. Create one
      </Paper>
    );

  flags = Object.entries(flags || {});
  const flagKeys = (featureFlags && featureFlags.keys) || {};

  const columns = () => {
    return [
      {
        name: "ID",
        key: "id",
        options: {
          filter: false,
        },
      },
      {
        name: "Feature Name",
        key: "feature-name",
        options: { filter: false },
      },
      {
        name: "Communities",
        key: "is-for-every-community",
        options: {
          filter: true,
          customBodyRender: ({ isForEveryone, id }) => {
            return (
              <Typography
                variant="caption"
                className="touchable-opacity"
                style={{
                  // color: "#9a5cc0",
                  fontWeight: "bold",
                  textDecoration: !isForEveryone ? "underline" : "none",
                }}
                onClick={() => {
                  if (isForEveryone) return;
                  setShowListingModal({ id, show: true, isCommunity: true }); // Only show modal if its for only a select number of communites
                }}
              >
                <i
                  className={!isForEveryone ? "fa fa-list" : "fa fa-globe"}
                  style={{ marginRight: 5 }}
                />

                {isForEveryone ? "Everyone" : "Show List"}
              </Typography>
            );
          },
        },
      },
      {
        name: "Users",
        key: "is-for-every-user",
        options: {
          filter: true,
          customBodyRender: ({ isForEveryone, id }) => {
            return (
              <Typography
                variant="caption"
                className="touchable-opacity"
                style={{
                  // color: "#9a5cc0",
                  fontWeight: "bold",
                  textDecoration: !isForEveryone ? "underline" : "none",
                }}
                onClick={() => {
                  if (isForEveryone) return;
                  setShowListingModal({ id, show: true, isCommunity: false });
                }}
              >
                <i
                  className={!isForEveryone ? "fa fa-user" : "fa fa-globe"}
                  style={{ marginRight: 5 }}
                />
                {isForEveryone ? "Everyone" : "Show List"}
              </Typography>
            );
          },
        },
      },
      {
        name: "Status",
        key: "status",
        options: {
          filter: true,
          customBodyRender: (status) => {
            const expired = status === "Expired"; // This is intentional
            return (
              <MEChip
                label={status}
                style={
                  expired
                    ? { background: "#c04f4f", padding: "0px 9px" }
                    : { padding: "0px 12px" }
                }
                className={`${
                  expired ? classes.yesLabel : classes.yesLabel
                } touchable-opacity`}
              />
            );
          },
        },
      },
      {
        name: "Expiry Date",
        key: "expiry-date",
        options: { filter: false },
      },
      {
        name: "Manage",
        key: "manage",
        options: {
          filter: false,
          customBodyRender: (data) => {
            return (
              <>
                <Link
                  to={`/#void`}
                  onClick={(e) => {
                    e.preventDefault();
                    editFeature(data.item);
                  }}
                >
                  <EditIcon size="small" variant="outlined" color="secondary" />
                </Link>
              </>
            );
          },
        },
      },
    ];
  };

  const fashionData = (data) => {
    return (data || []).map(([_, feature]) => {
      return [
        feature.id,
        feature.name,
        {
          isForEveryone: feature.audience === flagKeys.audience.EVERYONE.key,
          id: feature.id,
        },
        {
          isForEveryone:
            feature.user_audience === flagKeys.audience.EVERYONE.key,
          id: feature.id,
        },
        hasExpired(feature.expires_on) ? "Expired" : "Active",
        feature.expires_on
          ? getHumanFriendlyDate(feature.expires_on, false, false)
          : "Not Set",
        { id: feature.id, item: feature },
      ];
    });
  };
  const dataForTable = fashionData(flags);

  const nowDelete = ({ idsToDelete, data }) => {
    const itemsInRedux = flags;
    const ids = [];
    idsToDelete.forEach((d) => {
      const found = data[d.dataIndex][0];
      ids.push(found);
      apiCall("/featureFlag.delete", { id: found })
        .then((response) => {
          if (response.success) {
            toggleToast({
              open: true,
              message: "Feature Flag successfully deleted",
              variant: "success",
            });
          } else {
            toggleToast({
              open: true,
              message: "An error occurred while deleting the feature flag",
              variant: "error",
            });
          }
        })
        .catch((e) => console.log("FEATURE_DELETE_ERROR:", e));
    });
    var rem = (itemsInRedux || []).filter(
      ([_, com]) => !ids.includes(Number(com.id))
    );
    rem = Object.fromEntries(rem);
    putFlagsInRedux({ ...(featureFlags || {}), features: rem });
  };

  const makeDeleteUI = ({ idsToDelete }) => {
    const len = (idsToDelete && idsToDelete.length) || 0;
    return (
      <Typography>
        Are you sure you want to delete (
        {(idsToDelete && idsToDelete.length) || ""})
        {len === 1 ? " feature flag? " : " flags? "}
        Functionalities linked to this may be deactivated
      </Typography>
    );
  };
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    download: false,
    print: false,
    rowsPerPage: DEFAULT_ITEMS_PER_PAGE,
    rowsPerPageOptions: DEFAULT_ITEMS_PER_PAGE_OPTIONS,
    onRowsDelete: (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data;
      toggleDeleteConfirmation({
        show: true,
        component: makeDeleteUI({ idsToDelete }),
        onConfirm: () => nowDelete({ idsToDelete, data: dataForTable }),
        closeAfterConfirmation: true,
      });
      return false;
    },
  };

  return (
    <div>

      <ThemeModal
        fullControl
        open={listingOptions.show}
        close={() => setShowListingModal({})}
        contentStyle={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
      >
        <ListingComponent
          {...listingOptions || {}}
          close={() => setShowListingModal({})}
        />
      </ThemeModal>

      <METable
        page={PAGE_PROPERTIES.FEATURE_FLAGS}
        classes={classes}
        tableProps={{
          title: "All Features",
          data: dataForTable,
          columns: columns(),
          options: options,
        }}
      />
    </div>
  );
}

export default ManageFeatureFlags;
