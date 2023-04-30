import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { CoinList } from '../config/api';
import axios from 'axios';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme, makeStyles, } from '@material-ui/core';
import { numberWithCommas } from '../components/Carousel';
import {Pagination} from '@material-ui/lab';
import { Link } from 'react-router-dom';
import "./CoinTable.css"


const useStyles = makeStyles(()=>({
    row:{
        cursor:"pointer",
        "&:hover":{
            backgroundColor:"skyblue"
        },
        fontFamily:"Montserrat"
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold"
        }
    }
}))
const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const {symbol,currency} = CryptoState();
    console.log(coins);

    const fetchingCoins = async()=>{
        setLoading(true)
        const {data} = await axios.get(CoinList(currency))
        setLoading(false)
        setCoins(data)
    }

    useEffect(()=>{
        fetchingCoins()
    },[currency])


    const handleSearch = ()=>{
        return coins.filter((coin)=>(
            coin.name.toLowerCase().includes(search) || 
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    const classes = useStyles();

  return (
    <div className='table'>
        <Container style={{textAlign:"center"}}>
            <Typography
            variant='h4'
            style={{margin:18, fontFamily:"Montserrat"}}>
                Cryptocurrency Prices by Market cup
            </Typography>
            <TextField label="Search For a Crypto Currency..." variant="filled"
            style={{marginBottom:20,
             width:"100%", borderRadius:"5px", border:"1px solid white",}}
             onChange={(e)=> setSearch(e.target.value)}  />

             <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{backgroundColor:"gold"}} />
                    ):(
                        <Table>
                            <TableHead style={{backgroundColor:"#EEBC1D",  }} >
                                <TableRow>
                                    {["Coin","Price", "24h Change", "Market Cap"].map((head)=>(
                                        <TableCell style={{color:"white", fontWeight:"700", fontFamily:"Montserrat"}}
                                        key={{head}} align={head === "Coin"? "": "right"}  >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                .slice((page-1)*10,(page-1)*10 + 10)
                                .map((row)=>{
                                    const profit = row.price_change_percentage_24h > 0;
                                    console.log(row)
                                    // to={`/coins/${coin.id}`}
                                    return (
                                        <TableRow className={classes.row} key={row.name} >
                                           <Link to={`/coins/${row.id}`}  ><TableCell component="th"
                                            scope='row'
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                alignItems:"flex-start",
                                                justifyContent:"flex-start",
             
                                                gap:15
                                            }} >
                                                <img src={row?.image} alt={row.name} height="50" style={{marginBottom: 10}} />
                                                <div style={{display:"flex", flexDirection:"column"}} >
                                                    <span style={{textTransform:"uppercase", fontSize:22, color:"white" }} >{row.symbol}</span>
                                                    <span style={{color:"darkgray"}} >{row.name}</span>
                                                </div>
                                            </TableCell> </Link>
                                            <TableCell align="right" style={{color:"white"}} >
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align="right" style={{color:profit > 0 ? "rgb(14, 283 ,129)":"red", fontWeight:500}}>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align='right' style={{color:"white"}} >
                                                {symbol}{" "}
                                                {numberWithCommas(row.market_cap.toString().slice(0,-6))}
                                            </TableCell>
                            
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    )
                }
             </TableContainer>
             <Pagination
             style={{
                padding:20,
                width:"100%",
                display:"flex",
                justifyContent:"center"
             }}
             classes={{ul: classes.pagination}}
             count={(handleSearch()?.length / 10).toFixed(0)}
             onChange={(_, value)=>{
                setPage(value);
                window.scroll(0,450)
             }}
             />
        </Container>
        </div>
  )
}

export default CoinsTable