import css from './BookTrialLesson.module.css';
import ModalWindow from '../../shared/components/ModalWindow/ModlWindow';
import BookLessonForm from '../BookLessonForm/BookLessonForm';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';

const BookTrialLesson = ({ teacherName, teacherPhoto, onClose, isOpen  }) => {

  return (
      <div>
      <ModalWindow isOpen={isOpen} onClose={onClose}>
        <h2>Book trial lesson</h2>
        <img src={teacherPhoto} alt={teacherName} className={css.teacherPhoto} />
        <p>
          Our experienced tutor will assess your current language level,
          discuss your learning goals, and tailor the lesson to your specific needs.
        </p>
        <h3>What is your main reason for learning English?</h3>
        <RadioButtonGroup/>
     <BookLessonForm/>
    </ModalWindow>  
    </div>
  )
}

export default BookTrialLesson;
