import React, { Fragment } from 'react';
import FlexStack from '../UI/FlexStack';
import QDataNFTCard from '../QDataViews/QDataNFTCard';
import ChunkSplitter from '../QDataViews/ChunkSplitter';
import QData from '../HostLaneQueue/QData';

// This is what we need if the OS API had a proxy
// const MergeMetaData = React.memo((props) => {
//     const mergedCollection = props.data ? { ...props.merge, meta2: props.data } : props.merge;
//     // TODO: merge collection name into assets too...
//     return <Fragment>
//         {React.Children.map(props.children, (child) => {
//             return React.cloneElement(child, { data: mergedCollection });
//         })}
//     </Fragment>
// });

const RAR2NFTPreview = (props) => {

    return (<ChunkSplitter alphaSort={props.alphaSort} hiddenReducer={props.hiddenReducer} key={"cs"} chunksize={10} pagesize={props.pagesize ? props.pagesize : 2} >
        {props.assetdata.map(x =>
            ((!props.hiddenReducer) || (props.hiddenReducer && props.hiddenReducer(x) !== null)) ?
                <FlexStack assets={props.placeholders.find(y => y.key === x.id).assets} className={'nftfinal'} width={props.stackwidth}>
                    {/* 
                // TODO: add session server proxy for os meta as a sort of add-on... although this will not work well with the rate limit
                TODO: Allow users to BYOK -- alchemy, NFTScan...
                {x.meta ? <QDataNFTCard throttle={true} image={x.image} data={x} /> :
                    <QData url={`https://api.opensea.io/asset/${x.id.split(":").slice(1).join("/")}?format=json`} >
                        <MergeMetaData merge={x}>
                            <QDataNFTCard throttle={true} image={x.image} />
                        </MergeMetaData>
                    </QData>
                } */}


                    {x.meta ?
                        <QDataNFTCard image={x.image} data={x} chromeless={props.chromeless} hiddenReducer={props.hiddenReducer} customRender={props.customRender} fixedCollectionName={props.fixedCollectionName} />
                        :
                        <QDataNFTCard image={x.image} data={{ ...x, osmeta: `https://api.opensea.io/asset/${x.id.split(":").slice(1).join("/")}?format=json` }} chromeless={props.chromeless} hiddenReducer={props.hiddenReducer} customRender={props.customRender} fixedCollectionName={props.fixedCollectionName} />
                    }


                </FlexStack> : <Fragment></Fragment>)}
    </ChunkSplitter>

    );
}

export default React.memo(RAR2NFTPreview);