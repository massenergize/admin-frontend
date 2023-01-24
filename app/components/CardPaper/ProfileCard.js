import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@mui/styles";
import Typography from '@material-ui/core/Typography';
import Type from 'dan-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SupervisorAccount from '@mui/icons-material/SupervisorAccount';
// import Favorite from '@mui/icons-material/Favorite';
// import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import Divider from '@material-ui/core/Divider';
import styles from './cardStyle-jss';

class ProfileCard extends React.Component {
  render() {
    const {
      classes,
      cover,
      avatar,
      name,
      title,
      connection,
      isVerified,
      btnText,
      user
    } = this.props;

    return (
      <Card className={classes.cardSocmed}>
        <CardMedia
          className={classes.mediaProfile}
          image={avatar}
          title="cover"
        />
        <CardContent className={classes.contentProfile}>
          <Avatar alt="avatar" src={avatar} className={classes.avatarBig} />
          <Typography variant="h6" className={classes.name} gutterBottom>
            {name}
            {isVerified && <VerifiedUser className={classes.verified} />}
          </Typography>
          <Typography className={classes.subheading} gutterBottom>
            <span className={Type.regular}>{title}</span>
          </Typography>
          <Typography variant="caption" component="p">
            {user.email}
            &nbsp;
          </Typography>
          <Button className={classes.buttonProfile} size="large" variant="outlined" color="secondary">
            {btnText}
          </Button>
        </CardContent>
        <Divider />
        <CardActions>
          <BottomNavigation
            showLabels
            className={classes.bottomLink}
          >
            <BottomNavigationAction label={`ID: ${user.id}`} icon={<SupervisorAccount />} />
            {/* <BottomNavigationAction label="10 Favorites" icon={<Favorite />} />
            <BottomNavigationAction label="5 Albums" icon={<PhotoLibrary />} /> */}
          </BottomNavigation>
        </CardActions>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  // cover: PropTypes.string.isRequired,
  // avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // connection: PropTypes.number.isRequired,
  btnText: PropTypes.string.isRequired,
  isVerified: PropTypes.bool
};

ProfileCard.defaultProps = {
  isVerified: false
};

export default withStyles(styles)(ProfileCard);
