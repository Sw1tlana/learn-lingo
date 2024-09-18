import { selectTeachers } from "../../redux/teachers/selectors";
import TeachersItem from "../TeachersItem/TeachersItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from "../../redux/teachers/operations";

const TeachersList = () => {
    const teachers = useSelector(selectTeachers);
    const dispatch = useDispatch();

  if (!teachers || teachers.length === 0) {
       console.log('No teachers found:', teachers); 
      return <p>No teachers found.</p>; 
    }
    
useEffect(() => {
  const fetchData = async () => {
    try {
      console.log('Dispatching fetchTeachers...');
      await dispatch(fetchTeachers());
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
    }
  };
  
  fetchData();
}, [dispatch]);
    
    console.log('Fetched teachers:', teachers);

  return (
    <div>
      {teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>{teacher.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TeachersList;
