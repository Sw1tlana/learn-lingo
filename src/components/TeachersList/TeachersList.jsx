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
import { selectUser } from '../../redux/auth/selectors';
import { setToken } from '../../redux/services/authServices';

const TeachersList = () => {
  const dispatch = useDispatch();
  const filteredTeachers = useSelector(selectFilteredTeachers);
  const teachers = useSelector(selectTeachers);
  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  console.log('Loading state:', loading);
  console.log('User info:', user);
  console.log('Filtered teachers:', filteredTeachers);
  console.log('Current page:', page);
  console.log('Total pages:', totalPages);

   useEffect(() => {
    if (user && user.token) {
      setToken(user.token); 
    }
  }, [user]);

  useEffect(() => {
    if (Number.isFinite(limit) && Number.isFinite(page)) {
      console.log('Fetching teachers with:', { page, limit });
      dispatch(fetchTeachers({ page, limit }));
    }
  }, [dispatch, limit, page]);

  const handleFilterChange = (filteredTeachers) => {
    dispatch(changeFilter(filteredTeachers)); 
    dispatch(setPage(1)); 
    dispatch(fetchTeachers({ page: 1, limit }));
  };
  
  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <div className={css.listWraper}>
      <Container>
        <section className={css.sectionTeacher}>
          {user ? (
            <p>Привіт, {user.displayName}!</p>
          ) : (
            <p>Користувач не автентифікований.</p>
          )}
          <TeacherFilter onFilterChange={handleFilterChange} />

          <ul className={css.teacherList}>
            {loading ? (
              <Loader />
            ) : (
              Array.isArray(filteredTeachers) && filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <TeachersItem key={teacher.id} teacher={teacher} />
                ))
              ) : (
                <p>Немає вчителів для відображення.</p>
              )
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