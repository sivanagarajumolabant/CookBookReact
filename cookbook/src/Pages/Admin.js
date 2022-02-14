import React from 'react'
import AdminPage from '../Components/AdminPage'
import { makeStyles } from '@material-ui/core/styles';
import Home from '../Features/Home';

const useStyles = makeStyles({
    adminpage: {
        right:0,
        position:'fixed',
        // width:"50%",
      minWidth: 1290,
    },
  });
  

const Admin = () => {
    const classes = useStyles();

  return (
      <>
      <Home/>
    <div className={classes.adminpage}>
        <AdminPage/>
    </div>
    </>
  )
}

export default Admin