import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectFilteredTeachers } from '../../redux/filters/selectors';
import {
  selectPage,
  selectLimit,
  selectLoading,
} from '../../redux/teachers/selectors';
import TeachersItem from '../../components/TeachersItem/TeachersItem';
import TeacherFilter from '../TeacherFilter/TeacherFilter';
import Loader from '../../shared/components/Loader/Loader';
import Container from '../../shared/components/Container/Container';
import css from './TeachersList.module.css';
import LoadMore from '../LoadMore/LoadMore';

const TeachersList = () => {

  const dispatch = useDispatch();
  const teachers = useSelector(selectFilteredTeachers);
  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
 
  useEffect(() => {
    dispatch(fetchTeachers({ page, limit }));
  }, [dispatch, limit, page]);

    const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

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
        {!loading && page < totalPages && (
        <div className={css.loadMoreContainer}>
          <LoadMore onClick={handleLoadMore} />
        </div>
      )}
          {/* <LoadMore/> */}
    </section >
    </Container>
    </div>
  );
};

export default TeachersList;
