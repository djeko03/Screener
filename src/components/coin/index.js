import React from 'react';
import css from './index.module.css'
import cn from 'classnames'

export const Coin = ({
                         coin,
                     }) => {

    return (
        <div className={css.coin}>
            <div className={css.allBlocks}>{coin.name}</div>
            <div className={cn(css.allBlocks, css.asksBorder)}>{parseFloat(coin.asks[0])}</div>
            <div className={cn(css.allBlocks, css.asksVolumeBorder)}>{coin.asksVolume}</div>
            <div className={cn(css.allBlocks, css.asksBorder)}>{coin.asksPercent.toFixed(2)} %</div>
            <div className={cn(css.allBlocks, css.bidsBorder)}>{parseFloat(coin.bids[0])}</div>
            <div className={cn(css.allBlocks, css.bidsVolumeBorder)}> {coin.bidsVolume}</div>
            <div className={cn(css.allBlocks, css.bidsBorder)}>{coin.bidsPercent.toFixed(2)} %</div>
        </div>
    );
};

