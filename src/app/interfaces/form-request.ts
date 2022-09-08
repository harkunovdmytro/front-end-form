export interface FormRequest {
    firstName: string;
    lastName: string;
    "dateOfBirth": string,
    "framework": string,
    "frameworkVersion": string,
    "email": string,
    "hobby": {
        "name": string,
        "duration": string
    }[]
};