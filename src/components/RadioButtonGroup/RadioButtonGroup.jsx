import css from './RadioButtonGroup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../redux/trialLesson/silece';
import { setSelectedOptionState } from '../../redux/trialLesson/selectors';

const RadioButtonGroup = () => {
  const dispatch = useDispatch();

    const selectedOption = useSelector(setSelectedOptionState);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setSelectedOption(value)); 
    };
    
  return (
    <form>
        <label className={css.label}>
            <input
            type="radio"
            value="career"
            checked={selectedOption === 'career'}
            onChange={handleChange}
            />
            Career and business
          </label>
          <label className={css.label}>
              <input
                  type="radio"
                  value="kids"
                  checked={selectedOption === 'kids'}
                  onChange={handleChange}
              />
                Lesson for kids
          </label>
          <label className={css.label}>
              <input
                  type="radio"
                  value="exsams"
                  checked={selectedOption === 'exsams'}
                  onChange={handleChange}
              />
               Exams and coursework
          </label>
            <label className={css.label}>
              <input
                  type="radio"
                  value="culture"
                  checked={selectedOption === 'culture'}
                  onChange={handleChange}
              />
              Culture travel or hobby
          </label>
  </form>
  )
}

export default RadioButtonGroup;
