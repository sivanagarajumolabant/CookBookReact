import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import FormControl from "@material-ui/core/FormControl";
import GetAppIcon from "@material-ui/icons/GetApp";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Select from "@material-ui/core/Select";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import InputLabel from "@material-ui/core/InputLabel";
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuAppBar from "../../Components/header";
import { Box, Grid, Typography, styled, Tooltip, Fab } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch, useSelector } from "react-redux";
import Menuaction from "../../Redux/actions/Menuaction";
import Notification from "../Notifications/Notification";
import API_BASE_URL from "../../Config/config";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import config from "../../Config/config";
import { Add as AddIcon } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";

import {
  Container,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Snackbar,
} from "@material-ui/core";

// import Font from '@ckeditor/ckeditor5-font/src/font';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  root: {
    padding: "0px 16px",
  },

  body: {
    fontSize: 14,
  },
}))(TableCell);
const useStylestable = makeStyles({
  table: {
    minWidth: 100,
    // width:10
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },

    height: 10,
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  texttablecell: {
    overflowX: "hidden",
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
    width: "60%",
    height: "10%",
    border: "1px black",
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 220,
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
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
  textField: {
    "& p": {
      color: "red",
    },
  },

  //pop up weindow

  container: {
    border: "none",
    borderRadius: 15,
    width: 600,
    height: 500,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",

    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  form: {
    padding: theme.spacing(2),
  },
  item: {
    marginTop: 40,
    marginLeft: 80,
    width: 400,
    justifyContent: "center",
    justifyItems: "center",
    position: "relative",
    marginBottom: theme.spacing(6),
  },
}));

const StyledAutocompleteDrop = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    backgroundColor: "#3f51b5",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#3f51b5",
    },
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateFeature(props) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const classes = useStyles();
  const classestable = useStylestable();
  const [edithandle, setEdithandle] = useState([])
  const {
    details,
    createFeature,
    preview,
    editpreview,
    editPreviewdetails,
    headerValue,
    ITEMlIST
  } = useSelector((state) => state.dashboardReducer);

  var obj_type = props.location?.state?.data?.Label;
  // console.log("obj type ", obj_type);
  // if (obj_type === "Indexes") {
  //   obj_type = obj_type?.slice(0, -2);
  // } else {
  //   obj_type = obj_type?.slice(0, -1);
  // }
  // console.log("obj 1 ", obj_type);
  const [prerunval, setPrerunval] = useState([]);
