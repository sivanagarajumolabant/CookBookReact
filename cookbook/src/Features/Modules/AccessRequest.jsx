import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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


const useStylestable = makeStyles((theme) => ({
  table: {
    minWidth: 100,
    // width:10
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 300,

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

export default function Request() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [isData, setIsData] = useState(false);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue.title)
  const [objtype, setObjtype] = useState('Procedure')
  const [fnnames, setFnnames] = useState([])
  const [data, setData] = useState([])
  

  useEffect(() => {
    let sval = 0;
    if (headerValue) {
      if (headerValue.title === "Oracle TO Postgres") {
        sval = 1;
      } else if (headerValue.title === "SQLServer TO Postgres") {
        sval = 2;
      } else if (headerValue.title === "MYSQL TO Postgres") {
        sval = 3;
      }
    }
    let body = {
      "Object_Type": objtype,
      "Migration_TypeId": sval,
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


  // console.log(headerValue.title)
  const handleObjecttype = (v) => {
    setObjtype(v.title)
  }

  const handledropdown = (e,v) => {
    let conf = {
      headers: {
        'Authorization': 'Bearer ' + config.ACCESS_TOKEN()
      }
    }
    axios.get(`${config.API_BASE_URL()}/api/fdetail/${v.Feature_Id}`, conf).then(
      (res) => {
        setData(res.data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  return (
    <>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              Request
            </Typography>
          </Grid>
        </Grid>

      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' spacing={1}>

          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              // onChange={(e) => handleChange(e)}
              name='MigrationType_Id'
              // defaultValue="Default Value"
              // helperText={featurenamemsg}
              className={classes.textField}
              // helperText="Some important text"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={headerValue.title}
              size='small'
              disabled
              style={{ width: 300 }}

            />
          </Grid>
          <Grid item xs={4} >

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={[
                { title: "Procedure" },
                { title: "Function" },
                { title: "View" },
                { title: "Index" },
                { title: "Package" },
                { title: "Trigger" },
                { title: "Sequence" },
                { title: "Synonym" },
                { title: "Material View" },
                { title: "Type" },
                { title: "Table" },
                { title: "All" },

              ]}
              groupBy={""}
              defaultValue={{ title: "Procedure" }}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              onChange={(e, v) => handleObjecttype(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="ObjectType"
                  variant="outlined"
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle,
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={4}>

            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={fnnames}
              groupBy={""}
              // defaultValue={{ title: "Edit" }}
              getOptionLabel={(option) =>option.Feature_Name}
              style={{ width: 300 }}
              onChange={(e, v) => handledropdown(e, v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Feature Names"
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

          <Grid item xs={6}>


            <div className="App">
              <p>{'Source Description'}</p>
              <CKEditor
                editor={ClassicEditor}
                data={data?.Source_FeatureDescription}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   handletarget(data)
                //   // console.log( { event, editor, data } );
                // }}
                // onChange={(e) => setTarget_FeatureDescription(e.target.value)}

                // config={{
                //   extraPlugins: [uploadPlugin]
                // }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
                disabled
              />
            </div>

          </Grid>


          <Grid item xs={6}>


            <div className="App">
              <p>{'Target Description'}</p>
              <CKEditor
                editor={ClassicEditor}
                data={data?.Target_FeatureDescription}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   handletarget(data)
                //   // console.log( { event, editor, data } );
                // }}
                // onChange={(e) => setTarget_FeatureDescription(e.target.value)}

                // config={{
                //   extraPlugins: [uploadPlugin]
                // }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
                disabled
              />
            </div>

          </Grid>

        </Grid>
      </Box>
      <Box>
        <Grid container direction='row' justifyContent='center'>
          <Button variant="contained"
            // startIcon={<CloudUploadIcon />}
            color="primary" component="span" style={{ marginTop: 15 }}>
            Request Access

          </Button>
        </Grid>
      </Box>
    </>
  )
}