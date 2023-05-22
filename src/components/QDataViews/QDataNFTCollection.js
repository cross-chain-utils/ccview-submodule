import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import QDataNFTCollectionCard from './QDataNFTCollectionCard';
import { useDispatch } from 'react-redux';
import { webcacheActions } from '../../store/webcache';


const QDataNFTCollection = (props) => {

    const collectionRaw = props.data;
    const dispatch = useDispatch();

    // todo: wrap this with "fake" collections like favorites/features?

    // props should supply a QData control to load asset groups...
    // either template or ID

    useEffect(() => {

        dispatch(webcacheActions.addLoadedWallet({ walletid: props.walletid }))


    }, []);


    const [expanded, setExpanded] = useState(props.expandItem ? props.expandItem : '1');

    const expandedToggle = (e) => {
        setExpanded(e);

        // setTimeout(() => {
        //     console.log("ELEMENT", document.getElementById("acccrd-" + e));
        //     document.getElementById("acccrd-" + e)?.scrollIntoView()
        // }, 500);
    }

    return (
        collectionRaw && collectionRaw.collections ?
            <Accordion activeKey={expanded} className={props.className} onSelect={expandedToggle} flush>
                {collectionRaw.collections.map(c =>
                    <Card key={"acccrd-" + c.key} id={"acccrd-" + c.key} style={{ paddingBottom: '0.5rem' }}>
                        {props.collectionCardWrapper ?
                            React.cloneElement(props.collectionCardWrapper, { data: c }, <QDataNFTCollectionCard
                                walletid={props.walletid}
                                key={collectionRaw.chain + '_' + c.key}
                                data={c}
                                detailViewControl={props.detailViewControl}
                                expanded={expanded === ("acc-" + c.key)}
                                hiddenReducer={props.hiddenReducer}
                                assetdata={collectionRaw.assetdata} // OPTIONAL
                            />)

                            :
                            <QDataNFTCollectionCard
                                walletid={props.walletid}
                                key={collectionRaw.chain + '_' + c.key}
                                data={c}
                                detailViewControl={props.detailViewControl}
                                expanded={expanded === ("acc-" + c.key)}
                                hiddenReducer={props.hiddenReducer}
                                assetdata={collectionRaw.assetdata} // OPTIONAL
                            />
                        }
                    </Card>
                )
                }
            </Accordion>


            :
            <Spinner variant="warning" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>);
}

export default React.memo(QDataNFTCollection);