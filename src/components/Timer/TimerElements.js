import styled from 'styled-components';
import { Colors} from '../Navbar/NavbarElements.js';
import { motion } from 'framer-motion';

// ANIMATION 

export const container ={
    maximized: {
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
        transition: {
            stiffness: 300,
            restDelta: 2
          }
    },
    minimized: {
        width: '20%',
        height: '70px',
        left: '40%',
        borderRadius: '5px',
        top: '87%',
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 40
          }
    }
};

export const remDisplayAnimation = {
    maximized: {
        display: 'flex',
        opacity: 1,
        transition: {
            delay: 0.3,
            type: "spring",
            stiffness: 20,
            restDelta: 2
          }
    },
    minimized: {
        display: 'none',
        opacity: 0,
        transition: {
            type: "spring",
            delay: 0.05,
            stiffness: 10,
            restDelta: 2
          }
    }
}

export const smallContainerAnim = {
    maximized: {
        display: 'none',
        opacity: 0
    },
    minimized: {
        display: 'flex',
        opacity: 1
    }
}

// STYLING
export const TimerContainer = styled(motion.div)`
    position: absolute;
    background-image: linear-gradient(150deg, #32cfc4, ${Colors.themeBlue},#836acc 90%);
    z-index: 20;
    display: flex !important;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    borderRadius: '5px';
    box-sizing: border-box;
`

export const Minimize = styled(motion.div)`
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

export const ButtonDiv = styled(motion.div)`
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20%;
    margin-top: 40px;
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



export const SmallTimerContainer = styled(motion.div)`
    width: 100%;
    padding: 5px 10px;
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    z-index: 100;
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

export const TodoItem = styled(motion.div)`
    display: flex !important;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 6px 8px;
    background-color: #fff;
    width: 30%;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
`



