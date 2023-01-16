import React, { Component } from "react";
import PropTypes from "prop-types";
import states from "dan-api/data/states";
import { withStyles } from "@material-ui/core/styles";
// import MassEnergizeForm from "../_FormGenerator";
import MassEnergizeForm from "../_FormGenerator/MassEnergizeForm";
import { groupSocialMediaFields, getMoreInfo } from "./utils";
import fieldTypes from "../_FormGenerator/fieldTypes";
import { withRouter } from "react-router-dom";
import { PAGE_KEYS } from "../ME  Tools/MEConstants";
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: 30,
  },
  field: {
    width: "100%",
    marginBottom: 20,
  },
  fieldBasic: {
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },
  inlineWrap: {
    display: "flex",
    flexDirection: "row",
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: "center",
  },
});

class CreateNewCommunityForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formJson: null,
    };
    this.preflightFxn = this.preflightFxn.bind(this);
  }

  async componentDidMount() {
    const formJson = await this.createFormJson();
    await this.setStateAsync({ formJson });
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }
  preflightFxn = (formData) => {
    const { community } = this.state;
    return groupSocialMediaFields(formData, getMoreInfo(community));
  };
  createFormJson = async () => {
    // quick and dirty - duplicated code - needs to be consistant between pages and with the API
    // could read these options from the API or share the databaseFieldChoices json
    const geography_types = [
      {
        id: "ZIPCODE",
        value:
          "Community defined by one or more towns or zipcodes (can have smaller communities within)",
      },
      { id: "CITY", value: "Community defined by one or more cities" },
      { id: "COUNTY", value: "Community defined by one or more counties" },
      { id: "STATE", value: "Community defined by one or more states" },
      { id: "COUNTRY", value: "Community defined by a country" },
      //{ id: "NON_GEOGRAPHIC", value:"A non-geographic community" },
    ];

    const location = this.props.location;
    const libOpen = location.state && location.state.libOpen;
    const formJson = {
      title: "Create New Community",
      subTitle: "",
      method: "/communities.create",
      successRedirectPage: "/admin/read/communities",
      preflightFxn: this.preflightFxn,
      fields: [
        {
          label: "About this Community",
          fieldType: "Section",
          children: [
            {
              name: "community_name",
              label: "Name of this Community",
              placeholder: "eg. Energize Springfield",
              fieldType: "TextField",
              contentType: "text",
              isRequired: true,
              defaultValue: "",
              dbName: "name",
              readOnly: false,
            },
            {
              name: "subdomain",
              label:
                "Subdomain: Please Provide a short unique name.  (only letters and numbers are allowed, use underscores to signify spaces) ",
              placeholder: "eg. SpringfieldMA",
              fieldType: "TextField",
              contentType: "text",
              isRequired: true,
              defaultValue: "",
              dbName: "subdomain",
              readOnly: false,
            },
            {
              name: "website",
              label:
                "Custom website domain (optional): URL which would forward to the portal, that users will see.  Start with 'www.' but don't include 'https://' ",
              placeholder: "eg. 'www.EnergizeYourTown.org'",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              defaultValue: "",
              dbName: "website",
              readOnly: false,
            },
            {
              name: "about",
              label:
                "Short intro about this community for new users - 100 char max",
              placeholder: "Welcome to Energize xxx, a project of ....",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              defaultValue: "",
              dbName: "about_community",
              readOnly: false,
            },
          ],
        },
        {
          label: "Primary contact (seen in community portal footer)",
          fieldType: "Section",
          children: [
            {
              name: "admin_full_name",
              label: "Contact Person's Full Name",
              placeholder: "eg. Grace Tsu",
              fieldType: "TextField",
              contentType: "text",
              isRequired: true,
              defaultValue: "",
              dbName: "owner_name",
              readOnly: false,
            },
            {
              name: "admin_email",
              label: "Community's Public Email",
              placeholder: "eg. johny.appleseed@gmail.com",
              fieldType: "TextField",
              contentType: "text",
              isRequired: true,
              defaultValue: "",
              dbName: "owner_email",
              readOnly: false,
            },
            {
              name: "admin_phone_number",
              label: "Community's Public Phone Number (optional)",
              placeholder: "eg. 571 222 4567",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              defaultValue: "",
              dbName: "owner_phone_number",
              readOnly: false,
            },
          ],
        },
        {
          label: "Contact Address (seen as Location on ContactUs page)",
          fieldType: "Section",
          children: [
            {
              name: "address",
              label: "Street Address",
              placeholder: "Enter street address (optional)",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              dbName: "address",
              readOnly: false,
            },
            {
              name: "city",
              label: "City",
              placeholder: "eg. Springfield",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              dbName: "city",
              readOnly: false,
            },
            {
              name: "state",
              label: "State",
              placeholder: "eg. Massachusetts",
              fieldType: "Dropdown",
              contentType: "text",
              isRequired: false,
              data: states,
              dbName: "state",
              readOnly: false,
            },
            {
              name: "zipcode",
              label: "Zip code",
              placeholder: "eg. 01020",
              fieldType: "TextField",
              contentType: "text",
              isRequired: false,
              dbName: "zipcode",
              readOnly: false,
            },
          ],
        },
        {
          label: "Community Type",
          fieldType: "Section",
          children: [
            {
              name: "is_geographically_focused",
              label: "Is this community Geographically focused?",
              fieldType: "Radio",
              isRequired: false,
              defaultValue: "false",
              dbName: "is_geographically_focused",
              readOnly: false,
              data: [
                { id: "false", value: "No" },
                { id: "true", value: "Yes" },
              ],
              child: {
                valueToCheck: "true",
                fields: [
                  {
                    name: "geography_type",
                    label: "Type of geographic community",
                    fieldType: "Radio",
                    isRequired: true,
                    defaultValue: "ZIPCODE",
                    dbName: "geography_type",
                    readOnly: false,
                    data: geography_types,
                  },
                  {
                    name: "locations",
                    label:
                      "List of all such regions (zipcodes or towns, cities, states) within the community, separated by commas ",
                    placeholder: "eg. 01101, 01102, 01103, 01104",
                    fieldType: "TextField",
                    contentType: "text",
                    isRequired: true,
                    defaultValue: "",
                    dbName: "locations",
                    readOnly: false,
                  },
                ],
              },
            },
          ],
        },
        {
          label:
            "Social media or Newsletter subscription (displayed in the community portal footer)",
          fieldType: "Section",
          children: [
            {
              name: "social_or_newsletter",
              label:
                "Choose what to show (Social Media Links or Subscribe to Newsletter)",
              fieldType: "Radio",
              isRequired: true,
              defaultValue: "false",
              dbName: "wants_socials",
              readOnly: false,
              data: [
                { id: "true", value: "Social Media Links" },
                { id: "false", value: "Subscribe to Newsletter" },
              ],
              child: {
                valueToCheck: "true",
                fields: [
                  {
                    name: "com_facebook_link",
                    label: "Provide a link to your community's Facebook page",
                    placeholder: "www.facebook.com/your-community",
                    fieldType: "TextField",
                    contentType: "text",
                    isRequired: false,
                    dbName: "facebook_link",
                    readOnly: false,
                  },
                  {
                    name: "com_twitter_link",
                    label: "Provide a link to your community's Twitter page",
                    placeholder: "eg. www.twitter.com/your-community",
                    fieldType: "TextField",
                    contentType: "text",
                    isRequired: false,

                    dbName: "twitter_link",
                    readOnly: false,
                  },
                  {
                    name: "com_instagram_link",
                    label: "Provide a link to your community's Instagram page",
                    placeholder: "eg. www.instagram.com/your-community",
                    fieldType: "TextField",
                    contentType: "text",
                    isRequired: false,

                    dbName: "instagram_link",
                    readOnly: false,
                  },
                ],
              },
            },
          ],
        },
        {
          name: "image",
          placeholder: "Upload a Logo",
          fieldType: fieldTypes.MediaLibrary,
          openState: libOpen,
          dbName: "image",
          label: "Upload a logo for this community",
          uploadMultiple: false,
          multiple: false,
        },
        {
          name: "accepted_terms_and_conditions",
          modalText: "Terms and Conditions",
          modalTitle: "Terms and Conditions",
          label: "Accept Terms And Conditions",
          fieldType: "Radio",
          isRequired: false,
          defaultValue: "false",
          dbName: "accepted_terms_and_conditions",
          readOnly: false,
          data: [{ id: "false", value: "No" }, { id: "true", value: "Yes" }],
        },
        {
          name: "is_approved",
          label:
            "Do you approve this community? (Check yes after background check)",
          fieldType: "Radio",
          isRequired: false,
          defaultValue: "true",
          dbName: "is_approved",
          readOnly: false,
          data: [{ id: "false", value: "No" }, { id: "true", value: "Yes" }],
        },
        {
          name: "is_published",
          label: "Should this go live now?",
          fieldType: "Radio",
          isRequired: false,
          defaultValue: "false",
          dbName: "is_published",
          readOnly: false,
          data: [{ id: "false", value: "No" }, { id: "true", value: "Yes" }],
        },
      ],
    };
    return formJson;
  };

  render() {
    const { classes } = this.props;
    const { formJson } = this.state;
    if (!formJson) return <div>Hold tight! Preparing your form ...</div>;
    return (
      <div>
        <MassEnergizeForm
          pageKey={PAGE_KEYS.CREATE_COMMUNITY.key}
          classes={classes}
          formJson={formJson}
        />
      </div>
    );
  }
}

CreateNewCommunityForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(
  withRouter(CreateNewCommunityForm)
);
