import React,{useState,forwardRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IoCloseOutline} from 'react-icons/io5';
import { GiStopwatch } from 'react-icons/gi';
import { FaCircle} from 'react-icons/fa';
import {Colors } from '../Navbar/NavbarElements.js';
import { BiSun } from 'react-icons/bi';
import { WiSunset } from 'react-icons/wi';
import { RiCalendarCheckLine } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Calendar from 'react-calendar';
import { todoAdded , selectTodos,nextId} from '../../features/todos/todoSlice.js';
import {selectProjects,selectProjectById}  from '../../features/projects/projectsSlice.js';
import 'react-calendar/dist/Calendar.css';
import './style.css';


const Bar = styled.div`
    width: 100%;
    font-color: ${Colors.mixGray};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border: 1px solid ${Colors.lighterGray};
    background-color: #fff;
    border-radius: 5px;
    margin: 20px 0;
    border: ${({isActive}) => isActive ? '1px solid ' + Colors.themeBlue  : 'none'};

`
const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 82%;
`

const Input = styled.input`
    padding: 11px 64px 11px 8px;
    border: none;
    width: 100%;
    font-size:1.1rem;
    outline: none;
    border-radius: 5px;

    &:focus {
        outline: none;
    }
`

const CloseBtn = styled(IoCloseOutline)`
    font-size: 2.2rem;
    color: #505152;
    display: ${({isDisplayed}) => isDisplayed ? 'block' : 'none'};
    position: absolute;
    top: 5px;
    right: 0;
`

const DetailsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 3px;   
    width: 18%;
    height: 100%;
    align-self:flex-end;
`

const PomodorosBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-right: 1px solid ${Colors.lightGray};
    padding: 0 7px;
`

const Stopwatch = styled(GiStopwatch)`
    font-size: 1.3rem;
    color: ${({color}) => color};
    opacity: 0.4;
`

const DateButton = styled.button`
    border: none;
    background: #fff;
    outline: none;
    margin-left: 7px;
    padding: 4px;
    font-size: 1.3rem;
    color: ${({color}) => color};
    display: flex;
    justify-content: center;
    align-items: center;
    &:focus{
        outline: none;
    }
`

const Header = styled.div`
    background-color: #fff;
    padding: 3px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const HeaderIcon = styled.div`
    color: ${({color}) => color};
    font-size: 1.4rem;
    padding: 5px;
`

const ProjectItem = styled.div`
    padding: 3px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

const ProjectCircle = styled(FaCircle)`
    color: ${({color}) => color};
    font-size: 0.7rem;
`

const ProjectName = styled.span`
    font-size: 1.1rem;
    margin-left: 10px;
`

const Tick = styled(TiTick)`
    font-size: 1.2rem;
    margin-left: auto;
    margin-top: -5px;
    color: ${Colors.darkGray};
