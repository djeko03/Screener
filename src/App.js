import './App.css';
import axios from 'axios'
import {useEffect, useMemo, useState} from "react";
import {coinNames} from "./coin-names";


export const App = () => {

    const [myAllCoins, setMyAllCoins] = useState([])
    const [downloaded, setDownloaded] = useState(false)
    let myCoins = []



    const computeExpensiveValue = () => {
        axios.all(coinNames.map(coinName => {
                axios.get(`https://api.binance.com/api/v3/depth?symbol=${coinName}`)
                    .then(res => {
                        res.data.asks.sort((a,b) => b[1] - a[1])
                        res.data.bids.sort((a,b) => b[1] - a[1])
                        axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinName}`)
                           .then(resp =>
                               myCoins.push(
                                   {
                                       name: coinName,
                                       asks: res.data.asks[0],
                                       bids: res.data.bids[0],
                                       asksVolume: parseInt(res.data.asks[0][0]*res.data.asks[0][1]),
                                       bidsVolume: parseInt(res.data.bids[0][0]*res.data.bids[0][1]),
                                       price:resp.data.price
                                   }))

                    })
            }

        ))
        setMyAllCoins(myCoins)
    }

    const memoizedValue = useMemo(() => computeExpensiveValue, []);

    useEffect(() => {
        computeExpensiveValue()
    }, [setDownloaded])

    const calculateLevel = (price, askPrice) => {
        const result=(100 - (price / askPrice * 100))
        return result.toFixed(2)
    }

    const sortAsksCount = () => {
        myAllCoins.sort((a, b) => b.asksVolume - a.asksVolume)
        setDownloaded(!downloaded)
    }
    const sortBidsCount = () => {
        myAllCoins.sort((a, b) => b.bidsVolume - a.bidsVolume)
        setDownloaded(!downloaded)
    }


    return (
    <div className='App'>
        <button onClick={() => {
            setTimeout(() => {
                setDownloaded(!downloaded)
            },1000)
        }}>show</button>
        <p>Количество монет : {myAllCoins.length}</p>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{width:'11%', fontWeight:'700', opacity:'0'}}>Название</div>
            <div style={{width:'11%', fontWeight:'700'}}>Цена покупки:</div>
            <div style={{width:'11%', fontWeight:'700', cursor:'pointer'}} onClick={() => sortAsksCount()}>Объем покупки в $</div>
            <div style={{width:'11%', fontWeight:'700'}}>До уровня %</div>
            <div style={{width:'11%', fontWeight:'700'}}>Цена продажи:</div>
            <div style={{width:'11%', fontWeight:'700', cursor:'pointer'}} onClick={() => sortBidsCount()}>Объем продажи в $</div>
            <div style={{width:'11%', fontWeight:'700'}}>До уровня %</div>
        </div>
        {
            myAllCoins ?
                myAllCoins.map(coin =>
                <div style={{marginTop:'3px', display:'flex', justifyContent:'space-between'}} key={coin.asks[1]}>
                    <div style={{width:'11%', fontWeight:'800'}}>{coin.name}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}>{coin.asks[0]}</div>
                    <div style={{width:'11%', border: '2px solid green', paddingLeft: '15px'}}> {coin.asksVolume}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}>{calculateLevel(coin.asks[0], coin.price)} %</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}>{coin.bids[0]}</div>
                    <div style={{width:'11%', border: '2px solid red', paddingLeft: '15px'}}> {coin.bidsVolume}</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}>{calculateLevel(coin.bids[0], coin.price)} %</div>
                </div>
            )
            : 'Error'
        }
    </div>
  );
}

