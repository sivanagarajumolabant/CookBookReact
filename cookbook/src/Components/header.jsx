import React from "react";
import clsx from "clsx";
import config from '../../src/Config/config'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Button from '@material-ui/core/Button';
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Notification from '../Features/Notifications/Notification'
import ConfirmDialog from "../Features/Notifications/ConfirmDialog";
import Menuaction from '../Redux/actions/Menuaction';


import {
  Box,
  Grid,
  Menu,
  MenuItem,
  styled,
  TextField,
} from "@material-ui/core";
import GmailTreeView from "../Components/Treeview";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import API_BASE_URL from "../Config/config";
import ActionMenu from "../../src/Redux/actions/Menuaction";
import { useDispatch, useSelector } from "react-redux";
import DehazeSharpIcon from '@material-ui/icons/DehazeSharp';
import { useState } from "react";
// import config from "../../src/Config/config";

const drawerWidth = 375;

const useStyles = makeStyles((theme) => ({
  downloadbutton: {
    position: 'fixed',
    bottom: 0
  },
  title: {
    marginLeft: 50,
    marginTop: 10
  },
  floatingLabelFocusStyle: {
    color: "white",
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "#3f51b5",
    boxShadow: 'none',
    border: '1px solid #004280'

  },

  drawer: {
    flexShrink: 0,
    background: "#3f51b5",
  },

  // style={{  }}
  navbarcom: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: "200px"
      // height:'100vh'
    },
  },

  drawerPaper: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 150,
      width: drawerWidth,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 95,
      width: drawerWidth,
      position: "relative"
    },
    [theme.breakpoints.up('md')]: {
      marginTop: 20,
      width: 240,
      background: "#3f51b5",
    },
    [theme.breakpoints.up('lg')]: {
      width: 240,
      marginTop: 10,
      background: "#3f51b5",
      // height:'100vh'
    },



  },
  drawerContainer: {
    overflow: "auto",
    height: '80vh',
    background: "#3f51b5",

  },
  content: {
    [theme.breakpoints.down('xs')]: {
      display: "block",
      padding: 40,
      width: drawerWidth,
      padding: theme.spacing(1),

    },
    [theme.breakpoints.down('sm')]: {
      padding: 40,
      width: drawerWidth,

      padding: theme.spacing(1),

    },
    [theme.breakpoints.up('md')]: {

    },
    [theme.breakpoints.up('lg')]: {
      flexGrow: 1,
      marginLeft: 260,
      padding: theme.spacing(1),
      width: "78%",
    },


  },
  notchedOutline: {
    borderWidth: "1px",
    borderColor: "yellow !important",
  },

  logoutbtn: {
    // marginLeft:"8px",

    // marginRight: "-1px",
    [theme.breakpoints.down('xs')]: {
      right: 100,
      position: 'fixed',

      // padding: theme.spacing(1),

    },
    [theme.breakpoints.down('sm')]: {

      padding: theme.spacing(1),

    },
    [theme.breakpoints.up('md')]: {

    },
    [theme.breakpoints.up('lg')]: {
      right: 0,
      position: 'fixed',
    },

  },

  inputRoottype: {
    color: "white",
    // width: '40px',
    marginTop: 5,
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },

  inputRootversion: {
    color: "white",
    // width: '40px',
    marginTop: 5,
    marginLeft: 10,
    // border:'none',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },


  }
}));

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 20px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      // height: '1rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
});

const StyledAutocompletesidebar = styled(Autocomplete)({
  "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
    // Default transform is "translate(14px, 20px) scale(1)""
    // This lines up the label with the initial cursor position in the input
    // after changing its padding-left.
    transform: "translate(34px, 13px) scale(1);",
  },
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      // Default left padding is 6px
      paddingLeft: 26,
      height: '0.3rem'
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
  },
});

