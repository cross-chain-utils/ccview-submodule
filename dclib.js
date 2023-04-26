import QData from "./src/components/HostLaneQueue/QData";
import QDataNFTCard from "./src/components/QDataViews/QDataNFTCard";
import QDataNFTCollection from "./src/components/QDataViews/QDataNFTCollection";
import QDataNFTCollectionHeader from "./src/components/QDataViews/QDataNFTCollectionHeader";
import QDataRaw from "./src/components/QDataViews/QDataRaw";
import FlexStack from "./src/components/UI/FlexStack";
import RenderImage from "./src/components/UI/RenderImage";

import CollectionFilter from "./src/components/QDataViews/CollectionFilter";
import ChunkSplitter from "./src/components/QDataViews/ChunkSplitter";
import DataIterator from "./src/components/QDataViews/DataIterator";
import DataPlaceholder from "./src/components/QDataViews/DataPlaceholder";

//import Render_WAXWallet from "./src/components/API_WAX_Transformers/Render_WAXWallet";
//import Render_RARWallet from "./src/components/API_RAR_Transformers/Render_RARWallet";
//import Render_OBJKTWallet from "./src/components/API_Objkt_Transformers/Render_OBJKTWallet";

import userSlice, { userActions } from './src/store/user';
import cacheSlice from './src/store/webcache';
import react, { Fragment, useEffect, useState } from "react";

import QDataBootswatch from "./src/components/QDataViews/QDataBootswatch";

import DispatchTimer from "./src/components/HostLaneQueue/DispatchTimer";
import CCHostLaneQueue from "./src/components/HostLaneQueue/CCHostLaneQueue";
import CCLogin from "./src/components/cc-custom/CCLogin";
import BootswatchCDN from "./src/components/themes/BootswatchCDN";
import ImageSrcTransform from "./src/utils/ImageSrcTransform";

export { QData, QDataNFTCard, QDataNFTCollection, QDataBootswatch, QDataNFTCollectionHeader, QDataRaw, FlexStack, CollectionFilter, ChunkSplitter, DataIterator, DataPlaceholder, RenderImage, userActions, userSlice, cacheSlice };

export { ImageSrcTransform };

//export { Render_WAXWallet, Render_RARWallet, Render_OBJKTWallet };
export { CCLogin, BootswatchCDN };

import { useDispatch, useSelector } from 'react-redux';
import style from "styled-components";

const Pane = style.div`
display:block;
position:fixed;
top:0;
left:0;
width: 100vw;
height: 0px;
pointer-events: none;
`;

const DCLib = (props) => {

    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);

    const userState = useSelector(state => state.user.prefs);

    useEffect(() => {
        if (props.profile) {
            dispatch(userActions.setCCProfile({ ...props.profile, noSync: false }));

            setLoaded(true);
        }
    }, [])


    // Since this is embedded, user prefs need to be supplied


    // set the initial user state but don't save to local

    return (
        <Fragment>
            <Pane id="cc-background-pane" />
            <DispatchTimer />
            <CCHostLaneQueue />

            {userState.syncID > 0 && props.children}
        </Fragment>
    )

}

export default DCLib;