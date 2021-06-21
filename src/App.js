import React, { Component } from "react";
import Layout from "./Layout.js";
import UsersForm from "./UserForm.js";
import UsersList from "./UsersList.js";
import LeftMenu from "./LeftMenu.js";
import Welcome from "./Welcome.js";

export default class App extends Component {
  constructor() {
    super();
    this.MENU_ITEMS = {
      WELCOME: 0,
      USERSLIST: 1,
      USERFORM: 2,
    };
    this.apiUrl = process.env.REACT_APP_API_URL;
    this.state = {
      itemClicked: this.MENU_ITEMS.WELCOME,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    this.setState({ itemClicked: item });
  }

  render() {
    return (
      <Layout
        left={
          <LeftMenu
            items={this.MENU_ITEMS}
            handleMenu={this.handleClick}
            valueItem={this.state.itemClicked}
          />
        }
      >
        {this.state.itemClicked === this.MENU_ITEMS.WELCOME && <Welcome />}
        {this.state.itemClicked === this.MENU_ITEMS.USERSLIST && (
          <UsersList apiUrl={this.apiUrl} />
        )}
        {this.state.itemClicked === this.MENU_ITEMS.USERFORM && (
          <UsersForm apiUrl={this.apiUrl} />
        )}
      </Layout>
    );
  }
}
