import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {CryptoState} from '../CryptoContext'
import { TrendingCoins } from '../config/api'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(()=>({
    carousel: {
        height :"50%",
        display:"flex",
        alignItems:"center"
    },
    carouselItem:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        color:"white"
    }
}))

export function numberWithCommas(x){
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return x
}

const Carousel = () => {
    const classes = useStyles();
    const {symbol,currency} = CryptoState();
    const [trending, setTrending] = useState([])
    const fetchTrendingCoins = async() =>{
        const {data} = await axios.get(TrendingCoins(currency))
        setTrending(data);
    }

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);

    const  items = trending.map((coin)=>{
        const profit = coin.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}  >
                <img src={coin?.image} 
                alt={coin.name}
                 style={{marginBottom:10, 
                 height:90}}
                  />
                    <span>{coin?.symbol}
                        &nbsp;
                        <span
                        style={{
                            color: profit > 0 ? "rgba(14, 203, 129)" :"red",
                            fontWeight:500,
                        }}
                        >
                        {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
                        </span>
                    </span>
                    <span>
                        {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
            </Link>   
        )  
    })


    const responsive = {
        0:{
            items:2
        },
        512:{
            items:4
        }
    }

  return (
    
    <div className={classes.carousel} >
        <AliceCarousel
         mouseTracking 
         infinite
         autoPlayInterval={1000}
         animationDuration = {1500}
         disableDotsControls
         disableButtonsControls
         responsive = {responsive}
         autoPlay
         items={items} 
        />
     </div>
     
    
  )
}

export default Carousel