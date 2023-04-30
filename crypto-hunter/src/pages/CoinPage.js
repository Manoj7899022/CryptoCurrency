import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import axios from 'axios'
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography, makeStyles } from '@material-ui/core';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { numberWithCommas } from '../components/Carousel';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme)=>({
  container : {
    display:"flex",
    [theme.breakpoints.down("md")]:{
      flexDirection :"column",
      alignItems:"center"
    }
  },
  sidebar:{
    width:"25%",
    [theme.breakpoints.down("md")]:{
      width:"100%"
    },
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginTop:25,
    borderRight:"2px solid grey",
    backgroundColor: "rgb(28, 28, 28)",
    color:"white",
    marginTop:"1px",
    paddingTop:"30px"
  },
  heading:{
    fontWeight:"bold",
    marginBottom:20,
    fontFamily:"Montserrat"
  },
  description:{
    width:"100%",
    fontFamily:"Montserrat",
    padding:25,
    paddingBottom:15,
    paddingTop:0,
    textAlign:"justify"
  },
  marketData :{
    alignSelf:"start",
    width:"100%",
    fontFamily:"Montserrat",
    padding: 25,
    paddingTop: 10,
    //Making it responsive
    [theme.breakpoints.down("md")]:{
      display:"flex",
      justifyContent:"space-around"
    },
    [theme.breakpoints.down("sm")]:{
      flexDirection:'column',
      alignItems:"center",
    },
    [theme.breakpoints.down("xs")]:{
      alignItems:"start"
    },
  }
}))

const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState({});
  const {symbol,currency} = CryptoState();
  // console.log(coin);
  let Market_cap = numberWithCommas(coin?.market_data?.market_cap[currency.toLowerCase()].toString().slice(0, -6))
  let current_price = numberWithCommas(coin?.market_data?.current_price[currency.toLowerCase()])
  const fetching =async()=>{
    const { data } = await axios.get(SingleCoin(id))
    // console.log(data)
    setCoin(data)
  }

  useEffect(()=>{
    fetching();
  },[])

  const classes = useStyles();
  if(!coin) return <LinearProgress style={{backgroundColor:"gold"}} />
  return (
    <div className={classes.container}>
          <div className={classes.sidebar} >
          <img src={coin.image?.large} alt={coin?.name} height={200} style={{marginBottom:20}} />
          <Typography variant="h3" className={classes.heading}>
             {coin?.name}
           </Typography>
           <Typography variant="subtitle1" className={classes.description}>
             {ReactHtmlParser(coin.description?.en.split(". ")[0])}.
           </Typography>
           <div className={classes.marketData} >
              <span style={{display:"flex"}} >
                <Typography variant='h5' className={classes.heading} >
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat"}} >
                  {coin?.market_cap_rank}
                </Typography>
              </span>

              <span style={{display:"flex"}} >
                <Typography variant='h5' className={classes.heading} >
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat"}} >
                  {symbol}{" "}
                  {current_price}
                </Typography>
              </span>
              
              <span style={{display:"flex"}} >
                <Typography variant='h5' className={classes.heading} >
                  Market cap:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant='h5' style={{fontFamily:"Montserrat"}} >
                  {symbol}{" "}
                  {Market_cap}
                </Typography>
              </span>
           </div>
           </div>
           
      <CoinInfo coin={coin} />
    </div>
    
  )
}

export default CoinPage