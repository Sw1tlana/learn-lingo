import css from './LoginForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schemas/loginSchemas';
import { INITIAL_LOGIN_DATA } from '../schemas/loginSchemas';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_DATA
    });
    
    return (
        <div>
            
        </div>
    )
};

export default LoginForm;
