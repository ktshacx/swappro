const getProvider = () => {
    let window = globalThis.window;
    if(window){
        if ('phantom' in window) {
          const provider = window?.phantom?.solana;
        
          if (provider?.isPhantom) {
            return provider;
          }
        }
    }

    return false;
};

module.exports = getProvider;