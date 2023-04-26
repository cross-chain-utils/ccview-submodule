import React from 'react';
import QData from '../HostLaneQueue/QData';
import BLBPostProcess from './BLBPostProcess';

const BadListBlocker = (props) => {

    if (process.env.SESSION_SERVER_ENABLED === "true") {

        console.log(`${process.env.API_ROOT}/proxy_api/wax_lists?pubkey=${encodeURIComponent(process.env.CLIENT_PUBKEY)}`)
        return (<QData url={`${process.env.API_ROOT}/proxy_api/wax_lists?pubkey=${encodeURIComponent(process.env.CLIENT_PUBKEY)}`}>
            <BLBPostProcess passedProps={props} />
        </QData>
        );
    } else {
        return <BLBPostProcess passedProps={props} />;
    }
}

export default React.memo(BadListBlocker);