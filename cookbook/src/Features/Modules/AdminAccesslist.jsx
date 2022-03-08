import { Box, Grid, TextField, Typography, styled, Tooltip } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import Button from "@material-ui/core/Button";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DateTimePicker
} from '@material-ui/pickers';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MenuAppBar from "../../Components/header";
import Select from "@material-ui/core/Select";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import config from "../../Config/config";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { TableContainer } from "@material-ui/core";

const useStylestable = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,
  },
}));

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "black",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      // height: '1rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "grey",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "black",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  texttablecell: {
    overflowX: "hidden",
    whiteSpace: "nowrap",
    width: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    '&:hover': {
      overflow: 'visible'
    }
  },
  buttton: {
    height: 10
  },

  table: {
    // minWidth: 150,
    width: "60%",
    height: "10%",
    border: "1px black",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "20ch",
    },
  },
  rootc: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 8px",
  },

  body: {
    fontSize: 13,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    // height: 9,
  },
}))(TableRow);

export default function AdminAccesslist() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [isData, setIsData] = useState(true);
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
  } = useSelector((state) => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title);
  const [objtype, setObjtype] = useState("Procedure");
  const [fnnames, setFnnames] = useState([]);
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [date, setDate] = useState('24/2/2022')
  const [objtypelist, setObjtypeslist] = useState([])
  const [userslist, setUserslist] = useState([])
  const [approvalslist, setApprovallist] = useState([])
  const [selecetd, setSelected] = useState(false)
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/userslist/`, conf).then(
      (res) => {

        setUserslist(res.data)

      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/approvalslist`, conf).then(
      (res) => {

        setApprovallist(res.data)

      },
      (error) => {
        console.log(error);
      }
    );
  }, []);



  // Function to handle edit
  const handleEdit = (i) => {
    // If edit mode is true setEdit will 
    // set it to false and vice versa
    setEdit(!isEdit);
  };

  const handleSaveDate = () => {

  }

  const handledatedesible = () => {
    setSelected(true)
  }

  useEffect(() => {
    let sval = 0;
    // if (headerValue) {
    //   if (headerValue?.title === "Oracle TO Postgres") {
    //     sval = 1;
    //   } else if (headerValue?.title === "SQLServer TO Postgres") {
    //     sval = 2;
    //   } else if (headerValue?.title === "MYSQL TO Postgres") {
    //     sval = 3;
    //   }
    // }
    let body = {
      Object_Type: objtype,
      Migration_TypeId: headerValue.title,
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/requestfndata/`, form, conf).then(
      (res) => {
        setFnnames(res.data);
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [objtype]);

  const handleObjecttype = (v) => {
    setObjtype(v?.Object_Type);
  };

  const handledropdown = (e, v) => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios
      .get(
        `${config.API_BASE_URL()}/api/fdetail/${v?.Feature_Id || null}`,
        conf
      )
      .then(
        (res) => {
          setData(res.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };



  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/objectviewtlist/${headerValue?.title}`, conf).then(
      (res) => {

        setObjtypeslist(res.data)

      },
      (error) => {
        console.log(error);
      }
    );
  }, [headerValue?.title]);






  const handleversion = () => { };

  const handleDate = (e) => {
    setData(e.target.value)
  }


  // const handleRequestAccess = () => {
  //   let body = {
  //     "Object_Type": objtype,
  //     "Migration_TypeId": migtypeid.title,
  //     "Feature_Name": fnnames,
  //     "User_Email": localStorage.getItem('uemail'),
  //     "Access_Type": 'Edit',
  //     "Expiary_date": date,
  //   };
  //   let conf = {
  //     headers: {
  //       Authorization: "Bearer " + config.ACCESS_TOKEN(),
  //     },
  //   };
  //   const form = new FormData();
  //   Object.keys(body).forEach((key) => {
  //     form.append(key, body[key]);
  //   });

  //   axios.post(`${config.API_BASE_URL()}/api/approvalscreate`, form, conf).then(
  //     (res) => {
  //       setNotify({
  //         isOpen: true,
  //         message: "Request Sent to Admin and Wait for the Approval",
  //         type: "success",
  //       });
  //     },
  //     (error) => {
  //       console.log(error);
  //       setNotify({
  //         isOpen: true,
  //         message: "Something Went Wrong Please Try Again!",
  //         type: "error",
  //       });
  //     }
  //   );
  // }




  return (
    <>
      <Box py={1} px={1}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">Admin Access & Roles</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction="row" spacing={1}>
          <Grid item xs={12} sm={4} md={4} xl={4}>
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              // onChange={(e) => handleChange(e)}
              name="MigrationType_Id"
              // defaultValue="Default Value"
              // helperText={featurenamemsg}
              className={classes.textField}
              // helperText="Some important text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={headerValue?.title}
              size="small"
              disabled
              style={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={objtypelist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              style={{ width: 300 }}
              onChange={(e, v) => handleObjecttype(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ObjectType"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={4} xl={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={fnnames}
              groupBy={""}
              // defaultValue={{ title: "Edit" }}
              getOptionLabel={(option) => option.Feature_Name}
              style={{ width: 300 }}
              onChange={(e, v) => handledropdown(e, v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Names"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={[
                { title: "Edit", code: 1 },
                { title: "View", code: 2 },
                // { title: "Admin", code: 3 },
              ]}
              groupBy={""}
              defaultValue={{ title: "Edit" }}
              getOptionLabel={(option) => option?.title}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleversion(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Accesstype"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              // defaultValue={{ title: "Select email" }}
              getOptionLabel={(option) => option.email}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleversion(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ID"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                    shrink: true,
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} xl={4}>

            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <DateTimePicker
                // value={selectedDate}
                inputVariant="outlined"
                disablePast
                size="small"
                id="grouped-demo"
                // onChange={handleDateChange}
                label="Expiry Date"
                showTodayButton
                style={{ width: 300, marginTop: '10px' }}
                className={classes.inputRoottype}
              />


            </MuiPickersUtilsProvider>

          </Grid>
          {/* <Grid item xs={4}>

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={[
                { title: "28-02-2022", code: 1 },
                { title: "29-02-2022", code: 2 },
                { title: "30-02-2022", code: 3 },
              ]}
              groupBy={""}
              defaultValue={{ title: "Expiry Date" }}
              getOptionLabel={(option) => option.title}
              style={{ width: 300, marginTop: 10 }}
              onChange={(e, v) => handleversion(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Expiry On"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              )}
            />
          </Grid> */}
        </Grid>
      </Box>
      <Box>
        <Grid container direction="row" justifyContent="center">
          <Button
            variant="contained"
            disabled={!selecetd}
            // startIcon={<CloudUploadIcon />}
            color="primary"
            component="span"
            style={{ marginTop: 15 }}
          >
            {" "}
            Grant Access
          </Button>
        </Grid>
      </Box>

      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={2}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Approval Requests
            </Typography>
            <TableContainer className={classestable.table}>
              <Table stickyHeader aria-label="sticky table">
                {/* <Table className={classestable.table} aria-label="simple table"> */}
                <TableHead className={classes.primary}>
                  <TableRow>
                    <StyledTableCell align="left">User Email</StyledTableCell>
                    <StyledTableCell align="left">Access Type</StyledTableCell>
                    <StyledTableCell align="left">Object Type</StyledTableCell>
                    <StyledTableCell align="left">Feature Name</StyledTableCell>
                    <StyledTableCell align="left">Approved By</StyledTableCell>
                    <StyledTableCell align="left">Date</StyledTableCell>
                    <StyledTableCell align="center">
                      Approval Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData ? (
                    <>
                      {approvalslist.map((item) =>

                        <StyledTableRow container>
                          <StyledTableCell item xl={10}>
                            <div className={classes.texttablecell}>
                              {item.User_Email}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {/* {item.Access_Type} */}
                              <StyledAutocomplete
                                size="small"
                                // id="grouped-demo"
                                className={classes.inputRoottype}
                                options={[
                                  { title: "Edit", code: 1 },
                                  { title: "View", code: 2 },
                                  // { title: "Admin", code: 3 },
                                ]}
                                groupBy={""}
                                defaultValue={{ title: "Edit" }}
                                getOptionLabel={(option) => option?.title}
                                style={{ width: 100, marginTop: 0 }}
                                onChange={(e, v) => handleversion(v)}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    // label="Accesstype"
                                    // variant="outlined"
                                    InputLabelProps={{
                                      className: classes.floatingLabelFocusStyle,
                                    }}
                                  />
                                )}
                              />

                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {item.Object_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {item.Feature_Name}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {"SivaNagaraju"}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={6}>
                            <div className={classes.texttablecell}>
                              {isEdit ? (
                                <>
                                  {/* <input type="date" id="date" name="Date" onChange={event => { setDate(event.target.value) }} />
                                  <SaveIcon style={{ color: "blue", width: '20px' }} onClick={handleSaveDate()} /> */}

                                  <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <DateTimePicker
                                      // value={selectedDate}
                                      // inputVariant="outlined"
                                      disablePast
                                      size="small"
                                      // id="grouped-demo"
                                      // onChange={handleDateChange}
                                      // label="Expiry Date"
                                      // showTodayButton
                                      style={{ width: 150, marginTop: '10px' }}
                                      className={classes.inputRoottype}
                                    />


                                  </MuiPickersUtilsProvider>
                                </>
                              ) :
                                <>{date}
                                  <EditSharpIcon style={{ color: "blue", width: '20px' }} onClick={handleEdit} /></>
                              }
                              {/* <EditSharpIcon style={{ color: "blue", width: '20px' }} onClick={handleEdit} /> */}
                              {/* <Button align="right" > */}


                              {/* </Button> */}
                              {/* onClick={() => handleEditchange(row.Feature_Id)} */}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item align="right" xl={10}>
                            <div className={classes.texttablecell}>
                              <Button
                                type="button"
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                              >
                                APPROVE
                              </Button>
                              {' '}
                              <Button
                                type="button"
                                size="small"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                              >
                                Denied
                              </Button>

                            </div>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </>
                  ) : (
                    <>
                      <StyledTableRow container>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">
                          No Requests
                        </StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </StyledTableRow>
                    </>

                  )

                  }
                </TableBody>
                {/* </Table> */}
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
