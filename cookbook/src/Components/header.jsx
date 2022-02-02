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
  },

  drawer: {
    flexShrink: 0,
    background: "#3f51b5",
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
      background: "#3f51b5",
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
    // marginLeft:"0.5px",
    // marginRight: "-1px",


  },

  inputRoot: {
    color: "white",
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
  const { updatedValue } = useSelector(state => state.dashboardReducer);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openview = Boolean(anchorEl);
  const [menuList, setmenuList] = React.useState([]);
  const [dropdown, setdropdown] = React.useState({
    name: "Oracle To Postgres",
  });
  // const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
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
    const res = await axios.get(`${config.API_BASE_URL()}/fol/${value}`,conf);
    setmenuList(res.data);
    dispatch(Menuaction.reloadAction(false))
  };

  React.useEffect(() => {
    getmenus(1);
  }, []);

  const handleversion = (v) => {
    getmenus(v.code);
    setdropdown(v);
    console.log(v)
    dispatch(ActionMenu.dropdown(v));
  };

  const deleteitem = async (data) => {

    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    setConfirmDialog({
      confirmDialog,
      isOpen: false
    })

    const res = await axios.delete(`${config.API_BASE_URL()}/delete/${data.Feature_Id}`,conf);
    getmenus(1);


    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    });
    // dispatch(Menuaction.reloadAction(true))
    dispatch(ActionMenu.ActionMenu(null));
    // history.push("/dashboard");
  };


  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `template.py`;
    link.href = "./Files/template.py";
    link.click();
  };

  React.useEffect(() => {
    if (updatedValue) {
      getmenus(1);
    }
  }, [updatedValue])
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
              xm={12} sm={6} md={4} lg={4}
            // style={{ paddingRight: "1rem" }} 
            >
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                className={classes.inputRoot}
                options={[
                  { title: "Oracle To Postgres", code: 1 },
                  { title: "Oracle TO SQLServer", code: 2 },
                  { title: "Oracle To MYSQL", code: 3 },
                ]}
                groupBy={""}
                defaultValue={{ title: "Oracle To Postgres" }}
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
            <Grid item xm={12} sm={5} md={4} lg={4}>
              <StyledAutocomplete
                size="small"
                id="grouped-demo"
                options={[
                  { title: "v1", code: 1 },
                  { title: "v2", code: 2 },
                  { title: "v3", code: 3 },
                ]}
                className={classes.inputRoot}
                groupBy={""}
                getOptionLabel={(option) => option.title}
                defaultValue={{ title: "v1", code: 1 }}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Migration Type  Versions"
                    variant="outlined"
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle,
                    }}
                  />
                )}
              />
            </Grid>


            {auth && (
              <Grid item xm={6} sm={1} md={1} lg={1} className={classes.logoutbtn}>
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
              <Typography
                variant="body2"
                style={{ color: "white", paddingTop: 0, paddingLeft: 45 }}
              >
                Database Objects
              </Typography>
              <Typography

                style={{ color: "white", paddingTop: 10, paddingLeft: 35 }}
              >



              </Typography>

              <Divider />
              <Box py={1}>
                <GmailTreeView
                  menuList={menuList}
                  dropdown={dropdown}
                  deleteitem={deleteitem}
                  confirmDialog ={confirmDialog}
                  setConfirmDialog={setConfirmDialog}
                />
              </Box>
              <Box py={1}>
                <Button
                  style={{ color: 'white', marginLeft: 40, textTransform: 'unset' }}
                  startIcon={<GetAppIcon />}
                  onClick={onDownload}
                  className={classes.downloadbutton}
                >
                  Python Template
                </Button>
              </Box>
            </div>

          </Drawer>

        </Grid>

        <Grid item >
          <main
            className={classes.content}
          >
            <Toolbar />
            {children}
          </main>
        </Grid>

      </Grid>
      {/* <Footer /> */}
      <Notification
        notify={notify}
        setNotify={setNotify}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
}
