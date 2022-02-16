// import { useEffect } from "react"
import React,{useEffect, useState} from 'react'
import axios from "axios";
import config from '../Config/config';


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
        <center>{msg}</center>
        </>
    )
}