import { Box, Grid, TextField, Typography, styled } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useSelector } from 'react-redux';
import axios from "axios";
import config from "../../Config/config";
import { TableContainer } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import Button from '@material-ui/core/Button';


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
      width: '20ch',
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


export default function AccessReview() {
  const classes = useStyles();
  const classestable = useStylestable();
  const [isData, setIsData] = useState(true);
  const { details, createFeature, preview, editpreview, editPreviewdetails, headerValue } = useSelector(state => state.dashboardReducer);
  const [migtypeid, setMigtypeid] = useState(headerValue?.title)
  const [objtype, setObjtype] = useState('Procedure')
  const [fnnames, setFnnames] = useState([])
  const [data, setData] = useState([])
  const [objtypeslist, setObjtypeslist] = useState([])
  const [grant_user, setGrant_user] = useState()
  const [userslist, setUserslist] = useState([])
  const [selecetd, setSelected] = useState(false)
  const [useremail, setuseremail] = useState()


  useEffect(() => {
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
    let body = {
      "Object_Type": objtype,
      "Migration_TypeId": headerValue?.title,
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


  useEffect(() => {
    let conf = {
      headers: {
        Authorization: "Bearer " + config.ACCESS_TOKEN(),
      },
    };

    let body = {
      "Migration_TypeId": headerValue?.title,
    };

    const form = new FormData();
    Object.keys(body).forEach((key) => {
      form.append(key, body[key]);
    });
    axios.get(`${config.API_BASE_URL()}/api/permissionslist/`, form, conf).then(
      (res) => {

        setObjtypeslist(res.data)

      },
      (error) => {
        console.log(error);
      }
    );
  }, [headerValue?.title]);


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



  return (
    <>
      <Box py={1} px={1}>
        <Grid container direction='row' justifyContent='center'>
          <Grid item>
            <Typography variant='h6'>
              User Permissions
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box py={2} px={2}>
        <Grid container direction='row' spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="outlined-multiline-static"
              label="Migration Type"
              name="MigrationType_Id"
              className={classes.textField}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              value={headerValue?.title}
              size="small"
              disabled
              style={{ width: 300 }}
            />
          </Grid>
          <Grid item xs={4}>
            <StyledAutocomplete
              size="small"
              id="grouped-demo"
              className={classes.inputRoottype}
              options={userslist}
              groupBy={""}
              getOptionLabel={(option) => option.email}
              style={{ width: 300 }}
              onChange={(e, v) => setuseremail(v?.email)}
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

          <Grid>
            <Button
              variant="contained"
              color="primary"
              component="span"
              style={{ marginTop: 8, marginLeft: 40 }}
            // onClick={() => handlesuperadmincreation()}
            >
              {" "}
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>



      <Box py={2} px={2}>
        <Grid container xl={12} justifyContent="space-between" spacing={3}>
          <Grid item xs={12}>
            <TableContainer className={classestable.table}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead className={classes.primary}>
                  <TableRow>
                    <StyledTableCell align="left">User Email-ID</StyledTableCell>
                    <StyledTableCell align="left">Migration Type</StyledTableCell>
                    <StyledTableCell align="left">Object Type</StyledTableCell>
                    <StyledTableCell align="left">Feature Name</StyledTableCell>
                    <StyledTableCell align="left">Access Type</StyledTableCell>
                    <StyledTableCell align="left">Approved by</StyledTableCell>
                    <StyledTableCell align="left">Created date</StyledTableCell>
                    <StyledTableCell align="left">Expiry date</StyledTableCell>
                    {/* <StyledTableCell align="left">Roles</StyledTableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isData ? (
                    <>
                      {objtypeslist.map((item) =>
                        <StyledTableRow container>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.User_Email}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Migration_TypeId}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Object_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Feature_Name}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Access_Type}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Approved_by}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Created_at}
                            </div>
                          </StyledTableCell>
                          <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Expiry_date}
                            </div>
                          </StyledTableCell>
                          {/* <StyledTableCell item xl={8}>
                            <div className={classes.texttablecell}>
                              {item.Roles}
                            </div>
                          </StyledTableCell> */}
                        </StyledTableRow>
                      )}
                    </>
                  )
                    : <>
                      <StyledTableRow container>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center">No Requests</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </StyledTableRow>
                    </>
                  }


                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

        </Grid>
      </Box>
    </>
  )
}