import RedMore from '../RedMore/RedMore';

const TeacherCard = ({teacher}) => {
    const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return  (
    <li key={teacher.id}>
      <div>
        <div>
          <img 
            src={teacher.avatar_url} 
            alt={`Avatar of ${teacher.name}`} 
          />
        </div>
        <div>
          <ul>
            <li>
              <span>Lessons Done:</span> {teacher.lessons_done}
            </li>
            <li>
              <span>Rating:</span> {teacher.rating}
            </li>
            <li>
              <span>Price 1/hour:</span> 
              <span>
                {teacher.price_per_hour}$
              </span>
            </li>
          </ul>

          <button 
            type="button" 
            onClick={toggleExpanded}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>

          {isExpanded && (
            <div>
              {teacher.levels?.map((level, index) => (
                <p key={index}>{level}</p>
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
