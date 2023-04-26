const ChainPathLookup = (token) => {
    switch (token.trim().toUpperCase()) {
        case "TESTWAX": return "/cctestwax/";
        case "GOERLI": return "/ccgoerli/";
        case "ETH": return "/cceth/";
        case "POLYGON": return "/cceth/";
        case "WAX": return "/ccwax/";
        case "XTZ": return "/ccxtz/";
        default: return "/cceth/";
    }
}

export default ChainPathLookup;