import React, { Fragment, useEffect, useState } from 'react';
import { Spinner, Card } from 'react-bootstrap';

import QData from '../HostLaneQueue/QData';
import QDataNFTCollection from '../QDataViews/QDataNFTCollection';
import QDataNFTCollectionHeader from '../QDataViews/QDataNFTCollectionHeader';

import RAR2NFTPreview from './RAR2NFTPreview';
import ContinuationWrapper from './ContinuationWrapper';
import RAR2NFTCollectionWrapper from './RAR2NFTCollectionWrapper';
import RAR2CollectionCardWrapper from './RAR2CollectionCardWrapper';
import CollectionFilter from '../QDataViews/CollectionFilter';
import { ethers } from "ethers";
const provider = new ethers.providers.CloudflareProvider();

async function resolveAddress(ensName) {
    const resolvedAddress = await provider.resolveName(ensName);
    return resolvedAddress;
}

const chunkSize = +process.env.ETH_CHUNK_SIZE;

/** NOTE: RARIBLE API NOT WORKING FOR TEZOS AS OF 12/17/22
 * 
 * 
 */

const ENSWrapperL1 = (props) => {


    const regexENS = /(.+\.[Ee][Tt][Hh])/;

    const [loadedAddress, setLoadedAddress] = useState(props.walletID);

    useEffect(() => {
        if (regexENS.test(props.walletID)) {
            (async () => {

                // const address = await provider.resolveName(props.walletID);
                const address = await resolveAddress(props.walletID);
                setLoadedAddress(address);


            })();
        }

    }, []);





    return regexENS.test(loadedAddress) ? <Spinner></Spinner> : <ENSWrapperL2 walletID={loadedAddress} chain={props.chain} mode={props.mode} showOnly={props.showOnly}>{props.children}</ENSWrapperL2>;
}

const ENSWrapperL2 = (props) => {

    const walletID = props.walletID ? props.walletID : props.data?.data?.data?.domain?.address;
    let url1 = `${process.env.PUBLIC_RARIBLE1}/ownerships/search?collection=${encodeURIComponent(props.showOnly[0])}`;
    let url2 = `${process.env.PUBLIC_RARIBLE1}/items/search?collection=${encodeURIComponent(props.showOnly[0])}`;

    if (props.mode === "SMALLCOLLECTION") {

        let method = "POST";
        let body = {
            size: 500,
            filter: { blockchains: ['ETHEREUM'], owners: ['ETHEREUM:' + walletID], collections: props.showOnly }
        };

        let headers = [{ "content-type": "application/json" }];



        return <QData url={url1} method={method} body={body} headers={headers}><QData url={url2} method={method} body={body} headers={headers}><SmallCollection>{props.children}</SmallCollection></QData></QData>;
    }

    return walletID ? <QData data={props.chain + ':' + walletID} url={`${process.env.PUBLIC_RARIBLE1}/items/byOwnerWithOwnership?size=${chunkSize}&owner=${encodeURIComponent(props.chain + ':' + walletID)}`}>{props.children}</QData> : <Card style={{ textAlign: 'center', fontSize: '2rem' }}><div><Spinner /> Loading Rarible address...</div></Card>;

}

const SmallCollection = (props) => {

    if (props.data && props.chain?.length > 0) {
        // console.log("FINDME", props.data, props.chain);

        let items = [];
        props.chain[1].data.items.forEach(item => {
            const ownership = props.chain[0].data.ownerships.find(x => x.itemId === item.id);
            if (ownership) {
                items.push({ item, ownership })

            }
        });

        return (

            <Fragment>
                {React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, { data: { data: { items } }, chain: [] });
                })
                }
            </Fragment>
        );
    }
    return <Card style={{ textAlign: 'center', fontSize: '2rem' }}><div><Spinner /> Loading Rarible Collection Details...</div></Card>
}



// 
const RAR2CollectionList = (props) => {
    const walletID = props.walletid?.split(":");

    if (!walletID) {
        throw "Wallet ID empty";

    }

    if (["ETHEREUM", "POLYGON", "FLOW", "TEZOS", "SOLANA", "IMMUTABLEX"].indexOf(walletID[0]) == -1) {
        throw "Chain unsupported by Rarible API";
    }

    //TODO: <ObjktTezosCollectionWrapper> needed for TEZOS, leaving it alone for noe

    return <ENSWrapperL1 mode={props.mode} showOnly={props.showOnly} walletID={walletID[1]} chain={walletID[0]}>
        <ContinuationWrapper chunksize={chunkSize} mode={props.mode} showOnly={props.showOnly} noneFound={walletID[1]}>
            <RAR2NFTCollectionWrapper walletid={walletID[1]}>
                <CollectionFilter showOnly={props.showOnly} removeList={props.removeList}>
                    <QDataNFTCollectionHeader hideAssets={props.showOnly !== undefined} />
                    <QDataNFTCollection
                        walletid={props.walletid}
                        hiddenReducer={props.hiddenReducer}
                        detailViewControl={<RAR2NFTPreview
                            alletid={props.walletid}
                            chromeless={props.chromeless}
                            hiddenReducer={props.hiddenReducer}
                            customRender={props.customRender}
                            stackwidth={props.stackwidth}
                            alphaSort={props.alphaSort}
                        />}
                        collectionCardWrapper={<RAR2CollectionCardWrapper />}
                    />
                </CollectionFilter>
            </RAR2NFTCollectionWrapper>

        </ContinuationWrapper>
    </ENSWrapperL1>;


}

export default React.memo(RAR2CollectionList);