
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../../store/user';

const QueueTestButton = () => {

    //console.log("Test Button Draw");
    const currentUI = useSelector(state => state.user.ui.showQueue);
    const dispatch = useDispatch();

    const queueClickHandler = () => {
        //console.log(currentUI);

        dispatch(userActions.toggleQueue());


    }

    return <button onClick={queueClickHandler}>
        TEST Queue
    </button>;

}

export default React.memo(QueueTestButton);