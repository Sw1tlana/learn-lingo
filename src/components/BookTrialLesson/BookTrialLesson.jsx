import css from './BookTrialLesson.module.css';
import ModalWindow from '../../shared/components/ModalWindow/ModalWindow';
import BookLessonForm from '../BookLessonForm/BookLessonForm';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';

const BookTrialLesson = ({ teacherName, teacherPhoto, onClose, isOpen }) => {

  return (
    <div>
      <ModalWindow isOpen={isOpen}
        onClose={onClose}
        className={css.modalLesson}
        >      
        <h2 className={css.titleModalLesson}>Book trial lesson</h2>
        <p className={css.textModalLesson}>
          Our experienced tutor will assess your current language level,
          discuss your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.containerModalTeacher}> 
        <img src={teacherPhoto}
          alt={teacherName}
          className={css.teacherPhoto}
        />
        <div>
        <p className={css.nameModalLesson}>Your teacher</p>
        <p className={css.nameModal}>{teacherName}</p>
        </div>
        </div>
        <h3
          className={css.radioInfoModalLesson}>
          What is your main reason for learning English?
        </h3>
        <RadioButtonGroup/>
          <BookLessonForm />       
      </ModalWindow>  
    </div>
  )
}

export default BookTrialLesson;
