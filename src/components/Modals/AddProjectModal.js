import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Background, FormDiv, Form } from './SignModal.js';
import styled from 'styled-components';
import { Colors } from '../Navbar/NavbarElements.js';
import { FaCircle } from 'react-icons/fa';
import { Colors as ColorPalette, projectAdded, selectTotalProjects, selectProjectById, changeName, changeColor } from '../../features/projects/projectsSlice.js';
import { useSpring, animated, config} from 'react-spring';
import { TiTick } from 'react-icons/ti';

const ModalWrapper = styled(animated.div)`
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    width: 400px;
    height: 450px;
    box-shadow: 0px 5px 16px rgba(0,0,0,0.2);
    z-index: 10;
    border-radius: 10px;
    margin-top: -100px;
    background-color: #fff;

    
`

const Circle = styled(FaCircle)`
    font-size: 1.8rem;
    color: ${({color}) => color};
    text-align: center;
`

const Title = styled.span`
    text-align: center;
    padding: 10px 0;
    color: ${Colors.darkGray};
    font-size: 1.4rem;    
`

const Input = styled.input`
    width: 100%;
    outline: none;
    padding: 10px 15px;
    height: 50px;
    border: 1px solid ${Colors.lightGray};
    color: #3b3a39;
    border-radius: 5px;
    font-size: 1.2rem;
` 

const ColorButtonsDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows: 1fr 1fr 1fr 0.5fr;
    justify-items: start;
    width: 103%;
    margin-top: 30px;
    
`
const ColorButton = styled.button`
    background-color: #fff;
    border: none;
    padding: 10px 10px 10px 0;
    outline: none;
    position: relative;
`

const TickMark = styled(TiTick)`
    font-size: 1.4rem;
    color: #fff;
    position: absolute;
    top:25%;
    left: 10%;
`

const DisplayColors = ({colors,selectedButton, setSelectedButton}) => {

    return(
        colors.map((color,i) => 
            <ColorButton key={i} className={'button' + i} 
            onClick={() => {
                setSelectedButton(() => i);
            }}>
                <Circle color={color} />
                {i === selectedButton ? <TickMark /> : null}
            </ColorButton>
        )
    )
}

const ButtonsDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px 0;
   
`

const Button = styled.div`
    background-color: ${({color}) => color };
    border: 1px solid ${({borderColor}) => borderColor ? borderColor : 'transparent'};
    color: ${({fontColor}) => fontColor};
    padding: 10px 30px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
`

const ProjectModal = ({isProjectModalOpen, toggleProjectModal, toAdd, defaultProject}) => {
    const backgroundRef = useRef();

    const toggleThisModal = function(e) {
        if(e.target === backgroundRef.current){
            toggleProjectModal();
        }
    }

    const animation = useSpring({
        config: config.molasses,
        opacity: isProjectModalOpen ? 1 : 0
    });

    let defaultButton = 0;
    let defaultProjectName = '';
    const project = useSelector(state => selectProjectById(state,defaultProject));

    // Check if the project exist
    // Default project is set the moment you right click on of the projects on the sidebar
    if(defaultProject && project){
        const colors = Object.values(ColorPalette);
        defaultButton = colors.indexOf(project.color);
        defaultProjectName = project.text;
    }

    const [selectedButton, setSelectedButton] = useState(defaultButton);
    const [projectName, setProjectName] = useState(defaultProjectName);

    const handleProjectName = function(e) {
        setProjectName(() => e.target.value);
    }

    const dispatch = useDispatch();
    const id = useSelector(state => (selectTotalProjects(state)+1));

    const addProject = function() {
        if(!projectName) return;
        if(toAdd)
            dispatch(projectAdded(id,projectName, Object.values(ColorPalette)[selectedButton]));
        else{
            dispatch(changeName(defaultProject, projectName));
            dispatch(changeColor(defaultProject, Object.values(ColorPalette)[selectedButton]));
        }
        toggleProjectModal();
    }

    return (
        isProjectModalOpen ? 
        <Background onClick={toggleThisModal} ref={backgroundRef}>
                <ModalWrapper style={animation}>
                    <Title>
                        {toAdd ? 'Add Project' : 'Edit Project'}
                    </Title>
                    <FormDiv>
                        <Form>
                            <Input type="text" placeholder="Project Name"
                            name="projectName" value={projectName}
                            onChange={handleProjectName}/>
                        </Form>
                    </FormDiv>
                <ColorButtonsDiv>
                        <DisplayColors colors={Object.values(ColorPalette)} 
                        selectedButton={selectedButton} 
                        setSelectedButton={setSelectedButton}/>
                </ColorButtonsDiv>
                <ButtonsDiv>
                    <Button style={{marginRight: '10px'}} className="cancel" color={'#fff'} fontColor={Colors.darkGray} 
                    borderColor={Colors.lightGray} onClick={toggleProjectModal}>
                        Cancel</Button> 
                    <Button borderColor={null} fontColor={'#fff'} 
                    color={Colors.themeBlue} onClick={addProject} >
                        OK</Button> 
                </ButtonsDiv>
                </ModalWrapper>
        </Background>
        : 
        null
    )
}

export default ProjectModal;
