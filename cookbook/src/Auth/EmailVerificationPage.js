// import { useEffect } from "react"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import config from '../Config/config';
import { Grid } from "@material-ui/core";
import { Box } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
// import SmsFailedIcon from '@material-ui/icons/SmsFailed';
import CancelIcon from '@material-ui/icons/Cancel';



const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: theme.spacing(1),
        //   backgroundColor: theme.palette.secondary.main,
        backgroundColor: 'green',
        marginTop: 0,
        marginLeft: 160,
        marginBottom: 30,
    },
    avatar1: {
        margin: theme.spacing(1),
        //   backgroundColor: theme.palette.secondary.main,
        backgroundColor: 'red',
        marginTop: 0,
        marginLeft: 160,
        marginBottom: 30,
    },
}));


export default function EmailVerify(props) {
    const classes = useStyles();
    const token = props.location.search;
    const [msg, setMsg] = useState('')
    console.log(token)

    useEffect(() => {

        axios.get(`${config.API_BASE_URL()}/api/email-verify/?token=${token}`).then(
            (res) => {
                console.log(res.data)
                setMsg(res.data.msg)
            },
            (error) => {
                console.log(error);
                setMsg(error.response.data.msg)
            }
        )
    }, [])

    var display = null;
    if (msg === 'Sucessfully Email Confirmed! Please Login') {
        display = <div style={{ marginLeft: '30%', marginTop: '100px', width: '40%', justifyContent: 'center' }}>
            <Box color="Black" bgcolor="skyblue" p={9}>
                <Grid container direction="row" spacing={4}>
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar}>
                            <CheckIcon />
                        </Avatar>
                        <center>{msg}</center>
                    </Grid>
                    <Grid container justifyContent='center' direction='row'>
                        <center>
                            <Grid item xs  >
                                <Button href="/" variant="body2">
                                    Login?
                                </Button>
                            </Grid>
                            {/* <Grid item xs >
                                <Button href="#" variant="body2">
                                    Resend Email
                                </Button>
                            </Grid> */}
                        </center>
                    </Grid>
                </Grid>
            </Box>
        </div>

    } else {
        display = <div style={{ marginLeft: '30%', marginTop: '100px', width: '40%', justifyContent: 'center' }}>
            <Box color="Black" bgcolor="skyblue" p={9}>
                <Grid container direction="row" spacing={4}>
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar1}>
                            {/* <CheckIcon /> */}
                            <CancelIcon/>
                        </Avatar>
                        <center>{msg}</center>
                    </Grid>
                    <Grid container justifyContent='center' direction='row'>
                        <center>
                            {/* <Grid item xs  >
                                <Button href="/" variant="body2">
                                    Login?
                                </Button>
                            </Grid> */}
                            <Grid item xs >
                                <Button href="#" variant="body2">
                                    Resend Email?
                                </Button>
                            </Grid>
                        </center>
                    </Grid>
                </Grid>
            </Box>
        </div>
    }
    return (
        <>
            {display}
        </>
    )
}