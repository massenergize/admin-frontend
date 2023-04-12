import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@mui/styles";
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import Icon from '@mui/material/Icon';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import messageStyles from 'dan-styles/Messages.scss';
import progressStyles from 'dan-styles/Progress.scss';
import imgApi from 'dan-api/images/photos';
import avatarApi from 'dan-api/images/avatars';
import PapperBlock from '../PapperBlock/PapperBlock';
import styles from './widget-jss';

function createData(id, name, date, total, avatar, buyerName, photo, type, currentStock, totalStock, status, statusMessage) {
  return {
    id,
    name,
    date,
    total,
    avatar,
    buyerName,
    photo,
    type,
    currentStock,
    totalStock,
    status,
    statusMessage,
  };
}

const data = [
  createData('QWE123', 'Woman Bag', '23 Oct 2018', 300, avatarApi[6], 'John Doe', imgApi[21], 'blur_on', 14, 30, 'Error', 'Canceled'),
  createData('ABC890', 'Laptop', '11 Nov 2018', 230, avatarApi[8], 'Jim Doe', imgApi[29], 'computer', 25, 70, 'Success', 'Sent'),
  createData('GHI556', 'Pinapple Jam', '5 Nov 2018', 34, avatarApi[2], 'Jane Doe', imgApi[25], 'restaurant_menu', 35, 50, 'Warning', 'Pending'),
  createData('MNO444', 'Action Figure', '22 Sept 2018', 17, avatarApi[9], 'Jack Doe', imgApi[30], 'toys', 9, 85, 'Info', 'Paid'),
  createData('JKL345', 'Man Shoes', '19 Sept 2018', 208, avatarApi[5], 'Jessica Doe', imgApi[22], 'blur_on', 18, 33, 'Default', 'Returned'),
];

function TableWidget(props) {
  const { classes, tableData } = props;
  const { data }  = tableData;
  const getStatus = status => {
    switch (status) {
      case 'Error': return messageStyles.bgError;
      case 'Warning': return messageStyles.bgWarning;
      case 'Info': return messageStyles.bgInfo;
      case 'Success': return messageStyles.bgSuccess;
      default: return messageStyles.bgDefault;
    }
  };
  const getProgress = status => {
    switch (status) {
      case 'Error': return progressStyles.bgError;
      case 'Warning': return progressStyles.bgWarning;
      case 'Info': return progressStyles.bgInfo;
      case 'Success': return progressStyles.bgSuccess;
      default: return progressStyles.bgDefault;
    }
  };
  return (
    <PapperBlock noMargin title={tableData.title} icon="ios-share-outline" whiteBg desc="">
      <div className={classes.root}>
        <Table className={classNames(classes.tableLong, classes.stripped)} padding="dense">
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Community Name</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell align="right">Population</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Is Dispersed?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => ([
              <TableRow key={n.id}>
                <TableCell padding="dense">
                  <div className={classes.flex}>
                    <Avatar alt={n.name} src={n.photo} className={classes.productPhoto} />
                    <div>
                      <Typography variant="caption">{n.id}</Typography>
                      <Typography variant="subtitle1">{n.name}</Typography>
                      <a href="/admin/export" className={classes.downloadInvoice}>
                        <ArrowDownward />
                        &nbsp;Download Data
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className={classes.flex}>
                    <Avatar alt={n.buyerName} src={n.avatar} className={classNames(classes.avatar, classes.sm)} />
                    <div>
                      <Typography>{n.buyerName}</Typography>
                      <Typography variant="caption">
                        Date Registered:&nbsp;
                        {n.date}
                      </Typography>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="button">
                    {n.total}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={n.statusMessage} className={classNames(classes.chip, getStatus(n.status))} />
                </TableCell>
                <TableCell>
                  <div className={classes.taskStatus}>
                    <Icon className={classes.taskIcon}>{n.type}</Icon>
                    <Typography variant="caption">
                      {n.geography}
                    </Typography>
                  </div>
                  {/* <LinearProgress variant="determinate" className={getProgress(n.status)} value={(n.currentStock / n.totalStock) * 100} /> */}
                </TableCell>
              </TableRow>
            ]))}
          </TableBody>
        </Table>
      </div>
    </PapperBlock>
  );
}

TableWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableWidget);
