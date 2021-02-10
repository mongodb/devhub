import { useReducer } from 'react';
import { studentSpotlightReducer } from '~utils/student-spotlight-reducer';

const initialState = { students: [{ key: 0 }] };

export const useStudentSpotlightReducer = () => {
    const [state, dispatch] = useReducer(studentSpotlightReducer, initialState);

    return [state, dispatch];
};
