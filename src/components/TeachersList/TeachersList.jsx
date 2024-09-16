import { selectTeachers } from "../../redux/teachers/selectors";
import TeachersItem from "../TeachersItem/TeachersItem";
import { useSelector } from 'react-redux';


const TeachersList = () => {
    const teachers = useSelector(selectTeachers);

  return (
        <ul>
            {teachers.map(teacher => (
                <TeachersItem key={teacher.id} teacher={teacher} />
            ))}
        </ul>
  )
}

export default TeachersList;
