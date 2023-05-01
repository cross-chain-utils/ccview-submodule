import React, { Fragment } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const MarginRightBottom = styled.div`
display: inline-block;
margin: 0 2rem 1.5rem 0;
`

const BreakHeader = styled.div`
word-wrap: break-word;
   max-width: 100%;
   font-size: 2em;
   font-weight: bold;
`

const QDataNFTCollectionHeader = (props) => {

    const collectionRaw = props.data;

    // todo: wrap this with "fake" collections like favorites/features?


    return (
        props.data ?
            <Fragment>

                <BreakHeader className={'break-header'}>{`${collectionRaw?.owner}`}</BreakHeader>

                {!props.hideAssets &&
                    <MarginRightBottom>
                        <Button variant="primary" disabled>
                            Assets <Badge bg="secondary">{`${collectionRaw?.assets}`}</Badge>
                            <span className="visually-hidden">Total assets in wallet</span>
                        </Button>
                    </MarginRightBottom>
                }
                <MarginRightBottom>
                    <Button variant="primary" disabled>
                        Collections <Badge bg="secondary">{`${collectionRaw?.collections?.length}`}</Badge>
                        <span className="visually-hidden">Total collections in wallet</span>
                    </Button>
                </MarginRightBottom>
            </Fragment>

            :
            <Spinner variant="info" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>)
}

export default React.memo(QDataNFTCollectionHeader);