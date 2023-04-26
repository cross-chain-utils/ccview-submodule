import React from 'react';
import Badge from 'react-bootstrap/esm/Badge';
import Stack from 'react-bootstrap/esm/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'

//const AH_verify = require('../../../public/AH_verify.png');

const QDataCollectionFlags = (props) => {

    const badgeStyle = {
        maxWidth: '9rem',
        whiteSpace: 'pre-wrap',
        marginRight: '2em'
        // alignSelf: 'stretch',
        // display: 'flex',
        // alignItems: 'center'
    };

    return (
        props.data ? <Stack className={'hideSmall'} gap={1} style={{ alignItems: 'flex-end' }}>{
            props.data.map(x => {
                switch (x) {
                    case "ah_w": return <Badge key={x} bg="secondary" style={badgeStyle}><FontAwesomeIcon icon={faCheckCircle} /> AtomicHub </Badge>
                    case "nb_w": return <Badge key={x} bg="secondary" style={badgeStyle}><FontAwesomeIcon icon={faCheckCircle} /> NeftyBlocks </Badge>
                    case "nsfw": return <Badge key={x} bg="warn" style={badgeStyle}>NSFW</Badge>
                    case "ban": return <Badge key={x} bg="danger" style={badgeStyle}>BANNED!</Badge>

                }

            })}</Stack> : <></>);
}

export default React.memo(QDataCollectionFlags);