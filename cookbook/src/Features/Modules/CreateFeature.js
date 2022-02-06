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

    const handleSubmit = (e) => {
        let typeval = props.details?.data?.type
        let val = 0
        e.preventDefault();
        if (typeval) {
            if (typeval === 'Oracle To Postgres') {
                val = 1
            }
            else if (typeval === 'Oracle TO SQLServer') {

                val = 2
            }
            else if (typeval === 'Oracle To MYSQL') {

                val = 3
            }
        }

        let formData = {
            ...formValues,
            Migration_TypeId: val,
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
                setNotify({
                    isOpen: true,
                    message: 'Feature Created Successfully',
                    type: 'success'
                })
                dispatach(Menuaction.EditPreviewFeature({data:res.data}))
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
                        setFeaturenamemsg("Feature Avaialable");

                    }
                }

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




    // const handleConvert = (e) => {
    //     e.preventDefault();

    //     let body = {
    //         "sourcecode": formValues.Source_Code,
    //         "convcode": "r@rawstringstart'" + formValues.Conversion_Code + "'@rawstringend",
    //         "featurename": formValues.Feature_Name,
    //         "migration_typeid": formValues.Migration_TypeId,
    //         "object_type": obj_type
    //     }
    //     let conf = {
    //         headers: {
    //             'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
    //         }
    //     }
    //     axios.post(`${config.API_BASE_URL()}/api/autoconv`, body, conf)
    //         .then(res => {
    //             // console.log("res",res.data)
    //             setformvalues({
    //                 ...formValues,
    //                 "Target_ActualCode": res.data
    //             })
    //             setNotify({
    //                 isOpen: true,
    //                 message: 'Conversion Completed Please Check The Output',
    //                 type: 'success'
    //             })
    //         }, error => {
    //             console.log(error);
    //             setNotify({
    //                 isOpen: true,
    //                 message: 'Something Went Wrong! Please try Again',
    //                 type: 'error'
    //             })
    //         })

    // }


    // console.log(prerunval,'pre')
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
                    {/* <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[
                                { title: "Oracle To Postgres" },
                                { title: "Oracle TO SQLServer" },
                                { title: "Oracle To MYSQL" },
                            ]}
                            groupBy={""}
                            defaultValue={{ title:props.details?.data?.type }}
                            getOptionLabel={(option) => option.title}
                            name="Migration_TypeId"
                            onChange={(e, v) => handlechangedropdown(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Migration Type"
                                    variant="outlined"
                                />
                            )}
                        /> */}


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
                    {/* <Autocomplete
                            fullWidth
                            id="grouped-demo"
                            options={[
                                { title: "Procedure", code: 'Procedure' },
                                { title: "Function", code: 'Function' },
                                { title: "Package", code: 'Package' },
                            ]}
                            groupBy={""}
                            getOptionLabel={(option) => option.title}
                            defaultValue={{ title:props.details?.data?.Label }}
                            name="Object_Type"
                            onChange={(e, v) => handlechangedropdownobj(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    name="Object_Type"
                                    fullWidth
                                    label="Object Type"
                                    variant="outlined"
                                />
                            )}
                        /> */}

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

                    {/* <TextField
                            id="outlined-multiline-static"
                            label="Sequence No"
                            multiline
                            fullWidth
                            onChange={(e) => handleChange(e)}
                            rows={1}
                            name='Sequence_Number'
                            // defaultValue="Default Value"

                            variant="outlined"
                            required
                        /> */}
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







                {/* 
                <Grid item xs={12} sm={12} md={12} xl={12}>


                    <TextField
                        id="outlined-multiline-static"
                        label="Source Code"
                        multiline
                        rows={15}
                        name='Source_Code'
                        onChange={(e) => handleChange(e)}
                        // defaultValue="Default Value"
                        fullWidth
                        variant="outlined"
                        required

                    />
                </Grid> */}

                {/* 
                <Grid item xs={12} sm={12} md={12} xl={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Actual Target Code"
                        multiline
                        rows={15}
                        name='Target_ActualCode'
                        onChange={(e) => handleChange(e)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        // required
                        value={formValues.Target_ActualCode}
                        // disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                </Grid> */}





                {/* <Grid item xs={12} sm={12} md={12} xl={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Expected Target Code"
                        multiline
                        rows={15}
                        name='Target_Expected_Output'
                        onChange={(e) => handleChange(e)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        required
                    />
                </Grid> */}

                {/* <Grid item xs={12} sm={12} md={12} xl={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Conversion Module"
                        multiline
                        name='Conversion_Code'
                        rows={15}
                        onChange={(e) => handleChange(e)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        required
                    />
                </Grid> */}

                {/* <Grid item xs={12} sm={12} md={12} xl={12}>

                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Conversion Code Description"
                            multiline
                            name='Conversion_Description'
                            rows={15}
                            onChange={(e) => handleChange(e)}
                            // defaultValue="Default Value"
                            variant="outlined"
                            required
                        />
                    </Grid> */}

                {/* <Grid item xs={12} sm={4} md={4} xl={4}>
                    <Autocomplete
                        fullWidth
                        id="grouped-demo"
                        options={[
                            { title: "Source Attachment", code: 1 },
                            { title: "Conversion Attachment", code: 2 },
                            { title: "Target Attachment", code: 3 },
                        ]}
                        groupBy={""}
                        defaultValue={{ title: "Source Attachment" }}
                        getOptionLabel={(option) => option.title}
                        name="Attachemnets"
                        onChange={(e, v) => handleChangedrop(v)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                label="Level"
                                variant="outlined"
                            />
                        )}
                    />
                   


                </Grid>
                <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload
                    </Button> */}

            </Grid>

            {/* <Box py={4}>
                <Grid container direction='row' justifyContent='center'>
                    <Grid >
                        <Autocomplete
                            style={{ width: 300, maxHeight: 10, height: '1.5rem' }}
                            fullWidth
                            id="grouped-demo"
                            options={[
                                { title: "Source Attachments", code: 1 },
                                { title: "Conversion Attachments", code: 2 },
                                { title: "Target Attachments", code: 3 },
                            ]}
                            groupBy={""}
                            // defaultValue={{ title: "Source Attachments" }}
                            getOptionLabel={(option) => option.title}
                            name="Attachemnets"
                            onChange={(e, v) => handleChangedrop(v)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    label="Attachements"
                                    variant="outlined"
                                />
                            )}
                        />

                    </Grid>

                    <Grid item>
                        <div className={classes.rootc}>
                            <input
                                accept="file"
                                className={classes.input}
                                id="contained-button-file3"
                                multiple={true}
                                onChange={(e) => handleSubmitdrpm(e)}
                                type="file"
                            />

                            <label htmlFor="contained-button-file3">
                                <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />} style={{ marginTop: 8 }}>
                                    Upload
                                </Button>
                            </label>

                        </div>
                    </Grid>
                </Grid>
            </Box> */}
            {/* {tabledata} */}






            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Box py={5}>

                <Grid container direction='row ' justifyContent='center' spacing={2}>

                    {/* <Grid item >
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            onClick={handleConvert}

                        >
                            Convert
                        </Button>
                    </Grid> */}
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

                    {/* <Grid item>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        // className={classes.submit}
                        // onClick={handleSubmit}

                        >
                            Deploy
                        </Button>
                    </Grid> */}
                </Grid>
            </Box>
            {/* </form> */}



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

