import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import Home from "@material-ui/icons/Home";
import AddBox from "@material-ui/icons/AddBox";
import List from "@material-ui/core/List";

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleListItemClick(item) {
    this.props.handleMenu(item);
  }

  render() {
    return (
      <List>
        <ListItem
          selected={this.props.valueItem === this.props.items.WELCOME}
          button
          onClick={() => this.handleListItemClick(this.props.items.WELCOME)}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Welcome" />
        </ListItem>
        <ListItem
          selected={this.props.valueItem === this.props.items.USERSLIST}
          button
          onClick={() => this.handleListItemClick(this.props.items.USERSLIST)}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="User Lists" />
        </ListItem>
        <ListItem
          selected={this.props.valueItem === this.props.items.USERFORM}
          button
          onClick={() => this.handleListItemClick(this.props.items.USERFORM)}
        >
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          <ListItemText primary="Add User" />
        </ListItem>
      </List>
    );
  }
}
