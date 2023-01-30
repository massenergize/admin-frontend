import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@mui/styles";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Info from '@mui/icons-material/Info';
import Warning from '@mui/icons-material/Warning';
import Check from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/RemoveCircle';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Ionicon from 'react-ionicons';
import dummy from 'dan-api/dummy/dummyContents';
import messageStyles from 'dan-styles/Messages.scss';
import avatarApi from 'dan-api/images/avatars';
import link from 'dan-api/ui/link';
import styles from './header-jss';
// menu notifications
class UserMenu extends React.Component {
  state = {
    anchorEl: null,
    openMenu: null
  };

  handleMenu = menu => (event) => {
    const { openMenu } = this.state;
    this.setState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null, openMenu: null });
  };

  render() {
    const { classes, dark } = this.props;
    const { anchorEl, openMenu } = this.state;
    return (
      <div>
        {/* <IconButton
          aria-haspopup="true"
          onClick={this.handleMenu('notification')}
          color="inherit"
          className={classNames(classes.notifIcon, dark ? classes.dark : classes.light)}
        >
          <Badge className={classes.badge} badgeContent={1} color="secondary">
            <Ionicon icon="ios-notifications-outline" />
          </Badge>
        </IconButton> */}
        {/* <Menu
          id="menu-notification"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          className={classes.notifMenu}
          PaperProps={{
            style: {
              width: 350,
            },
          }}
          open={openMenu === 'notification'}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageInfo}>
              <Avatar alt="User Name" src={avatarApi[0]} />
              <ListItemText primary={dummy.text.subtitle} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" /> 
           <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageInfo}>
              <Avatar className={messageStyles.icon}>
                <Info />
              </Avatar>
              <ListItemText primary={dummy.text.sentences} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageSuccess}>
              <Avatar className={messageStyles.icon}>
                <Check />
              </Avatar>
              <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem> 
          <Divider variant="inset" />
          <MenuItem onClick={this.handleClose}>
            <div className={messageStyles.messageWarning}>
              <Avatar className={messageStyles.icon}>
                <Warning />
              </Avatar>
              <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
          </MenuItem>
          <Divider variant="inset" />
        </Menu> */}
        {/* <Button onClick={this.handleMenu('user-setting')}>
          <Avatar
            alt={dummy.user.name}
            src={dummy.user.avatar}
          />
        </Button> */}
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openMenu === 'user-setting'}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} component={Link} to={link.profile}>My Profile</MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to={link.calendar}>My Calendar</MenuItem>
          <MenuItem onClick={this.handleClose} component={Link} to={link.email}>
            My Inbox
            <ListItemIcon>
              <Badge className={classNames(classes.badge, classes.badgeMenu)} badgeContent={2} color="secondary">&nbsp;</Badge>
            </ListItemIcon>
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose} component={Link} to="/">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Log Out
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false
};

export default withStyles(styles)(UserMenu);
