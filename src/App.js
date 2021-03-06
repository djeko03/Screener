import './App.css';
import axios from 'axios'
import {useEffect, useMemo, useState} from "react";
import {coinNames} from "./coin-names";
import {Coin} from "./components/coin";


export const App = () => {

    const [myAllCoins, setMyAllCoins] = useState([])
    const [downloaded, setDownloaded] = useState(false)
    const [purchaseVolume, setPurchaseVolume] = useState(false)
    const [salesVolume, setSalesVolume] = useState(false)
    const [asksPercent, setAsksPercent] = useState(false)
    const [bidsPercent, setBidsPercent] = useState(false)

    let myCoins = []
    // function calcAsksVolume (str) {
    //     if (str.length === 5) {
    //         str = str[0] + str[1] + 'K'
    //         return str
    //     } if (str.length === 6) {
    //         str = str[0] + str[1] + str[2] + 'K'
    //         return str
    //     } if (str.length === 7) {
    //         str = str[0] + '.' + str[1] + 'M'
    //         return str
    //     } if (str.length === 8) {
    //         str = str[0] + str[1] + '.' + str[2] + 'M'
    //         return str
    //     } else {
    //         return str
    //     }
    // }


    const computeExpensiveValue = () => {
        try {
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
                                            // asksVolume: calcAsksVolume(String(parseInt(res.data.asks[0][0]*res.data.asks[0][1]))),
                                            asksVolume: parseInt(res.data.asks[0][0]*res.data.asks[0][1]),
                                            bidsVolume: parseInt(res.data.bids[0][0]*res.data.bids[0][1]),
                                            price:resp.data.price,
                                            asksPercent: (100 - (resp.data.price / res.data.asks[0][0] * 100)),
                                            bidsPercent: (100 - (resp.data.price / res.data.bids[0][0] * 100))
                                        }))

                        })
                }

            ))
        } catch (e) {
            console.log(e)
        }
        setMyAllCoins(myCoins)
        console.log(myAllCoins)
    }

    const memoizedValue = useMemo(() => computeExpensiveValue, []);

    useEffect(() => {
        computeExpensiveValue()
    }, [setDownloaded])

    const sortAsksCount = () => {
        myAllCoins.sort((a, b) => b.asksVolume - a.asksVolume)
        setDownloaded(!downloaded)
        setPurchaseVolume(true)
        setSalesVolume(false)
        setBidsPercent(false)
        setAsksPercent(false)
    }
    const sortBidsCount = () => {
        myAllCoins.sort((a, b) => b.bidsVolume - a.bidsVolume)
        setDownloaded(!downloaded)
        setSalesVolume(true)
        setPurchaseVolume(false)
        setBidsPercent(false)
        setAsksPercent(false)
    }

    const sortAsksPercent = () => {
        myAllCoins.sort((a, b) => a.asksPercent - b.asksPercent)
        setDownloaded(!downloaded)
        setAsksPercent(true)
        setBidsPercent(false)
        setPurchaseVolume(false)
        setSalesVolume(false)
    }
    const sortBidsPercent = () => {
        myAllCoins.sort((a, b) => b.bidsPercent - a.bidsPercent)
        setDownloaded(!downloaded)
        setBidsPercent(true)
        setAsksPercent(false)
        setPurchaseVolume(false)
        setSalesVolume(false)
    }


    return (
    <div className='App'>
        <button
            className='showBtn'
            onClick={() => {
                setTimeout(() => {
                    setDownloaded(!downloaded)
                },1000)
            }}>show
        </button>
        <span style={{marginLeft:'30px', fontWeight:'600'}} className='coinsNumber'>???????????????????? ?????????? : {myAllCoins.length}</span>
        <span
            style={{marginLeft:'30px', fontWeight:'600'}}
        >
            <span style={{color:'black'}}>???????????????????? :</span>
            {purchaseVolume ? '?????????? ??????????????': ''}
            {salesVolume ? '?????????? ??????????????' : ''}
            {asksPercent ? '% ???? ???????????? ??????????????': ''}
            {bidsPercent ? '% ???? ???????????? ??????????????' : ''}
        </span>
        <div className='titles'>
            <div className='title'>????????????????</div>
            <div className='title'>???????? ??????????????:</div>
            <div className='title title-cursor' onClick={() => sortAsksCount()}>?????????? ?????????????? ?? $</div>
            <div className='title title-cursor' onClick={() => sortAsksPercent()}>???? ???????????? %</div>
            <div className='title'>???????? ??????????????:</div>
            <div className='title title-cursor' onClick={() => sortBidsCount()}>?????????? ?????????????? ?? $</div>
            <div className='title title-cursor' onClick={() => sortBidsPercent()}>???? ???????????? %</div>
        </div>
        {
            myAllCoins ?
                myAllCoins.map(coin =>
                <Coin
                    key={Math.random()}
                    coin={coin}
                />
            )
            : 'Error'
        }
    </div>
  );
}

