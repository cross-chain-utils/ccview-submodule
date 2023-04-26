import React from 'react';
import FlexStack from '../UI/FlexStack';
import QDataNFTCard from '../QDataViews/QDataNFTCard';
import ChunkSplitter from '../QDataViews/ChunkSplitter';

const OBJKT2NFTPreview = (props) => {



    return (<ChunkSplitter hiddenReducer={props.hiddenReducer} alphaSort={props.alphaSort} key={"cs-objkt"} chunksize={10} pagesize={props.pagesize ? props.pagesize : 2} >
        {props.assetdata.map((x, index) =>

            ((!props.hiddenReducer) || (props.hiddenReducer && props.hiddenReducer(x) !== null)) ?
                <FlexStack key={'fsi-' + index} assets={props.placeholders.find(y => y.key === x.id).assets} className={'nftfinal'} width={props.stackwidth}>

                    <QDataNFTCard image={x.image} data={{ ...x, count: props.placeholders.find(y => y.key === x.id).assets }} chromeless={props.chromeless} hiddenReducer={props.hiddenReducer} customRender={props.customRender} />

                </FlexStack> : <></>)}
    </ChunkSplitter>

    );
}

export default React.memo(OBJKT2NFTPreview);