import tokenList from "@/helpers/tokenList";

export default function TokenSelector({setToken, handleClose}) {
    return (
        <div className="modal-backdrop">
            <div className='modal'>
                <div className="modal-header">
                    Token Select
                </div>
                <div className="token-list">
                    {tokenList.map((token) => (
                        <div className="modal-token" key={token.name} onClick={() => {setToken(token); handleClose()}}>{token.symbol}</div>
                    ))}
                </div>
                <button className="modal-close" onClick={handleClose}>Close</button>
            </div>
        </div>
    )
}