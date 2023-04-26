import styled from 'styled-components';
import React from 'react';


const FadeModal = styled.div`
    overflow-y:scroll;
   height: 100vh;
   background-color: #000000dd;
  
   transition: height 0.2s ease-in, opacity 0.2s  ease-in;
   opacity: 1;
   :empty {
    height:0;
   /* display: none;*/
    opacity: 0;
   }
`;

const ModalBG = (props) => {
    return <FadeModal size={props.size}>{props.children}</FadeModal>;
};

export default React.memo(ModalBG);