import styled from 'styled-components';
import { Colors} from '../Navbar/NavbarElements.js';
import { BsFullscreen} from 'react-icons/bs';
import { animated } from 'react-spring';


export const TimerContainer = styled(animated.div)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(150deg, #32cfc4, ${Colors.themeBlue},#836acc 90%);
    z-index: 20;
    top: 0;
    left: 0;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Minimize = styled(BsFullscreen)`
    position: absolute;
    top: 30px;
    left: 30px;
    color: #fff;
    font-size: 1.6rem;
    cursor: pointer;
`

export const TimeDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border: 1px solid ${Colors.lightGray};
    border-radius: 50%;
    width: 500px;
    height: 500px;
`

export const ButtonDiv = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
`

export const ButtonContainer = styled.div`
    color: #fff;
    font-size: 4.5rem;
    margin-left: 20px;
    cursor: pointer;
`

export const TimeContainer = styled.div`
    font-size: 4.5rem;
    color: #fff;
`

export const SmallTimerContainer = styled(animated.div)`
    width: 20%;
    padding: 5px 10px;
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 5%;
    left: 50%;
    background-image: linear-gradient(150deg, #32cfc4, ${Colors.themeBlue},#836acc 90%);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
`

export const SmallTimeContainer = styled.span`
    font-size: 1.5rem;
    color: #fff;
`

export const SmallButtonDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const SmallButtonContainer = styled.div`
    color: #fff;
    font-size: 2.5rem;
    cursor: pointer;
`

export const SmallTextDiv = styled.div`
    font-size: 1.2rem;
    max-width:50%;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
`

export const TodoItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    background-color: #fff;
    width: 30%;
    border-radius: 5px;
    margin-bottom: 20px;
`



