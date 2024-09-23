import css from './RedMore.module.css';
import { icons as sprite } from '../../shared/icons';

const RedMore = ({ teacherDetails, isExpanded, toggleExpanded }) => {

  return (
<div className={isExpanded ? css.expanded : ''} onClick={toggleExpanded}>
  {isExpanded && (
      <>
          <div className={css.containerExperience}>
            <p className={css.textExperience}>
              {teacherDetails.experience}
            </p>
          </div>
        {teacherDetails.reviews?.map((review, index) => (
          <div key={index}
          className={css.containerReviev}
          >
            <div className={css.containerReview}>
              <p className={`${css.nameReview} ${css.textReview}`}>
                {review.reviewer_name}
                </p>
              <div className={css.containerIconRating}>
              <svg width={23} height={20} className={css.iconRating}>
                <use xlinkHref={`${sprite}#icon-rating`} />
              </svg>
              {review.reviewer_rating}
              </div>
            </div>
            <p className={css.textReview}>
              {review.comment}
            </p>
          </div>
        ))}
      </>
  )}
  {!isExpanded && (
    <div className={css.btnTextLesson} onClick={toggleExpanded}>
      Read More
    </div>
  )}
</div>
  );
}

export default RedMore;
