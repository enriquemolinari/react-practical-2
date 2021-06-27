import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      loading: true,
    };
  }

  componentDidMount() {
    fetch(this.props.apiUrl + "/" + this.props.userId)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ result: { response }, loading: false });
      });
  }

  render() {
    return (
      <Dialog
        open={this.props.show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.loading ? (
              <CircularProgress />
            ) : (
              <table>
                <tbody>
                  <tr>
                    <td>Name: </td>
                    <td>{this.state.result.response.name}</td>
                  </tr>
                  <tr>
                    <td>User Name: </td>
                    <td>{this.state.result.response.username}</td>
                  </tr>
                  <tr>
                    <td>Website: </td>
                    <td>{this.state.result.response.website}</td>
                  </tr>
                  <tr>
                    <td>Address: </td>
                    <td>
                      {this.state.result.response.address.street +
                        " - " +
                        this.state.result.response.address.city}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
