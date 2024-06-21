import { CheckBox } from "@mui/icons-material";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MEDropdown from "../ME  Tools/dropdown/MEDropdown";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../../../utils/messenger";
import { reduxAddInternalLinkList } from "../../../redux/redux-actions/adminActions";
import Loading from "dan-components/Loading";

function CreateAndEditMenu({ data, parent, cancel, insertNewLink }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const internalLinks = useSelector((state) => state.getIn(["internalLinks"]));
  const keepInRedux = (data) => dispatch(reduxAddInternalLinkList(data));

  useEffect(() => {
    setForm(data);
  }, [data?.toString()]);

  const updateForm = (obj) => {
    setForm({ ...form, ...obj });
  };

  useEffect(() => {
    if (internalLinks?.length) return;
    fetchInternalLinks();
  }, []);

  const fetchInternalLinks = () => {
    setLoading(true);
    apiCall("links.internal.get")
      .then((response) => {
        setLoading(false);
        if (!response?.success) {
          return setError(response?.error);
        }
        keepInRedux(response?.data);
      })
      .catch((err) => {
        console.log("Error fetching internal links", err);
        setLoading(false);
      });
  };

  const { is_published, name, link, is_link_external: linkIsExternal } = form;

  return (
    <div style={{ padding: 20, width: 500 }}>
      <Typography variant="h5" style={{ color: "var(--app-purple)", fontWeight: "bold" }} gutterBottom>
        Create New Menu Item
      </Typography>
      {error ? (
        <Typography variant="body" style={{ color: "#b93131" }}>
          {error}
        </Typography>
      ) : (
        <div style={{ border: "dashed 1px #8e24aa45", padding: 20 }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "5px 10px" }}>
            <div>
              <FormControlLabel
                control={
                  <input
                    type="checkbox"
                    onChange={() => updateForm({ is_published: !is_published })}
                    checked={is_published}
                    style={{ color: "var(--app-purple)" }}
                  />
                }
                label="Is Live"
              />
            </div>

            <a href="#" variant="caption" style={{ marginLeft: "auto", color: "#cd3131", fontWeight: "bold" }}>
              {" "}
              Delete{" "}
            </a>
          </div>
          <TextField
            style={{ width: "100%", marginTop: 10 }}
            label="Name"
            placeholder="Name"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{ style: { padding: "10px 20px", width: "100%" } }}
            variant="outlined"
            onChange={(e) => updateForm({ name: e.target.value })}
            value={name}
          />
          {/* --------- EXTERNAL & INTERNAL LINKS ----------- */}
          <div style={{ border: "dashed 0px #8e24aa45", padding: "10px 0px", margin: "10px 0px" }}>
            <div style={{ marginLeft: 10, marginBottom: 10 }}>
              <FormControlLabel
                control={
                  <input
                    onChange={() => updateForm({ is_link_external: !linkIsExternal })}
                    type="checkbox"
                    checked={!linkIsExternal}
                    style={{ color: "var(--app-purple)" }}
                  />
                }
                style={{ marginRight: 30 }}
                label="Internal"
              />
              <FormControlLabel
                control={
                  <input
                    onChange={() => updateForm({ is_link_external: !linkIsExternal })}
                    checked={linkIsExternal}
                    type="checkbox"
                    style={{ color: "var(--app-purple)" }}
                  />
                }
                style={{}}
                label="External"
              />
            </div>
            <div>
              {loading && (
                <span style={{ color: "var(--app-purple)" }}>
                  <i className="fa fa-spinner fa-spin" /> Fetching internal links...
                </span>
              )}
              {linkIsExternal ? (
                <TextField
                  style={{ width: "100%", marginTop: 10 }}
                  label="URL"
                  placeholder="Example: https://www.massenergize.org"
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{ style: { padding: "10px 20px", width: "100%" } }}
                  variant="outlined"
                  onChange={(e) => updateForm({ link: e.target.value })}
                  value={link}
                />
              ) : (
                <MEDropdown
                  data={internalLinks}
                  defaultValue={link ? [link] : []}
                  onItemSelected={(items) => {
                    const link = items[0];
                    updateForm({ link }), console.log("Lets see link", link);
                  }}
                  labelExtractor={(l) => l?.name}
                  valueExtractor={(l) => l?.link}
                  placeholder="Link to a page within your site"
                />
              )}
            </div>
          </div>
          {/* <TextField
          style={{ width: "100%", marginTop: 15 }}
          label="Order (Indicate the order of the menu item)"
          placeholder="Order Example: 1"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{ style: { padding: "10px 20px", width: "100%" }, type: "number" }}
          variant="outlined"
          onChange={(e) => updateForm({ order: e.target.value })}
          value={order}
        /> */}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <Button onClick={() => cancel()} variant="contained" style={{ marginRight: 10, background: "#cd3131" }}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => insertNewLink(form)}>
          OK
        </Button>
      </div>
    </div>
  );
}

export default CreateAndEditMenu;
