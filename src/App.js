
import React, { useEffect} from 'react';
import Home from './pages/Home.js';
import { Route,Switch, Redirect} from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import {projectAdded,Colors as ColorPalette} from './features/projects/projectsSlice.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(projectAdded(
        1,
        'Databases',
        ColorPalette.navyBlue,
        false
        ));
        dispatch(projectAdded(
            2,
            'Operating Systems',
            ColorPalette.lightorange,
            false
            ));
        dispatch(projectAdded(
            3,
            'Theory Of Computation',
            ColorPalette.skyblue,
            false
            ));

        dispatch(projectAdded(
            4,
            'Physics',
            ColorPalette.forestgreen,
            false
            ));
    })
  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />
        <Redirect to="/home" />
      </Switch>
    </>
  );
}

export default App;
