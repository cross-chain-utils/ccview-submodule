import React, { } from 'react';
import { Spinner } from 'react-bootstrap';

const OBJKT2NFTCollectionWrapper = (props) => {


    const collectionList = [];
    props.data?.data?.data?.token_holder.map(x => x.token.fa).forEach(x => {
        if (!collectionList.find(y => y.contract === x.contract)) {
            const placeholders = props.data?.data?.data?.token_holder.filter(z => z.token.fa.contract === x.contract).map(p => { return { assets: p.quantity, key: p.token.fa_contract + '-' + p.token.token_id } });
            const assets = props.data?.data?.data?.token_holder.filter(z => z.token.fa.contract === x.contract).map(p => {
                const d = p.token;
                return {
                    owner: props.walletid,
                    contract: `${d.contract}`,
                    id: d.fa.contract + '-' + d.token_id, // add asset ID too
                    flags: ["xfer"],
                    issued: d.timestamp,
                    max: d.supply,
                    collection_id: d.fa.contract,
                    collection_name: d.fa.name,
                    name: d.name,
                    img: d.display_uri ? d.display_uri.replace("ipfs://", "") : d.artifact_uri.replace("ipfs://", ""),
                    meta: d,
                    mint: null,
                    video: null,
                    thumbnail: d.thumbnail_uri ? d.thumbnail_uri.replace("ipfs://", "") : null
                    // TODO: implement thumbnail elsewhere

                }
            });
            collectionList.push({
                assets: placeholders.map(p => p.assets).reduce((totalValue, currentValue) => {

                    return totalValue + currentValue
                }, 0),
                collection_details: "",
                contract: x.contract,
                flags: [],
                image: x.logo?.replace("ipfs://", ""),
                key: x.contract,
                name: x.name,
                placeholders: placeholders,
                assetdata: assets

            })
        }
    });

    const retObj = {
        owner: props.walletid,
        assets: props.data?.data?.data?.token_holder.length,
        collections: collectionList

    }

    return props.data ? React.Children.map(props.children, (child, index) => {
        return React.cloneElement(child, { key: 'ch' + index, data: retObj });
        // This is where custom render goes
    }) : <Spinner />;

};

export default OBJKT2NFTCollectionWrapper;