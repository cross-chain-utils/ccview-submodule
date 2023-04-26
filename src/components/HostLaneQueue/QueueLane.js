import { React, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import QueueItem from './QueueItem';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
const QueueLane = (props) => {

    const dispatch = useDispatch();

    const currentCache = useSelector(state =>
        state.cache.queue.lanes.find(x => x.key === props.wkey));

    const getLabelRow = (label, active) => {
        const set = currentCache.items.filter(f => f.status === label);
        return <Fragment>
            {set.length > 0 &&
                props.visible ?
                <Fragment>
                    <h3>{label}</h3>
                    <ol>
                        {set.map(QueueItemIterator => <QueueItem key={QueueItemIterator.key} wkey={props.wkey} item={QueueItemIterator} active={active} visible={props.visible} onData={props.onData} />)}
                    </ol>
                </Fragment> :
                <Fragment>

                    {set.map(QueueItemIterator => <QueueItem key={QueueItemIterator.key} wkey={props.wkey} item={QueueItemIterator} active={active} visible={props.visible} onData={props.onData} />)}

                </Fragment>

            }
        </Fragment>
    }

    return <Fragment>
        {props.visible ?
            <Card>
                <h2>{currentCache.hostname}</h2>
                <Container fluid>

                    <Row>
                        <Col lg="3">{getLabelRow("Pending", false)}</Col>
                        <Col lg="3">{getLabelRow("Active", true)}</Col>
                        <Col lg="3">{getLabelRow("Finished", false)}</Col>
                        <Col lg="3">{getLabelRow("Failed", false)}</Col>
                    </Row> :

                </Container>
            </Card>
            :
            <Fragment>
                {getLabelRow("Pending", false)}
                {getLabelRow("Active", true)}
                {getLabelRow("Finished", false)}
                {getLabelRow("Failed", false)}
            </Fragment>
        }

    </Fragment>;
}

export default QueueLane;