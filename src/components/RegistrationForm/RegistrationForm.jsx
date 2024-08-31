import css from './RegistrationForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrSchema } from '../schemas/registrSchemas';
import { INITIAL_FORM_DATA } from '../schemas/registrSchemas';

const RegistrationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registrSchema),
         defaultValues: INITIAL_FORM_DATA
    });
    
      const onSubmit = (data) => {
    };
    
    return (
        <section>
            <h2>Registration</h2>
            <p>Thank you for your interest in our platform! In order to register,
                we need some information. Please provide us with the following
                information
            </p>
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
            <input type="text"
            {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email</label>
            <input type="email"
            {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password</label>
            <input type="password"
            {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Register</button>
    </form>   
    </section>
    )
};

export default RegistrationForm;

