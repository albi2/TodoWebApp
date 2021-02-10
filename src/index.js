import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './ConfigureStore.js';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';

// // Importing the reducers/todos
// import { todoAdded, 
//   todoToggled, 
//   projectSelected,
//   todoDeleted, 
//   todoSetDate, 
// } from './features/todos/todoSlice.js';

// // Importing the selectors/todos
// import {
//   selectTodos,
//   selectTodoById,
//    selectTotalTodos,
//    selectTodoIds
// } from './features/todos/todoSlice.js';

// // Importing reducers projects/
// import {projectAdded, projectDeleted, changeColor , projectCompleted,Colors} from './features/projects/projectsSlice.js';

// // Importing selectors/projects
// import {
//   selectProjects,
//   selectProjectById,
//   selectTotalProjects,
//   selectProjectIds
// } from './features/projects/projectsSlice.js';

// // Importing reducers/sessions
// import { sessionAdded, sessionDeleted} from './features/sessions/sessionSlice.js';

// console.log('TODOS SLICE TESTING');
// // Add function testing
// console.log('------REDUCERS---------');
// store.dispatch(todoAdded( 1,  'Finish Homework' , 'Databases',  false,
//  new Date().toISOString(),  false,  1,4 ));
// console.log(store.getState());

// store.dispatch(todoAdded( 2,  'Finish Exercises' , 'Theory Of Computation',  true,
//  new Date().toISOString(),  true,  2,2 ));
// console.log(store.getState());

// store.dispatch(todoAdded( 3,  'Finish Exams' , 'Web programming',  false,
//  new Date().toISOString(),  true,  2,5 ));
// console.log(store.getState());

// store.dispatch(todoDeleted(3));
// console.log(store.getState());

// store.dispatch(todoToggled(1));
// console.log(store.getState());

// store.dispatch(projectSelected({ id: 1 , project: 'Databases 2'}));
// console.log(store.getState());

// store.dispatch(todoSetDate({id: 2, date: new Date().toISOString()}));
// console.log(store.getState());

// console.log('----------SELECTORS------------');
// console.log(selectTodos(store.getState()));
// console.log(selectTodoById(store.getState(),1));
// console.log(selectTotalTodos(store.getState()));
// console.log(selectTodoIds(store.getState()));

// console.log('PROJECTS SLICE TESTING');
// console.log('--------------REDUCERS-------------');
// store.dispatch(projectAdded(
//   1,
//   'Databases',
//   Colors.navyBlue,
//   false
// ));
// console.log(store.getState());

// store.dispatch(projectAdded(2, 'Theory Of Computation', Colors.forestgreen));
// console.log(store.getState());

// store.dispatch(projectAdded(3, 'Databases 2', Colors.purple));
// console.log(store.getState());

// store.dispatch(projectDeleted(3));
// console.log(store.getState());

// store.dispatch(changeColor(2, Colors.skyblue));
// console.log(store.getState());

// store.dispatch(projectCompleted(2));
// console.log(store.getState());

// console.log('---------------SELECTORS-------------------');
// console.log(selectProjects(store.getState()));
// console.log(selectProjectById(store.getState(), 1));
// console.log(selectTotalProjects(store.getState()));
// console.log(selectProjectIds(store.getState()));

// console.log('--------------SESSIONS--------------');
// store.dispatch(sessionAdded(1, "Databases", [12.344, 32.333], 4));
// store.dispatch(sessionAdded(2, "Theory Of Computation", [12.344, 12.231], 3));
// console.log(store.getState());

// store.dispatch(sessionDeleted(2));
// console.log(store.getState());

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


