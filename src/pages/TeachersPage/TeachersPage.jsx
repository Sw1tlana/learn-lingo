import TeachersList from '../../components/TeachersList/TeachersList';
import Loader from '../../shared/components/Loader/Loader';
import { useSelector } from 'react-redux';
import { selectError, selectLoading } from '../../redux/teachers/selectors';

const TeachersPage = () => {
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    return (
        <div>
            {loading && !error && <Loader />}
            <TeachersList/>
        </div>
    )
};

export default TeachersPage;
