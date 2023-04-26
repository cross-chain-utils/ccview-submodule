import React, { Fragment, useState } from 'react';
import QData from '../HostLaneQueue/QData';
import QDataRaw from '../QDataViews/QDataRaw';
import WAX2AssetBadge from './WAX2AssetBadge';
import { useStore } from 'react-redux';

const WAXNFTToGenericTransform = (props) => {


    const [singleNFT, setSingleNFT] = useState(props.singleNFT);



    // props.data is wax format NFT
    // we need to send a data property to children with generic NFT
    let d = props.data;
    let GenericNFT = null;
    let NFTLoader = null;
    let arrayChildren = [];

    const selectedNFTChanged = (e) => {
        //console.log("NFT Changed", e);
        setSingleNFT(e);
    };


    if (d) {
        if (!singleNFT) {
            GenericNFT = {
                owner: props.walletid,
                contract: `${d.contract}`,
                id: 'TEMPLATE:' + d.template_id, // add asset ID too
                flags: [d.is_transferable ? "xfer" : "", d.is_burnable ? "burn" : ""].filter(x => x !== ""),
                issued: d.issued,
                max: d.max_supply == 0 ? 'infinite' : d.max_supply,
                collection_id: d.collection?.collection_name,
                collection_name: d.collection?.name,
                name: d.immutable_data?.name,
                img: d.immutable_data?.img ? d.immutable_data?.img : d.immutable_data?.image,
                meta: d.immutable_data,
                mint: null,
                video: d.immutable_data?.video,


            };


        }
        else {
            GenericNFT = {
                owner: props.walletid,
                contract: `${singleNFT.contract}`,
                id: 'ASSET:' + singleNFT.asset_id,
                flags: [singleNFT.is_transferable ? "xfer" : "", singleNFT.is_burnable ? "burn" : ""].filter(x => x !== ""),
                issued: singleNFT.minted_at_time,
                max: d.max_supply == 0 ? 'infinite' : d.max_supply,
                collection_id: singleNFT.collection?.collection_name,
                collection_name: singleNFT.collection?.name,
                name: `${singleNFT.name} [#${singleNFT.template_mint}]`,
                img: singleNFT.data?.img ? singleNFT.data?.img : singleNFT.data?.image,
                meta: singleNFT.data,
                mint: singleNFT.template_mint,
                video: singleNFT.data?.video,


            };
        }



        arrayChildren = React.Children.toArray(props.children);



    }
    const WAXEndpoints = useStore().getState().user.api_endpoints.WAX;
    const api_call = `/atomicassets/v1/assets/?collection_name=${encodeURIComponent(d.collection?.collection_name)}&template_id=${encodeURIComponent(d.template_id)}&owner=${encodeURIComponent(props.walletid)}&order=asc&sort=template_mint`;

    // The children of this control should only be QDataNFTCard
    const templateNFT = d && (arrayChildren.length > 0) ? <Fragment>{arrayChildren.map((c, index) =>

        // TODO: replace the raw below with a real detail view, also do this for other chains
        // NOTE: c will be a QDataNFTCard
        React.cloneElement(c, {

            data: GenericNFT,
            chainSpecific:
                <QData url={`${WAXEndpoints.public_api1 + api_call}`} fallback_url={`${WAXEndpoints.public_api2 + api_call}`}>
                    <WAX2AssetBadge onChange={selectedNFTChanged} selected={singleNFT?.asset_id} />
                </QData>,
            customRender: props.customRender ? props.customRender :
                <QDataRaw />,
            chromeless: props.chromeless ? props.chromeless : false
        })
    )

    } </Fragment> : <div>No data.</div>;


    return templateNFT;

}

export default React.memo(WAXNFTToGenericTransform);