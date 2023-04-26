import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
    isLoggedIn: false,
    ownedWallets: [],

    ccid: '',
    ccjwt: '',
    localjwt: '',
    prefs: {
        lightMode: false,
        enableAdultContent: false,
        accessibility: {},
        theme: '',
        syncID: 0,
        messyMode: false,
        //TODO: make these prefs work
        preloadVideos: false,
        pageSize: 10,
        blockExternalImages: true,
        alch_eth: '',
        alch_poly: '',
        ethPolyRenderer: 'Rarible_EthPoly',
        waxRenderer: 'AtomicAssets_WAX',
        xtzRenderer: 'Objkt_XTZ',
        imageResizer: 'FreeProxy_IMG',
        filebase_private_gateway: ''
    },
    nft_filters: {
        show_collections: [],
        hide_collections: [],
        show_nfts: [],
        hide_nfts: []
    },
    ui: {
        showQueue: false,
        theme: 'darkly'
    },
    // TODO: don't need these, use process.env
    api_endpoints: {
        IPFS: {
            provider1: process.env.IPFS1,
            provider2: process.env.IPFS2

        },
        WAX: {
            public_api1: process.env.PUBLIC_WAX1,
            public_api2: process.env.PUBLIC_WAX2
        }
    }


};

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        login(state, action) {

            state.isLoggedIn = true;
            state.ownedWallets = action.payload.ownedWallets;
            state.ccid = action.payload.ccid;
            state.ccjwt = action.payload.ccjwt;
            //state.localjwt = action.payload.localjwt;
        },
        populateLocalJwt(state, action) {

            state.localjwt = action.payload.localjwt;
        },
        toggleQueue(state, action) {
            console.log("SHOW QUEUE");


            state.ui.showQueue = !state.ui.showQueue;

        },
        setCCProfile(state, action) {
            const changePref = (key) => {
                if (action.payload[key])
                    state.prefs[key] = action.payload[key];
            }

            const stateItems = [
                'theme',
                'messyMode',
                'alch_eth',
                'alch_poly',
                'ethPolyRenderer',
                'waxRenderer',
                'xtzRenderer',
                'imageResizer',
                'filebase_private_gateway'
            ];

            stateItems.forEach(changePref);
            if (!action.payload.noSync)
                state.prefs.syncID++;
        },
        logout(state) {
            // do any other cleanup
            return { ...initialUserState, localjwt: state.localjwt };

        },

    },
});


export const userActions = userSlice.actions;

export default userSlice.reducer;