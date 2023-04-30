import { createSlice } from '@reduxjs/toolkit';
import QueueFactory from '../utils/QueueFactory';

const initialCacheState = {
    queue: {
        lanes: [
            {
                key: 'priv-filebase',
                hostname: 'https://ccview.myfilebase.com',
                items: [],
                maxSimultaneous: 50,
                frequency: 1
            },
            {
                key: 'pub-pinata',
                hostname: 'https://gateway.pinata.cloud',
                items: [],
                maxSimultaneous: 5,
                frequency: 1
            },
            {
                key: 'pub-filebase',
                hostname: 'https://ipfs.filebase.io',
                items: [],
                maxSimultaneous: 1,
                frequency: 1
            },
            {
                key: 'prod-waxsweden',
                hostname: 'https://api.waxsweden.org',
                items: [],
                maxSimultaneous: 5,
                frequency: 1
            },
            {
                key: 'prod-neftyblocks',
                hostname: 'https://aa-wax-public1.neftyblocks.com',
                items: [],
                maxSimultaneous: 5,
                frequency: 1
            },
            {
                key: 'dev-ccview',
                hostname: 'https://ccviewdev.waxworks.io',
                items: [],
                maxSimultaneous: 50,
                frequency: 1
            },
            {
                key: 'pub-rarible',
                hostname: 'https://api.rarible.org',
                items: [],
                maxSimultaneous: 50,
                frequency: 1
            },
            {
                key: 'pub-freeproxy',
                hostname: 'https://wsrv.nl',
                items: [],
                maxSimultaneous: 3,
                frequency: 1
            },



        ],

    },
    cachedApiData: {

    },
    loadedWallets: []

};

const cacheSlice = createSlice({
    name: 'webcache',
    initialState: initialCacheState,
    reducers: {
        addLane(state, action) {
            // payload is a QueueLane
            //state.queue.push(action.payload);


        },
        addLoadedWallet(state, action) {

            state.loadedWallets.push(action.payload.walletid);

        },
        addQueueItem(state, action) {



            let flist = action.payload;
            if (!Array.isArray(action.payload)) {
                flist = [flist];
            }

            flist.forEach(queueItem => {
                try {
                    // payload is a QueueItem
                    const url = new URL(queueItem.url);
                    const hostname = url.protocol + "//" + url.hostname;
                    let existingLane = state.queue.lanes.find(x => x.hostname === hostname);
                    if (!existingLane) {
                        existingLane = QueueFactory.QueueLane();
                        existingLane.hostname = hostname;
                        state.queue.lanes.push(existingLane);


                    }

                    if (queueItem.prepend === true) {

                        existingLane.items = [queueItem, ...existingLane.items];
                    } else {

                        existingLane.items.push(queueItem)
                    }

                    //
                } catch (ex) {
                    console.log("URL Error: " + queueItem.url);

                }
            });



        },
        downloadItem(state, action) {
            let updateItem = state.queue.lanes.find(x => x.key === action.payload.wkey).items.find(y => y.key === action.payload.ikey);

            if (updateItem) {
                if (updateItem.retries > 0) {
                    updateItem.status = "Active";
                    updateItem.retries--;
                } else {
                    updateItem.status = "Failed";
                }
            }

        },
        markFinished(state, action) {
            // action.payload.wkey && action.payload.ikey
            let updateItem = state.queue.lanes.find(x => x.key === action.payload.wkey)?.items.find(y => y.key === action.payload.ikey);
            if (updateItem) {
                updateItem.status = "Finished";
                if (!updateItem.isImage && action.payload.data) {
                    //updateItem.data = action.payload.data;
                    state.cachedApiData[updateItem.url] = { url: updateItem.url, data: action.payload.data, issued: (new Date()).getTime() };
                } else if (updateItem.isImage) {
                    //console.log("UPDATE IMAGE", updateItem.url);
                    state.cachedApiData[updateItem.url] = { url: updateItem.url, data: "image data.", issued: (new Date()).getTime() };
                }
            }

        },
        expireFinished(state, action) {
            // action.payload.wkey && action.payload.ikey
            let updateItem = state.queue.lanes.find(x => x.key === action.payload.wkey)?.items.find(y => y.key === action.payload.ikey);
            if (updateItem) {
                updateItem.status = "Expired";
                if (!updateItem.isImage) {
                    state.cachedApiData[updateItem.url] = null;
                    delete state.cachedApiData[updateItem.url];
                } else if (updateItem.isImage) {
                    throw "Can't expire images.";
                }
            }

        },
        markFailed(state, action) {
            // action.payload.wkey && action.payload.ikey
            let updateItem = state.queue.lanes.find(x => x.key === action.payload.wkey)?.items.find(y => y.key === action.payload.ikey);
            if (updateItem) {
                updateItem.status = "Failed";

                updateItem.retries = updateItem.retries - 1;
                if (updateItem.retries >= 0) {
                    if (updateItem.fallback_url) {
                        console.log("FALLBACK IMAGE", updateItem.fallback_url);
                        const oldFB = updateItem.url;
                        updateItem.url = updateItem.fallback_url;
                        updateItem.fallback_url = oldFB;
                    }
                    updateItem.status = "Active";
                } else {
                    console.log("FAIL IMAGE", updateItem);
                    state.cachedApiData[updateItem.url] = { url: updateItem.url, data: "Data failed to load.", issued: (new Date()).getTime() };

                }

            }
        },

        clearFinished(state, action) {
            // state.queue.lanes.forEach(x => {
            //     x.finished = [];
            // });

        },
        reset(state, action) {
            console.log("RESET");
            if (action.payload) {
                state.cachedApiData[action.payload] = null;

            } else {
                return initialCacheState;
            }
        }
    },
});

export const executeTimer = (tick) => {
    return async (dispatch, getState) => {

        const workingCt = tick.ct;
        const currentCache = getState().cache.queue.lanes;

        // console.log("TOCK", workingCt, currentCache.filter(queueLane =>
        //     ((workingCt % queueLane.frequency) === 0)));
        const freqList = currentCache.filter(queueLane =>
            ((workingCt % queueLane.frequency) === 0)
            && (queueLane.items.filter(pending => pending.status === "Active").length <
                queueLane.maxSimultaneous)
            && queueLane.items.find(pending => pending.status === "Pending"));


        // found work, so update
        if (freqList.length > 0) {
            console.log("Tick " + workingCt, freqList.map(x => x.hostname));

            freqList.forEach(lane => {
                // get pending items
                let lanePendingList = lane.items.filter(pending => pending.status === "Pending");
                let laneActive = lane.items.filter(pending => pending.status === "Active")?.length;
                let lanePending = null;



                for (let i = 0; lanePendingList.length > 0 && i < lane.maxSimultaneous - (length ? length : 0); i++) {
                    lanePending = lanePendingList.pop();

                    dispatch(webcacheActions.downloadItem({ wkey: lane.key, ikey: lanePending.key }));
                }
            });
            //found work, so update

        }


    }
}

export const webcacheActions = cacheSlice.actions;


export default cacheSlice.reducer;