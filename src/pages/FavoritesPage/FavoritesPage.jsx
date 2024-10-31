import css from './FavoritesPage.module.css';
import { icons as sprite } from '../../shared/icons';
import RedMore from '../../components/RedMore/RedMore';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from '../../redux/favorites/slice';
import { selectFavoriteTeachers } from '../../redux/favorites/selectors';
import BookTrialLesson from '../../components/BookTrialLesson/BookTrialLesson';
import Container from '../../shared/components/Container/Container';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; 

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteTeachers = useSelector(selectFavoriteTeachers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTeacher, setExpandedTeacher] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null); 
  

const handleFavoriteClick = (teacher) => {
  const isFavorite = favoriteTeachers.some(
    favTeacher => favTeacher.id === teacher.id);


  if (isFavorite) {
    dispatch(deleteFavorite(teacher.id));
  } else {
    dispatch(addFavorite(teacher));
  }
  };

  const handleBookLessonClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null); 
  };

    const toggleExpanded = (teacherId) => {
    if (expandedTeacher === teacherId) {
      setExpandedTeacher(null);
    } else {
      setExpandedTeacher(teacherId);
    }
  };

  useEffect(() => {
    if (favoriteTeachers.length === 0) {
    toast.success('No favorite teachers found.'); 
  } else {
    toast.success(`You have ${favoriteTeachers.length} favorite teachers.`);
  }
  }, [favoriteTeachers]);

  return (
    <div className={css.sectionWraper}>
      <Container> 
        <ul className={css.listTeacher}>     
          {Array.isArray(favoriteTeachers) && favoriteTeachers.length > 0 ? (
            favoriteTeachers.map((teacher) => {
              const isFavorite = favoriteTeachers.some(favTeacher => 
                favTeacher.id === teacher.id); 

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
                            onClick={() => handleFavoriteClick(teacher)}
                          >
                            <svg
                              width={23}
                              height={20}
                              className={`${css.iconHeart} ${isFavorite ? css.favorite : ''}`} // Виправлено
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
                          <button
                            type="button"
                            className={css.btnBookLesson}
                            onClick={() => handleBookLessonClick(teacher)}
                          >
                            Book trial lesson
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {isModalOpen && selectedTeacher && (
                    <BookTrialLesson
                      teacherName={`${selectedTeacher.name} ${selectedTeacher.surname}`}
                      teacherPhoto={selectedTeacher.avatar_url}
                      onClose={closeModal}
                      isOpen={isModalOpen}
                    />
                  )}
                </li>
              );
            })
          ) : (
           <div className={css.noFavorites}>
                <div className={css.animationContainer}>
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 24 24"
                    className={css.heartAnimation}
                  >
                    <path
                      fill="#F4C550"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <p className={css.noFavoritesText}>No favorite teachers available.</p>
                </div>
              </div>
          )}
        </ul>
      </Container>
    </div>
  )
};

export default FavoritesPage;