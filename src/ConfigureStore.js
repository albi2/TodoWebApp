import { configureStore } from '@reduxjs/toolkit';

import todosReducer from './features/todos/todoSlice';
import projectsReducer from './features/projects/projectsSlice';
import sessionsReducer from './features/sessions/sessionSlice';

const store = configureStore({
    reducer: {
        todos: todosReducer,
        projects: projectsReducer,
        sessions: sessionsReducer
    }
});

export default store;