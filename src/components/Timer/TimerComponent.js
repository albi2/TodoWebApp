import React from 'react'
import { TimerContainer, Minimize, ButtonDiv, ButtonContainer,TimeContainer,
SmallTimerContainer, SmallTimeContainer, SmallButtonContainer,
SmallButtonDiv, SmallTextDiv, TodoItem} from './TimerElements.js';
import { useTimer } from 'react-timer-hook';
import {CircularProgressbarWithChildren} from 'react-circular-progressbar';
import './style.css';
import RadialSeparators from './RadialSeparators.js';
import { IoStopCircleOutline,IoCaretForwardCircleOutline,IoPauseCircleOutline } from 'react-icons/io5';
import {useSpring} from 'react-spring';
import {selectTodoById, todoToggled} from '../../features/todos/todoSlice.js';
import {useSelector, useDispatch} from 'react-redux';
import { DateInfo, ItemText ,Play, TickDiv, Button,ButtonDiv as BDiv,
    ButtonTextDiv,formatDate} from '../Main/TodosComponent.js';
import { AiOutlineCheck } from 'react-icons/ai';

const TimerComponent = ({expiryTimestamp, isMinimized, setMinimization,setRunningProject,currentRunningTodo}) => {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        resume,
        restart
        } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

      const findSeconds = function(min ,sec){
          const minSecs = (50-min-1) * 60;
          const secs = 60 -sec;
          return secs + minSecs;
      }

      const animation = useSpring({
          config: {
              duration: 250,
              friction: 400,
              tension: 40
          },
          display: isMinimized ? 'block' : 'none',
          transform: isMinimized ? 'scale(1)' : 'scale(10)'
        });

      const animation2 = useSpring({
        config: {
            duration: 100,
            friction: 400,
            tension: 40
        },
        display: isMinimized ? 'none' : 'block',
        transform: isMinimized ? 'scale(0)' : 'scale(1)',
        bottom: isMinimized ? '5%' : '0%',
        left: isMinimized ? '20%' : '0'
      })
    
    const currentTodo = useSelector(state => selectTodoById(state,currentRunningTodo));
    const dispatch = useDispatch();

    return (
       !isMinimized ? <TimerContainer style={animation2}>
           <Minimize onClick={() =>setMinimization(!isMinimized)}/>
           <TodoItem >
                <ButtonTextDiv>
                    <BDiv>
                        <Button onClick={() => {
                            dispatch(todoToggled(currentTodo.id));
                            setRunningProject(0);
                        }}/>
                        <TickDiv onClick={() => {
                            dispatch(todoToggled(currentTodo.id))}} >
                            <AiOutlineCheck />
                        </TickDiv>
                    </BDiv>
                    <BDiv>
                        <Button />
                        <Play onClick={() => {
                            setRunningProject(currentTodo.id);
                            setMinimization(false);
                        }}/>
                    </BDiv>
                    <ItemText>
                        {currentTodo.text}
                    </ItemText>
                </ButtonTextDiv>
                <DateInfo>
                   {currentTodo.dueDate ?  formatDate(new Date(currentTodo.dueDate)) : null}
                </DateInfo>
            </TodoItem>
           <CircularProgressbarWithChildren  value={(findSeconds(minutes,seconds)/(50.0*60))}
                maxValue={1}
                strokeWidth={5}
                className="bigProgressBar">
                <RadialSeparators
                count={12}
                style={{
                background: "#fff",
                width: "1px",
                height: `${5}%`
                }} />
                <TimeContainer>
                    {Intl.NumberFormat(navigator.language,{
                        style: 'decimal',
                        minimumIntegerDigits: 2
                    }).format(minutes)
                    +":"
                    +Intl.NumberFormat(navigator.language,{
                        style: 'decimal',
                        minimumIntegerDigits: 2
                    }).format(seconds)}
                </TimeContainer>
            </CircularProgressbarWithChildren>
                {isRunning ?
                 <ButtonDiv>
                    <ButtonContainer onClick={pause}>
                        <IoPauseCircleOutline />
                    </ButtonContainer>
                </ButtonDiv> :
                <ButtonDiv>
                    <ButtonContainer onClick={resume}>
                        <IoCaretForwardCircleOutline />
                    </ButtonContainer>
                    <ButtonContainer onClick={() => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 50*60);
                        restart(time);
                        pause();
                        }}>
                        <IoStopCircleOutline />
                    </ButtonContainer>
                    </ButtonDiv> 
                }
        </TimerContainer> 
        : <SmallTimerContainer onDoubleClick={() => setMinimization(false)}
        style={animation}>
            <CircularProgressbarWithChildren
                className="smallBar"
                value={(findSeconds(minutes,seconds)/(50.0*60))}
                maxValue={1}
                strokeWidth={7}>
                <SmallTimeContainer>
                    {Intl.NumberFormat(navigator.language,{
                        style: 'decimal',
                        minimumIntegerDigits: 2
                    }).format(minutes)}
                </SmallTimeContainer>
            </CircularProgressbarWithChildren>
            <SmallTextDiv>
                {currentTodo?.text}
            </SmallTextDiv>
            {isRunning ?
                    <SmallButtonContainer onClick={pause}>
                        <IoPauseCircleOutline />
                    </SmallButtonContainer>
                     :
                <SmallButtonDiv>
                    <SmallButtonContainer onClick={resume}>
                        <IoCaretForwardCircleOutline />
                    </SmallButtonContainer>
                    <SmallButtonContainer onClick={() => {
                        const time = new Date();
                        time.setSeconds(time.getSeconds() + 50*60);
                        restart(time);
                        pause();
                        }}>
                        <IoStopCircleOutline />
                    </SmallButtonContainer>
                </SmallButtonDiv> 
                }
        </SmallTimerContainer>
    )
}

export default TimerComponent;
