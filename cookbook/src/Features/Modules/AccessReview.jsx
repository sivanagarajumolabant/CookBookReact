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


  return (
    <>


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
              User Permissions
            </Typography>
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
                    <StyledTableCell align="left">Created at</StyledTableCell>
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