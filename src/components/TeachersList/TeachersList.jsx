import { selectTeachers, selectLoading, selectError } from "../../redux/teachers/selectors";
import TeachersItem from "../TeachersItem/TeachersItem";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from "../../redux/teachers/operations";

const TeachersList = () => {
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
    const dispatch = useDispatch();

  if (!teachers || teachers.length === 0) {
       console.log('No teachers found:', teachers); 
      return <p>No teachers found.</p>; 
    }
    
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  console.log('Teachers:', teachers);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

    if (error) {
    console.error('Error fetching teachers:', error);
    return <p>Error fetching teachers. Please try again later.</p>;
  }
  
    if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log('Teachers:', teachers);
  console.log('Loading:', isLoading);

  return (
    <ul>
      {teachers.map((teacher) => (
        <TeachersItem key={teacher.id} teacher={teacher}  />
      ))}
    </ul>
  )
}

export default TeachersList;
