import React from 'react';
import QDataRaw from '../QDataViews/QDataRaw';
import OBJKT2CollectionList from './OBJKT2CollectionList';

const Render_OBJKTWallet = (props) => {
    // to make a collection wallet with custom renders, set the filters and the render controls
    return <OBJKT2CollectionList
        walletid={props.walletid}
        customRender={props.customRender ? props.customRender : <QDataRaw />}
        chromeless={props.chromeless ? props.chromeless : false}
        hiddenReducer={props.hiddenReducer}
        showOnly={props.showOnly}
        expandItem={props.expandItem}
        stackwidth={props.stackwidth}
        alphaSort={props.alphaSort}
    />;

}

export default Render_OBJKTWallet;