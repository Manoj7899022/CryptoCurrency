import React, { useState,createContext, useContext, } from 'react'
import { Avatar, Button, Grid, Link, Paper, Typography} from "@material-ui/core"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { TextField } from '@mui/material';
import axios from 'axios';
import './Login.css'
import img1  from './imges/img1 (2).jpg'

const Login = () => {
  const [login, setLogin] = useState(true)
  const [ username, setUsername] = useState("");
  const [ password, setPassword] = useState("");
  const [ email, setEmail] = useState("");
  const [data, setData] = useState("");
  // console.log(data)

  localStorage.setItem("token", data);


  const handleLogin = (e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    if(email !== "", password !== ""){
      axios .post("http://localhost:8000/api/auth/login", {email:email, password:password})
            .then(res=> setData(res.data.accessToken), alert("SignIn successful..."),
            setEmail(""),
            setPassword(""))
            .catch(err => console.log(err.message))
            window.location.reload();
      } else{
        alert("All fields are mandatory...")
      }

    setEmail("")
    setPassword("")
  }
   const handleSignIn = async(e) =>{
    e.preventDefault()
    console.log(email)
    console.log(password)
    console.log(username)
    if(email !== "", password !== "", username !== ""){
    axios .post("http://localhost:8000/api/auth/signup", {username: username, email:email, password:password})
          .then(res=> console.log(res.data), alert("Signup successful..."),setUsername(""),
          setEmail(""),
          setPassword(""),)
          .catch(err => console.log(err.message))
          
    } else{
      alert("All fields are mandatory...")
    }
    
  }

  const paperStyle = { height:"auto", width:400,padding:"20px",backgroundColor:"rgba(236, 246, 245, 0.904)"   }
  return (
      <div className='loginbg' >
      {login ? (
        <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center" >
          <Avatar style={{height:"50px", width:"50px"}} ><img src={img1} alt="img" style={{height:"65px"}} /></Avatar>
          <h2>LOGIN</h2>  
          </Grid>
          <TextField label="Email" placeholder='Enter Email' fullWidth required style={{paddingBottom:"10px"}} onChange={(e)=> setEmail(e.target.value)} />
          <TextField label="Password" placeholder='Enter Password' type='password' fullWidth required style={{paddingBottom:"10px"}} onChange={(e)=> setPassword(e.target.value)} />
          <Button type='submit' variant="contained" color='primary' fullWidth style={{paddingBottom:"10px"}} onClick={handleLogin} >LOGIN</Button>
          <Typography style={{marginTop:"10px"}} >
            Create an account ?
            <Link  onClick={()=> setLogin(!login)} style={{cursor:"pointer"}} >
            Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
      ) :(
        // style={avtarStyle}
        <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align="center" >
          <Avatar  ><LockOutlinedIcon /></Avatar>
          <h2>SIGN UP</h2>  
          </Grid>
          <TextField label="Username" placeholder='Enter Username' fullWidth required style={{paddingBottom:"10px"}}  onChange={(e)=> setUsername(e.target.value)} />
          <TextField label="Email" placeholder='Enter Email' fullWidth required style={{paddingBottom:"10px"}}  onChange={(e)=> setEmail(e.target.value)} />
          <TextField label="Password" placeholder='Enter Password' type='password' fullWidth required style={{paddingBottom:"10px"}} onChange={(e)=> setPassword(e.target.value)} />
          <Button type='submit' variant="contained" color='primary' fullWidth style={{paddingBottom:"10px"}} onClick={handleSignIn} >SIGNUP</Button>
          <Typography style={{marginTop:"10px"}} >
            Already SignUp ?
            <Link onClick={()=> setLogin(!login)} style={{cursor:"pointer"}} >
              LogIn Here
            </Link>
          </Typography>
        </Paper>
      </Grid>
      )
}
      </div>
  )
}

export default Login
