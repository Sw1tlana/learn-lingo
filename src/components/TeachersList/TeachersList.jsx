import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectFilteredTeachers } from '../../redux/filters/selectors';
import {
  selectPage,
  selectLimit,
  selectTotalPages,
  selectLoading,
  selectTeachers
} from '../../redux/teachers/selectors';
import { setPage } from '../../redux/teachers/slice';
import TeachersItem from '../../components/TeachersItem/TeachersItem';
import TeacherFilter from '../TeacherFilter/TeacherFilter';
import Loader from '../../shared/components/Loader/Loader';
import Container from '../../shared/components/Container/Container';
import css from './TeachersList.module.css';
import LoadMore from '../LoadMore/LoadMore';
import { changeFilter } from '../../redux/filters/slice';

const TeachersList = () => {

  const dispatch = useDispatch();
  const filteredTeachers = useSelector(selectFilteredTeachers);
  const teachers = useSelector(selectTeachers)
  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (Number.isFinite(limit) && Number.isFinite(page)) {
      dispatch(fetchTeachers({ page, limit }));
    }
  }, [dispatch, limit, page]);

  const handleFilterChange = (filteredTeachers) => {
  console.log("New filters applied:", filteredTeachers);
  dispatch(changeFilter(filteredTeachers)); 
  dispatch(setPage(1)); 
};
  
  const handleLoadMore = () => {
      console.log("Current Page before load more:", page);
    if (!loading && page < totalPages) {
      dispatch(setPage(page + 1));

      console.log("Loading more teachers...");
    }
  };


  return (
  <div className={css.listWraper}>
    <Container>
      <section className={css.sectionTeacher}>
        <TeacherFilter onFilterChange={handleFilterChange} />

        <ul className={css.teacherList}>
          {Array.isArray(filteredTeachers) && filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher) => (
              <TeachersItem key={teacher.id} teacher={teacher} />
            ))
          ) : (
                loading ? <Loader /> : <p>Press the button</p>
          )}
        </ul>

        {!loading && teachers.length >= limit && page < totalPages && (
          <div className={css.loadMoreContainer}>
            <LoadMore onClick={handleLoadMore} />
          </div>
        )}
      </section>
    </Container>
  </div>
  );
};

export default TeachersList;
