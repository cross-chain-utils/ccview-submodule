import React, { Fragment } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';
const maxStack = 20;

const fadeIn = keyframes`
    from {
        transform: rotateX(180deg);
        
    }

    to {
        transform: rotateX(0);
       
    }
`;

const complexMixin = css`
 animation-name: ${props => props.depth > 1 ? fadeIn : 'none'};
`;

// transform:rotateZ(${props => (Math.random() * 5) - 2.5}deg);

const StackWrapperCard = styled.div`
width: ${props => props.width ? props.width : '10rem'};
margin: 0 0 0 -1px;
padding: 0 0 0 0;
${complexMixin}
animation-duration:  ${props => props.depth / maxStack * 2}s;
transform-origin: top center 0px;
/* margin-bottom: ${props => ((props.depth / maxStack) * props.gap) + 'rem'}; */
background-color:rgba(0, 0, 0, ${props => props.depth / maxStack});
border-radius: 1em;
border-bottom: 0.25rem solid rgba(255, 255, 255, ${props => (props.depth - 1) / maxStack});
${props => props.messyMode ? `transform:rotateZ(${(Math.random() * 3) - 1.5}deg);` : ``}
`;

const StackContainer = styled.div`
display:inline-block;
`

const StackWrapper = (props) => {

    const messyModeState = useSelector((state) => state.user.prefs.messyMode);


    const recursiveWrapper = (stack, ct) => {
        if (ct <= 0) {
            return stack;
        }

        return recursiveWrapper(<StackWrapperCard gap={props.gap} depth={ct} messyMode={messyModeState} width={props.width}>{stack}</StackWrapperCard>, ct - 1);

    };

    const testStack = recursiveWrapper(<Fragment>{props.children}</Fragment>, Math.min(maxStack, props.count ? props.count : 1));

    return <StackContainer>{testStack}</StackContainer>;
}

export default React.memo(StackWrapper);