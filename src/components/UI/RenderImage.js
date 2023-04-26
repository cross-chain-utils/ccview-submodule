import React from 'react';
import Thumbnail from './Thumbnail';
import { useStore } from 'react-redux';
import ImageSrcTransform from '../../utils/ImageSrcTransform';

const RenderImage = (props) => {

    const RenderEngine = useStore().getState().user.prefs.imageResizer;
    const privateGatewayState = useStore().getState().user.prefs.filebase_private_gateway;

    const adjustedSrcProps = { ...props, src: ImageSrcTransform(RenderEngine, privateGatewayState, props.src, props.width) };

    return <Thumbnail {...adjustedSrcProps} />

}

export default RenderImage;