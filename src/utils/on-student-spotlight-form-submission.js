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
    } = await uploadImagesToStrapi(newState.image);
    if (!projImageSuccess) {
        setError(projImageData);
        setIsSubmitting(false);
        return;
    }
    newState.image = projImageData;

    // Try project additional image upload
    const {
        success: addtlImageSuccess,
        data: addtlImageData,
    } = await uploadImagesToStrapi(newState.additional_images);
    if (!addtlImageSuccess) {
        setError(addtlImageData);
        setIsSubmitting(false);
        return;
    }
    newState.additional_images = addtlImageData;

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

    // Try Form submission
    const { success, message } = await submitStudentSpotlightProject(newState);
    setIsSubmitting(false);
    if (success) {
        setSuccess(true);
    } else {
        setError(message);
        console.error(message);
    }
};
