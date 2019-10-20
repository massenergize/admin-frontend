import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Type from 'dan-styles/Typography.scss';
import Fab from '@material-ui/core/Fab';
import {
  Checkbox,
  Select,
  TextField,
  Switch
} from 'redux-form-material-ui';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);
const uploadBox = {
  border: 'solid 1px #e0e0e0',
  borderRadius: 5,
  padding: 25
}
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: 'center'
  },
});

const initData = {
  text: 'Sample Text',
  email: 'sample@mail.com',
  radio: 'option1',
  selection: 'option1',
  onof: true,
  checkbox: true,
  textarea: 'This is default text'
};

class CreateNewTestimonialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    }
  }
  showFileList() {
    const { files } = this.state;
    if (files.length === 0) return "You have not selected any image ";
    var string = "";
    for (var i = 0; i < files.length; i++) {
      if (string !== "") {
        string += ", " + files[i].name;
      }
      else {
        string = files[i].name;
      }
    }
    return string;
  }

  handleTexts = (event)=>{
    this.setState({ [event.target.name]:event.target.value});
  }
  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear
    } = this.props;
    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={10} sm={12} xs={12}>
            <Paper className={classes.root}>
              <h4 style={{color:'#585858',fontWeight:"500"}}>Use this form to create a testimonial</h4>
              <TextField
              name = "title"
                onChange={(event) => { this.handleTexts(event) }}
                fullWidth
                placeholder="Title"
                margin="normal"
                variant="outlined"
                helperText="Add the title of this story"
              />
              <TextField
              name = "description"
                onChange={(event) => {this.handleTexts(event) }}
                id="outlined-multiline-flexible"
                label="Description"
                fullWidth
                multiline
                cols="20"
                rowsMax="19"
                rows="10"
                placeholder="Write a testimonial..."
                className={classes.textField}
                margin="normal"
                helperText="Describe what happened..."
                variant="outlined"
              />
              <div style={uploadBox}>
                <Typography className={Type.textGrey} gutterBottom>
                  Upload an image
              </Typography>
                <Typography className={Type.textGreyLight} gutterBottom>
                  {this.showFileList()}
              </Typography>
                <input
                  onChange={info => { this.setState({ files: info.target.files }) }}
                  style={{ display: 'none' }}
                  accept="image/*"
                  className={classes.inputUpload}
                  id="raised-button-file"
                  type="file"
                />
                { /* eslint-disable-next-line */}
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    id="raised-button-file"
                    className={classes.button}
                  >
                    Upload
                </Button>
                </label>
              </div>
              <Fab
                justify="right"
                style={{ margin: 6, background: 'green' }}
                onClick={() => { console.log(  {title:"",description:"",...this.state}) }}
                variant="extended"
                color="secondary"
                aria-label="Delete"
                className={classes.button}
              > Add Testimonial </Fab>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default withStyles(styles)(CreateNewTestimonialForm);


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Field, reduxForm } from 'redux-form/immutable';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import {
  Checkbox,
  TextField
} from 'redux-form-material-ui';
import { initAction, clearAction } from '../../../actions/ReduxFormActions';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueselected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30
  },
  field: {
    width: '100%',
    marginBottom: 20
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonInit: {
    margin: theme.spacing.unit * 4,
    textAlign: 'center'
  },
});

const initData = {
  name: 'Test',
  subdomain: 'testing1',
  owner_name: 'Ellen Tohn',
  owner_email: 'etohn@massenergize.org',
  is_tech_savvy: 'Yes',
  geographical_focus: 'DISPERSED',
  accepted_terms_and_conditions: true,
  about_community: 'I am a resident of Wayland and I lead a group of people who are interested in taking climate actions together as a town.',
};

class CommunityOnboardingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLocation: false,
      accepted_terms_and_conditions: false
    };
  }

  render() {
    const trueBool = true;
    const {
      classes,
      handleSubmit,
      pristine,
      reset,
      submitting,
      init,
      clear,
      submitIsClicked
    } = this.props;
    const {accepted_terms_and_conditions} = this.state 

    return (
      <div>
        <Grid container spacing={24} alignItems="flex-start" direction="row" justify="center">
          <Grid item xs={12} md={6}>
            <Paper className={classes.root}>
              <Typography variant="h5" component="h3">
                Community Onboarding Form
              </Typography>
              <Typography component="p">
                Please complete this form to the best of your knowledge.
              </Typography>
              <div className={classes.buttonInit}>
                <Button onClick={() => init(initData)} color="secondary" type="button">
                  Load Sample Data
                </Button>
                <Button onClick={() => clear()} type="button">
                  Clear Data
                </Button>
              </div>
              <form onSubmit={handleSubmit}>

                <div>
                  <Field
                    name="name"
                    component={TextField}
                    placeholder="Community Name eg. Wayland"
                    label="Community Name"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="subdomain"
                    component={TextField}
                    placeholder="eg. You will need your subdomain to access your community portal through subdomain.massenergize.org"
                    label="Subdomain For your Community Portal"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <h1>About the Community Admin</h1>
                <div>
                  <Field
                    name="owner_name"
                    component={TextField}
                    placeholder="Community Admin Name eg. Ellen Tohn"
                    label="Community Administrator's Name"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </div>
                <div>
                  <Field
                    name="owner_email"
                    component={TextField}
                    placeholder="eg. admin@wayland.com"
                    label="Community Administrator's Email"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </div>
                <div className={classes.field}>
                  <Field
                    name="about_community"
                    className={classes.field}
                    component={TextField}
                    placeholder="Tell us about you"
                    label="Tell Us About You"
                    multiline={trueBool}
                    rows={4}
                  />
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Are you Tech Savvy?</FormLabel>
                  <Field name="is_tech_savvy" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                  </Field>
                </div>
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Geographic Focus</FormLabel>
                  <Field name="geographical_focus" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="DISPERSED" control={<Radio />} label="Geographically Dispersed" onClick={() => { this.setState({ ...this.state, showLocation: false }); }} />
                    <FormControlLabel value="FOCUSED" control={<Radio />} label="Geographically Focused" onClick={() => { this.setState({ ...this.state, showLocation: true }); }} />
                  </Field>
                </div>
                {this.state.showLocation
                  && (

                    <Grid container spacing={24}>
                      <Grid item xs={12}>
                        <Field
                          name="address1"
                          component={TextField}
                          placeholder="eg. 9 Fields Lane"
                          label="Address Line 1"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="address2"
                          component={TextField}
                          placeholder="eg. Apt 4"
                          label="Address Line 2"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="city"
                          component={TextField}
                          placeholder="eg. Wayland"
                          label="City"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="state"
                          component={TextField}
                          placeholder="eg. New York"
                          label="State"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="zip"
                          component={TextField}
                          placeholder="eg. 10120"
                          label="Zip / Postal Code"
                          className={classes.field}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          name="country"
                          component={TextField}
                          placeholder="eg. Ghana"
                          label="Country"
                          className={classes.field}
                        />
                      </Grid>
                    </Grid>
                  )
                }
                <div className={classes.fieldBasic}>
                  <FormLabel component="label">Terms and Conditions</FormLabel>
                  <Field name="accepted_terms_and_conditions" className={classes.inlineWrap} component={renderRadioGroup}>
                    <FormControlLabel value="True" control={<Radio />} label="Accept" onClick={() => { this.setState({ ...this.state, accepted_terms_and_conditions: !accepted_terms_and_conditions }); }} />
                  </Field>
                </div>
                <div>
                  {submitIsClicked
                    && (
                      <div>
                        <h5>Creating a new Community now ...</h5>
                        <InputLabel>This might take a minute ...</InputLabel>
                        <CircularProgress className={classes.progress} />
                      </div>
                    )
                  }

                  {accepted_terms_and_conditions && 
                  (
                    <Button variant="contained" color="secondary" type="submit" disabled={submitting}>
                      Submit
                    </Button>
                  )
                  }
             
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

renderRadioGroup.propTypes = {
  input: PropTypes.object.isRequired,
};

CommunityOnboardingForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  init: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  init: bindActionCreators(initAction, dispatch),
  clear: () => dispatch(clearAction),
});

const ReduxFormMapped = reduxForm({
  form: 'immutableExample',
  enableReinitialize: true,
})(CommunityOnboardingForm);

const reducer = 'initval';
const FormInit = connect(
  state => ({
    force: state,
    initialValues: state.getIn([reducer, 'formValues']),
  }),
  mapDispatchToProps,
)(ReduxFormMapped);

export default withStyles(styles)(FormInit);
