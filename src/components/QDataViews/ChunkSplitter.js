import React, { Fragment, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const ChunkSplitter = (props) => {

    const [currentPage, setCurrentPage] = useState(0);


    const filterChildren = !props.hiddenReducer ? [...props.children] : props.children.filter(x =>
        x.props?.children !== undefined && (props.hiddenReducer(x.props.children.props.data) !== null)).sort((a, b) => {
            if (!props.alphaSort === true) {
                return 0;
            }
            if (b.props?.children !== undefined && b.props?.children !== undefined) {
                if (a.props.children.props.data.name > b.props.children.props.data.name) {
                    return 1;
                }
                if (a.props.children.props.data.name < b.props.children.props.data.name) {
                    return -1;
                }
            }
            return 0;
        });
    console.log("FILTER", filterChildren);


    const pageMode = (props.pagesize !== undefined && props.pagesize > 0);
    const pageItems = props.chunksize * props.pagesize;
    const startItem = pageMode ? + currentPage * pageItems : 0;
    const uncappedMax = filterChildren ? filterChildren.length : 0;
    const pagedMax = startItem + pageItems;
    // chunksize, wrapper, children, data?
    let chunks = [];
    for (let i = startItem; i < (pageMode ?
        Math.min(pagedMax, uncappedMax) :
        uncappedMax); i++) {
        const iter = Math.floor(i / props.chunksize);
        if (!chunks[iter])
            chunks[iter] = [];
        chunks[iter].push(filterChildren[i]);
    }

    console.log(Math.ceil(uncappedMax / pageItems));
    let active = currentPage;
    let items = [];
    for (let number = 1; number <= Math.ceil(uncappedMax / pageItems); number++) {
        items.push(
            <Pagination.Item key={number} active={number - 1 === active} onClick={(e) => setCurrentPage(number - 1)}>
                {number}
            </Pagination.Item>,
        );
    }

    const ChunkItems = chunks.map((c, index) =>


        props.dataprovider ?
            React.cloneElement(props.dataprovider, { data: c, key: 'ch_' + index },

                props.wrapper ? React.cloneElement(props.wrapper, { placeholderdata: c, key: 'chunk_' + index }) : undefined
            )
            : c

    );

    return pageMode ? <Fragment>
        {ChunkItems}
        {items.length > 1 && <Pagination size="lg" style={{ width: '90%', marginLeft: "5%" }}>{items}</Pagination>}
    </Fragment> :
        <Fragment>
            {ChunkItems}
        </Fragment>;
}

export default React.memo(ChunkSplitter);