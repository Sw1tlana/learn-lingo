import css from './RedMore.module.css';

export const RedMore = ({ teacherDetails, reviews }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    };
    
  return (
    <section className={css.readMoreContainer}>
      <button className={css.readMoreBtn} onClick={toggleExpanded}>
        {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          <p><strong>Experience:</strong> {teacher.experience}</p> 
          <p><strong>Reviews:</strong></p> 
      <ul>
        {teacher.reviews?.map((review, index) => (
          <li key={index}>
            <p>{review.reviewer_name}</p>
            <p>{review.comment}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default RedMore;
