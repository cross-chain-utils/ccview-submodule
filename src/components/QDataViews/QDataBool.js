import React from 'react';

const QDataBool = (props) => {

  return (
    props.data ?
      props.pass !== '' ? <span>{props.children}{props.data.data ? props.pass : props.fail}</span> : <></> :
      <span>{props.children}{props.pending}</span>);
}

export default React.memo(QDataBool);