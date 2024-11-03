import css from './LoginForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schemas/loginSchemas';
import { icons as sprite } from '../../shared/icons';
import { INITIAL_LOGIN_DATA } from '../schemas/loginSchemas';
import { login } from '../../redux/auth/operations';

const LoginForm = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_DATA
    });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

const onSubmit = async (formData) => {
    const { email, password } = formData;

    if (!email || !password) {
        return;
    }

    try {
        await dispatch(login({ email, password })).unwrap(); 
    } catch (error) {
        throw new Error('Login failed');
    }

    reset();
}; 
    return (
        <section>
            <h2 className={css.titleLogin}>Log In</h2> 
            <p className={css.textLogin}>Welcome back! Please enter your credentials
               to access your account and continue your search for an teacher.
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                    id="email"
                    placeholder="Email"
                    className={css.formInput}
                    {...register('email')} />
                    {errors.email &&
                        <p className={css.errorMsg}>
                            {errors.email.message}</p>}
            </div>
            <div className={css.inputPassword}>
                    <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className={css.formInput}
                    {...register('password')} />
                    {errors.password &&
                        <p className={css.errorMsg}>
                            {errors.password.message}</p>}
                    <svg
                        width={18}
                        height={18}
                        className={`${css.iconEye} ${isPasswordVisible ? css.eyeOpen : css.eyeClosed}`}
                        onClick={togglePasswordVisibility}
                        aria-label="Toggle password visibility">
                        <use xlinkHref={`${sprite}#icon-eye-${isPasswordVisible ? 'on' : 'off'}`} />
                   </svg>

            </div>
                <button
                    type="submit"
                    className={css.btnLogin}
                >Log in</button>
            </form>
  </section>
    )
};

export default LoginForm;
