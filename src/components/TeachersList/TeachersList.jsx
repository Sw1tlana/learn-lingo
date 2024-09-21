import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectTeachers } from '../../redux/teachers/selectors';
import TeachersItem from '../../components/TeachersItem/TeachersItem';
import TeacherFilter from '../TeacherFilter/TeacherFilter';
import Loader from '../../shared/components/Loader/Loader';
import css from './TeachersList.module.css';


const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <section className={css.sectionTeacher}>
      <TeacherFilter/>
    <ul className={css.teacherList}>
      {Array.isArray(teachers) && teachers.length > 0 ? (
        teachers.map((teacher) => (
          <TeachersItem key={teacher.id} teacher={teacher} />
        ))
      ) : (
        <Loader/>
      )}
    </ul>
    </section>
  );
};

export default TeachersList;
