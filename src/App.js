import './App.css';
import axios from 'axios'
import {useEffect, useMemo, useState} from "react";


export const App = () => {

    const [myAllCoins, setMyAllCoins] = useState([])
    const coinNames = ['BTCUSDT',
        'ETHUSDT',
        'BCHUSDT',
        'XRPUSDT',
        'EOSUSDT',
        'LTCUSDT',
        'TRXUSDT',
        'ETCUSDT',
        'LINKUSDT',
        'XLMUSDT',
        'ADAUSDT',
        'XMRUSDT',
        'DASHUSDT',
        'ZECUSDT',
        'XTZUSDT',
        'BNBUSDT',
        'ATOMUSDT',
        'ONTUSDT',
        'IOTAUSDT',
        'BATUSDT',
        'VETUSDT',
        'NEOUSDT',
        'QTUMUSDT',
        'IOSTUSDT',
        'THETAUSDT',
        'ALGOUSDT',
        'ZILUSDT',
        'KNCUSDT',
        'ZRXUSDT',
        'COMPUSDT',
        'OMGUSDT',
        'DOGEUSDT',
        'SXPUSDT',
        'KAVAUSDT',
        'BANDUSDT',
        'RLCUSDT',
        'WAVESUSDT',
        'MKRUSDT',
        'SNXUSDT',
        'DOTUSDT',
        'YFIUSDT',
        'BALUSDT',
        'CRVUSDT',
        'TRBUSDT',
        'YFIIUSDT',
        'RUNEUSDT',
        'SUSHIUSDT',
        'SRMUSDT',
        'EGLDUSDT',
        'SOLUSDT',
        'ICXUSDT',
        'STORJUSDT',
        'BLZUSDT',
        'UNIUSDT',
        'AVAXUSDT',
        'FTMUSDT',
        'HNTUSDT',
        'ENJUSDT',
        'FLMUSDT',
        'TOMOUSDT',
        'RENUSDT',
        'KSMUSDT',
        'NEARUSDT',
        'AAVEUSDT',
        'FILUSDT',
        'RSRUSDT',
        'LRCUSDT',
        'MATICUSDT',
        'OCEANUSDT',
        'CVCUSDT',
        'BELUSDT',
        'CTKUSDT',
        'AXSUSDT',
        'ALPHAUSDT',
        'ZENUSDT',
        'SKLUSDT',
        'GRTUSDT',
        '1INCHUSDT',
        'AKROUSDT',
        'CHZUSDT',
        'SANDUSDT',
        'ANKRUSDT',
        'LUNAUSDT',
        'BTSUSDT',
        'LITUSDT',
        'UNFIUSDT',
        'DODOUSDT',
        'REEFUSDT',
        'RVNUSDT',
        'SFPUSDT',
        'XEMUSDT',
        'COTIUSDT',
        'CHRUSDT',
        'MANAUSDT',
        'ALICEUSDT',
        'HBARUSDT',
        'ONEUSDT',
        'LINAUSDT',
        'STMXUSDT',
        'DENTUSDT',
        'CELRUSDT',
        'HOTUSDT',
        'MTLUSDT',
        'OGNUSDT',
        'NKNUSDT',
        'SCUSDT',
        'DGBUSDT',
        'SHIBUSDT',
        'ICPUSDT',
        'BAKEUSDT',
        'GTCUSDT',
        'TLMUSDT',
        'IOTXUSDT',
        'AUDIOUSDT',
        'RAYUSDT',
        'C98USDT',
        'MASKUSDT',
        'ATAUSDT',
        'DYDXUSDT',
        'XECUSDT',
        'GALAUSDT',
        'CELOUSDT',
        'ARUSDT',
        'KLAYUSDT',
        'ARPAUSDT',
        'CTSIUSDT',
        'LPTUSDT',
        'ENSUSDT',
        'PEOPLEUSDT',
        'ANTUSDT',
        'ROSEUSDT',
        'DUSKUSDT',
        'BTTCUSDT',
        'FLOWUSDT',
        'IMXUSDT']
    const [downloaded, setDownloaded] = useState(false)
    let myCoins = []
    console.log(myAllCoins)


    const computeExpensiveValue = () => {
        axios.all(coinNames.map(coinName => {
                axios.get(`https://api.binance.com/api/v3/depth?symbol=${coinName}`)
                    .then(res => {
                        res.data.asks.sort((a,b) => b[1] - a[1])
                        res.data.bids.sort((a,b) => b[1] - a[1])
                        axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinName}`)
                           .then(resp => myCoins.push({name: coinName, asks: res.data.asks[0], bids: res.data.bids[0], price:resp.data.price}))

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


    return (
    <div className='App'>
        <button onClick={() => {
            setTimeout(() => {
                setDownloaded(!downloaded)
                console.log(downloaded)
            },1000)
        }}>show</button>
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{width:'11%', fontWeight:'700'}}>Название</div>
            <div style={{width:'11%', fontWeight:'700'}}>Цена покупки:</div>
            <div style={{width:'11%', fontWeight:'700'}}>Количество:</div>
            <div style={{width:'11%', fontWeight:'700'}}>Объем покупки в $</div>
            <div style={{width:'11%', fontWeight:'700'}}>До уровня %</div>
            <div style={{width:'11%', fontWeight:'700'}}>Цена продажи:</div>
            <div style={{width:'11%', fontWeight:'700'}}>Количество:</div>
            <div style={{width:'11%', fontWeight:'700'}}>Объем продажи в $</div>
            <div style={{width:'11%', fontWeight:'700'}}>До уровня %</div>
        </div>
        {
            myAllCoins ?
                myAllCoins.map(coin =>
                <div style={{marginTop:'3px', display:'flex', justifyContent:'space-between'}} key={coin.asks[1]}>
                    <div style={{width:'11%'}}>{coin.name}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}>{coin.asks[0]}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}>{coin.asks[1]}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}> {coin.asks[0]*coin.asks[1]}</div>
                    <div style={{width:'11%', border: '1px solid green', paddingLeft: '15px'}}>{calculateLevel(coin.asks[0], coin.price)} %</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}>{coin.bids[0]}</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}>{coin.bids[1]}</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}> {coin.bids[0]*coin.bids[1]}</div>
                    <div style={{width:'11%', border: '1px solid red', paddingLeft: '15px'}}>{calculateLevel(coin.bids[0], coin.price)} %</div>
                </div>
            )
            : 'Error'
        }
    </div>
  );
}

