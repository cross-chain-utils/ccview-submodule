import React, { Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import QData from '../HostLaneQueue/QData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons/faCloudArrowDown';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const ThumbnailStyle = styled.img`
border-radius: 0.5rem 0.5rem 0 0;

animation-name: ${fadeIn};
  animation-duration:  2s;
`;
const Thumbnail = (props) => {


    const fallback_url = props.src.indexOf(process.env.IPFS1) > -1 ? props.src.replace(process.env.IPFS1, process.env.IPFS2) : null;
    const dataWatcher = useSelector(state => state.cache.cachedApiData ? state.cache.cachedApiData[props.src] : null);
    const dataWatcher2 = useSelector(state => state.cache.cachedApiData ? state.cache.cachedApiData[fallback_url] : null);

    const throttle = props.throttle === true;

    const modifiedSrc = { ...props, src: dataWatcher2 ? fallback_url : props.src, retries: 1 };

    if (throttle && !dataWatcher && !dataWatcher2) {
        return <QData prepend={props.prepend !== undefined ? props.prepend : true} url={props.src} fallback_url={fallback_url} isImage={true}><Fragment><FontAwesomeIcon icon={faCloudArrowDown} size="2x" /></Fragment></QData>;

    }

    return <ThumbnailStyle className={'dc-anim'} {...modifiedSrc} />;

};

export default Thumbnail;