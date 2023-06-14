import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@mui/styles";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import data from 'dan-api/apps/contactData';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
  fetchAction,
  showDetailAction,
  hideDetailAction,
  submitAction,
  editAction,
  addAction,
  closeAction,
  removeAction,
  addToFavoriteAction,
  searchAction,
  closeNotifAction
} from 'dan-actions/ContactActions';


import {
  Notification
} from 'dan-components';

import ContactDetail from './ContactDetail';
import ContactList from './ContactList';
import AddContact from './AddContact';
import styles from './contact-jss';
import CommunitySwitch from '../Summary/CommunitySwitch';
import { apiCall } from '../../../utils/messenger';
import { reduxGetAllCommunityUsers, reduxGetAllUsers } from '../../../redux/redux-actions/adminActions';
import Seo from '../../../components/Seo/Seo';

class Contact extends React.Component {
  async componentDidMount() {
    const { fetchData } = this.props;
    const usersResponse = await apiCall('/users.listForCommunityAdmin');
    if (usersResponse.success) {
      console.log(usersResponse.data)
      fetchData(usersResponse.data);
    }
  }


  submitContact = (item, avatar) => {
    const { submit } = this.props;
    submit(item, avatar);
  }

  showCommunitySwitch = () => {
    const user = this.props.auth ? this.props.auth : {};
    if (user.is_community_admin) {
      return (
        <CommunitySwitch actionToPerform={this.handleCommunityChange} />
      );
    }
  }

  handleCommunityChange =(id) => {
    this.props.callForNormalAdminUsers(id);
  }


  render() {
    const title = brand.name + ' - Contact';
    const description = brand.desc;
    const {
      classes,
      dataContact,
      itemSelected,
      showDetail,
      hideDetail,
      avatarInit,
      open,
      showMobileDetail,
      add,
      edit,
      close,
      remove,
      favorite,
      keyword,
      search,
      closeNotif,
      messageNotif,
      full_community,
      auth
    } = this.props;
    return (
      <div>
        <Seo name={"Contact"} />
        {/* {this.showCommunitySwitch()} */}
        <Notification close={() => closeNotif()} message={messageNotif} />
        <div className={classes.root}>
          <ContactList
            addFn
            total={dataContact.size}
            addContact={add}
            clippedRight
            itemSelected={itemSelected}
            dataContact={dataContact}
            showDetail={showDetail}
            search={search}
            keyword={keyword}
            communities={auth.admin_at || []}
          />
          <ContactDetail
            showMobileDetail={showMobileDetail}
            hideDetail={hideDetail}
            dataContact={dataContact}
            itemSelected={itemSelected}
            edit={edit}
            remove={remove}
            favorite={favorite}
          />
        </div>
        {/* <AddContact
          addContact={add}
          openForm={open}
          closeForm={close}
          submit={this.submitContact}
          avatarInit={avatarInit}
        /> */}
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarInit: PropTypes.string.isRequired,
  fetchData: PropTypes.func.isRequired,
  showDetail: PropTypes.func.isRequired,
  hideDetail: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  showMobileDetail: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  favorite: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  dataContact: PropTypes.object.isRequired,
  itemSelected: PropTypes.number.isRequired,
  closeNotif: PropTypes.func.isRequired,
  messageNotif: PropTypes.string.isRequired,
};

const reducer = 'contact';
const mapStateToProps = state => ({
  force: state, // force state from reducer
  auth: state.getIn(['auth']),
  avatarInit: state.getIn([reducer, 'avatarInit']),
  dataContact: state.getIn([reducer, 'contactList']),
  itemSelected: state.getIn([reducer, 'selectedIndex']),
  keyword: state.getIn([reducer, 'keywordValue']),
  open: state.getIn([reducer, 'openFrm']),
  showMobileDetail: state.getIn([reducer, 'showMobileDetail']),
  messageNotif: state.getIn([reducer, 'notifMsg']),
  full_community: state.getIn(['full_selected_community'])
});

const constDispatchToProps = dispatch => ({
  fetchData: bindActionCreators(fetchAction, dispatch),
  showDetail: bindActionCreators(showDetailAction, dispatch),
  hideDetail: () => dispatch(hideDetailAction),
  submit: bindActionCreators(submitAction, dispatch),
  edit: bindActionCreators(editAction, dispatch),
  add: () => dispatch(addAction),
  close: () => dispatch(closeAction),
  remove: bindActionCreators(removeAction, dispatch),
  favorite: bindActionCreators(addToFavoriteAction, dispatch),
  search: bindActionCreators(searchAction, dispatch),
  closeNotif: () => dispatch(closeNotifAction),
  callForSuperAdminUsers: reduxGetAllUsers,
  callForNormalAdminUsers: reduxGetAllCommunityUsers
});

const ContactMapped = connect(
  mapStateToProps,
  constDispatchToProps
)(Contact);

export default withStyles(styles)(ContactMapped);
