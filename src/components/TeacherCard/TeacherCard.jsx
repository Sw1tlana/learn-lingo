import RedMore from '../RedMore/RedMore';
import css from './TeacherCard.module.css';

export const TeacherCard = ({teacher}) => {
      const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  }
  return (
        <li key={teacher.id} className={css.teacherCard}>
  <div className={css.teacherInfoContainer}>
        <div className={css.avatarContainer}>
          <span className={css.statusCircle}></span>
      <img 
        src={teacher.avatar_url} 
        alt={`Avatar of ${teacher.name}`} 
        className={css.avatar} 
      />
    </div>
      <div className={css.infoContainer}>

      <ul className={css.listInfoLessons}>
          <li>
            <span className={`${css.textLessonInfo} ${css.textLesson}`}>Languages</span>
          </li>
          <li className={css.withMargin}>
              <svg width={14} height={24} className={css.icon}>
                  <use xlinkHref={`${sprite}#icon-book`} />
              </svg>
              <span className={css.textLessonInfo}>Lesson online</span>
          </li>
            <li>
              <span className={css.textLessonInfo}>Lessons Done:</span> {teacher.lessons_done}
            </li>
            <li  className={css.ratingItem}>
              <svg width={16} height={16} className={css.iconRating}>
                  <use xlinkHref={`${sprite}#icon-rating`} />
            </svg>
            <span className={css.textLessonInfo}>Rating:</span> {teacher.rating}
            </li>
            <li>
            <span className={css.textLessonInfo}>Price 1/hour:</span>
            <span className={`${css.price} ${css.textLessonInfo}`}>
              {teacher.price_per_hour}$</span>
          </li>
          <li className={css.heartItem}>
            <svg width={23} height={20} className={css.iconHeart}>
              <use xlinkHref={`${sprite}#icon-heart`} />
            </svg>
          </li>
        </ul>
        
      <ul className={css.additionalInfo}>
          <li>
            <h2 className={css.nameTeachers}>{teacher.name} {teacher.surname}</h2>
          </li>
          <li>
            <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>Speaks: </span>
            <span className={`${css.textLessonInfo}`}>{teacher.languages?.join(', ')}</span>
          </li>
          <li>
            <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>Lesson Info: </span>
            <span className={`${css.textLessonInfo}`}>{teacher.lesson_info}</span>
          </li>
          <li>
            <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>Conditions: </span>
            <span className={`${css.textLessonInfo}`}>{teacher.conditions}</span>
          </li>
      </ul>
        <button type="button"
          className={css.btnTextLesson}
          onClick={toggleExpanded}>
            Read more
          </button>
            <div className={css.levelsInfo}>
              {teacher.levels?.map((level, index) => (
                <p key={index} className={css.levels}>{level}</p>
              ))}
           {isExpanded && <RedMore teacherDetails={teacher} reviews={teacher.reviews} />}
            </div>
        </div>
  </div>
</li>    
  )
}

export default TeacherCard;
