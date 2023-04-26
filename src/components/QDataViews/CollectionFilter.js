import React, { Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

const CollectionFilter = (props) => {

    let collectionList = props.data?.collections;



    if (props.removeList) {
        const fixedCase = props.removeList.map(x => {
            const parts = x.split(":");
            return `${parts[0]}:${parts[1].toLowerCase()}`
        });
        collectionList = collectionList?.filter(x => props.removeList.indexOf(x.key) === -1);
    }

    if (props.showOnly) {
        const fixedCase = props.showOnly.map(x => {
            const parts = x.split(":");
            return parts.length == 1 ? parts[0].toLowerCase() : `${parts[0]}:${parts[1].toLowerCase()}`
        });
        collectionList = collectionList?.map(x => {
            return { ...x, key: x.key.split(":").length === 1 ? x.key.toLowerCase() : x.key.split(":")[0] + ":" + x.key.split(":")[1].toLowerCase() }
        }).filter(x => fixedCase.indexOf(x.key) > -1)
    }

    // console.log(collectionList, props.showOnly);
    return collectionList && collectionList.length > 0 ?
        <Fragment>
            {
                React.Children.map(props.children, (child) => {
                    return React.cloneElement(child, {
                        data: { ...props.data, collections: collectionList.sort((a, b) => { return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0 }) }

                    });
                })
            }
        </Fragment>
        : collectionList && collectionList.length == 0 ? <Fragment>No matching collections.</Fragment> : <Fragment><Card><Spinner></Spinner> Loading Collections...</Card></Fragment>;
}

export default CollectionFilter;