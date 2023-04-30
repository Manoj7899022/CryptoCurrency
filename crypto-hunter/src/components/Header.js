import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { CryptoState } from "../CryptoContext";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const handleSignOut = ()=>{
  localStorage.clear();
  window.location.reload();
}
const Header = () => {
  const classes = useStyles();


  const {setCurrency} = CryptoState()
  return (
    <div style={{backgroundColor: "rgb(28, 28, 28)", height:"60px"}} >
      <AppBar color="transparent" position="static">
        <Container   >
          <Toolbar style={{display:"flex", alignItems:"center", justifyContent:"space-between"}} >
            <div>
            <Link to="/" ><Typography className={classes.title}>Crypto Hunter</Typography></Link>
            </div>
            <div>
            <select
              onChange={(e)=> setCurrency(e.target.value)}
              style={{padding:"0px 3px", backgroundColor:"blue", color:"whitesmoke", height:"26px", borderRadius:"4px", cursor:"pointer",fontFamily: "Montserrat",fontWeight: "bold", border:"none"}}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
            <Button style={{color:"white", backgroundColor:"red", height:"25px", marginLeft:"10px",fontFamily: "Montserrat",fontWeight: "bold"}} onClick={handleSignOut} >Sign out</Button>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      </div>
  );
};

export default Header;
