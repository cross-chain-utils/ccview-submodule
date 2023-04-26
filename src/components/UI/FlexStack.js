import React from 'react';
import styled from 'styled-components';;
import StackWrapper from '../QDataViews/StackWrapper';
import Card from 'react-bootstrap/Card';

const FlexBrick = styled.div`
 flex: auto;
 margin: 0.5rem 0.5rem 0.5rem 0.5rem;
 text-align: center;
 
 .nftfinal.card {
    text-align: center; 
    border-width: thin; 
    border-style: solid; 
    min-height: 10rem; 
    border-color: rgba(255, 255, 255, 0.31) rgba(0, 0, 0, 0.02) rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.12);

 }

  
 .nulltemplate.card {
    text-align: center; 
    border-width: thin; 
    border-style: solid; 
    min-height: 10rem; 
    opacity: 0.5;
    border-color: rgba(255, 255, 255, 0.31) rgba(0, 0, 0, 0.02) rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.12);

 }

 .nftplaceholder.card {
    text-align: center; 
    height: 10rem; 
    line-height: 10rem; 
    vertical-align: middle; 
    border-width: thin; 
    border-style: solid; 
    border-color: rgba(255, 255, 255, 0.31) rgba(0, 0, 0, 0.02) rgba(0, 0, 0, 0.2) rgba(255, 255, 255, 0.12);
 }

`;


const FlexStack = (props) => {
    return <FlexBrick>
        <StackWrapper gap={0.8} count={props.assets} className="stackwrapper" width={props.width}>
            <Card className={`${props.className} stackcard`}>
                {props.children}
            </Card>
        </StackWrapper>
    </FlexBrick>
}

export default FlexStack;