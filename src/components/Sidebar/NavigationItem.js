import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from '../Navbar/NavbarElements.js';

// const ItemBox = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 30px 5px 30px 15px;
//     border-bottom
// ` 

const ItemBox = styled(Link)`
    display: flex;
    flex-direction: row;
    padding: 7px 5px;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
    margin-top: 10px;
    &.active{
        background-color: 
    }

`

const IconDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const IconDesc = styled.span`
    color: ${Colors.darkGray};
    margin-left: 12px;
    font-size: 1.21rem;
    display: block;
    text-wrap: nowrap;
`

const InfoDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 40px;
`

const InfoItem = styled.span`
    color: ${Colors.mixGray};
    text-wrap: nowrap;
`

const NavigationItem = ({icon, itemName, hours, noItems, togglePopup,id,chosenMenu, setChosenMenu}) => {
    return (
        <ItemBox to={`home/${chosenMenu}`} 
            onClick={() => setChosenMenu(itemName)}
         onContextMenu={togglePopup} id={id}>
            <IconDiv>
                {icon}
                <IconDesc>
                    {itemName}
                </IconDesc>
            </IconDiv>
            <InfoDiv>
                <InfoItem>
                    {hours}h
                </InfoItem>
                <InfoItem>
                    {noItems}
                </InfoItem>
            </InfoDiv>
        </ItemBox>
    )
}

export default NavigationItem;