`


const DetailsComponent = function({pomodoros, setPomodoros,categoriesIcons,
    chosenCategory,setCategory, dateValue, onDateChange, chosenMenu, chosenProject,
    setChosenProject}) {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const projects = useSelector(selectProjects);
    const toggle = () => setPopoverOpen(!popoverOpen);


    const stopwatches = [];
    for(let i = 1; i <= 5;++i){
        stopwatches.push(<Stopwatch key={i}
            color={i <= pomodoros ? Colors.themeBlue : Colors.darkGray}
            onClick={(e) => { 
                setPomodoros(() => i);
                e.stopPropagation();
            }}/>);
    }

    let currentColor;
    const currentProject = useSelector(state => selectProjectById(state,chosenProject));
    if(chosenMenu !== 'Today' && chosenMenu !== 'Tomorrow' && chosenMenu !== 'Upcoming')
        currentColor = categoriesIcons[chosenCategory].color;
    else  currentColor = currentProject?.color;



    return(
        <DetailsContainer>
            <PomodorosBox>
                {
                pomodoros <= 5 ? stopwatches : null
                }
            </PomodorosBox>
    
            <DateButton id="popBtn" color={currentColor}
            type="button" onClick={(e) => e.stopPropagation()}>
                {
                (chosenMenu !== 'Today' && chosenMenu !== 'Tomorrow' && chosenMenu !== 'Upcoming') ?
                    categoriesIcons[chosenCategory].icon : <FaCircle />
                }
            </DateButton>
            {
            (chosenMenu !== 'Today' && chosenMenu !== 'Tomorrow' && chosenMenu !== 'Upcoming') ?
            <Popover hideArrow={false}
                placement = "bottom" isOpen ={popoverOpen} 
                target="popBtn" toggle={toggle}>
                <PopoverHeader className='bg-white p-0'>
                    <Header>
                        {
                            categoriesIcons.map((icon, i) => 
                                <HeaderIcon key={i+1} onClick={(e) => {
                                    e.stopPropagation();
                                    setCategory(i);
                                    }}
                                color={chosenCategory === i ? icon.color : Colors.lightGray}>
                                    {icon.icon}
                                </HeaderIcon>
                            )
                        }
                    </Header>
                </PopoverHeader>
                <PopoverBody>
                <Calendar
                    onChange={onDateChange}
                    value={dateValue}
                    className="react-calendar"
                 />
                </PopoverBody>
            </Popover> :
            <Popover hideArrow={false}
            placement = "bottom" isOpen ={popoverOpen} 
            target="popBtn" toggle={toggle}>
                <PopoverBody>
                    {
                        projects.map((project,i) => 
                            <ProjectItem key={i+1} onClick={(e) => {                                    
                                e.stopPropagation();
                                setChosenProject(i+1);
                                }}>
                                <ProjectCircle color={project.color} />
                                <ProjectName>
                                    {project.text}
                                </ProjectName>
                                {i === chosenProject-1 ? <Tick /> : null}
                            </ProjectItem>
                        )
                    }
                </PopoverBody>
            </Popover>
        }
        </DetailsContainer>
    );
}

// Forwarding the input ref upwards to manage focus of whole container
const InputComponent = forwardRef(({inputFocused, setInputFocused, pomodoros, setPomodoros,chosenMenu},ref) => {
    const [isCloseDisplayed, setCloseBtn] = useState(false);
    const [taskName, setTaskName] = useState('');
    const [chosenCategory, setCategory] = useState(0);

    const projects = useSelector(selectProjects);
    const currProject = Object.values(projects).find(proj => proj.text === chosenMenu);

    const [theChosenProject, setChosenProject] = useState(currProject?.id ?? 1);
    const [dateValue, onDateChange] = useState(new Date());

    const categoriesIcons = [
    {
    icon: <BiSun />,
    color: '#44a336'
    },
    {
    icon: <WiSunset />,
    color: '#e0881b'
    },
    {
    icon: <RiCalendarCheckLine />,
     color: Colors.themeBlue 
    }
    ];

    const handleChange = function(e){
        setTaskName(() => e.target.value);
        if(e.target.value !== '')
            setCloseBtn(() => true);
        else setCloseBtn(() => false);
    }

    const handleCloseBtn = function() {
        setTaskName(() => '');
        setCloseBtn(() => false);
    }

    const dispatch = useDispatch();
    const next = useSelector(nextId)+1;
    const addProject = function(e) {
        const text = e.target.value.trim();

        if(e.which === 13 && text){
            dispatch(todoAdded(next,text,theChosenProject,false,
            dateValue.toISOString(),false,1,pomodoros,chosenCategory));
            setTaskName('');
        }
    }

    return (
        <Bar  isActive={inputFocused}>
            <InputContainer>
                <Input ref={ref} type="text" onK
                placeholder={`Add a task to "${currProject?.text ?? projects[0]?.text} Project To Do App" [Enter] to save`}
                name="task" value={taskName}  onChange={handleChange}  
                onFocus={() => setInputFocused(() => true)}
                onKeyDown = {addProject}/>
                <CloseBtn isDisplayed={isCloseDisplayed} onClick={handleCloseBtn}
               />
            </InputContainer>
            <DetailsComponent pomodoros={pomodoros} setPomodoros={setPomodoros} 
            categoriesIcons={categoriesIcons}
            chosenCategory={chosenCategory}
            setCategory={setCategory}
            dateValue={dateValue}
            onDateChange={onDateChange} 
            chosenMenu={chosenMenu}
            chosenProject={theChosenProject}
            setChosenProject={setChosenProject} />
        </Bar>
    )
});

export default InputComponent;
