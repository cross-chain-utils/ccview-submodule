import React, { Fragment, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { executeTimer } from '../../store/webcache';


const DispatchTimer = () => {

    const dispatch = useDispatch();
    let tickCt = useRef(0);


    useEffect(() => {



        const queueTick = setInterval(() => {

            dispatch(executeTimer({ ct: tickCt.current++ }))

        }, 1000);

        return () => {
            console.log("Unload timer.")
            clearInterval(queueTick);
        }

    }, []);

    return <Fragment></Fragment>;
}

export default React.memo(DispatchTimer);