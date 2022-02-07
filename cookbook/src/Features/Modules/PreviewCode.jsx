import React, { useEffect, useState } from "react";
import axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import Card from "@material-ui/core/Card";
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import TableBody from '@material-ui/core/TableBody';
// import fileDownload from "js-file-download";
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Box, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import { useHistory, Link } from "react-router-dom";
import fileDownload from "js-file-download";
import API_BASE_URL from "../../Config/config";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import config from "../../Config/config";
import ActionMenu from "../../../src/Redux/actions/Menuaction";


const useStylestable = makeStyles({
  table: {
    minWidth: 100,
    // width:10
  },

});
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  lineheight: {
    lineHeight: '30px'
  },

  Object_Type: {
    margin: "16px 0",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0em",
    paddingLeft: 1
  },

  Description: {
    margin: "0 0 40px",
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.334,
    letterSpacing: "0em",
    paddingLeft: 5,
  },

  SourceDescription: {
    display: "block",
    lineHeight: 1.5,
    fontSize: "1.15rem",
    borderRadius: "10px",
    marginBlockStart: "1em",
    marginBlockEnd: "1em",
    marginInlineStart: "0px",
    marginInlineEnd: " 0px",
    webkitJustifyContent: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#E7EBF0",
    paddingLeft: 30,
  },

  SourceCode: {
    margin: "24px auto",
    padding: "24px",
    fontSize: "1.35rem",
    color: "#FFF",
    overflow: "auto",
    direction: "ltr",
    maxHeight: "500px",
    lineHeight: 2,
    maxWidth: "calc(78vw - 32px)",
    borderRadius: " 5px",
    backgroundColor: " #272c34",
    webkitOverflowScrolling: "touch",
  },

  Editpart: {
    borderRadius: "5px",
    justifyItems: "center",
    padding: "10px 5px 0px 5px",
    // backgroundColor: "#E7EBF0",
  },


}));




