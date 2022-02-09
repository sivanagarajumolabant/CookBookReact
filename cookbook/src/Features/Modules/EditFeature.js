import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import fileDownload from "js-file-download";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableRow from '@material-ui/core/TableRow';
import ConfirmDialog from "../Notifications/ConfirmDialog";
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

const useStylestable = makeStyles({
    table: {
        minWidth: 100,
        // width:10
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
    convertbutton: {
        // color: "white",
        // backgroundColor: "blue",
        // top: "50%",
        // height: 30,
        // float: "right",
        marginLeft: '68vw',
        width: '80px'
        // position: "fixed",
        // transform: "translateY(-50%)"
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
}));

export default function EditFeature(props) {
    // console.log("editdata", props.editPreviewdetails?.data)
    const history = useHistory();
    const [editdata, seteditdata] = useState({ detaildata: props.editPreviewdetails?.data })
    // const editdata = { detaildata: props.editPreviewdetails?.data }
    console.log("editdata", editdata)
    const classes = useStyles();
    const classestable = useStylestable();



    const [formValues, setformvalues] = useState({ Migration_TypeId: props.editPreviewdetails?.data?.type, Object_Type: props.editPreviewdetails?.data?.Label })
    const [file, setfile] = useState([])
    // const [AttachmentList, setAttachmentList] = useState({})


    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    // const [migtypeid,setMigtypeid] = useState()
    const [Source_FeatureDescription, setSource_FeatureDescription] = useState("");
    const [Sequence, setSequence] = useState("");
    const [Target_FeatureDescription, setTarget_FeatureDescription] = useState("");
    const [Source_Code, setSource_Code] = useState("");
    const [Target_ActualCode, setTarget_ActualCode] = useState("");
    const [Target_Expected_Output, setTarget_Expected_Output] = useState("");
    const [Conversion_Code, setConversion_Code] = useState("");
    const [isTable, setIsTable] = useState(false)
    const [drop, setDrop] = useState("Sourcedescription");
    const [droptitle, setDroptitle] = useState("Source Description");
    // const [sourectabledata, setSourectabledata] = useState([])
    const [level, setLevel] = useState("")
    // const [targettabledata, setTargettabledata] = useState([])
    // const [contabledata, setContabledata] = useState([])
    const [source_att, setSource_att] = useState([])
    const [target_att, setTarget_att] = useState([])
    const [conv_att, setConv_att] = useState([])
    const [issattdata, setIssattdata] = useState(false)
    const [iscattdata, setIscattdata] = useState(false)
    const [istattdata, setIstattdata] = useState(false)

    const [source_codeatt, setSource_codeatt] = useState([])
    const [target_acodeatt, setTarget_acodeatt] = useState([])
    const [target_ecodeatt, setTarget_ecodeatt] = useState([])
    const [isscattdata, setIsscattdata] = useState(false)
    const [istaattdata, setIstaattdata] = useState(false)
    const [istettdata, setIstettdata] = useState(false)
    const [fupdate, setFupdate] = useState(false)

    const dispatch = useDispatch();



    useEffect((e) => {
        if (editdata) {
            setSource_FeatureDescription(editdata.detaildata.Source_FeatureDescription)
            setTarget_FeatureDescription(editdata.detaildata.Target_FeatureDescription)
            setSource_Code(editdata.detaildata.Source_Code)
            setTarget_ActualCode(editdata.detaildata.Target_ActualCode)
            setTarget_Expected_Output(editdata.detaildata.Target_Expected_Output)
            setConversion_Code(editdata.detaildata.Conversion_Code)
            setSequence(editdata.detaildata.Sequence)
            setLevel(editdata.detaildata.Level)

        } else {
            history.push({
                pathname: "/dashboard",
            })
        }

    }, []);



    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/sourcedesc/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setSource_att(res.data)
                if (res.data.length > 0) {
                    setIssattdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [fupdate])
    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/targetdesc/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setTarget_att(res.data)
                if (res.data.length > 0) {
                    setIstattdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [fupdate])

    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/convatt/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setConv_att(res.data)
                if (res.data.length > 0) {
                    setIscattdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );

    }, [fupdate])

    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/sourcecode/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setSource_codeatt(res.data)
                if (res.data.length > 0) {
                    setIsscattdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [fupdate])

    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/atargetcode/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setTarget_acodeatt(res.data)
                if (res.data.length > 0) {
                    setIstaattdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [fupdate])
    useEffect(() => {
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.get(`${config.API_BASE_URL()}/api/etargetcode/${editdata.detaildata.Feature_Id}`, conf).then(
            (res) => {
                setTarget_ecodeatt(res.data)
                if (res.data.length > 0) {
                    setIstettdata(true)
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, [fupdate])



    var handle_featurename = editdata?.detaildata?.Feature_Name?.substr(5)

    const handleSubmit = (e) => {
        e.preventDefault();

        var val = 0;
        if (editdata.detaildata) {
            if (editdata.detaildata.Migration_TypeId === 'Oracle To Postgres') {
                val = 1
            }
            else if (editdata.detaildata.Migration_TypeId === 'Oracle TO SQLServer') {

                val = 2
            }
            else if (editdata.detaildata.Migration_TypeId === 'Oracle To MYSQL') {

                val = 3
            }
        }
        let formData = {
            ...formValues,
            Migration_TypeId: val,
            Object_Type: editdata.detaildata.Object_Type,
            Feature_Name: editdata.detaildata.Feature_Name.substr(5),
            // Source_FeatureDescription, Target_FeatureDescription,
            "Sequence": editdata.detaildata.Sequence,
            "Source_FeatureDescription": Source_FeatureDescription,
            "Target_FeatureDescription": Target_FeatureDescription,
            "Target_Expected_Output": Target_Expected_Output,
            "Target_ActualCode": Target_ActualCode,
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
        axios.put(`${config.API_BASE_URL()}/api/fupdate/${editdata.detaildata.Feature_Id}`, form, conf)
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


   
    // const handledetale_conv = (value) => {
    //     const data = file.filter((item) => item.name != value.name)
    //     setConveratt(data)

    // }



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


    if (editdata?.detaildata) {
        if (editdata.detaildata.Migration_TypeId === '1') {
            editdata.detaildata.Migration_TypeId = 'Oracle To Postgres'
            // setMigtypeid(1)
        }
        else if (editdata.detaildata.Migration_TypeId === '2') {
            editdata.detaildata.Migration_TypeId = 'Oracle TO SQLServer'
            // setMigtypeid(2)
        }
        else if (editdata.detaildata.Migration_TypeId === '3') {
            editdata.detaildata.Migration_TypeId = 'Oracle To MYSQL'
            // setMigtypeid(3)
        }
    }


    const handleDownload = (att_Type, migtypeid, obj_type, att_name) => {
        let body = {
            "file_name": att_name,
            "migration_typeid": migtypeid,
            "object_type": obj_type,
            "AttachmentType": att_Type,
            responseType: 'blob',
        }
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        console.log(conf.headers)
        axios.post(`${config.API_BASE_URL()}/api/download_att`, body, conf).then(res => {
            fileDownload(res.data, att_name);
        }).catch(err => {

        })
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
        let wout_prefix = (editdata.detaildata.Feature_Name).substr(5)
        // "convcode": "r@rawstringstart'"+formValues.Conversion_Code+"'@rawstringend",
        let body = {
            "sourcecode": Source_Code,
            // "convcode": Conversion_Code,
            "convcode": "r@rawstringstart'" + Conversion_Code + "'@rawstringend",
            "featurename": wout_prefix,
            "migration_typeid": editdata.detaildata.Migration_TypeId,
            "object_type": editdata.detaildata.Object_Type
        }
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        axios.post(`${config.API_BASE_URL()}/api/autoconv`, body, conf)
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
    if (Sequence !== 'No Predecessor') {
        seq = String(Sequence).substr(5)

    } else {
        seq = Sequence
    }
    // console.log(props.location.state)

    // console.log(AttachmentList)

    const handleChangedrop = (v) => {
        setDrop(v.code);
        setDroptitle(v.title)
        // console.log(v)
    };

    const dispatach = useDispatch()
    // console.log(props.location.state?.data?.type)
    const handleSubmitdrpm = (e) => {
        var filesub = []
        if (drop === "Sourcedescription") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        } else if (drop === "Targetdescription") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        } else if (drop === "Sourcecode") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        } else if (drop === "Actualtargetcode") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        } else if (drop === "Expectedconversion") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        } else if (drop === "Conversion") {
            const { files } = e.target;
            if (files.length > 0) {
                const fileatt = e.target.files[0];
                filesub.push(fileatt)
                setFupdate(true)

            }
        }

        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        let formData = {
            "AttachmentType": drop,
            "Attachment": filesub[0]
        }
        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);

        });
        axios.post(`${config.API_BASE_URL()}/api/attachmentsupdate/${editdata.detaildata.Feature_Id}`, form, conf)
            .then(res => {
                console.log(res.data)
                setNotify({
                    isOpen: true,
                    message: droptitle + ' Attachment Upload Successfully',
                    type: 'success'
                })
                setFupdate(false)
            }, error => {
                console.log(error);
                setNotify({
                    isOpen: true,
                    message: 'Something Went Wrong! Please try Again for ' + droptitle,
                    type: 'error'
                })
                setFupdate(false)
            })
    };

    const deleteitem = async (data) => {
        seteditdata({})
        let conf = {
            headers: {
                'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
            }
        }
        setConfirmDialog({
            confirmDialog,
            isOpen: false
        })
        const res = await axios.delete(`${config.API_BASE_URL()}/api/fdelete/${data}`, conf);
        // getmenus(1);
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        });

        // dispatch(ActionMenu.ActionMenu(
        seteditdata({})
        dispatch(Menuaction.reloadAction(true))
    };


    function uploadAdapter(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append("files", file);
                        // let headers = new Headers();
                        // headers.append("Origin", "http://localhost:3000");
                        // fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
                        //   method: "post",
                        //   body: body
                        //   // mode: "no-cors"
                        // })
                        //   .then((res) => res.json())
                        //   .then((res) => {
                        //     resolve({
                        //       default: `${API_URL}/${res.filename}`
                        //     });
                        //   })
                        //   .catch((err) => {
                        //     reject(err);
                        //   });
                    });
                });
            }
        };
    }
    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

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

    return (


        <>
            {Object.keys(editdata).length > 0 &&
                <>

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
                                value={editdata?.detaildata?.Migration_TypeId}
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
                                value={editdata?.detaildata?.Object_Type}
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
                           
                            <TextField
                                id="outlined-multiline-static"
                                label="Level"
                                multiline
                                rows={1}
                                // onChange={(e) => handleChange(e)}
                                value={level}
                                name='Level'
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


                           
                            <div className="App">
                                <p>{'Source Description'}</p>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={editdata.detaildata.Source_FeatureDescription}
                                    // value ={editdata.detaildata.Source_FeatureDescription}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        handledes(data)
                                        // console.log( { event, editor, data } );
                                    }}
                                    config={{
                                        extraPlugins: [uploadPlugin]
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


                            <div className="App">
                                <p>{'Target Description'}</p>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={editdata.detaildata.Target_FeatureDescription}
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

                                    config={{
                                        extraPlugins: [uploadPlugin]
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


                            <TextField
                                id="outlined-multiline-static"
                                label="Source Code"
                                multiline
                                type="text"
                                rows={15}
                                name='Source_Code'
                                onChange={(e) => setSource_Code(e.target.value)}
                                defaultValue={Source_Code}
                                fullWidth
                                variant="outlined"
                                required
                                // value={Source_Code}
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
                                label="Expected Target Code"
                                multiline
                                rows={15}
                                name='Target_Expected_Output'
                                onChange={(e) => setTarget_Expected_Output(e.target.value)}
                                // defaultValue="Default Value"
                                variant="outlined"
                                // defaultValue={Target_Expected_Output}
                                required
                                value={Target_Expected_Output}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Box py={2}>
                            <Button
                                // type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size='small'
                                // style={{float: 'right'}}
                                // className={classes.submit}
                                className={classes.convertbutton}
                                onClick={handleConvert}

                            >
                                Convert
                            </Button>

                        </Box>


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
                                // defaultValue={Target_ActualCode}
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
                                label="Conversion Code"
                                multiline
                                name='Conversion_Code'
                                rows={15}
                                onChange={(e) => setConversion_Code(e.target.value)}
                                // defaultValue="Default Value"
                                // defaultValue={Conversion_Code}
                                variant="outlined"
                                required
                                value={Conversion_Code}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                       

                    </Grid>
                    <Box py={4}>
                        <Grid container direction='row' justifyContent='center'>
                            <Grid item >
                                <Autocomplete
                                    style={{ width: 300, maxHeight: 10, height: '1.5rem' }}
                                    fullWidth
                                    id="grouped-demo"
                                    options={[
                                        { title: "Source Description", code: 'Sourcedescription' },
                                        { title: "Target Description", code: 'Targetdescription' },
                                        { title: "Conversion Code", code: 'Conversion' },
                                        { title: "Actual Target Code", code: 'Actualtargetcode' },
                                        { title: "Expected Target Code", code: 'Expectedconversion' },
                                        { title: "Source Code", code: 'Sourcecode' }
                                    ]}
                                    groupBy={""}
                                    // defaultValue={{ title: "Source Description" }}
                                    getOptionLabel={(option) => option.title}
                                    name="Attachemnets"
                                    onChange={(e, v) => handleChangedrop(v)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            label="Attachments"
                                            variant="outlined"
                                        />
                                    )}
                                />

                            </Grid>

                            <Grid item >
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
                                        <Button variant="contained"
                                            startIcon={<CloudUploadIcon />}
                                            color="primary" component="span" startIcon={<CloudUploadIcon />} style={{ marginTop: 8 }}>
                                            Upload
                                        </Button>
                                    </label>

                                </div>
                            </Grid>
                        </Grid>
                    </Box>


                    <Grid container xl={12} justifyContent="space-between" spacing={1}>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h2"
                                className={classes.Object_Type}
                            >
                                Source Code
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {isscattdata ? <>
                                        {source_codeatt.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>

                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h5"
                                className={classes.Object_Type}
                            >
                                Expected Code
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {istettdata ? <>
                                        {target_ecodeatt.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>
                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h2"
                                className={classes.Object_Type}
                            >
                                Actual Code
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {istaattdata ? <>
                                        {target_acodeatt.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>
                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>




                    <Grid container xl={12} justifyContent="space-between" spacing={1}>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h2"
                                className={classes.Object_Type}
                            >
                                Source Attachments
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {issattdata ? <>
                                        {source_att.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>

                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h5"
                                className={classes.Object_Type}
                            >
                                Target Attachments
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {istattdata ? <>
                                        {target_att.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>
                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xl={4} xs={12} sm={12} md={4}>
                            <Typography
                                gutterBottom
                                align='center'
                                variant="h6"
                                component="h2"
                                className={classes.Object_Type}
                            >
                                Conversion Attachments
                            </Typography>
                            <Table className={classestable.table} aria-label="customized table">
                                <TableHead className={classes.primary}>
                                    <TableRow>
                                        {/* <StyledTableCell align="center">Type</StyledTableCell> */}
                                        <StyledTableCell align="center">File</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {iscattdata ? <>
                                        {conv_att.map((row) => (

                                            <StyledTableRow container>
                                                {/* <StyledTableCell item xl={5}>
                                                    <div className={classes.texttablecell}>{row.AttachmentType}</div>
                                                </StyledTableCell> */}
                                                <StyledTableCell item xl={10} >
                                                    <div className={classes.texttablecell}>{row.Attachment?.split("/").pop()}</div>
                                                </StyledTableCell>
                                                <StyledTableCell item xl={2}>
                                                    <Box flexDirection="row" >
                                                        <IconButton onClick={() => {
                                                            alert('clicked')
                                                        }}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </IconButton>
                                                        <IconButton onClick={(e) => handleDownload(row.AttachmentType, editdata.detaildata.Migration_TypeId, editdata.detaildata.Object_Type, row.Attachment)}>
                                                            <GetAppIcon style={{ color: 'blue' }} />
                                                        </IconButton>
                                                    </Box>
                                                </StyledTableCell>

                                            </StyledTableRow>
                                        ))}
                                    </>
                                        : <>
                                            {/* <StyledTableCell align="center"></StyledTableCell> */}
                                            <StyledTableCell align="right">No Data</StyledTableCell>
                                            <StyledTableCell align="right"></StyledTableCell>
                                        </>}


                                </TableBody>
                            </Table>
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
                                    // type="submit"
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
                            <Grid item>
                                <Button
                                    // type="submit"
                                    fullWidth
                                    variant="contained"
                                    style={{ backgroundColor: 'red', color: 'white' }}
                                    // className={classes.submit}
                                    // onClick={() => deleteitem(editdata.detaildata.Feature_Id)}
                                    startIcon={<DeleteIcon />}
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            // subTitle: "You can't undo this operation",
                                            onConfirm: () => { deleteitem(editdata.detaildata.Feature_Id) }
                                        })
                                    }
                                    }
                                >
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* </form> */}

                    <Notification
                        notify={notify}
                        setNotify={setNotify}
                    />
                    <ConfirmDialog
                        seteditdata={seteditdata}
                        confirmDialog={confirmDialog}
                        setConfirmDialog={setConfirmDialog}
                    />
                </>
            }
        </>
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














// const onchangefile_source = (e) => {

//     const { files } = e.target;
//     if (files.length > 0) {
//         const filesystem = [...file];
//         for (let i = 0; i < files.length; i++) {

//             const file = files[i];

//             filesystem.push(file);
//             setSourceatt(filesystem[0])


//         }
//         // console.log(filesystem)
//     } else {
//         setSourceatt(null);
//     }
// }


// const onchangefile_target = (e) => {

//     const { files } = e.target;
//     if (files.length > 0) {
//         const filesystem = [...file];
//         for (let i = 0; i < files.length; i++) {

//             const file = files[i];

//             filesystem.push(file);
//             setTargetatt(filesystem[0])

//         }
//         // console.log(filesystem)
//     } else {
//         setTargetatt(null);
//     }
// }
// const onchangefile_conver = (e) => {

//     const { files } = e.target;
//     if (files.length > 0) {
//         const filesystem = [...file];
//         for (let i = 0; i < files.length; i++) {

//             const file = files[i];

//             filesystem.push(file);
//             setConveratt(filesystem[0])
//         }
//         // console.log(filesystem)
//     } else {
//         setConveratt(null);
//     }
// }
