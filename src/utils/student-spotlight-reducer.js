export const initialStudentSpotlightState = () => ({
    students: [{ key: 0, isExpanded: true }],
});

const isUpdatingStudents = studentIndex => Number.isInteger(studentIndex);

export const studentSpotlightReducer = (state, { field, student, value }) => {
    /*
        Students work a bit differently, since there can be many per project.
        We check if there is an index provided for `student` and if so just
        modify the array of students.
    */
    if (isUpdatingStudents(student)) {
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
