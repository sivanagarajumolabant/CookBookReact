import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import InputLabel from '@material-ui/core/InputLabel';
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuAppBar from '../../Components/header'
import { Box, Grid, Typography, styled } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import { useDispatch, useSelector } from 'react-redux';
import Menuaction from '../../Redux/actions/Menuaction';
import Notification from '../Notifications/Notification';
import API_BASE_URL from '../../Config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import config from '../../Config/config';
// import Font from '@ckeditor/ckeditor5-font/src/font';


const useStyles = makeStyles((theme) => ({
    table: {
        // minWidth: 150,
        width: '60%',
        height: '10%',
        border: '1px black'
    }, formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
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
    textField: {

        '& p': {
            color: 'red',
        },
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


export default function CreateFeature(props) {
    var obj_type = props.details?.data?.Label
    if (obj_type === 'Indexes') {
        obj_type = obj_type.slice(0, -2);
    } else {
        obj_type = obj_type.slice(0, -1);
    }
    const [prerunval, setPrerunval] = useState([]);
    const classes = useStyles();
    // const [featureslist, setFeatureslist] = useState(["ex1", "Sample"])
    const history = useHistory();
    const [formValues, setformvalues] = useState({ Migration_TypeId: props.details?.data?.type, Object_Type: props.details?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})
    const { headerValue } = useSelector(state => state.dashboardReducer);

    const [drop, setDrop] = useState("Source Attachments");
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [createdata, setCreatedata] = useState([])
    const [fnlist, setFnlist] = useState([])
    const [featurenamemsg, setFeaturenamemsg] = useState();
    // const [migtypeid, setMigtypeid] = useState()

    // const [seq, setSeq]=useState({})
    let sval = 0;
    if (headerValue) {
        if (headerValue.title === 'Oracle To Postgres') {
            sval = 1
        }
        else if (headerValue.title === 'Oracle TO SQLServer') {

            sval = 2
        }
        else if (headerValue.title === 'Oracle To MYSQL') {

            sval = 3
        }
    }



    useEffect(() => {
        let body = {
            "Object_Type": obj_type,
            "Migration_TypeId": sval
        }
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
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
    }, [obj_type, headerValue.title]);

    useEffect(() => {

    }, [formValues]);


    useEffect(() => {
        let body = {
            "Object_Type": obj_type,
            "Migration_TypeId": sval
        }
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.post(`${config.API_BASE_URL()}/api/fnlist`, body, conf).then(
            (res) => {
                setFnlist(res.data);
            },
            (error) => {
                console.log(error);
            }
        );
    }, [formValues])



    const dispatach = useDispatch()
    // console.log(props.location.state?.data?.type)

     console.log( props.details?.data)

    const handleSubmit = (e) => {
        let typeval = props.details?.data?.type
        
        let val;
        e.preventDefault();
        if (headerValue) {
            // debugger
            if (headerValue.title === 'Oracle To Postgres') {
                val = 1
            }
            else if (headerValue.title === 'Oracle TO SQLServer') {

                val = 2
            }
            else if (headerValue.title === 'Oracle To MYSQL') {

                val = 3
            }
        }

        let formData = {
            ...formValues,
            Migration_TypeId:  val,//props.headerValue?.code,
            Object_Type: obj_type,
            // 'Source_Attachment': source_att,
            // "Conversion_Attachment": target_att,
            // "Target_Attachment": conver_att
            "Source_FeatureDescription": '',
            "Source_Code": "",
            "Conversion_Code": "",
            "Target_FeatureDescription": "",
            "Target_Expected_Output": "",
            "Target_ActualCode": ""
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

        axios.post(`${config.API_BASE_URL()}/api/fcreate`, form, conf)
            .then(res => {
                // setCreatedata(res)
                console.log("createdata",res)
                setNotify({
                    isOpen: true,
                    message: 'Feature Created Successfully',
                    type: 'success'
                })
                dispatach(Menuaction.EditPreviewFeature({ data: res.data }))
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong Please Try Again!',
                    type: 'error'
                })
            })
        // .then(()=>{
        //     if (createdata.length > 0) {
        //         history.push({
        //             pathname: `/edit/${createdata.data.Feature_Id}`,
        //             data: { createdata },

        //         })

        //     }
        // })

        dispatach(Menuaction.reloadAction(true))
       

      
    }



    const handleChange = (e) => {
        setformvalues({
            ...formValues,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'Feature_Name') {
            if (fnlist.length > 0) {
                // let fnvalue = fnlist.Feature_Name.substr(5)
                for (var counter = 0; counter < fnlist.length; counter++) {
                    let val_mod = String(fnlist[counter].Feature_Name).substr(5)
                    if (e.target.value === '') {
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
    }

    const handlechangedropdown = (v) => {
        setformvalues({
            ...formValues,
            "Migration_TypeId": v.title
        })


    }

    const handlechangedropdownlevel = (v) => {
        setformvalues({
            ...formValues,
            "Level": v.title
        })


    }


    const handledes = (data) => {
        setformvalues({
            ...formValues,
            "Source_FeatureDescription": data
        })


    }
    const handletarget = (data) => {
        setformvalues({
            ...formValues,
            "Target_FeatureDescription": data
        })


    }


    return (

        <>
            <Box py={4}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            {obj_type} - Create Feature
                        </Typography>
                    </Grid>

                </Grid>
            </Box>

            {/* <form autoComplete="off"> */}
            <Grid container direction='row' spacing={4}>

                <Grid item xs={12} sm={6} md={6} xl={6}>
                    

                    <TextField
                        id="outlined-multiline-static"
                        label="Migration Type"
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
                <Grid item xs={12} sm={6} md={6} xl={6}>
                   

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
                        fullWidth
                    />

                </Grid>




                <Grid item xs={12} sm={4} md={4} xl={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Feature Name"
                        multiline
                        rows={1}
                        onChange={(e) => handleChange(e)}
                        name='Feature_Name'
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

                <Grid item xs={12} sm={4} md={4} xl={4}>
                    <Autocomplete
                        fullWidth
                        id="grouped-demo"
                        options={[
                            { title: "Programlevel" },
                            { title: "Statementlevel" },

                        ]}
                        groupBy={""}
                        // defaultValue={{ title: 'Programlevel' }}
                        getOptionLabel={(option) => option.title}
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
                <Grid item xs={12} sm={4} md={4} xl={4}>

                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel >Predecessor</InputLabel>
                        <Select
                            native
                            // value={state.age}
                            onChange={handleChange}
                            label="Predecessor"
                            name='Sequence'
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        >   <option value="Select Predecessor" selected>Select Predecessor</option>
                            <option value="No Predecessor" >No Predecessor</option>
                            {prerunval.map((item, ind) => {
                                return <option value={item.Feature_Name}>{item.Feature_Name.substr(5)}</option>
                            })}

                        </Select>
                    </FormControl>



                </Grid>





            </Grid>

            




            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Box py={5}>

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
            </Box>
           



        </ >
    );
}
















// <Grid item xs={12} sm={12} md={12} xl={12}>


// {/* <TextField
//     id="outlined-multiline-static"
//     label="Target Description"

//     fullWidth
//     name='Target_FeatureDescription'
//     multiline
//     rows={15}
//     onChange={(e) => handleChange(e)}
//     // defaultValue="Default Value"
//     variant="outlined"
//     required
// /> */}
// <div className="App">
//     <h2>{"Target Description"}</h2>
//     <CKEditor
//         editor={ClassicEditor}
//         // data="<p>Hello from CKEditor 5!</p>"
//         onReady={editor => {
//             // You can store the "editor" and use when it is needed.
//             console.log('Editor is ready to use!', editor);
//         }}
//         onChange={(event, editor) => {
//             const data = editor.getData();
//             handletarget(data)
//             // console.log( { event, editor, data } );
//         }}
//         onBlur={(event, editor) => {
//             console.log('Blur.', editor);
//         }}
//         onFocus={(event, editor) => {
//             console.log('Focus.', editor);
//         }}
//     />
// </div>
// </Grid>

