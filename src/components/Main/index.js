import React,{useState,createRef} from 'react'
import { BodyContainer } from './MainElements.js';
import StatsBar from './StatsBar.js';
import InputComponent from './InputComponent.js';

const Body = ({chosenMenu}) => {
    const [inputFocused, setInputFocused] = useState(false);
    const [pomodoros, setPomodoros] = useState(0);

    const ref = createRef();

    const handleClick = function(e){
        if(e.target !== ref.current){
            setInputFocused(() => false);
            setPomodoros(() => 0);
        }
    }
    return (
            <BodyContainer onClick={handleClick}>
                <StatsBar />
                <InputComponent ref={ref} inputFocused={inputFocused} 
                setInputFocused={setInputFocused} 
                pomodoros={pomodoros}
                setPomodoros={setPomodoros}
                chosenMenu={chosenMenu}/>
            </BodyContainer>
    )
}

export default Body;