export default function ClippedDrawer({ children }) {
  const classes = useStyles();
  const [opens, setOpens] = useState(false);
  //   const classes = useStyles();
  const theme = useTheme();

  const [isOpened, setIsOpened] = React.useState(true);
  const { updatedValue, headerValue } = useSelector(state => state.dashboardReducer);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openview = Boolean(anchorEl);
  const [menuList, setmenuList] = React.useState([]);
  const [dropdown, setdropdown] = React.useState({
    name: "Oracle TO Postgres",
  });
  const [selectedItems, setselectedItems] = React.useState([])
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    //  localStorage.clear()
    //  history.push('/')
  };

  const handleroute = () => {
    setAnchorEl(null);
    localStorage.clear();
    history.push("/");
  };
  const getmenus = async (value) => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    const res = await axios.get(`${config.API_BASE_URL()}/api/miglevelobjects/${value}`, conf);
    setmenuList(res.data);
    dispatch(Menuaction.reloadAction(false))
  };

  React.useEffect(() => {
    getmenus(1);
  }, []);

  const handleversion = (v) => {
    getmenus(v.code);
    setselectedItems([])
  
    setdropdown(v);
    console.log(v)
    dispatch(ActionMenu.dropdown(v));
  };

  // const deleteitem = async (data) => {

  //   let conf = {
  //     headers: {
  //       'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
  //     }
  //   }
  //   setConfirmDialog({
  //     confirmDialog,
  //     isOpen: false
  //   })

  //   const res = await axios.delete(`${config.API_BASE_URL()}/api/fdelete/${data.Feature_Id}`, conf);
  //   getmenus(1);


  //   setNotify({
  //     isOpen: true,
  //     message: 'Deleted Successfully',
  //     type: 'error'
  //   });
  //   // dispatch(Menuaction.reloadAction(true))
  //   dispatch(ActionMenu.ActionMenu(null));
  //   // history.push("/dashboard");
  // };


  const onDownload1 = () => {
    const link = document.createElement("a");
    link.download = `template.py`;
    link.href = "./Files/template.py";
    link.click();
  };
  const onDownload2 = () => {
    const link = document.createElement("a");
    link.download = `Instructions.pdf`;
    link.href = "./Files/Instructions.pdf";
    link.click();
  };

  React.useEffect(() => {
    if (updatedValue) {
      getmenus(headerValue.code || 1);
    }
  }, [updatedValue])

  const handlefeature = (data) => {

    setselectedItems([data])
  }

   const handleAdminMenus=()=>{
     history.push('/AdminAccesslist')
   }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" container className={classes.appBar}>
        <Toolbar container>
          <Grid
            container
            // direction="row"

            spacing={2}
          // style={{ paddingLeft: "3rem" }}
          >
            <Grid item
              xm={12} sm={12} md={3} lg={3}
              onClick={() => history.push("/dashboard")}>
              <Typography variant="h6" className={classes.title}>
                Cookbook
              </Typography>
            </Grid>

            <Grid item
              xm={12} sm={6} md={5} lg={5}
              className={classes.navbarcom}
            >
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoottype}
                options={[
                  { title: "Oracle TO Postgres", code: 1 },
                  { title: "SQLServer TO Postgres", code: 2 },
                  { title: "MYSQL TO Postgres", code: 3 },
                ]}
                groupBy={""}
                defaultValue={{ title: "Oracle TO Postgres" }}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                onChange={(e, v) => handleversion(v)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="MigrationTypes"
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xm={12} sm={5} md={1} lg={1}>
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                options={[
                  { title: "v1", code: 1 },
                  { title: "v2", code: 2 },
                  { title: "v3", code: 3 },
                ]}
                className={classes.inputRootversion}
                groupBy={""}
                // defaultValue={{ title: "Oracle To Postgres" }}
                getOptionLabel={(option) => option.title}
                defaultValue={{ title: "v1", code: 1 }}
                style={{ width: 110 }}

                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Versions"
                    variant="outlined"
                    // borderColor = 'text.primary'
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                    }}



                  />
                )}
              />
            </Grid>


            {auth && (
              <Grid item xs={6} sm={1} md={1} lg={1} className={classes.logoutbtn}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={openview}
                  onClose={handleClose}
                >
                  <MenuItem

                    onClick={handleroute}>Logout</MenuItem>
                </Menu>
              </Grid>
            )}
            {/* <Grid item xm={6} sm={6} md={6} lg={1}>
            <IconButton 
            color="inherit"
            onClick={() => setOpens(true)}>
            
              <DehazeSharpIcon/>
            </IconButton>
          </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>


      {/* Side bar */}

      <Grid container>
        <Grid item>
          <Drawer
            open={opens} onClose={() => setOpens(false)}
            // className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >

            <Toolbar />



            <div className={classes.drawerContainer}>
              {/* <Typography
                variant="body2"
                style={{ color: "white", marginBottom: 10, paddingTop: 0, paddingLeft: 60, marginTop: 0, justifyContent: 'center' }}
              >
                Database Objects
              </Typography> */}
              {/* <Typography

                style={{ color: "white", paddingTop: 10, paddingLeft: 35 }}
              >



              </Typography> */}

              {/* <Divider /> */}

              <Typography
                variant="body2"
                style={{ color: "white", marginBottom: 10, paddingTop: 0, paddingLeft: 60, marginTop: 0, justifyContent: 'center' , cursor:'pointer'}}

                 onClick={handleAdminMenus}
              >
            Admin Menus
              </Typography>
              
              <Divider />
              <Box py={1}>

                {/* old code start */}
                {/* <GmailTreeView
                      menuList={menuList}
                      dropdown={dropdown}
                    // deleteitem={deleteitem}
                    // confirmDialog={confirmDialog}
                    // setConfirmDialog={setConfirmDialog}
                    /> */}
                {/* old code end */}

                {/* new code start */}
                <Grid container direction="column" spacing={0}>
                  <Grid item>

                    <StyledAutocompletesidebar
                      size="medium"
                      id="grouped-demo"
                      className={classes.inputRoottype}
                      options={menuList}
                      groupBy={""}
                      // defaultValue={{ title: "Oracle To Postgres" }}
                      getOptionLabel={(option) => option.Label}
                      style={{ width: 230, height:50 }}
                      onChange={(e, v) => handlefeature(v)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Migration Objects"
                          variant="outlined"
                          InputLabelProps={{
                            className: classes.floatingLabelFocusStyle,
                          }}
                        />
                      )}
                    />
                  </Grid>


                  <Grid item spacing={1}>

                    <GmailTreeView
                      menuList={selectedItems}
                      dropdown={dropdown}

                    />
                  </Grid>

                </Grid>
                {/* new code end */}
              </Box>
              <Box py={1}>
                <Button
                  style={{ color: 'white', marginLeft: '10px', textTransform: 'unset' }}
                  startIcon={<GetAppIcon />}
                  onClick={onDownload1}
                  className={classes.downloadbutton}
                >
                  Template
                </Button>
                <Button
                  style={{ color: 'white', marginLeft: '120px', textTransform: 'unset' }}
                  startIcon={<GetAppIcon />}
                  onClick={onDownload2}
                  className={classes.downloadbutton}
                >
                  Document
                </Button>
              </Box>
            </div>

          </Drawer>

        </Grid>

        <Grid item  xs={12}>
          <main
            className={classes.content}
          >
            <Toolbar />
            {children}
          </main>
        </Grid>

      </Grid>
      {/* <Footer /> */}
      {/* <Notification
        notify={notify}
        setNotify={setNotify}
      /> */}
      {/* <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      /> */}
    </div>
  );
}
