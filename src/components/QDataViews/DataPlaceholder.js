import React, { Fragment } from 'react';

const DataPlaceholder = (props) => {

    const arrayChildren = React.Children.toArray(props.children);

    return <Fragment>{props.data ? arrayChildren.map((c, index) =>

        React.cloneElement(c, { data: props.data })

    ) : React.cloneElement(props.placeholder)}</Fragment>;
}

export default React.memo(DataPlaceholder);