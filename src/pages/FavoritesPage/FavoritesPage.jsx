import css from './FavoritesPage.module.css';
import { icons as sprite } from '../../shared/icons';
import RedMore from '../../components/RedMore/RedMore';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/favorites/slice';
import { selectFavoriteTeachers } from '../../redux/favorites/selectors';
import { useState } from 'react';

const FavoritesPage = () => {
  const dispatch = useDispatch();
    const favoriteTeachers = useSelector(selectFavoriteTeachers);
      
  console.log('Favorite Teachers:', favoriteTeachers);
  const [expandedTeacher, setExpandedTeacher] = useState(null);

  const handleFavoriteClick = (teacherId) => {
    const isFavorite = favoriteTeachers.some(teacher => teacher.id === teacherId);
    
    if (isFavorite) {
      dispatch(deleteFavorite(teacherId));
    } else {
      dispatch(addFavorite({ id: teacherId })); 
    }
  };

  const toggleExpanded = (teacherId) => {
    if (expandedTeacher === teacherId) {
      setExpandedTeacher(null);
    } else {
      setExpandedTeacher(teacherId);
    }
  };

  return (
    <ul>
      {favoriteTeachers && favoriteTeachers.length > 0 ? (
        favoriteTeachers.map((teacher) => (
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
                  <li className={css.ratingItem}>
                    <svg width={16} height={16} className={css.iconRating}>
                      <use xlinkHref={`${sprite}#icon-rating`} />
                    </svg>
                    <span className={css.textLessonInfo}>Rating:</span> {teacher.rating}
                  </li>
                  <li>
                    <span className={css.textLessonInfo}>Price 1/hour:</span>
                    <span className={`${css.price} ${css.textLessonInfo}`}>
                      {teacher.price_per_hour}$
                    </span>
                  </li>
                  <li className={css.heartItem}>
                    <button
                      type="button"
                      className={css.btnHeart}
                      onClick={() => handleFavoriteClick(teacher.id)}
                    >
                      <svg
                        width={23}
                        height={20}
                        className={`${css.iconHeart} ${
                          favoriteTeachers.some(favTeacher => favTeacher.id === teacher.id)
                            ? css.favorite
                            : ''
                        }`}
                      >
                        <use xlinkHref={`${sprite}#icon-heart`} />
                      </svg>
                    </button>
                  </li>
                </ul>

                <ul className={css.additionalInfo}>
                  <li>
                    <h2 className={css.nameTeachers}>
                      {teacher.name} {teacher.surname}
                    </h2>
                  </li>
                  <li>
                    <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>
                      Speaks:
                    </span>
                    <span className={`${css.textLessonInfo}`}>
                      {teacher.languages?.join(', ')}
                    </span>
                  </li>
                  <li>
                    <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>
                      Lesson Info:
                    </span>
                    <span className={`${css.textLessonInfo}`}>{teacher.lesson_info}</span>
                  </li>
                  <li>
                    <span className={`${css.subTextLessonInfo} ${css.textLessonInfo}`}>
                      Conditions:
                    </span>
                    <span className={`${css.textLessonInfo}`}>{teacher.conditions}</span>
                  </li>
                </ul>

                <RedMore
                  teacherDetails={teacher}
                  isExpanded={expandedTeacher === teacher.id}
                  toggleExpanded={() => toggleExpanded(teacher.id)}
                />

                {expandedTeacher === teacher.id && (
                  <div className={css.buttonContainer}>
                    <button type="button" className={css.btnBookLesson}>
                      Book trial lesson
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))
      ) : (
        <p>No favorite teachers available.</p>
      )}
    </ul>
  );
};

export default FavoritesPage;