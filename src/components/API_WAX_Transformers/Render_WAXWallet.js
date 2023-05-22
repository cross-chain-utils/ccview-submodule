import React from 'react';
import QDataRaw from '../QDataViews/QDataRaw';
import WAX2CollectionList from './WAX2CollectionList';

const Render_WAXWallet = (props) => {

    console.log("RENDER WAX", props);
    // to make a collection wallet with custom renders, set the filters and the render controls
    return <WAX2CollectionList
        walletid={props.walletid}
        customRender={props.customRender ? props.customRender : <QDataRaw />}
        chromeless={props.chromeless ? props.chromeless : false}
        hiddenReducer={props.hiddenReducer}
        showOnly={props.showOnly}
        expandItem={props.expandItem}
        className={props.className}
    />;

    // NOTE: by setting showOnly to your target collection and creating a chromeless custom render you can display data however you want

}

export default Render_WAXWallet;