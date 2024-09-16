import { selectTeachers } from "../../redux/teachers/selectors";
import TeachersItem from "../TeachersItem/TeachersItem";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from "../../redux/teachers/operations";

const TeachersList = () => {
    const teachers = useSelector(selectTeachers);
    const dispatch = useDispatch();

  if (!teachers || teachers.length === 0) {
      return <p>No teachers found.</p>; 
    }
    
    useEffect(() => {
        dispatch(fetchTeachers());
    }, [dispatch]);
    
    console.log('Fetched teachers:', teachers);

  return (
    <ul>
      {teachers.map(teacher => (
        <TeachersItem key={teacher.id} teacher={teacher}  />
      ))}
    </ul>
  )
}

export default TeachersList;
