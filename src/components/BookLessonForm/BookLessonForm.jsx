import css from "./BookLessonForm.module.css";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { INITIAL_FORM_DATA, bookLessonSchema } from '../schemas/bookLessonSchemas';
import { useDispatch } from 'react-redux';
import { setBookingData } from '../../redux/trialLesson/silece';

const BookLessonForm = () => {
  const dispatch = useDispatch();

const { handleSubmit,  reset, register, formState: { errors } } = useForm({
    resolver: yupResolver(bookLessonSchema),
    defaultValues: INITIAL_FORM_DATA
});
    
    const onSubmit = async (data) => {

      const bookingData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        selectedOption: data.selectedOption 
    };

      dispatch(setBookingData(bookingData));
        reset();
    };
    
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input 
          id="Full Name"
          placeholder="Full Name"
          className={css.formInput}
          {...register('name')}
          required/>
        {errors.name &&
          <p className={css.errorMsg}>
            {errors.name.message}</p>}
      </div>

      <div>
        <input
          id="email"
          placeholder="Email"
          className={css.formInput}
          {...register('email')}
          required/>
        {errors.email &&
          <p className={css.errorMsg}>
            {errors.email.message}</p>}
      </div>

      <div>
    <input
          id="Phone number"
          placeholder="Phone number"
          className={css.formInput}
          {...register('phone')}
          required/>
          {errors.phone &&
          <p className={css.errorMsg}>
          {errors.phone.message}</p>}  
      </div>
      <button
        type="submit"
        className={css.btnBookLesson}
        >Book</button>
    </form>
  )
}

export default BookLessonForm;
