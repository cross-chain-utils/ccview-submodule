import React, { Fragment } from 'react';
import ChunkSplitter from '../QDataViews/ChunkSplitter';
import { QDataPreviewGroup } from '../QDataViews/QDataNFTPreview';
import WAX2TemplateChunkDataProvider from './WAX2TemplateChunkDataProvider';
import QData from '../HostLaneQueue/QData';
import TemplateToNFTTransform from './TemplateToNFTTransform';
import WAXNFTToGenericTransform from './WAXNFTToGenericTransform';
import DataIterator from '../QDataViews/DataIterator';
import DataPlaceholder from '../QDataViews/DataPlaceholder';
import { useStore } from 'react-redux';

const WAX2NFTPreview = (props) => {


    // child is placeholder which should be replaced with real NFT Preview
    const WAXEndpoints = useStore().getState().user.api_endpoints.WAX;
    const api_call = `/atomicassets/v1/assets/?collection_name=${encodeURIComponent(props.collection)}&template_id=null&owner=${encodeURIComponent(props.walletid)}&order=asc&sort=template_mint`;
    const nullTemplates = props.placeholders.find(x => x.key === null);
    //const nullTemplatePlaceholders = null; //nullTemplates ? [...Array(nullTemplates.assets).map(x => <TemplateToNFTTransform />)] : <Spinner />;
    const nullTemplatePlaceholders = [];
    for (let i = 0; i < (nullTemplates ? +nullTemplates.assets : 0); i++) {
        nullTemplatePlaceholders.push(<TemplateToNFTTransform key={'nttp-' + i} stackwidth={props.stackwidth} />);
    }



    return (
        <Fragment>
            <ChunkSplitter key={"cs-" + props.walletid} chunksize={10} pagesize={props.pagesize ? props.pagesize : 2} alphaSort={props.alphaSort} hiddenReducer={props.hiddenReducer} dataprovider={<WAX2TemplateChunkDataProvider walletid={props.walletid} image={props.image} chromeless={props.chromeless} customRender={props.customRender} />} wrapper={<QDataPreviewGroup image={props.image} />}>
                {[...props.placeholders.filter(x => x.key !== null),
                    //<div isGraft={true} key="insertXYZ">Test</div>,
                ]}

            </ChunkSplitter>
            {
                nullTemplates ? <Fragment>
                    <h3 style={{ width: '90%', margin: '5%', borderBottom: 'thin solid' }}>Minted Without Template ({nullTemplates.assets})</h3>

                    <QData url={`${WAXEndpoints.public_api1 + api_call}`} fallback_url={`${WAXEndpoints.public_api2 + api_call}`}>
                        <DataPlaceholder placeholder={<Fragment>{nullTemplatePlaceholders}</Fragment>}>

                            <DataIterator dataconsumer={
                                <WAXNFTToGenericTransform walletid={props.walletid} image={props.image} chromeless={props.chromeless} customRender={props.customRender}>
                                    <TemplateToNFTTransform stackwidth={props.stackwidth} />
                                </WAXNFTToGenericTransform>
                            } />
                        </DataPlaceholder>

                    </QData >
                </Fragment>
                    : <Fragment></Fragment>
            }

        </Fragment >
    );
}

export default React.memo(WAX2NFTPreview);