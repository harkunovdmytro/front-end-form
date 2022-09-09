export interface FormRequest {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    framework: string;
    frameworkVersion: string;
    email: string;
<<<<<<< HEAD
    hobbies: {
=======
    hobby: {
>>>>>>> 11dcab86b028e4576c556045f9248d4ece2c738b
        name: string;
        duration: string;
    }[];
};