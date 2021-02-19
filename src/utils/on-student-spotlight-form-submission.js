import { submitStudentSpotlightProject } from './devhub-api-stitch';
import { uploadImagesToStrapi } from './upload-images-to-strapi';

export const onStudentSpotlightFormSubmission = async (
    state,
    setError,
    setIsSubmitting,
    setSuccess
) => {
    setError(null);
    const newState = { ...state };
    setIsSubmitting(true);
    // Try project image upload
    const {
        success: projImageSuccess,
        data: projImageData,
    } = await uploadImagesToStrapi(newState.project_images);
    if (!projImageSuccess) {
        setError(projImageData);
        setIsSubmitting(false);
        return;
    }
    newState.project_images = projImageData;
    // Try student images upload
    const studentImages = newState.students.map(s => s.image);
    const {
        success: studentImageSuccess,
        data: studentImageData,
    } = await uploadImagesToStrapi(studentImages);
    if (!studentImageSuccess) {
        setError(studentImageData);
        setIsSubmitting(false);
        return;
    }
    studentImageData.forEach((id, i) => {
        newState.students[i].image = id;
    });
    const { success, message } = await submitStudentSpotlightProject(newState);
    setIsSubmitting(false);
    if (success) {
        setSuccess(true);
    } else {
        setError(message);
        console.error(message);
    }
};
