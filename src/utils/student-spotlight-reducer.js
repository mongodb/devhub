export const studentSpotlightReducer = (state, { field, student, value }) => {
    if (student !== undefined) {
        const newStudents = [...state.students];
        newStudents[student][field] = value;
        return {
            ...state,
            students: newStudents,
        };
    } else {
        return {
            ...state,
            [field]: value,
        };
    }
};
