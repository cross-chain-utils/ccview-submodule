import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { useStore } from 'react-redux';

const FormattedJSON = styled.pre`
background: #000000cc;
white-space: pre-wrap;
max-width: 900px;
color: #ddd;



 .string {
  color: #cccccc;
}

 .number {
  color: darkorange;
}

.ipfs {
  color: aqua;
}

 .boolean {
  color: skyblue;
}

 .null {
  color: magenta;
}

 .key {
  color: orange;
}

 .tlabel {
  color: #a4a4e4;
}
`;

const QDataRaw = (props) => {

  const formatJSON = (str) => {

    const link = /\"(http[s]{0,1}\:\/\/[^\"]+)\"/g;

    const ipfs = /(Qm[1-9A-Za-z]{44}[^OIl])/g;
    const ipfs_v1 = /([a-z0-9])/g;
    //const ipfs_base;
    const ipfsPaths = useStore().getState().user.api_endpoints.IPFS;


    return JSON.stringify(str, null, 2)
      .replace(/\"(true|false)\"/g, '<span class="boolean">$1</span>')
      .replace(/\"(\d+)\"/g, '<span class="number">$1</span>')
      .replace(/\:\s(\d+)/g, ': <span class="number">$1</span>')
      .replace(link, '"<a href="$1" target="_blank">$1</a>"')
      .replace(/(\"[^\"]+\")\:\s/g, '<span class="tlabel">$1</span>:')
      .replace(/\:\s(\"[^\"]+\")/g, ': <span class="string">$1</span>')
      //.replace(ipfs, ': <span class="ipfs">$1</span>')
      .replace(
        /:\"(Qm[1-9A-Za-z]{44})\"/g,
        ': "<a class="ipfs" href="' + ipfsPaths.provider1 + '$1" target="_blank">$1</a>"'
      );
  }

  return (
    props.data ?
      <div><FormattedJSON style={{ padding: "20px" }} dangerouslySetInnerHTML={{ __html: formatJSON(props.data) }}></FormattedJSON></div> :
      <Spinner variant="light" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>);
}

export default React.memo(QDataRaw);