export default function PreviewCode(props) {
  const classes = useStyles();
  const classestable = useStylestable();
  const [detaildata, setDetaildata] = useState();
  // const id = props.InfoId;
  let history = useHistory();
  const [isdata, setIsdata] = useState(false);
  const dispatch = useDispatch()
  const [source_att, setSource_att] = useState([])
  const [target_att, setTarget_att] = useState([])
  const [conv_att, setConv_att] = useState([])
  const { menuitem } = useSelector((state) => state.dashboardReducer);
  const [issattdata, setIssattdata] = useState(false)
  const [iscattdata, setIscattdata] = useState(false)
  const [istattdata, setIstattdata] = useState(false)
  // console.log(menuitem);

  useEffect(() => {
    if (menuitem) {
      let conf = {
        headers: {
          'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
        }
      }
      axios.get(`${config.API_BASE_URL()}/api/fdetail/${menuitem || null}`, conf).then(
        (res) => {
          console.log(res);
          setDetaildata(res.data);
          setIsdata(true);

        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setDetaildata();
    }
  }, [menuitem]);

  useEffect(() => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Feature_Id": menuitem,
      "Targetdescription": "Targetdescription",
      "Actualtargetcode": "Actualtargetcode",
      "Expectedconversion": "Expectedconversion"
    }
    axios.post(`${config.API_BASE_URL()}/api/targetattlist`, body, conf).then(
      (res) => {
        console.log(res);
        setTarget_att(res.data)
        if (res.data.length > 0) {
          setIstattdata(true)
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }, [menuitem])

  useEffect(() => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Feature_Id": menuitem,
      "Conversion": "Conversion",

    }
    axios.post(`${config.API_BASE_URL()}/api/convattlist`, body, conf).then(
      (res) => {
        console.log(res);
        setConv_att(res.data)
        if (res.data.length > 0) {
          setIscattdata(true)
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }, [menuitem])
  useEffect(() => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    let body = {
      "Feature_Id": menuitem,
      "Sourcedescription": 'Sourcedescription',
      "Sourcecode": 'Sourcecode'
    }
    axios.post(`${config.API_BASE_URL()}/api/sourceattlist`, body, conf).then(
      (res) => {
        console.log(res);
        setSource_att(res.data)
        if (res.data.length > 0) {
          setIssattdata(true)
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }, [menuitem])



  // console.log("data",detaildata)
  // useEffect(() => {

  //   axios.get(`http://127.0.0.1:8000/api/detail/${1}`).then(
  //     (res) => {
  //       console.log(res);
  //       setDetaildata(res.data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  // }, []);


  const handleDownload = (dfile) => {

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


  var data = null;
  let seq = null
  if (detaildata) {
    if (detaildata.Sequence !== 'No Predecessor') {
      seq = detaildata.Sequence.substr(5)

    } else {
      seq = detaildata.Sequence
    }
    data = (
      <>
        <Grid container >
          <Grid container justifyContent="flex-end" style={{ paddingTop: 30 }}>
            {/* <Grid item xs={6} sm={6} md={6} lg={6} >
              <Typography
               style={{paddingLeft:370}} variant="h4"
               >
                  <b>Detail View</b>
              </Typography>
            </Grid> */}
            <Grid item >

              <Button
                variant="contained"
                color="primary"
                component="span"

                startIcon={<EditSharpIcon />}
                onClick={() =>
                  // history.push({
                  //   pathname: `/edit/${detaildata.Feature_Id}`,
                  //   data: { detaildata },

                  // })
                  dispatch(ActionMenu.EditPreviewFeature({ data: detaildata }))
                }
              >
                Edit
              </Button>

            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Object Type
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {/* {detaildata[0].Object_Type.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })} */}
              {detaildata.Object_Type}
              {/* </Typography> */}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Feature Name
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {/* {detaildata[0].Feature_Name.split("\n").map((i, key) => {
                return <div key={key}>{i}</div>;
              })} */}
              {detaildata.Feature_Name.substr(5)}
              {/* </Typography> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Level
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {detaildata.Level}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Predecessor
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.Description}>
              {seq}
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Source Feature Description
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.SourceDescription} >
              {/* {detaildata[0].Source_FeatureDescription.split("\n").map(
                (i, key) => {
                  return <div key={key}>{i}</div>;
                }
              )} */}
              <div className="App">
                {/* <h2>{'Source Description'}</h2> */}
                <CKEditor
                  editor={ClassicEditor}
                  data={detaildata.Source_FeatureDescription}
                  // value ={detaildata[0].Source_FeatureDescription}
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  // onChange={(event, editor) => {
                  //     const data = editor.getData();
                  //     handledes(data)
                  //     // console.log( { event, editor, data } );
                  // }}


                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                  disabled='true'
                />
              </div>
              {/* </Typography> */}
            </div>
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Feature Description
            </Typography>
            {/* <Typography component="h2"> */}
            <div className={classes.SourceDescription}>
              {/* {detaildata[0].Target_FeatureDescription.split("\n").map(
                (i, key) => {
                  return <div key={key}>{i}</div>;
                }
              )} */}
              <CKEditor
                editor={ClassicEditor}
                data={detaildata.Target_FeatureDescription}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                // onChange={(event, editor) => {
                //     const data = editor.getData();
                //     handledes(data)
                //     // console.log( { event, editor, data } );
                // }}


                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
                disabled='true'
              />
              {/* </Typography> */}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Source Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}><code>
                  {detaildata.Source_Code}
                </code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Expected Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>
                    {detaildata.Target_Expected_Output}
                  </code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Actual Code
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>
                    {detaildata.Target_ActualCode}
                  </code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Conversion Module
            </Typography>
            <div>
              <Card className={classes.SourceCode}>
                {/* <Typography component="h2"> */}
                <pre className={classes.lineheight}>
                  <code>
                    {detaildata.Conversion_Code}
                  </code>
                </pre>
              </Card>
            </div>
            {/* </Typography> */}
          </Grid>


        </Grid>

        <Box py={4}>
          <Grid container spacing={0.5}>
            <Grid container item xs={12} spacing={1}>
              <Grid item xs={9}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.Object_Type}
                >
                  Source Attachments
                </Typography>
                <Table className={classestable.table} aria-label="customized table">
                  <TableHead className={classes.primary}>
                    <TableRow>
                      <StyledTableCell align="center">Type</StyledTableCell>
                      <StyledTableCell align="center">File</StyledTableCell>
                      <StyledTableCell align="center">Actions</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {issattdata ?
                      <>
                        {source_att.map((row) => (
                          <StyledTableRow key={row.name} spacing={1} style={{ overflow: 'hidden' }}>
                            <StyledTableCell component="th" scope="row" align="center">
                              {row.AttachmentType}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.Attachment?.split("/").pop()}</StyledTableCell>
                            <StyledTableCell align="center">
                              <Box flexDirection="row" >
                                <IconButton onClick={() => {
                                  alert('clicked')
                                }}>
                                  <DeleteIcon style={{ color: 'red' }} />
                                </IconButton>
                                <IconButton onClick={(e) => handleDownload(row.AttachmentType, detaildata.Migration_TypeId, detaildata.Object_Type, row.Attachment)}>
                                  <GetAppIcon style={{ color: 'blue' }} />
                                </IconButton>
                              </Box>
                            </StyledTableCell>

                          </StyledTableRow>
                        ))}
                      </>
                      : <>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">No Data</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </>}

                  </TableBody>
                </Table>

              </Grid>


            </Grid>



          </Grid>
        </Box>
        <Box>
          <Grid item xs={9}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Target Attachments
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">File</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {istattdata ? <>
                  {target_att.map((row) => (
                    <StyledTableRow key={row.name} spacing={1} style={{ overflow: 'hidden' }}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.AttachmentType}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.Attachment?.split("/").pop()}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Box flexDirection="row" >
                          <IconButton onClick={() => {
                            alert('clicked')
                          }}>
                            <DeleteIcon style={{ color: 'red' }} />
                          </IconButton>
                          <IconButton onClick={(e) => handleDownload(row.AttachmentType, detaildata.Migration_TypeId, detaildata.Object_Type, row.Attachment)}>
                            <GetAppIcon style={{ color: 'blue' }} />
                          </IconButton>
                        </Box>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </>
                  : <>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">No Data</StyledTableCell>
                    <StyledTableCell align="center"></StyledTableCell>
                  </>}

              </TableBody>
            </Table>

          </Grid>
        </Box>

        <Box>
          <Grid item xs={9}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.Object_Type}
            >
              Conversion Attachments
            </Typography>
            <Table className={classestable.table} aria-label="customized table">
              <TableHead className={classes.primary}>
                <TableRow>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  <StyledTableCell align="center">File</StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {iscattdata ? <>
                  {conv_att.map((row) => (

                    <StyledTableRow key={row.name} spacing={1} style={{ overflow: 'hidden' }}>
                      <StyledTableCell component="th" scope="row" align="center">
                        {row.AttachmentType}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.Attachment?.split("/").pop()}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Box flexDirection="row" >
                          <IconButton onClick={() => {
                            alert('clicked')
                          }}>
                            <DeleteIcon style={{ color: 'red' }} />
                          </IconButton>
                          <IconButton onClick={(e) => handleDownload(row.AttachmentType, detaildata.Migration_TypeId, detaildata.Object_Type, row.Attachment)}>
                            <GetAppIcon style={{ color: 'blue' }} />
                          </IconButton>
                        </Box>
                      </StyledTableCell>

                    </StyledTableRow>
                  ))}
                </> : <>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">No Data</StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </>}


              </TableBody>
            </Table>

          </Grid>

        </Box>



        <Grid container justifyContent="center" spacing={1}>

          <Grid item style={{ marginTop: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              component="span"

              startIcon={<EditSharpIcon />}
              onClick={() =>
                // history.push({
                //   pathname: `/edit/${detaildata.Feature_Id}`,
                //   data: { detaildata },

                // })
                dispatch(ActionMenu.EditPreviewFeature({ data: detaildata }))
              }
            >
              Edit
            </Button>
          </Grid>
        </Grid>


      </>
    );
  }

  return (

    <>{data}</>
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Typography from "@material-ui/core/Typography";
// import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
// import { useSelector } from "react-redux";

// export default function PreviewCode(props) {
//   const [detaildata, setDetaildata] = useState([]);
//   const id = props.InfoId;

//   const [edit,setedit]=useState(false)

//   const { menuitem } = useSelector(state => state.dashboardReducer);
//   console.log(menuitem);

//   useEffect(() => {
//      if(menuitem)
//      {

//     axios.get(`http://127.0.0.1:8000/api/detail/${menuitem||1}`).then(
//       (res) => {
//         console.log(res);
//         setDetaildata(res.data);
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//      }
//   }, [menuitem]);
//   useEffect(() => {

//    axios.get(`http://127.0.0.1:8000/api/detail/${1}`).then(
//      (res) => {
//        console.log(res);
//        setDetaildata(res.data);
//      },
//      (error) => {
//        console.log(error);
//      }
//    );

//  }, []);

//   return (
//       <>
//       {detaildata.length>0&&
//       <>
//     <Box py={4}>
//             <Grid container direction='row' justifyContent='center'>
//                 <Grid item>
//                     <Typography variant='h6'>
//                         Detail View
//                     </Typography>
//                 </Grid>

//             </Grid>
//             </Box>

//     <form autoComplete="off">
//       <Grid container direction="row" xs={12} spacing={4}>
//         {detaildata.map((item, ind) => {
//           return (
//             <>
//               {Object.keys(item).map((list) => {
//                 return (
//                   <Grid item xs={6}>
//                     <TextField

//                       label="Feature Name"
//                       multiline
//                       InputProps={{

//                         disableUnderline: !edit, // <== added this
//                       }}
//                       label={list}
//                       rows={
//                         list ==="Source_Code" ||
//                         list ==="Target_ActualCode" ||
//                         list ==="Target_Expected_Output" ||
//                         list ==="Conversion_Code"||list==="Conversion_Description "||list==="Target_FeatureDescription"||list==="Source_FeatureDescription "

//                           ? 10
//                           : 1
//                       }
//                     //   rows={1}
//                       value={item[list]}
//                       // defaultValue="Default Value"
//                       // onChange={handleFeaturename}
//                       variant={ !edit? "standard":"outlined" }// <== changed this
//                       required
//                       fullWidth
//                       disabled
//                     />
//                   </Grid>
//                 );
//               })}
//             </>
//           );
//         })}
//       </Grid>

//       <Box py={5}>

// <Grid container direction='row ' justifyContent='center' spacing={2}>

//     <Grid item>
//         <Button
//             // type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             // className={classes.submit}
//             onClick={()=>setedit(!edit)}

//         >
//             Edit
//         </Button>
//     </Grid>
//     <Grid item>
//         <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             // className={classes.submit}
//             // onClick={handleSubmit}

//         >
//             Submit
//         </Button>
//     </Grid>
// </Grid>
// </Box>
//     </form>

//     </>}
//     </>
//   );
// }












// <Grid item xs={12} sm={12} md={12} lg={12}>
//             <Typography
//               gutterBottom
//               variant="h5"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Source Attachments
//             </Typography>


//             <Grid container direction='row' spacing={0}>
//               <Grid item spacing={3} >
//                 {/* {detaildata.length>?} */}
//                 {detaildata[0]?.Source_Attachment?.split('/')?.pop()}
//               </Grid>
//               {detaildata[0].Source_Attachment ?
//                 <Grid item spacing={3} style={{ paddingLeft: 20 }}>
//                   <Link onClick={() => handleDownload(detaildata[0].Source_Attachment)} style={{ textDecoration: 'none' }}>Download</Link>

//                 </Grid>
//                 : null}
//             </Grid>


//           </Grid>
//           <Grid item xs={12} sm={12} md={12} lg={12}>
//             <Typography
//               gutterBottom
//               variant="h5"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Target Attachments
//             </Typography>
//             <Grid container direction='row' spacing={0}>
//               <Grid item spacing={3} >
//                 {/* {detaildata.length>?} */}
//                 {detaildata[0]?.Target_Attachment?.split('/')?.pop()}
//               </Grid>
//               {detaildata[0].Target_Attachment ?
//                 <Grid item spacing={3} style={{ paddingLeft: 20 }}>
//                   <Link onClick={() => handleDownload(detaildata[0].Target_Attachment)} style={{ textDecoration: 'none' }}>Download</Link>

//                 </Grid>
//                 : null}
//             </Grid>
//           </Grid>
//           <Grid item xs={12} sm={12} md={12} lg={12}>
//             <Typography
//               gutterBottom
//               variant="h5"
//               component="h2"
//               className={classes.Object_Type}
//             >
//               Conversion Attachments
//             </Typography>
//             <Grid container direction='row' spacing={0}>
//               <Grid item spacing={3} >
//                 {/* {detaildata.length>?} */}
//                 {detaildata[0]?.Conversion_Attachment?.split('/')?.pop()}
//               </Grid>
//               {detaildata[0].Conversion_Attachment ?
//                 <Grid item spacing={3} style={{ paddingLeft: 20 }}>
//                   <Link onClick={() => handleDownload(detaildata[0].Conversion_Attachment)} style={{ textDecoration: 'none' }}>Download</Link>

//                 </Grid>
//                 : null}
//             </Grid>
//           </Grid>




