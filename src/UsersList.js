import React, { Component } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import UserDetails from "./UserDetails";
import { styled } from "@material-ui/core/styles";

const StyledBox = styled(Box)({
  height: 40,
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 10,
});

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: { result: { data: [] } },
      page: 0,
      pageSize: 5,
      userId: 0,
      showDetail: false,
      loading: false,
      showAlert: false,
      alertMsg: "",
    };
  }

  fetchUserList() {
    fetch(
      this.props.apiUrl +
        "?_page=" +
        //first page is 1 for the json server API
        //Material DataGrid first page is 0
        (this.state.page + 1) +
        "&_limit=" +
        this.state.pageSize
    )
      .then((response) =>
        response.json().then((json) => ({
          total: response.headers.get("x-total-Count"),
          data: json,
        }))
      )
      .then((response) => {
        this.setState({
          state: { result: { total: response.total, data: response.data } },
        });
      });
  }

  componentDidMount() {
    this.fetchUserList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page === this.state.page) {
      return;
    }
    this.fetchUserList();
  }

  userIdSelected = 0;

  columns = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "name", headerName: "Name", width: 180, editable: true },
    { field: "username", headerName: "UserName", width: 200, editable: true },
    { field: "email", headerName: "Email", width: 250, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => this.openDetails(params.row)}
        >
          More...
        </Button>
      ),
    },
  ];

  openDetails = (params) => {
    this.setState({ userId: params.id });
    this.setState({ showDetail: true });
  };

  closeDetails = () => {
    this.setState({ showDetail: false });
  };

  handleDelete = () => {
    this.setState({ loading: true });

    fetch(this.props.apiUrl + "/" + this.userIdSelected, {
      method: "DELETE",
    }).then((response) => {
      this.setState({ loading: false });
      this.setState({ showAlert: true });
      this.setState({ alertMsg: "User Deleted Successfully" });
    });
  };

  handleCloseAlert = () => {
    this.setState({ showAlert: false });
  };

  handleEditing = (params) => {
    fetch(this.props.apiUrl + "/" + params.id, {
      method: "PUT",
      body: JSON.stringify({
        id: params.id,
        [params.field]: params.props.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ alertMsg: "User Updated Successfully" });
        this.setState({ showAlert: true });
      });
  };

  render() {
    return (
      <>
        <div style={{ height: 420, width: "100%" }}>
          <DataGrid
            rows={this.state.state.result.data}
            columns={this.columns}
            pageSize={this.state.pageSize}
            paginationMode="server"
            page={this.state.page}
            onPageChange={(params) => {
              this.setState({ page: params.page });
            }}
            onPageSizeChange={(params) => {
              this.setState({ pageSize: params.pageSize });
              //setPageSize(params.pageSize);
            }}
            rowsPerPageOptions={[3, 5]}
            rowCount={parseInt(this.state.state.result.total)}
            //to delete the selected row
            onRowSelected={(e) => (this.userIdSelected = e.data.id)}
            //editing
            onEditCellChangeCommitted={(params) => this.handleEditing(params)}
            disableColumnMenu={true}
          />
        </div>
        <div>
          <StyledBox component="div">
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleDelete}
            >
              {this.state.loading && (
                <CircularProgress color="inherit" size={24} />
              )}
              {!this.state.loading && "Delete Selected User"}
            </Button>
          </StyledBox>
        </div>
        {/* Con este condicional, hago que UserDetail componentDidMount
        alcance. Si no pusiera condicional, necesitaria un if en el componentDidMount ya que
        se llamaria al renderizar el UserList component. Y ademas necesitaria usar el
        componentDidUpdate en UserDetails*/}
        {this.state.showDetail && (
          <UserDetails
            apiUrl={this.props.apiUrl}
            userId={this.state.userId}
            show={this.state.showDetail}
            handleClose={this.closeDetails}
          />
        )}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.showAlert}
          autoHideDuration={3000}
          onClose={this.handleCloseAlert}
        >
          <Alert severity="success">{this.state.alertMsg}</Alert>
        </Snackbar>
      </>
    );
  }
}
