import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import config from "../../Config/config";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import axios from "axios";
import MenuAppBar from '../../Components/header'
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import AddIcon from '@material-ui/icons/Add';
import { Avatar } from '@material-ui/core';
import Notification from "../Notifications/Notification";

import {
  Container,
  Modal,
  Snackbar,
} from "@material-ui/core";



const useStylestable = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    // width:10
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

}))




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
    overflowX: 'hidden',
    whiteSpace: "nowrap",
    width: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // '&:hover': {
    //     overflow: 'visible'
    // }
  },

  table: {
    // minWidth: 150,
    width: '60%',
    height: '10%',
    border: '1px black'
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  rootc: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },


  //pop up weindow

  container: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 200,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  },
  container1: {
    border: "none",
    borderRadius: 15,
    width: 450,
    height: 280,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
  }

}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#3f51b5',
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 16px",
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,

    },

    height: 10

  },
}))(TableRow);


export default function SuperadminFunction() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [isData, setIsData] = useState(true);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title)
  const [objtype, setObjtype] = useState('Procedure')
  const [Migtype, setMigtype] = useState('')
  const [fnnames, setFnnames] = useState([])
  const [data, setData] = useState([])
  const [selecetd, setSelected] = useState(false)
  const [openAlert, setOpenAlert] = useState(false);

  const [migtype_create, setMigtype_create] = useState('')
  const [objtype_create, setObjtype_create] = useState('')
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [migtypelist, setMigtypeslist] = useState([])
  const [objtypelist, setObjtypeslist] = useState([])
  const [updatemiglist, setUpdatemiglist] = useState(false)
  const [updateobjlist, setUpdateobjlist] = useState(false)
  const [userslist, setUserslist] = useState([])

  let history = useHistory();


  useEffect(() => {
    // let sval = 0;
    // if (headerValue) {
    //   if (headerValue.title === "Oracle TO Postgres") {
    //     sval = 1;
    //   } else if (headerValue.title === "SQLServer TO Postgres") {
    //     sval = 2;
    //   } else if (headerValue.title === "MYSQL TO Postgres") {
    //     sval = 3;
    //   }
    // }
    let body = {
      "Object_Type": objtype,
      "Migration_TypeId": headerValue.title,
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
        setFnnames(res.data)
        console.log(res.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }, [objtype]);


  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.get(`${config.API_BASE_URL()}/api/migrationviewlist/`, conf).then(
      (res) => {
          // console.log("mig list ", res.data)
          setMigtypeslist(res.data)
        
      },
      (error) => {
        console.log(error);
      }
    );
  }, [updatemiglist]);


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
    axios.get(`${config.API_BASE_URL()}/api/objectviewtlist/${migtype_create}`, conf).then(
      (res) => {
        
          setObjtypeslist(res.data)
        
      },
      (error) => {
        console.log(error);
      }
    );
  }, [updateobjlist]);

  


  // console.log(headerValue.title)
  const handleObjecttype = (v) => {
    setObjtype(v.title)
  }

  const handleMigrationtype = (v) => {
    setMigtype(v.title)
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleObjectviewslist =(v)=>{
    setMigtype_create(v?.Migration_TypeId)
    
      let conf = {
        headers: {
          Authorization: "Bearer " + config.ACCESS_TOKEN(),
        },
      };
      axios.get(`${config.API_BASE_URL()}/api/objectviewtlist/${v?.Migration_TypeId}`, conf).then(
        (res) => {
          setObjtypeslist(res.data)
        },
        (error) => {
          console.log(error);
        }
      );
  
  }

  const handledropdown = (e, v) => {
    setSelected(true)
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    axios.get(`${config.API_BASE_URL()}/api/fdetail/${v?.Feature_Id || null}`, conf).then(
      (res) => {
        setData(res.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  const handleMigrationCreate = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Object_Type": objtype_create,
      "Migration_TypeId": migtype_create,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
      (res) => {
        // setNotify("Created Migration Type")
        setNotify({
          isOpen: true,
          message: "Created Migration Type",
          type: "success",
        });
        setUpdatemiglist(true)
        setOpen1(false)
      },
      (error) => {
        console.log(error.response.data);
        // setNotify("Migration Types Already Exist!")
      }
    );
    setUpdatemiglist(false)
  }


  const handleObjectypeCreate = () => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Object_Type": objtype_create,
      "Migration_TypeId": migtype_create,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.post(`${config.API_BASE_URL()}/api/migrationsscreate/`, form, conf).then(
      (res) => {
        // setNotify("Created Object Type")
        setNotify({
          isOpen: true,
          message: "Created Object Type",
          type: "success",
        });
        setUpdateobjlist(true)
        setOpen(false)

      },
      (error) => {
        console.log(error.response.data);
        // setNotify("Object Type Exist!")
      }
    );
    setUpdateobjlist(false)
    // handleObjectviewslist(body)
    
  }


  return (
    <>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Super Admin
            </Typography>
          </Grid>
        </Grid>

      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' spacing={2}>

          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={migtypelist}
              groupBy={""}
              // defaultValue={{ title: "Oracle TO Postgres" }}
              getOptionLabel={(option) => option.Migration_TypeId}
              style={{ width: 300 }}
              onChange={(e, v) => handleObjectviewslist(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Migration type"
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
          <Grid item xs={1}>
            <Avatar className={classes.avatar} onClick={() => setOpen1(true)}>
              <AddIcon style={{ color: 'green' }} />
            </Avatar>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
          </Snackbar>
          <Modal open={open1}>
            <Container className={classes.container}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                className={classes.Object_Type}
                style={{ marginBottom: '20px' }}
              >
                Create Migration Type
              </Typography>
              {/* <form className={classes.form} autoComplete="off"> */}
              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Migration Type"
                  style={{ width: 400, marginBottom: '20px' }}
                  multiline
                  rows={1}
                  // value ={row.Keywords}
                  onChange={(e) => setMigtype_create(e.target.value)}
                  name="Keywords"
                  // defaultValue={edithandle.Keywords}
                  // helperText={featurenamemsg}
                  // value={edithandle.Keywords}
                  className={classes.textField}
                  // helperText="Some important text"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}

                  multiline
                />
              </div>
              <div className={classes.item} >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 100 }}
                  onClick={() => handleMigrationCreate()}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen1(false)}
                >
                  Cancel
                </Button>
              </div>
            </Container>
          </Modal>
          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              // defaultValue={{ title: "Select Email" }}
              getOptionLabel={(option) => option.email}
              style={{ width: 300 }}
              onChange={(e, v) => handleObjecttype(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="username/email"
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
          <Grid item xs={4} >
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={objtypelist}
              groupBy={""}
              // defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.Object_Type}
              style={{ width: 300 }}
              // onChange={(e, v) => handleObjecttype(v)}
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
          <Grid item xs={1}>
            <Avatar className={classes.avatar} onClick={() => setOpen(true)}>
              <AddIcon style={{ color: 'green' }} />
            </Avatar>
          </Grid>
          <Snackbar
            open={openAlert}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
          </Snackbar>
          <Modal open={open}>
            <Container className={classes.container1} style={{ marginBottom: 100 }}>
              <Typography
                gutterBottom
                align="center"
                variant="h6"
                component="h2"
                className={classes.Object_Type}
                style={{ marginBottom: '20px' }}
              >
                Create Object Type
              </Typography>
              {/* <form className={classes.form} autoComplete="off"> */}

              <Grid item xs={4} >
                <StyledAutocomplete
                  size="small"
                  id="grouped-demo"
                  className={classes.inputRoottype}
                  options={migtypelist}
                  groupBy={""}
                  // defaultValue={{ title: "Oracle TO Postgres" }}
                  getOptionLabel={(option) => option.Migration_TypeId}
                  style={{ width: 400, marginBottom: '20px', height: '60px' }}
                  onChange={(e, v) => setMigtype_create(v.Migration_TypeId)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Migration type"
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

              <div className={classes.item}>
                <TextField
                  id="outlined-multiline-static"
                  label="Object Type"
                  style={{ width: 400, marginBottom: '20px' }}
                  multiline
                  rows={1}
                  // value ={row.Keywords}
                  onChange={(e) => setObjtype_create(e.target.value)}
                  name="Keywords"
                  // defaultValue={edithandle.Keywords}
                  // helperText={featurenamemsg}
                  // value={edithandle.Keywords}
                  className={classes.textField}
                  // helperText="Some important text"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}

                  multiline
                />
              </div>
              <div className={classes.item} >
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginRight: 20, marginLeft: 100 }}
                  onClick={() => handleObjectypeCreate()}
                >
                  Create
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              {/* </form> */}
            </Container>
          </Modal>
        </Grid>
        <Grid container direction="row" justifyContent="center">
          <Button
            variant="contained"
            // startIcon={<CloudUploadIcon />}
            color="primary"
            component="span"
            style={{ marginTop: 12, marginLeft: 60 }}
          >
            {" "}
            Submit
          </Button>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align='center'
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Super Admin Users
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="left">User Email-ID</StyledTableCell>
                  <StyledTableCell align="left">Migration Type</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                {isData ?
                  <StyledTableRow container>
                    <StyledTableCell item xl={8} >
                      <div className={classes.texttablecell}>
                        {"siva.n@quadrantresource.com"}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell item xl={8} >
                      <div className={classes.texttablecell}>
                        {"Oracle TO Postgres"}
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }


              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              align='center'
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              2 Super users
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="left">User Email-ID</StyledTableCell>
                  <StyledTableCell align="left">Migration Type</StyledTableCell>
                  <StyledTableCell align="left">Approve</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>


                {isData ?
                  <StyledTableRow container>
                    <StyledTableCell item xl={8} >
                      <div className={classes.texttablecell}>
                        {"siva.n@quadrantresource.com"}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell item xl={8} >
                      <div className={classes.texttablecell}>
                        {"Oracle TO Postgres"}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell item xl={8} align="left">
                      <Button
                        type="button"
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                  : <>
                    <StyledTableRow container>
                      <StyledTableCell align="center"></StyledTableCell>
                      <StyledTableCell align="center">No Requests</StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </StyledTableRow>
                  </>
                }
              </TableBody>
            </Table>
          </Grid>

        </Grid>
      </Box>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  )
}