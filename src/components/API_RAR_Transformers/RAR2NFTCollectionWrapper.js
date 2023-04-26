import React from 'react';
import { Spinner } from 'react-bootstrap';


const RAR2NFTCollectionWrapper = (props) => {

    const collectionList = [];
    props.data.forEach(combo => {
        const item = combo.item;
        const ownership = combo.ownership;

        if (!collectionList.find(y => y.contract === item.collection)) {
            const placeholders = props.data.filter(z => z.item.collection === item.collection).map(p => { return { assets: 1, key: p.item.id } });


            const assets = props.data.filter(z => z.item.collection === item.collection).map(p => {
                const d = p.item;
                const id = d.id.split(":").splice(2)[0];
                return {
                    owner: props.walletid,
                    contract: `${d.contract}`,
                    id: d.id, // add asset ID too
                    flags: ["xfer", "burn"],
                    issued: d.mintedAt,
                    max: d.supply,
                    collection_id: d.collection,
                    collection_name: d.collection,
                    name: d.meta?.name ? d.meta?.name + (id.length <= 5 ? ` #${id}` : '') : "No Name #" + id,
                    img: d.meta?.content ? d.meta.content.find(v => v["@type"] === "IMAGE")?.url : null,
                    meta: d.meta,
                    mint: d.tokenId,
                    video: d.meta?.content ? d.meta.content.find(v => v["@type"] === "VIDEO")?.url : null,
                    thumbnail: null
                    // TODO: implement thumbnail elsewhere

                }
            });
            collectionList.push({
                assets: assets.length,
                collection_details: "",
                contract: item.collection,
                flags: [],
                image: null,
                key: item.collection,
                name: item.collection,
                placeholders: placeholders,
                assetdata: assets

            })
        }
    })

    const retObj = {
        owner: props.walletid,
        assets: props.data?.length,
        collections: collectionList

    }

    return props.data ? React.Children.map(props.children, (child) => {
        return React.cloneElement(child, { data: retObj }); // this is where you can put chainSpecific or customRender
        // todo: customRender is where NFT detection happens for special features
    }) : <Spinner />;

};

export default RAR2NFTCollectionWrapper;