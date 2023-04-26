import React from 'react';
import QDataRaw from '../QDataViews/QDataRaw';
import RAR2CollectionList from './RAR2CollectionList';

const Render_RARWallet = (props) => {
    // to make a collection wallet with custom renders, set the filters and the render controls
    return <RAR2CollectionList
        walletid={props.walletid}
        customRender={props.customRender ? props.customRender : <QDataRaw />}
        chromeless={props.chromeless ? props.chromeless : false}
        hiddenReducer={props.hiddenReducer}
        showOnly={props.showOnly}
        expandItem={props.expandItem}
        stackwidth={props.stackwidth}
        alphaSort={props.alphaSort}
        mode={props.mode}
    />;

}

export default Render_RARWallet;