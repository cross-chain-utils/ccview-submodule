import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import QueueLane from './QueueLane';
import QueueTestButton from './QueueTestButton';


const CCHostLaneQueue = () => {


    const currentCache = useSelector(state => state.cache.queue.lanes.map(x => x.key), shallowEqual);

    const showQueue = useSelector(state => state.user.ui.showQueue);

    return <Fragment>

        {showQueue && <QueueTestButton />}
        {currentCache.map(x => <QueueLane key={x} wkey={x} visible={showQueue} />)}
    </Fragment>;
}

export default React.memo(CCHostLaneQueue);