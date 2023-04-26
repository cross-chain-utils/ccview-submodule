import React, { Fragment } from 'react';

const DataIterator = (props) => {

    return <Fragment>{props.data?.data?.data?.map((c, index) =>

        <Fragment key={'di-' + index}>{React.cloneElement(props.dataconsumer, { data: c })}</Fragment>

    )}</Fragment>;
}

export default React.memo(DataIterator);