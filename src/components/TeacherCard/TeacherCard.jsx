import RedMore from '../RedMore/RedMore';
import css from './TeacherCard.module.css';

const TeacherCard = ({teacher}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return  (
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
              <span className={css.textLessonInfo}>Lessons Done:</span> {teacher.lessons_done}
            </li>
            <li>
              <span className={css.textLessonInfo}>Rating:</span> {teacher.rating}
            </li>
            <li>
              <span className={css.textLessonInfo}>Price 1/hour:</span> 
              <span
                className={`${css.price} ${css.textLessonInfo}`}>
                {teacher.price_per_hour}$
              </span>
            </li>
          </ul>

          <button 
            type="button" 
            className={css.btnTextLesson}
            onClick={toggleExpanded}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>

          {isExpanded && (
            <div className={css.levelsInfo}>
              {teacher.levels?.map((level, index) => (
                <p key={index} className={css.levels}>{level}</p>
              ))}
              <RedMore teacherDetails={teacher} reviews={teacher.reviews} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default TeacherCard;
