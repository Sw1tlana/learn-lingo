import css from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrSchema } from '../schemas/registrSchemas';
import { INITIAL_FORM_DATA } from '../schemas/registrSchemas';
import { register as registerUser } from '../../redux/auth/operations';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token); 

    const { register, handleSubmit,  reset, formState: { errors } } = useForm({
        resolver: yupResolver(registrSchema),
         defaultValues: INITIAL_FORM_DATA
    });
    
const onSubmit = async (data) => {
  const { email, password, name } = data;

  if (email && password && name) {
    dispatch(registerUser({ userData: { email, password, name } }));
  } else {
    console.error('Missing required fields in form submission');
  }
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
            placeholder="Name"
            {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
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
      <button type="submit">Sign in</button>
    </form>   
    </section>
    )
};

export default RegistrationForm;


