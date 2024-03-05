import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { OPTIONS } from "./EventNotificationSettings";
import MEDropdown from "../../ME  Tools/dropdown/MEDropdown";
import LightAutoComplete from "../../Gallery/tools/LightAutoComplete";
import { useSelector } from "react-redux";

const NotificationChoices = ({ state, handleChange, setCommunities, targetCommunities }) => {
  const communities = useSelector((state) => state.getIn(["communities"]));
  const admin = useSelector((state) => state.getIn(["auth"]));

  const getValue = (name) => {
    const data = state || {};
    return data[name] || false;
  };

  return (
    <div
      style={{
        padding: "10px"
      }}
    >
      <div style={{ marginBottom: 5, color: "black", fontWeight: "bold" }}>
        <small>
          <b>First select a list of communities</b>
        </small>
      </div>
      {/* {admin?.is_super_admin ? ( */}
      <LightAutoComplete
        selectAllV2
        allowClearAndSelectAll
        multiple
        data={communities}
        onChange={(t) => {
          setCommunities(t);
        }}
        isAsync
        endpoint="communities.listForCommunityAdmin"
        defaultSelected={targetCommunities}
        valueExtractor={(t) => t?.id}
        labelExtractor={(t) => t?.name}
        placeholder="Select the communities that these settings apply to..."
      />

      <div style={{ margin: "5px 0px", color: "black", fontWeight: "bold" }}>
        <small>
          <b>
            Select all options that apply. The behaviors you select here will only apply to the communities you've
            selected above.
          </b>
        </small>
      </div>
      {OPTIONS.map((t) => {
        return (
          <>
            <FormControlLabel
              key={t.key}
              control={<Checkbox checked={getValue(t.key)} onChange={handleChange} name={t.key} />}
              label={t.name}
              value={t.key}
              style={{ color: "black" }}
            />
            <br />
          </>
        );
      })}
    </div>
  );
};

export default NotificationChoices;
