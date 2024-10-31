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

const TeachersList = () => {
  const dispatch = useDispatch();
  const filteredTeachers = useSelector(selectFilteredTeachers);
  const teachers = useSelector(selectTeachers);
  const limit = useSelector(selectLimit);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);
  const loading = useSelector(selectLoading);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const fetchData = async () => {
      if (loading && Number.isFinite(limit) && Number.isFinite(page) && teachers.length === 0) {
        try {
          await dispatch(fetchTeachers({ page, limit, filters })).unwrap()
        } catch (error) {
          throw new Error('Failed to load teachers. Please try again.');
        }
      }
    };
  
    fetchData();
  }, [dispatch, limit, page, filters, loading, teachers.length]);

  const handleFilterChange = (newFilteredTeachers) => {
    dispatch(changeFilter(newFilteredTeachers));
    dispatch(setPage(1));
    dispatch(fetchTeachers({ page: 1, limit, filters: newFilteredTeachers }));
  };

  const handleLoadMore = () => {
    if (!loading && page < totalPages) {
      dispatch(setPage(page + 1));
      dispatch(fetchTeachers({ page: page + 1, limit, filters }));
    }
  };

  const createWaveText = (text) => {
    return text.split(' ').map((word, wordIndex) => (
      <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.2em' }}>
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} style={{ animationDelay: `${(wordIndex * 0.2) + (charIndex * 0.1)}s` }}>
            {char}
          </span>
        ))}
      </span>
    ));
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
          filteredTeachers.length > 0 ? (
            filteredTeachers.map((teacher, index) => (
              <TeachersItem key={`${teacher.id}-${index}`} teacher={teacher} />
            ))
          ) : (
            <p className={`${css.wave}`}>{createWaveText("No teachers found for the current criteria.")}</p>
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