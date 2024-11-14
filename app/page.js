'use client';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import tokenList from '@/helpers/tokenList';
import TokenSelector from '@/components/tokenSelector';
import getProvider from '@/helpers/provider';

export default function Home() {
  const [isSwapping, setIsSwapping] = useState(false);
  const [fromToken, setFromToken] = useState(tokenList[0]);
  const [toToken, setToToken] = useState(tokenList[1]);
  const [showFromTokenSelector, setFromShowTokenSelector] = useState(false);
  const [showToTokenSelector, setToShowTokenSelector] = useState(false);
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  const [toTokenAmount, setToTokenAmount] = useState(0);
  const [wallet, setWallet] = useState(null);
  const [page, setPage] = useState(0);

  const provider = getProvider();

  async function connect_wallet() {
    try {
      const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      setWallet(resp.publicKey.toString());
    }catch(e){
      if(e.message == "provider.connect is not a function"){
        alert('Pantom wallet not found, please install and then try again.')
      }
      console.log(e.message)
    }
  }

  useEffect(() => {
    setToTokenAmount(fromTokenAmount * 2.23)
  }, [fromTokenAmount])

  return (
    <div className={styles.main}>
      <div className={styles.swap}>
        <div className={styles.header}>
          <p>SWAP <span>PRO</span></p>
        </div>
        {page == 0 ? <div className={styles.swap_form}>
          <div className={styles.swap_1}>
            <div className={styles.form_1}>
              <label>You Pay</label>
              <input type="text" className={styles.input_1} value={fromTokenAmount} onChange={(e) => setFromTokenAmount(e.target.value)}/>
              <div className={styles.amount_selectors}>
                <p onClick={() => setFromTokenAmount(39.78)}>25%</p>
                <p onClick={() => setFromTokenAmount(89.21)}>50%</p>
                <p onClick={() => setFromTokenAmount(109.32)}>Max</p>
              </div>
            </div>
            <div className={styles.side_box}>
              <div className={styles.emoji_selector_1} onClick={() => setFromShowTokenSelector(true)}>
                {fromToken.symbol}
              </div>
              <div className={styles.liqudity}>
              <span>Liq:</span> <span>{fromToken.liquidity}</span> <span>{tokenList[0].symbol}</span>
              </div>
            </div>
          </div>
          <div className='swapbutton'>
            <div className='btn' onClick={() => {
              let tempToToken = toToken;
              let tempToAmount = toTokenAmount;
              setToToken(fromToken);
              setFromToken(tempToToken);
              setToTokenAmount(fromTokenAmount);
              setFromTokenAmount(tempToAmount);
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokLinecap="round" strokLinejoin="round" class="lucide lucide-arrow-up-down w-4 h-4 text-black"><path d="m21 16-4 4-4-4"></path><path d="M17 20V4"></path><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path></svg>
            </div>
          </div>
          <div className={styles.swap_1}>
            <div className={styles.form_1}>
              <label>Receive</label>
              <input type="text" className={styles.input_1} value={toTokenAmount} onChange={(e) => setToTokenAmount(e.target.value)}/>
              <div className={styles.amount_selectors}>
                <p>${toToken.price}</p>
              </div>
            </div>
            <div className={styles.side_box}>
              <div className={styles.emoji_selector_1} onClick={() => setToShowTokenSelector(true)}>
                {toToken.symbol}
              </div>
              <div className={styles.liqudity}>
                <span>Liq:</span> <span>{toToken.liquidity}</span> <span>{tokenList[0].symbol}</span>
              </div>
            </div>
          </div>
          <div className={styles.options}>
            <input type="checkbox" className={styles.checkbox}></input>
            <label>Price Protection</label>
          </div>
          {wallet ? <button className={styles.swap_button} onClick={() => {setIsSwapping(true); setPage(1)}}>{isSwapping ? 'SWAPPING...' : 'SWAP'}</button> : 
          <button className={styles.connect_button} onClick={() => connect_wallet()}>Connect Wallet</button>}
        </div> :
        <div className={styles.swapped}>
          <div className='tick'></div>
          <div className='swapped-text'>Swapped !!</div>
          <div className='summary'>
            <div className='summ'>{fromToken.symbol} Spent</div>
            <div className='summ2'>{fromTokenAmount}</div>
          </div>
          <div className='summary'>
            <div className='summ'>{toToken.symbol} Received</div>
            <div className='summ2'>{toTokenAmount}</div>
          </div>
          <div className='tx'>View Transaction <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-external-link w-4 h-4"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg></div>
          <button className={styles.swap_button} onClick={() => {setIsSwapping(false); setPage(0)}}>DONE</button>
        </div>}
        {showFromTokenSelector && <TokenSelector setToken={setFromToken} handleClose={() => setFromShowTokenSelector(false)}/>}
        {showToTokenSelector && <TokenSelector setToken={setToToken} handleClose={() => setToShowTokenSelector(false)}/>}
      </div>
    </div>
  );
}
