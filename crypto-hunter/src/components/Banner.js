import React from 'react'
import {Container, Typography, makeStyles} from '@material-ui/core'
import Carousel from './Carousel';
import imgs from './logo512.png'
import './Banner.css'


const useStyles = makeStyles(()=>({
    banner:{
        margin:"0px 40px",
        width:"80%",
    },
    bannerContent: {
        height:400,
        display:"flex",
        flexDirection:"column",
        padding:25,
        justifyContent:"space-around"
    },
    tagline :{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center"
    }
}))

const Banner = () => {
    const classes = useStyles();
  return (
    <div className='caro' >
    <div className={classes.banner} style={{backgroundImage:"https://images.unsplash.com/photo-1640340434855-6084b1f4901c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"}} >
        <Container className={classes.bannerContent} >
        <div className={classes.tagline}>
            <Typography
                variant='h2'
                style={{
                    fontFamily:"Montserrat",
                    fontWeight:"bold",
                    marginBottom: 15
                }}
            >
                Crypto Hunter
            </Typography>
            <Typography
            variant='subtitle2'
            style={{
                color:"darkgray",
                textTransform:"capitalize",
                fontFamily:"Montserrat"
            }}
            >
                Get all the info regarding your favorite Crypto Currency
            </Typography>
        </div>
        <Carousel/>
        </Container>
    </div>
    </div>
  )
}

export default Banner