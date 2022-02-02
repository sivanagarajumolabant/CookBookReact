import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
// import CreatePreview from './CreatePreview';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import MenuAppBar from '../../Components/header'
import { Box, Grid, Typography } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import Notification from '../Notifications/Notification';
import Menuaction from '../../Redux/actions/Menuaction';
import API_BASE_URL from '../../Config/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from "react-router-dom";
import config from '../../Config/config';


const useStyles = makeStyles((theme) => ({
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
}));

export default function EditFeature(props) {
    // console.log(props.location.data)
    const history = useHistory();
    const editdata = props.location.data
    // console.log("editdata", editdata.detaildata[0])
    const classes = useStyles();


    const [formValues, setformvalues] = useState({ Migration_TypeId: props.location.state?.data?.type, Object_Type: props.location.state?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})
    const { headerValue } = useSelector(state => state.dashboardReducer);
    const [source_att, setSourceatt] = useState([])
    const [target_att, setTargetatt] = useState([])
    const [conver_att, setConveratt] = useState([])
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [migtypeid,setMigtypeid] = useState()
    const [Source_FeatureDescription, setSource_FeatureDescription] = useState("");
    const [Sequence, setSequence] = useState("");
    const [Target_FeatureDescription, setTarget_FeatureDescription] = useState("");
    const [Source_Code, setSource_Code] = useState("");
    const [Target_ActualCode, setTarget_ActualCode] = useState("");
    const [Target_Expected_Output, setTarget_Expected_Output] = useState("");
    const [Conversion_Code, setConversion_Code] = useState("");
    const [isTable, setIsTable] = useState(false)
    const [drop, setDrop] = useState("Source Attachments");
    const dispatch = useDispatch();



    useEffect((e) => {
        if (editdata) {
            setSource_FeatureDescription(editdata.detaildata[0].Source_FeatureDescription)
            setTarget_FeatureDescription(editdata.detaildata[0].Target_FeatureDescription)
            setSource_Code(editdata.detaildata[0].Source_Code)
            setTarget_ActualCode(editdata.detaildata[0].Target_ActualCode)
            setTarget_Expected_Output(editdata.detaildata[0].Target_Expected_Output)
            setConversion_Code(editdata.detaildata[0].Conversion_Code)
            setSequence(editdata.detaildata[0].Sequence)
        } else {
            history.push({
                pathname: "/dashboard",
            })
        }

    }, [editdata]);

    var handle_featurename = editdata?.detaildata[0].Feature_Name.substr(5)
    // useEffect(() => {
    //     if (editdata) {
    //         axios.put(`http://127.0.0.1:8000/api/update/${editdata.detaildata[0].Feature_Id}`, formData)
    //         .then(res => {
    //             setDetaildata(res.data
    //                 );
    //             console.log(res.data)
    //         }, error => {
    //             console.log(error);
    //         })

    //     }
    //   }, [editdata]);




    const handleSubmit = (e) => {
        e.preventDefault();

        var val = 0;
        if (editdata.detaildata[0]) {
            if (editdata.detaildata[0].Migration_TypeId === 'Oracle To Postgres') {
                val = 1
            }
            else if (editdata.detaildata[0].Migration_TypeId === 'Oracle TO SQLServer') {

                val = 2
            }
            else if (editdata.detaildata[0].Migration_TypeId === 'Oracle To MYSQL') {

                val = 3
            }
        }
        let formData = {
            ...formValues,
            Migration_TypeId: val,
            Object_Type: editdata.detaildata[0].Object_Type,
            Feature_Name: editdata.detaildata[0].Feature_Name.substr(5),
            // Source_FeatureDescription, Target_FeatureDescription,
            "Sequence": editdata.detaildata[0].Sequence,
            "Source_FeatureDescription": Source_FeatureDescription,
            "Target_FeatureDescription": Target_FeatureDescription,
            "Target_Expected_Output": Target_Expected_Output,
            "Target_ActualCode": Target_ActualCode,
            'Source_Attachment': source_att,
            "Conversion_Attachment": conver_att,
            "Target_Attachment": target_att,
            "Source_Code": Source_Code,
            "Conversion_Code": Conversion_Code
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
        axios.put(`${config.API_BASE_URL()}/update/${editdata.detaildata[0].Feature_Id}`, form, conf)
            .then(res => {
                console.log(res.data)
                setNotify({
                    isOpen: true,
                    message: 'Feature Updated Successfully',
                    type: 'success'
                })
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong! Please try Again',
                    type: 'error'
                })
            })

        dispatch(Menuaction.reloadAction(true))

    }

    const handleChange = (e) => {
        if (e.target.value === null) {
            e.target.value = ''
        }
        setformvalues({
            ...editdata,
            [e.target.name]: [e.target.value],
        })
    }


    // const handlechangedropdownlevel = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Level": v.title
    //     })


    // }
    // const handlechangedropdown = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Migration_TypeId": v.title
    //     })


    // }
    // const handlechangedropdownobj = (v) => {
    //     setformvalues({
    //         ...formValues,
    //         "Object_Type": v.code
    //     })


    // }

    const onchangefile_source = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push(file);
                setSourceatt(filesystem[0])


            }
            // console.log(filesystem)
        } else {
            setSourceatt(null);
        }
    }


    const onchangefile_target = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push(file);
                setTargetatt(filesystem[0])

            }
            // console.log(filesystem)
        } else {
            setTargetatt(null);
        }
    }
    const onchangefile_conver = (e) => {

        const { files } = e.target;
        if (files.length > 0) {
            const filesystem = [...file];
            for (let i = 0; i < files.length; i++) {

                const file = files[i];

                filesystem.push(file);
                setConveratt(filesystem[0])
            }
            // console.log(filesystem)
        } else {
            setConveratt(null);
        }
    }





    const handledetale_source = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setSourceatt(data)

    }
    const handledetale_target = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setTargetatt(data)

    }
    const handledetale_conv = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setConveratt(data)

    }

    // const onchangefile = (e, value) => {

    //     const { files } = e.target;
    //     if (files.length > 0) {
    //         const filesystem = [...file];
    //         for (let i = 0; i < files.length; i++) {

    //             const file = files[i];

    //             filesystem.push({
    //                 name: file.name,
    //                 size: file.size,
    //                 type: file.type
    //             });
    //             setfile(filesystem);


    //             setAttachmentList({
    //                 ...AttachmentList,
    //                 [value]: filesystem[0].name
    //             })

    //             // setUploadingDoc(false);


    //         }
    //         console.log(filesystem)
    //     }



    //     // setformvalues({
    //     //     ...formValues,
    //     //  files:[
    //     //      ...file,
    //     //      e.target.files[0]
    //     //  ]
    //     // })

    // }

    const handlechangedropdownlevel = (v) => {
        setformvalues({
            ...formValues,
            "Level": v.title
        })
    }

    const handledes = (data) => {
        // setformvalues({
        //     ...formValues,
        //     "Source_FeatureDescription": data
        // })
        setSource_FeatureDescription(data)


    }
    const handletarget = (data) => {
        // setformvalues({
        //     ...formValues,
        //     "Target_FeatureDescription": data
        // })
        setTarget_FeatureDescription(data)

    }


    if (editdata?.detaildata[0]) {
        if (editdata.detaildata[0].Migration_TypeId === '1') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle To Postgres'
            // setMigtypeid(1)
        }
        else if (editdata.detaildata[0].Migration_TypeId === '2') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle TO SQLServer'
            // setMigtypeid(2)
        }
        else if (editdata.detaildata[0].Migration_TypeId === '3') {
            editdata.detaildata[0].Migration_TypeId = 'Oracle To MYSQL'
            // setMigtypeid(3)
        }
    }


    const handledetale = (value) => {
        const data = file.filter((item) => item.name != value.name)
        setfile(data)

    }

    const handleConvert = (e) => {
        e.preventDefault();
        

        // console.log(formValues.Conversion_Code)
        // console.log(formValues.Source_Code)
        // console.log(formValues.Feature_Name)
        let wout_prefix = (editdata.detaildata[0].Feature_Name).substr(5)
        // "convcode": "r@rawstringstart'"+formValues.Conversion_Code+"'@rawstringend",
        let body = {
            "sourcecode": Source_Code,
            // "convcode": Conversion_Code,
            "convcode": "r@rawstringstart'"+Conversion_Code+"'@rawstringend",
            "featurename": wout_prefix,
            "migration_typeid": editdata.detaildata[0].Migration_TypeId,
            "object_type":editdata.detaildata[0].Object_Type
        }
        let conf = {
            headers: {
              'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
          }
        axios.post(`${config.API_BASE_URL()}/convert_python_code1`, body,conf)
            .then(res => {
                // console.log("res",res.data)
                setTarget_ActualCode(res.data)

                setNotify({
                    isOpen: true,
                    message: 'Conversion Completed Please Check The Output',
                    type: 'success'
                })
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong! Please try Again',
                    type: 'error'
                })
            })

    }
    var seq = null;
    if (Sequence !== 'No Precision') {
        seq = String(Sequence).substr(5)

    } else {
        seq = Sequence
    }
    // console.log(props.location.state)

    // console.log(AttachmentList)

    const handleChangedrop = (v) => {
        setDrop(v.title);
        // console.log(v)
    };

    const dispatach = useDispatch()
    // console.log(props.location.state?.data?.type)
    const handleSubmitdrpm = (e) => {
        // console.log(drop);

        if (drop === "Source Attachments") {
            const { files } = e.target;
            if (files.length > 0) {
                const filesystem = [...file];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];

                    filesystem.push(file);
                    setSourceatt(filesystem[0]);
                    setIsTable(true)
                }
                // console.log(filesystem)
            } else {
                setSourceatt(null);
            }
        } else if (drop === "Conversion Attachments") {
            const { files } = e.target;
            if (files.length > 0) {
                const filesystem = [...file];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];

                    filesystem.push(file);

                    setConveratt(filesystem[0]);
                    setIsTable(true)
                }
                // console.log(filesystem)
            } else {
                setConveratt(null);
            }
        } else {
            const { files } = e.target;
            if (files.length > 0) {
                const filesystem = [...file];
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];

                    filesystem.push(file);
                    setTargetatt(filesystem[0]);
                    setIsTable(true)
                }
                // console.log(filesystem)
            } else {

                setTargetatt(null);
            }
        }
    };

    var tabledata = null
    if (isTable) {
        tabledata = <>
            <Grid container justifyContent="center">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>TYPE</TableCell>
                            <TableCell >FILE</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                Source
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {source_att?.name}
                            </TableCell>
                        </TableRow>

                        <TableRow >
                            <TableCell component="th" scope="row">
                                Target
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {target_att?.name}
                            </TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell component="th" scope="row">
                                Conversion
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {conver_att.name}
                            </TableCell>
                        </TableRow>

                    </TableBody>
                    {/* <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
                </Table>


            </Grid>
        </>
    }

    return (

        <MenuAppBar>
            <Box py={2}>
                {/* <Grid container direction='row' justifyContent='center'>
                    <Grid item>
                        <Typography variant='h6'>
                            Edit Feature
                        </Typography>
                    </Grid>

                </Grid> */}
            </Box>

            {/* <form autoComplete="off"> */}
            <Grid container direction='row' xs={12} spacing={4}>

                <Grid item xs={6}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Migration Type"
                        multiline
                        rows={1}
                        onChange={(e) => handleChange(e)}
                        label="Migration Type"
                        // defaultValue="Default Value"
                        value={editdata?.detaildata[0].Migration_TypeId}
                        variant="outlined"
                        required
                        disabled
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />

                </Grid>
                <Grid item xs={6}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Object Type"
                        multiline
                        rows={1}
                        onChange={(e) => handleChange(e)}
                        value={editdata?.detaildata[0].Object_Type}
                        name="Object_Type"
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Feature Name"
                        multiline
                        rows={1}
                        onChange={(e) => handleChange(e)}
                        value={handle_featurename}
                        name='Feature_Name'
                        // defaultValue="Default Value"
                        variant="outlined"
                        required
                        disabled
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </Grid>

                <Grid item xs={4}>
                    <Autocomplete
                        fullWidth
                        id="outlined-multiline-static"
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
                            />
                        )}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Predecessor"
                        multiline
                        fullWidth
                        // onChange={(e, v) => handleChange(v)}
                        // onChange={(e) => setSequence(e.target.value)}
                        rows={1}
                        name='Sequence_Number'
                        // defaultValue="Default Value"
                        value={seq}
                        variant="outlined"
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled
                    />

                </Grid>
                <Grid item xs={12}>


                    {/* <TextField
                            id="outlined-multiline-static"
                            label="Source Description"
                            multiline
                            rows={15}
                            // defaultValue="Default Value"
                            name="Source_FeatureDescription"
                            // value={editdata.detaildata[0].Source_FeatureDescription}
                            value={Source_FeatureDescription}
                            fullWidth
                            // onChange={(e, v) => handleChange(v)}
                            onChange={(e) => setSource_FeatureDescription(e.target.value)}
                            variant="outlined"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> */}

                    <div className="App">
                        <h2>{'Source Description'}</h2>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editdata?.detaildata[0].Source_FeatureDescription}
                            // value ={detaildata[0].Source_FeatureDescription}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handledes(data)
                                // console.log( { event, editor, data } );
                            }}


                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}

                        />
                    </div>

                </Grid>



                <Grid item xs={12}>


                    {/* <TextField
                        id="outlined-multiline-static"
                        label="Target Description"

                        fullWidth
                        name='Target_FeatureDescription'
                        multiline
                        rows={15}
                        onChange={(e) => setTarget_FeatureDescription(e.target.value)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        value={Target_FeatureDescription}
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    /> */}

                    <div className="App">
                        <p>{'Target Description'}</p>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editdata?.detaildata[0].Target_FeatureDescription}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                handletarget(data)
                                // console.log( { event, editor, data } );
                            }}
                            // onChange={(e) => setTarget_FeatureDescription(e.target.value)}


                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>

                </Grid>




                <Grid item xs={12}>


                    <TextField
                        id="outlined-multiline-static"
                        label="Source Code"
                        multiline
                        rows={15}
                        name='Source_Code'
                        onChange={(e) => setSource_Code(e.target.value)}
                        // defaultValue="Default Value"
                        fullWidth
                        variant="outlined"
                        required
                        value={Source_Code}
                        InputLabelProps={{
                            shrink: true,
                        }}

                    // error={Source_Code === ""}
                    // helperText={Source_Code === "" ? "Empty!" : " "}
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Actual Target Code"
                        multiline
                        rows={15}
                        name='Target_ActualCode'
                        onChange={(e) => setTarget_ActualCode(e.target.value)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        // required
                        value={Target_ActualCode}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>





                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Expected Target Code"
                        multiline
                        rows={15}
                        name='Target_Expected_Output'
                        onChange={(e) => setTarget_Expected_Output(e.target.value)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        required
                        value={Target_Expected_Output}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Conversion Code"
                        multiline
                        name='Conversion_Code'
                        rows={15}
                        onChange={(e) => setConversion_Code(e.target.value)}
                        // defaultValue="Default Value"
                        variant="outlined"
                        required
                        value={Conversion_Code}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                {/* <Grid item xs={12}>

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
                            value={editdata[0].Conversion_Description}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
 */}

            </Grid>
            <Box py={4}>
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
            </Box>
            {tabledata}





            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <Box py={5}>

                <Grid container direction='row ' justifyContent='center' spacing={2}>

                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            onClick={handleSubmit}

                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {/* </form> */}



        </MenuAppBar>
    );
}






// <Grid container xs={3} lg={4}>
//     <Grid item xs>
//         <Grid container direction='column'>
//             {/* {conver_att.map(item => {
//                                     return (
//                                         <>

//                                             <Grid item>

//                                                 <Grid container direction='row' justifyContent='space-around'>

//                                                     <Grid item>
//                                                         <Typography variant='caption'>
//                                                             {item.name}
//                                                         </Typography>
//                                                     </Grid>



//                                                     <Grid item>
//                                                         <CloseIcon onClick={() => handledetale_conv(item)} />
//                                                     </Grid>
//                                                 </Grid>



//                                             </Grid>

//                                         </>
//                                     )
//                                 })} */}
//             {conver_att.name}

//         </Grid>
//     </Grid>



// </Grid>