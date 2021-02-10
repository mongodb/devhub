import { useReducer } from 'react';
import { studentSpotlightReducer } from '~utils/student-spotlight-reducer';

const initialState = { students: [{}] };

export const useStudentSpotlightReducer = () => {
    const [state, dispatch] = useReducer(studentSpotlightReducer, initialState);

    return [state, dispatch];
};
