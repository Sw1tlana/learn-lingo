import css from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { icons as sprite } from '../../shared/icons';
import { registrSchema } from '../schemas/registrSchemas';
import { INITIAL_FORM_DATA } from '../schemas/registrSchemas';
import { register as registerUser } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();

    const { register, handleSubmit,  reset, formState: { errors } } = useForm({
        resolver: yupResolver(registrSchema),
         defaultValues: INITIAL_FORM_DATA
    });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
    
const onSubmit = async (data) => {
  try {
    console.log('Form data on submit:', data);
    await dispatch(registerUser(data));
    reset();
  } catch (error) {
    console.error('Error during registration:', error);
  }
};  
    return (
        <section>
        <h2 className={css.titleRegister}>
          Registration</h2>
        <p className={css.textRegister}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information
            </p>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
            <input
            id="text"
            placeholder="Name"
            className={css.formInput}
            {...register('name')} />
            {errors.name &&
              <p className={css.errorMsg}>
                {errors.name.message}</p>}
      </div>
      <div>
            <input
            id="email"
            className={css.formInput}
            placeholder="Email"
            {...register('email')} />
            {errors.email &&
              <p className={css.errorMsg}>
                {errors.email.message}</p>}
          </div>
          
      <div className={css.inputPassword}>
            <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            className={css.formInput}
            placeholder="Password"
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
            className={css.btnRegistr}
          >Signin Up</button>
    </form>   
    </section>
    )
};

export default RegistrationForm;


