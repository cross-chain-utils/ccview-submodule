import React, { useState, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import QDataRaw from './QDataRaw'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const QDataBadlist = (props) => {

    const [searchCol, setSearchCol] = useState('waxworksnfts');
    const SearchTB = useRef('waxworksnfts');

    const buttonClick = () => {
        setSearchCol(SearchTB.current.value);
        console.log(SearchTB.current.value);
    }

    return (
        props.data ?
            <Card>
                <Card.Header>WAX Collection Ban/NSFW/Whitelist</Card.Header>
                <Card.Body>


                    <Form.Group className="mb-3">
                        <Form.Label>Collection ID:</Form.Label>
                        <Form.Control ref={SearchTB} />
                        <Button variant="primary" onClick={buttonClick}>
                            Lookup
                        </Button>
                    </Form.Group>
                    <Container>
                        <Row>
                            <Col xs="3"></Col>
                            <Col xs="6">
                                <Card className="bg-dark text-white" style={{ width: '18rem' }}>
                                    <Card.Header className="bg-secondary text-white">{`${searchCol}`}</Card.Header>
                                    <Card.Body>

                                        <QDataRaw data={props.data && props.data.data && props.data.data.data ? (props.data.data.data[searchCol] ? props.data.data.data[searchCol] : { result: 'Not Found' }) : {}} />

                                    </Card.Body>
                                </Card>

                            </Col>
                            <Col xs="3"></Col>
                        </Row>
                    </Container>

                    {/* {props.data && props.data.data && <FormattedJSON dangerouslySetInnerHTML={{ __html: formatJSON(props.data.data.filter(x => x.data[searchCol] ? x.data[searchCol] : {})) }}></FormattedJSON>} */}
                </Card.Body>
            </Card> :
            <Spinner variant="secondary" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>);
}

export default React.memo(QDataBadlist);