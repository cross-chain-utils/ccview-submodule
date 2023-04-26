import React, { Fragment, useState, useRef } from 'react';
import QDataPreviewGroup from './QDataPreviewGroup';
import { useStore } from 'react-redux';
import ImageSrcTransform from '../../utils/ImageSrcTransform';

const QDataNFTPreview = (props) => {
    //console.log("PREVIEW 2", props)
    const ipfsPaths = useStore().getState().user.api_endpoints.IPFS;

    const RenderEngine = useStore().getState().user.prefs.imageResizer;
    const privateGatewayState = useStore().getState().user.prefs.filebase_private_gateway;

    const [imgHeight, setImgHeight] = useState('10rem');
    const imgTag = useRef();

    const captureImageHeight = () => {
        // e.target
        setImgHeight(imgTag.clientHeight);
    }

    window.addEventListener('resize', captureImageHeight);



    return props?.data?.placeholder ? <Fragment>

        {props.image ? <img ref={imgTag} style={{ position: 'absolute', width: '100%', borderRadius: '0.25rem', opacity: '0.5', maxHeight: '100%', height: imgHeight }} src={`${ImageSrcTransform(RenderEngine, privateGatewayState, props.image, 200)}`} /> : 'NO IMAGE'}

        <div style={{ width: '80%', marginLeft: '10%', position: 'absolute', fontSize: '1.5rem', fontWeight: 'bold', textShadow: '0px 0px 0.4rem black' }}>{props.data.placeholder.key}:{props.data.placeholder.assets}</div>

    </Fragment> : <Fragment></Fragment>;
}

export { QDataPreviewGroup };
export default React.memo(QDataNFTPreview);