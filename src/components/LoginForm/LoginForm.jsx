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

    const onSubmit = (data) => {
        
    }
    
    return (
        <section>
            <h2>Log In</h2> 
            <p>Welcome back! Please enter your credentials
               to access your account and continue your search for an teacher.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <label>Email</label>
                    <input type="email"
                    placeholder="Email"
                    {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>Password</label>
                    <input type="password"
                    placeholder="Password"
                    {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button type="submit">Log in</button>
            </form>
  </section>
    )
};

export default LoginForm;
