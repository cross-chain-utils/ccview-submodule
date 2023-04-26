import React, { Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import QData from '../HostLaneQueue/QData';
import styled from 'styled-components';
import Card from "react-bootstrap/Card";

const CenterDiv = styled.div`
text-align: center;
`;


const ContinuationWrapper = (props) => {


    const walletID = props.chain[0] ? props.chain[0] : props.walletid;
    const NoneFound = props.noneFound;

    if (props.chunksize && (props.chunksize === props.data?.data?.items?.length)) {

        const url = `${process.env.PUBLIC_RARIBLE1}/items/byOwnerWithOwnership?continuation=${props.data.data.continuation}&size=${props.chunksize}&owner=${encodeURIComponent(walletID)}`;


        return (
            <QData url={url}>
                <ContinuationWrapper
                    dataaggregate={props.dataaggregate ? [...props.dataaggregate, props.data] : [props.data]}
                    chunksize={props.chunksize}
                    walletid={walletID}
                    depth={props.depth ? props.depth + 1 : 1}
                    mode={props.mode}
                >{props.children}</ContinuationWrapper>
            </QData>);
    } else if (props.data?.data?.items?.length > 0) {
        // expand data from all sets and send it on...
        const finalDataSrc = props.dataaggregate ? [...props.dataaggregate, props.data].map(x => x.data.items) : [props.data].map(x => x.data.items);
        let finalData = [];
        finalDataSrc.forEach(x => {
            finalData = [...finalData, ...x];
        })

        return <Fragment>{
            React.Children.map(props.children, (child) => {
                return React.cloneElement(child, { data: finalData });
            })
        }</Fragment>;


    }

    return !props.data && props.depth && props.depth > 0 ? <Fragment></Fragment> : props.data?.data?.items.length === 0 ? <Card style={{ textAlign: 'center', fontSize: '2rem', padding: '1rem' }} >No Collection Items Found on Rarible API for Address: {NoneFound}</Card> : <CenterDiv><Spinner>{props.depth}</Spinner> Loading Blockchain Data...</CenterDiv>;

}

export default React.memo(ContinuationWrapper);