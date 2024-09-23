import css from "./BookLessonForm.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INITIAL_FORM_DATA, bookLessonSchema } from '../schemas/bookLessonSchemas';


const BookLessonForm = () => {

const { handleSubmit,  reset, register, formState: { errors } } = useForm({
    resolver: yupResolver(bookLessonSchema),
    defaultValues: INITIAL_FORM_DATA
});
    
    const onSubmit = async (data) => {
        reset();
    };
    
  return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
            <input type="text"
            placeholder="Full Name"
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
        <label>Phone number</label>
    <input
      type="text"
      placeholder="Phone number"
      {...register('phone')}
    />
    {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <button type="submit">Book</button>
    </form>
  )
}

export default BookLessonForm;
