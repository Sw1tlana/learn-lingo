import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectTeachers } from '../../redux/teachers/selectors';
import TeachersItem from '../../components/TeachersItem/TeachersItem';


const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <ul>
      {Array.isArray(teachers) && teachers.length > 0 ? (
        teachers.map((teacher) => (
          <TeachersItem key={teacher.id} teacher={teacher} />
        ))
      ) : (
        <li>No teachers found</li>
      )}
    </ul>
  );
};

export default TeachersList;
