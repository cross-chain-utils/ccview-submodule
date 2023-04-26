import React, { Fragment } from 'react';
import QData from '../HostLaneQueue/QData';
import QDataBootswatch from '../QDataViews/QDataBootswatch';
// todo: user prefs cdn theme picker
// todo: bootstrap navbar
const BootswatchCDN = (props) => {
    return <Fragment>
        <QData url="https://bootswatch.com/api/5.json">
            <QDataBootswatch mode={props.mode} />
        </QData>
    </Fragment>;
}

export default React.memo(BootswatchCDN);