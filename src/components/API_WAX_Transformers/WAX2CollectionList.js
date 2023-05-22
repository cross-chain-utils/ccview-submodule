import React, { Fragment } from 'react';
import QData from '../HostLaneQueue/QData';
import CollectionFilter from '../QDataViews/CollectionFilter';
import QDataNFTCollection from '../QDataViews/QDataNFTCollection';
import QDataNFTCollectionHeader from '../QDataViews/QDataNFTCollectionHeader';
import BadListBlocker from './BadListBlocker';
import WAX2NFTPreview from './WAX2NFTPreview';
import { useStore } from 'react-redux';

/**
 * Put everything having to do with loading WAX NFTs in here
 * Add a switch for 
 * (collection_list, collection, single template card, single nft card, 
 * template detail, single nft detail, id list, blocklist from AH/NB tables (could be slow... add server cache?), nsfw list )
 * 
 * Put all these viewers inside the API_WAX_Viewers folder
 * 
 * Instead make all those viewers read props.data?
 * This control may need to handle the 
 * continuation/batching by adding new viewer controls as it outputs lists with keys
 * 
 * So one of these files PER API that handles the actual API calls and maps them to controls
 * 
 * This may issue new QData controls as needed
 */

const WAX2CollectionList = (props) => {
    const walletID = props.walletid;

    if (/^([a-z\.1-5]){5,14}$/.test(walletID) === false) {
        throw "Invalid wallet ID."
    }
    // add to queue with fallback from anbother public API
    // TODO: move to state
    const WAXEndpoints = useStore().getState().user.api_endpoints.WAX;

    const api_call = "/atomicassets/v1/accounts/" + walletID;

    // TODO: finish hiddenreducer for WAX

    return (
        <Fragment>
            <QData url={`${WAXEndpoints.public_api1 + api_call}`} fallback_url={`${WAXEndpoints.public_api1 + api_call}`}>
                <BadListBlocker walletid={walletID}>
                    <CollectionFilter showOnly={props.showOnly} removeList={props.removeList}>
                        <QDataNFTCollectionHeader hideAssets={props.showOnly !== undefined} />
                        <QDataNFTCollection
                            className={props.className}
                            walletid={props.walletid}
                            expandItem={props.expandItem}
                            detailViewControl={<WAX2NFTPreview
                                walletid={props.walletid}
                                chromeless={props.chromeless}
                                hiddenReducer={props.hiddenReducer}
                                alphaSort={props.alphaSort}
                                customRender={props.customRender}
                                stackwidth={props.stackwidth}
                            />} />
                    </CollectionFilter>
                </BadListBlocker>
            </QData>
        </Fragment>);
}

export default React.memo(WAX2CollectionList);