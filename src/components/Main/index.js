import React,{useState,createRef} from 'react'
import { BodyContainer } from './MainElements.js';
import StatsBar from './StatsBar.js';
import InputComponent from './InputComponent.js';
import {useParams} from 'react-router-dom';
import TodosComponent from './TodosComponent.js';

const Body = ({setRunningProject, setMinimization}) => {
    const {menu} = useParams();
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
                <StatsBar chosenMenu={menu} />
                <InputComponent ref={ref} inputFocused={inputFocused} 
                setInputFocused={setInputFocused} 
                pomodoros={pomodoros}
                setPomodoros={setPomodoros}
                chosenMenu={menu}
                />
                <TodosComponent chosenMenu={menu}
                 setRunningProject={setRunningProject}
                 setMinimization={setMinimization}/>
            </BodyContainer>
    )
}

export default Body;
