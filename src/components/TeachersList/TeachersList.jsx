import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectFilteredTeachers } from '../../redux/filters/selectors';
import TeachersItem from '../../components/TeachersItem/TeachersItem';
import TeacherFilter from '../TeacherFilter/TeacherFilter';
import Loader from '../../shared/components/Loader/Loader';
import Container from '../../shared/components/Container/Container';
import css from './TeachersList.module.css';

const TeachersList = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectFilteredTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  return (
    <div className={css.listWraper}>
    <Container>
      <section className={css.sectionTeacher}>
        <TeacherFilter />
    <ul className={css.teacherList}>
      {Array.isArray(teachers) && teachers.length > 0 ? (
        teachers.map((teacher) => (
          <TeachersItem
            key={teacher.id}
            teacher={teacher} />
        ))
      ) : (
        <Loader/>
      )}
        </ul>
    </section >
    </Container>
    </div>
  );
};

export default TeachersList;
