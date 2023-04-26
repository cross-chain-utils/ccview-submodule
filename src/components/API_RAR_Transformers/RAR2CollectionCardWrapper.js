import React, { Fragment } from 'react';
import QData from '../HostLaneQueue/QData';

const MergeCollectionData = React.memo((props) => {

    const colImg = props.data?.data?.meta?.content?.find(x => x["@type"] == "IMAGE")?.url;

    const mergedCollection = props.data ? { ...props.merge, name: props.data?.data?.name ? props.data?.data?.name : props.data?.data?.meta?.name, image: colImg } : props.merge;
    // TODO: merge collection name into assets too...
    return <Fragment>
        {React.Children.map(props.children, (child) => {
            return React.cloneElement(child, { data: mergedCollection, fixedCollectionName: props.data?.data?.name ? props.data?.data?.name : props.data?.data?.meta?.name });
        })}
    </Fragment>
});

const RAR2CollectionCardWrapper = (props) => {


    return <QData url={`${process.env.PUBLIC_RARIBLE1}/collections/${props.data.contract}`}><MergeCollectionData merge={props.data}>{props.children}</MergeCollectionData></QData>;


}

export default React.memo(RAR2CollectionCardWrapper);