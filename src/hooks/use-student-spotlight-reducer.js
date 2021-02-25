import { useReducer } from 'react';
import {
    initialStudentSpotlightState,
    studentSpotlightReducer,
} from '~utils/student-spotlight-reducer';

export const useStudentSpotlightReducer = () => {
    const [state, dispatch] = useReducer(
        studentSpotlightReducer,
        initialStudentSpotlightState()
    );

    return [state, dispatch];
};
