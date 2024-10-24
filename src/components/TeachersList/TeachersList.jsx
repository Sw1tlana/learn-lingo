import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTeachers } from '../../redux/teachers/operations';
import { selectFilteredTeachers } from '../../redux/filters/selectors';
import {
  selectPage,
  selectLimit,
  selectTotalPages,
  selectLoading,
  selectTeachers,
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
  
  useEffect(() => {
    if (user?.token) {
      console.log('Токен, що передається в axios:', user.token);
      setToken(user.token);
    }
  }, [dispatch, limit, page, user]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.token && Number.isFinite(limit) && Number.isFinite(page)) {
        try {
          await dispatch(fetchTeachers({ page, limit })).unwrap();
          console.log('Response from fetchTeachers:', response); 
        } catch (error) {
          console.error('Failed to fetch teachers:', error);
        }
      }
    };

    fetchData();
  }, [dispatch, limit, page, user]);

  const handleFilterChange = (newFilteredTeachers) => {
    dispatch(changeFilter(newFilteredTeachers));
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
          <TeacherFilter onFilterChange={handleFilterChange} />
          <ul className={css.teacherList}>
            {loading ? (
              <Loader />
            ) : (
              filteredTeachers.map((teacher, index) => (
                <TeachersItem key={`${teacher.id}-${index}`} teacher={teacher} />
              ))
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