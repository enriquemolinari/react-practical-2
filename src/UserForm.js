import { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import "./form.css";

export default class UsersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputsValue: { name: "", username: "", email: "" },
      loading: false,
      errorInputs: {},
      showSuccess: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    fetch(this.props.apiUrl, {
      method: "POST",
      body: JSON.stringify({
        name: this.state.inputsValue.name,
        userName: this.state.inputsValue.username,
        email: this.state.inputsValue.email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          loading: false,
          errorInputs: {},
        });
        this.checkResponse(json);
      });
  };

  handleClose = () => {
    this.setState({
      showSuccess: false,
    });
  };

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((state) => ({
      inputsValue: { ...state.inputsValue, [name]: value },
    }));
  };

  checkResponse = (json) => {
    if (json.name && json.userName && json.email) {
      this.setState({
        showSuccess: true,
      });
    }
    if (!json.name) {
      this.setState((state) => ({
        errorInputs: { ...state.errorInputs, name: "This field is required" },
      }));
      /*       setErrorInputs((errorInputs) => ({
        ...errorInputs,
        name: "This field is required",
      })); */
    }
    if (!json.userName) {
      this.setState((state) => ({
        errorInputs: {
          ...state.errorInputs,
          username: "This field is required",
        },
      }));
      /*       setErrorInputs((errorInputs) => ({
        ...errorInputs,
        username: "This field is required",
      })); */
    }
    if (!json.email) {
      this.setState((state) => ({
        errorInputs: { ...state.errorInputs, email: "This field is required" },
      }));
      /* setErrorInputs((errorInputs) => ({
        ...errorInputs,
        email: "This field is required",
      })); */
    }
  };

  render() {
    return (
      <>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="form">
            <TextField
              id="name"
              name="name"
              label="Name"
              error={typeof this.state.errorInputs.name !== "undefined"}
              helperText={
                this.state.errorInputs.name ? this.state.errorInputs.name : ""
              }
              required={true}
              fullWidth={true}
              value={this.state.inputsValue.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="form">
            <TextField
              id="username"
              name="username"
              label="User Name"
              error={typeof this.state.errorInputs.username !== "undefined"}
              helperText={
                this.state.errorInputs.username
                  ? this.state.errorInputs.username
                  : ""
              }
              required={true}
              fullWidth={true}
              value={this.state.inputsValue.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="form">
            <TextField
              id="email"
              name="email"
              label="EMail"
              error={typeof this.state.errorInputs.email !== "undefined"}
              helperText={
                this.state.errorInputs.email ? this.state.errorInputs.email : ""
              }
              required={true}
              fullWidth={true}
              value={this.state.inputsValue.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button type="submit" variant="contained" color="primary">
              {this.state.loading && (
                <CircularProgress color="inherit" size={24} />
              )}
              {!this.state.loading && "Save"}
            </Button>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.showSuccess}
          autoHideDuration={3000}
          onClose={this.handleClose}
        >
          <Alert severity="success">User Created Successfully !</Alert>
        </Snackbar>
      </>
    );
  }
}
