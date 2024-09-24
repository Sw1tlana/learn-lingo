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
    <form
      onSubmit={handleSubmit(onSubmit)}>
      
      <div>
        <input 
          id="text"
          placeholder="Full Name"
          className={css.formInput}
          {...register('name')}
          aria-required="true"/>
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
          aria-required="true"/>
        {errors.email &&
          <p className={css.errorMsg}>
            {errors.email.message}</p>}
      </div>

      <div>
    <input
          id="text"
          placeholder="Phone number"
          className={css.formInput}
          {...register('phone')}
          aria-required="true"/>
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
