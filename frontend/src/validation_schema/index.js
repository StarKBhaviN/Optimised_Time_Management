import * as Yup from "yup";

export const loginSchema = Yup.object({
    Email: Yup.string().email("Invalid Email !!!").required("Email is required field.").transform(value => value.toLowerCase()),
    Password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required field."),
});

export const signupSchema = Yup.object({
    Name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Name is required field."),
    Email: Yup.string()
        .email("Invalid Email !!!")
        .required("Email is required field.")
        .transform(value => value.toLowerCase()),
    Password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Please Enter Password..."),
    Gender: Yup.string()
        .oneOf(['Male', 'Female', 'Other'], 'Invalid gender selection')
        .required('Gender is required'),
    phNo: Yup.string()
        .matches(/^[0-9]+$/, 'Phone Number must be only digits')
        .min(10, 'Phone number must be at least 10 digits')
        .max(12, 'Phone number must not exceed 12 digits')
        .required('Phone number is required'),
    Hobby: Yup.string()
        .min(2, 'Hobby must be at least 2 characters')
        .max(50, 'Hobby must not exceed 50 characters'),
});

export const taskAddSchema = Yup.object({
    Title : Yup.string().min(3,"Task must contain minimum 3 Chars...").required("Task is Required Field..."),
    Due_date : Yup.date(),
    Urgency : Yup.boolean(),
    Importance : Yup.boolean(),
    Description : Yup.string().min(5,"Description Must contain 5 Chars...")
});
