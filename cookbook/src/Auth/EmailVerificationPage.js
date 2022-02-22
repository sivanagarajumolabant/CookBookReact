// import { useEffect } from "react"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import config from '../Config/config';
import { Grid } from "@material-ui/core";
import Link from '@material-ui/core/Link';


export default function EmailVerify(props) {
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
    return (
        <>
            <Grid container direction="row" spacing={0}>
                <Grid item xs={12} style={{ marginTop: 100 }}>

                    <center>{msg}</center>
                </Grid>
                <Grid container justifyContent='center' direction='row'>
                    <center>
                        <Grid item xs >

                            <Link href="/" variant="body2">
                                Login?
                            </Link>
                            {" "}
                            <Link href="#" variant="body2">
                                Resend Email
                            </Link>

                        </Grid>

                    </center>
                </Grid>
            </Grid>

        </>
    )
}