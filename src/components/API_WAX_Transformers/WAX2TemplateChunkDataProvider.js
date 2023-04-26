import React, { Fragment } from 'react';

import QData from '../HostLaneQueue/QData';
import TemplateToNFTTransform from './TemplateToNFTTransform';
import { useStore } from 'react-redux';

const WAX2TemplateChunkDataProvider = (props) => {

    const WAXEndpoints = useStore().getState().user.api_endpoints.WAX;

    const api_call = `/atomicassets/v1/templates/?ids=${encodeURIComponent(props.data.filter(x => x.key !== null && x.key !== 'null').map(x => x.key).join(","))}&limit=10`;


    return props.data ? <QData url={`${WAXEndpoints.public_api1 + api_call}`} fallback_url={`${WAXEndpoints.public_api2 + api_call}`}><TemplateToNFTTransform chromeless={props.chromeless} customRender={props.customRender} walletid={props.walletid} image={props.image} placeholderdata={props.data}>{props.children}</TemplateToNFTTransform></QData> : <Fragment>No Data.</Fragment>

};

export default WAX2TemplateChunkDataProvider;