import * as yup from 'yup';

export const bookLessonSchema = yup.object().shape({
    name: yup.string()
        .required("Name is required"),
    email: yup.string().email("Invalid email address")
        .required("Email is required"),
    phone: yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .required("Phone number is required"),
});

export const INITIAL_FORM_DATA = {
    name: "",
    email: "",
    phone: "",
};