import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import QData from './QData';


const QDataAuth = (props) => {

    const userLoggedIn = useSelector(state => state.user.isLoggedIn);

    return (<Fragment>
        {userLoggedIn ?
            <QData {...props}>{props.children}</QData> :
            props.propsOnly ?
                <>{props.children}</> :
                <></>
        }
    </Fragment>);

};

export default React.memo(QDataAuth);