import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const ASideMenu = (props) => {
  const classes = useStyles();

  const list = (position) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(position, false)}
      onKeyDown={props.toggleDrawer(position, false)}
    >
      <List>
        {['Dashboard', 'Employees', 'Customers', 'Purchases', 'Details', 'Logs'].map((text, index) => (
          <Link to={"/" + text.toLocaleLowerCase()} className="aside-nav-items">
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div className="aside-nav-menu">
      <React.Fragment key={props.position}>
        <Drawer position={props.position} open={props.state[props.position]} onClose={props.toggleDrawer(props.position, false)}>
          {list(props.position)}
        </Drawer>
      </React.Fragment>
    </div>
  );
}