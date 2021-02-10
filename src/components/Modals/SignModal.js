import React, { useRef} from 'react';
import { useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import { GiClockwork } from 'react-icons/gi';
import { Colors } from '../Navbar/NavbarElements.js';
import { Link, Switch, Route, Redirect} from 'react-router-dom';
import { MdClose} from 'react-icons/md';

export const Background = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
`

const ModalWrapper = styled.div`
    width: 400px;
    height: 500px;
    box-shadow: 0px 5px 16px rgba(0,0,0,0.2);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-rows: 2fr 3fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    padding: 10px 10px 0 10px;
    margin-top: -100px;
`

const LogoDiv = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: center;
` 

const ClockLogo = styled(GiClockwork)`
    color: ${Colors.themeBlue};
    font-size: 5rem;
    margin-top: 10px;
`

export const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
` 

export const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
    width: 100%;
`

const Input = styled.input`
    padding: 5px 10px;
    border: 1px solid ${Colors.lightGray};
    font-size: 1.1rem;
    color: #3b3a39;
    width: 90%;
    margin-top: 15px;
    border-radius: 5px;
    height: 40px;
    &:focus{
        outline-color: ${Colors.themeBlue};
    }
` 
const WarningSign = styled.span`
    display: block;
    color: #ff3853;
    width: 90%;
    text-align: left;
    height: 30px;
    padding: 10px 4px;
` 

const SignBtn = styled.button`
    width: 90%;
    border-radius: 5px;
    border: none;
    background-color: ${Colors.themeBlue};
    outline: none;
    color: #fff;
    padding: 10px 64px;
    text-align: center;
    font-size: 1.2rem;
` 

const ForgetSpan = styled(Link)`
    width: 90%;
    font-size: 0.9rem;
    color: #000;
    text-align: center;
    padding: 5px 0;
    textt-decoration: none;
`

const ModalNavigator = styled(Link)`
    border-top: 1px solid ${Colors.lighterGray};
    text-align: center;
    padding: 10px 64px;
    align-self: flex-end;
    font-size: 1.2rem;
    text-decoration: none;
`

const CloseModalButton = styled(MdClose)`
    width: 20px;
    height: 20px;
    color: ${Colors.darkGray};
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
`

const RecoverMessage = styled.span`
    font-size: 1.3rem;
    color: ${Colors.darkGray};
    width: 90%;
`

const SignModal = ({toggleModal, forget, btnText, navigatorText, change}) => {

    return(
        <ModalWrapper >
            <CloseModalButton onClick={toggleModal}/>
            <LogoDiv>
                <ClockLogo />
            </LogoDiv>
            <FormDiv>
                <Form>
                    <Input type="email" placeholder="Email Address" 
                    maxLength="30" name="email" id="email" />
                    <Input type="password" placeholder="Password"
                    maxLength="20" name="password" id="password" />
                </Form>
                <WarningSign></WarningSign>
                <SignBtn type="button">
                    {btnText}
                </SignBtn>
                {forget ? <ForgetSpan to="/home/recover">
                    Forgot Password?
                </ForgetSpan> : null}
            </FormDiv>
            <ModalNavigator to={`/home/${change}`}>
                {navigatorText}
            </ModalNavigator>
        </ModalWrapper>
    )
}

const RecoveryModal = () => {
    return(
    <ModalWrapper>
        <LogoDiv>
                <ClockLogo />
        </LogoDiv>
        <FormDiv>
        <RecoverMessage>
            Enter your email address and well send your instructions for resetting your 
            password.
        </RecoverMessage>
        <Form>
        <Input type="email" placeholder="Email Address" 
        maxLength="30" name="email" id="email" />
        </Form>
        <WarningSign></WarningSign>
        <SignBtn type="button">
            Reset Password
        </SignBtn>
        </FormDiv>
        <ModalNavigator to='/home/sigin'>
                Back
        </ModalNavigator>
    </ModalWrapper>
    )
}

const SignInUpModal = ({showModal, toggleModal}) => {
    const modalRef = useRef();

    const animation = useSpring({
       config: {
           duration: 250
       },
       opacity: showModal ? 1 : 0,
       transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });
    
    const closeModal = (e) => {
        if(e.target === modalRef.current){
            toggleModal();
        }
    }


    return (
        <>
        {showModal ? 
        <Background ref={modalRef} onClick={closeModal}>
            <animated.div style={animation}>
                <Switch>
                    <Route exact path="/home/signin" component={() => <SignModal toggleModal={toggleModal} btnText="Sign In" navigatorText="Sign Up" forget change="signup"/>} />
                    <Route exact path="/home/signup" component={() => <SignModal toggleModal={toggleModal} btnText="Sign Up" navigatorText="Back" forget={false} change="signin"/>} />
                    <Route path="/home/recover" component={RecoveryModal} />
                    <Redirect to="/home/signin" />
                </Switch>
            </animated.div>
        </Background>
        : 
        null}
        </>
    )
}

export default SignInUpModal;
