import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from "react-redux";
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
import MenuItem from '@material-ui/core/MenuItem';


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
        // overflowX: 'hidden',
        whiteSpace: "nowrap",
        width: "140px",
        // overflow: "hidden",
        // textOverflow: "ellipsis",
        '&:hover': {
            overflow: 'visible'
        }
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


export default function UseradminFunction() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const classestable = useStylestable();
    const [isData, setIsData] = useState(true);
    const [age, setAge] = React.useState('');
    const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue, project_version, DropDownValues } = useSelector(state => state.dashboardReducer);
    const [selecetd1, setSelected1] = useState(false)
    // const [openAlert1, setOpenAlert1] = useState(false);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const [userslist, setUserslist] = useState([])
    const [superadminlist, setsuperadminlist] = useState([])
    const [useremail, setuseremail] = useState()
    const [updateSuperAdminTable, setUpdateSuperAdminTable] = useState(false)
    const [updatermSuperAdminTable, setUpdatermSuperAdminTable] = useState(false)
    // const [cnfmvalues, setcnfmvalues] = useState(['orcale to postgres','db to postgres'])


    let history = useHistory();


    useEffect(() => {
        let conf = {
            headers: {
                Authorization: "Bearer " + config.ACCESS_TOKEN(),
            },
        };
        axios.get(`${config.API_BASE_URL()}/api/superuserlist/`, conf).then(
            (res) => {
                setsuperadminlist(res.data)
            },
            (error) => {
                console.log(error);
            }
        );
    }, [updateSuperAdminTable, updatermSuperAdminTable]);

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

    const handlesuperadmincreation = () => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        let body = {
            "email": useremail,
        }; const form = new FormData();
        Object.keys(body).forEach((key) => {
            form.append(key, body[key]);
        });
        axios.post(`${config.API_BASE_URL()}/api/createsuperadmin/`, form, conf).then(
            (res) => {
                setNotify({
                    isOpen: true,
                    message: "super admin created successfully",
                    type: "success",
                });
                // setOpen(false)
                // dispatch(Menuaction.reloadAction(true));
                setUpdateSuperAdminTable(true)

            },
            (error) => {
                console.log(error.response.data);
            }
        );
        setUpdateSuperAdminTable(false)
    }

    const handleuseremail = (v) => {
        // setSelected1(true)
        setuseremail(v?.email)
    }

    // const handleconfirm = (event) => {
    //     setcnfmvalues(event.target.value);
    // };

    return (
        <>
            <Box py={1} px={1}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            User Lobby
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box py={2} px={2}>
                <Grid container direction='row' justifyContent='center' spacing={1}>
                    <Grid item >
                        <StyledAutocomplete
                            size="small"
                            id="grouped-demo"
                            className={classes.inputRoottype}
                            options={userslist}
                            groupBy={""}
                            getOptionLabel={(option) => option.email}
                            style={{ width: 300, marginLeft: 40 }}
                            onChange={(e, v) => handleuseremail(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="username/email"
                                    variant="outlined"
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle,
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item >
                        <StyledAutocomplete
                            size="small"
                            id="grouped-demo"
                            // multiple
                            className={classes.inputRoottype}
                            options={DropDownValues}
                            groupBy={""}
                            defaultValue={{ title: DropDownValues[0]?.title }}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300,marginLeft: 100 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="MigrationTypes"
                                    variant="outlined"
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle,
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid>
                        <Button
                            variant="contained"
                            // disabled={!selecetd1}
                            color="primary"
                            component="span"
                            style={{ marginTop: 5, marginLeft: 120 }}
                        // onClick={() => handlesuperadmincreation()}
                        >
                            {" "}
                            Add Migration
                        </Button>
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
                            Lobby List
                        </Typography>
                        <Table className={classestable.table} aria-label="customized table">
                            <TableHead className={classes.primary}>
                                <TableRow>
                                    <StyledTableCell align="left">User Email</StyledTableCell>
                                    <StyledTableCell align="left">Migration Type</StyledTableCell>
                                    <StyledTableCell align="left">Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow container>
                                    <StyledTableCell item xl={8}>
                                        <div className={classes.texttablecell}>
                                            {"quadrant"}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell item xl={8}>
                                        <div className={classes.texttablecell}>
                                            {"Oracle to POstgres"}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell item xl={8}>
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                        // onClick={() => handledeletesuperadmin(item.Email)}
                                        >
                                            Confirm
                                        </Button>
                                        {" "}
                                        <Button
                                            type="button"
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            style={{ marginTop: '9px', fontSize: '9px', marginBottom: '8px' }}
                                        // onClick={() => handledeletesuperadmin(item.Email)}
                                        >
                                            Deny
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </Grid>

                </Grid>
            </Box>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    )
}