console.log(edithandle)
  // const [featureslist, setFeatureslist] = useState(["ex1", "Sample"])
  const history = useHistory();

  const [formValues, setformvalues] = useState({
    Migration_TypeId: props.location?.state?.data?.type,
    Object_Type: props.location?.state?.data?.Label,
    
  });
  const [file, setfile] = useState([]);
  // const [AttachmentList, setAttachmentList] = useState({})
  // const { headerValue } = useSelector(state => state.dashboardReducer);

  const [drop, setDrop] = useState("Source Attachments");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [createdata, setCreatedata] = useState([]);
  const [fnlist, setFnlist] = useState([]);
  const [tableinfo, setTableinfo] = useState([]);
  const [istdata, setIstdata] = useState(false);
  const [featurenamemsg, setFeaturenamemsg] = useState();
  const [fid, setFid] = useState()
  const [modalupdate, setModalupdate] = useState(false)
  // const [migtypeid, setMigtypeid] = useState()

  // const [seq, setSeq]=useState({})
  // let sval = 0;
  // if (headerValue) {
  //   if (headerValue?.title === "Oracle TO Postgres") {
  //     sval = 1;
  //   } else if (headerValue?.title === "SQLServer TO Postgres") {
  //     sval = 2;
  //   } else if (headerValue?.title === "MYSQL TO Postgres") {
  //     sval = 3;
  //   }
  // }

  useEffect(() => {
    let body = {
      Object_Type: obj_type,
      Migration_TypeId: formValues.Migration_TypeId,
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.post(`${config.API_BASE_URL()}/api/predessors`, body, conf).then(
      (res) => {
        //   console.log(res);
        setPrerunval(res.data);

        //   setIsdata(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [obj_type, headerValue?.title]);

  useEffect(() => {
    let body = {
      Object_Type: obj_type,
      Migration_TypeId: headerValue?.title,
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
    axios.post(`${config.API_BASE_URL()}/api/tablesdata/`, form, conf).then(
      (res) => {
        setTableinfo(res.data);
        setIstdata(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [modalupdate, headerValue?.title]);

  useEffect(() => { }, [formValues]);

  useEffect(() => {
    let body = {
      Object_Type: obj_type,
      Migration_TypeId: formValues.Migration_TypeId,
    };
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios.post(`${config.API_BASE_URL()}/api/fnlist`, body, conf).then(
      (res) => {
        console.log("fn list", res.data);
        setFnlist(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [formValues]);

  const dispatach = useDispatch();
  // console.log(props.location.state?.data?.type)

  console.log(props.location?.state?.data);

  const handleSubmit = (e) => {
    let typeval = details?.data?.type;
    // console.log("type data ", details?.data)
    // console.log("type ", typeval)
    let val;
    e.preventDefault();
    if (headerValue) {
      // debugger
      // if (headerValue?.title === "Oracle TO Postgres") {
      //   val = 1;
      // } else if (headerValue?.title === "SQLServer TO Postgres") {
      //   val = 2;
      // } else if (headerValue?.title === "MYSQL TO Postgres") {
      //   val = 3;
      // }
    }

    let formData = {
      ...formValues,
      Migration_TypeId: headerValue?.title, //props.headerValue?.code,
      Object_Type: obj_type,
      // 'Source_Attachment': source_att,
      // "Conversion_Attachment": target_att,
      // "Target_Attachment": conver_att
      Source_FeatureDescription: "",
      Source_Code: "",
      Conversion_Code: "",
      Target_FeatureDescription: "",
      Target_Expected_Output: "",
      Target_ActualCode: "",
    };
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    axios.post(`${config.API_BASE_URL()}/api/fcreate`, form, conf).then(
      (res) => {
        // setCreatedata(res)
        console.log("createdata", res);
        setNotify({
          isOpen: true,
          message: "Feature Created Successfully",
          type: "success",
        });
        dispatach(Menuaction.EditPreviewFeature({ data: res.data }));
        // let UpdateItem = {
        //   Label: ITEMlIST[0]?.Label,
        //   subMenu: ITEMlIST[0]?.subMenu.concat({ Feature_Id: res.data?.Feature_Id, Feature_Name: res.data?.Feature_Name })
        // }
        // dispatach(Menuaction.UpdateMenutlist(UpdateItem))

        history.push("/EditFeature");
      },
      (error) => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: "Something Went Wrong Please Try Again!",
          type: "error",
        });
      }
    );
    // .then(()=>{
    //     if (createdata.length > 0) {
    //         history.push({
    //             pathname: `/edit/${createdata.data.Feature_Id}`,
    //             data: { createdata },

    //         })

    //     }
    // })

    dispatach(Menuaction.reloadAction(true));
  };

  //Pop up window
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleChange = (e) => {
    setformvalues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
    // console.log("fn list", fnlist);
    if (e.target.name === "Feature_Name") {
      if (fnlist.length > 0) {
        // let fnvalue = fnlist.Feature_Name.substr(5)
        for (var counter = 0; counter < fnlist.length; counter++) {
          let val_mod = String(fnlist[counter].Feature_Name).substr(5);
          if (e.target.value === "") {
            setFeaturenamemsg("Please Enter feature Name");
            break;
          } else if (val_mod === e.target.value) {
            setFeaturenamemsg("Feature Already Exist!");
            break;
          } else if (val_mod !== e.target.value) {
            setFeaturenamemsg("Feature Avaialable to Create");
          }
        }
      } else {
        setFeaturenamemsg("Feature Avaialable to Create");
      }
    }
  };

  const handleEditchangetext = (e) => {
     if(e.target.name==="Sequence"){

     
    setEdithandle({
      ...edithandle,
      Sequence:e.target.value
    })}
    setformvalues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handlechangedropdownlevel = (v) => {
    setformvalues({
      ...formValues,
      Level: v?.title,
    });
  };

  // const handledes = (data) => {
  //   setformvalues({
  //     ...formValues,
  //     Source_FeatureDescription: data,
  //   });
  // };
  // const handletarget = (data) => {
  //   setformvalues({
  //     ...formValues,
  //     Target_FeatureDescription: data,
  //   });
  // };

  const handleEditmodal = (featuredata) => {
    // console.log(featuredata)

    let formData = {
      ...formValues,
      Migration_TypeId: featuredata.Migration_TypeId,
      Object_Type: featuredata.Object_Type,
      Feature_Name: String(featuredata.Feature_Name).substr(5),
      // Source_FeatureDescription, Target_FeatureDescription,
      // "Sequence": '',
      "Source_FeatureDescription": featuredata.Source_FeatureDescription,
      "Target_FeatureDescription": featuredata.Target_FeatureDescription,
      "Target_Expected_Output": featuredata.Target_Expected_Output,
      "Target_ActualCode": featuredata.Target_ActualCode,
      "Source_Code": featuredata.Source_Code,
      "Conversion_Code": featuredata.Conversion_Code,
      // "Keywords":,
      // "Estimations":'',
    }
    const form = new FormData();
    Object.keys(formData).forEach((key) => {

      form.append(key, formData[key]);

    });
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    axios.put(`${config.API_BASE_URL()}/api/fupdate/${featuredata.Feature_Id}`, form, conf)
      .then(res => {
        setNotify({
          isOpen: true,
          message: 'Feature Updated Successfully',
          type: 'success'
        })
        setModalupdate(true)
        setOpen(false)
      }, error => {
        console.log(error);
        setNotify({
          isOpen: true,
          message: 'Something Went Wrong! Please try Again',
          type: 'error'
        })
        setModalupdate(true)
        // setOpen(false)
      })
    setModalupdate(false)
    // setOpen(false);
  }
  const handleEditchange = (Feature_Id) => {
    
    // setFid(Feature_Id);
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };
    axios
      .get(`${config.API_BASE_URL()}/api/fdetail/${Feature_Id}`, conf)
      .then(
        (res) => {
          console.log(res);
          setEdithandle(res.data)
          setOpen(true);
        },
        (error) => {
          console.log(error);
        }
      );
      
  }


  return (
    <>
      <Box py={4}>
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Typography variant="h6">{obj_type} - Create Feature</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* <form autoComplete="off"> */}
      <Grid container direction="row" spacing={4}>
        <Grid item xs={12} sm={3} md={3} xl={3}>
          <TextField
            id="outlined-multiline-static"
            // label="Migration Type"
            multiline
            rows={1}
            onChange={(e) => handleChange(e)}
            label="Migration Type"
            defaultValue="Default Value"
            value={headerValue?.title}
            variant="outlined"
            required
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3} xl={3}>
          <TextField
            id="outlined-multiline-static"
            name="Object_Type"
            fullWidth
            label="Object Type"
            multiline
            rows={1}
            onChange={(e) => handleChange(e)}
            defaultValue="Default Value"
            value={obj_type}
            variant="outlined"
            required
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            // fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3} xl={3}>
          <TextField
            id="outlined-multiline-static"
            label="Feature Name"
            multiline
            rows={1}
            onChange={(e) => handleChange(e)}
            name="Feature_Name"
            // defaultValue="Default Value"
            helperText={featurenamemsg}
            className={classes.textField}
            // helperText="Some important text"
            variant="outlined"
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3} xl={3}>
          <Autocomplete
            fullWidth
            id="grouped-demo"
            options={[{ title: "Programlevel" }, { title: "Statementlevel" }]}
            groupBy={""}
            // defaultValue={{ title: 'Programlevel' }}
            getOptionLabel={(option) => option?.title}
            name="Level"
            onChange={(e, v) => handlechangedropdownlevel(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Level"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            )}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3} xl={3}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Predecessor</InputLabel>
            <Select
              native
              // value={state.age}
              onChange={handleChange}
              label="Predecessor"
              name="Sequence"
              required
              InputLabelProps={{
                shrink: true,
              }}
            >
              {" "}
              <option value="Select Predecessor" selected>
                Select Predecessor
              </option>
              <option value="No Predecessor">No Predecessor</option>
              {prerunval.map((item, ind) => {
                return (
                  <option value={item.Feature_Name}>
                    {item.Feature_Name.substr(5)}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={6} xl={6}>
          <TextField
            id="outlined-multiline-static"
            label="Keywords"
            multiline
            rows={1}
            onChange={(e) => handleChange(e)}
            name="Keywords"
            // defaultValue="Default Value"
            // helperText={featurenamemsg}
            className={classes.textField}
            // helperText="Some important text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            // multiline
          />
        </Grid>

        <Grid item xs={12} sm={3} md={3} xl={3}>
          <TextField
            id="outlined-multiline-static"
            label="Estimation"
            multiline
            rows={1}
            onChange={(e) => handleChange(e)}
            name="Estimations"
            // defaultValue="Default Value"
            // helperText={featurenamemsg}
            className={classes.textField}
            // helperText="Some important text"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            // multiline
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={1} md={1} xl={1}>
          <Button
            size="small"
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            // className={classes.submit}
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
            style={{ marginTop: 12, marginLeft: 450 }}
          >
            Save
          </Button>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
      {/* <Box py={5}>

                <Grid container direction='row ' justifyContent='center' spacing={2}>


                    <Grid item>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            onClick={handleSubmit}
                            startIcon={<SaveIcon />}

                        >
                            Save
                        </Button>
                    </Grid>


                </Grid>
            </Box> */}

      <Grid container xl={12} justifyContent="space-between" spacing={3}>
        <Grid item xl={12} xs={12} sm={12} md={12}>
          <Typography
            gutterBottom
            align="center"
            variant="h6"
            component="h2"
            className={classes.Object_Type}
          >
            Features List
          </Typography>
          <Table className={classestable.table} aria-label="customized table">
            <TableHead className={classes.primary}>
              <TableRow>
                <StyledTableCell align="center">Feature Name</StyledTableCell>
                <StyledTableCell align="center">Predecessor</StyledTableCell>
                <StyledTableCell align="center">Keywords</StyledTableCell>
                <StyledTableCell align="center">Estimation</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {istdata && tableinfo.length > 0 ? (
                <>
                  {tableinfo.map((row) => (

                    <StyledTableRow container>
                      <StyledTableCell item xl={10} align="center">
                        <div className={classes.texttablecell}>
                          {row.Feature_Name.substr(5)}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell item xl={10} align="center">
                        <div className={classes.texttablecell}>
                          {row.Sequence === 'No Predecessor' ? row.Sequence : row.Sequence.substr(5)}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell item xl={10} align="center">
                        <div className={classes.texttablecell}>
                          {row.Keywords}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell item xl={10} align="center">
                        <div className={classes.texttablecell}>
                          {row.Estimations}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell item xl={10} align="center">
                        {/* <div className={classes.texttablecell}>
                                                    <IconButton onClick={(e) => { handleEditmodal() }}>
                                                        <EditSharpIcon style={{ color: 'blue' }} />
                                                    </IconButton>
                                                </div> */}

                        <Tooltip
                          title="Edit"
                          aria-label="Edit"
                          onClick={() => handleEditchange(row.Feature_Id)}
                        >
                          <EditSharpIcon style={{ color: "blue" }} />
                        </Tooltip>

                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              ) : (
                <>
                  <StyledTableRow container>
                    <StyledTableCell
                      item
                      xl={10}
                      align="center"
                    ></StyledTableCell>
                    <StyledTableCell
                      item
                      xl={10}
                      align="center"
                    ></StyledTableCell>
                    <StyledTableCell item xl={10} align="center">
                      No Data Found
                    </StyledTableCell>
                    <StyledTableCell
                      item
                      xl={10}
                      align="center"
                    ></StyledTableCell>
                    <StyledTableCell
                      item
                      xl={10}
                      align="center"
                    ></StyledTableCell>
                  </StyledTableRow>
                </>
              )}
            </TableBody>
          </Table>
        </Grid>


        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          {/* <Alert onClose={handleClose} severity="success">
            Data is updated successfully!
          </Alert> */}
        </Snackbar>
        <Modal open={open}>
          <Container className={classes.container}>
            <Typography
              gutterBottom
              align="center"
              variant="h6"
              component="h2"
              className={classes.Object_Type}
            >
              Edit Feature
            </Typography>
            {/* <form className={classes.form} autoComplete="off"> */}
            <div className={classes.item}>

              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel>Predecessor</InputLabel>
                <Select
                  native
                  value={edithandle.Sequence||''}
                  onChange={(e) => handleEditchangetext(e)}
                  label="Predecessor"
                  name="Sequence"
                  defaultValue={edithandle.Sequence}
                  required

                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {" "}
                  {/* <option value="Select Predecessor">Select Predecessor</option> */}
                  <option value="No Predecessor">No Predecessor</option>
                  {prerunval.map((item, ind) => {
                    return (
                      <option value={item.Feature_Name}>
                        {item.Feature_Name.substr(5)}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                label="Keywords"
                style={{ width: 400, }}
                multiline
                rows={1}
                // value ={row.Keywords}
                onChange={(e) => handleEditchangetext(e)}
                name="Keywords"
                defaultValue={edithandle.Keywords}
                // helperText={featurenamemsg}
                // value={edithandle.Keywords}
                className={classes.textField}
                // helperText="Some important text"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div className={classes.item}>
              <TextField
                id="outlined-multiline-static"
                label="Estimation"
                rows={1}
                // value = {row.Estimations}
                onChange={(e) => handleEditchangetext(e)}
                name="Estimations"
                defaultValue={edithandle.Estimations}
                // value={edithandle.Estimations}
                // helperText={featurenamemsg}
                className={classes.textField}
                // helperText="Some important text"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                multiline
                fullWidth
              />
            </div>

            <div className={classes.item} >
              <Button
                variant="outlined"
                color="primary"
                style={{ marginRight: 20, marginLeft: 100 }}
                onClick={() => handleEditmodal(edithandle)}
              >
                Update
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
    </>
  );
}
