

const TeachersItem = ({teacher}) => {
   
  return (
      <li>
            <img src={teacher.avatar_url} alt={`${teacher.name}'s avatar`} className={css.avatar} />
            <h2>{teacher.name}</h2>
            <p><strong>Conditions:</strong> {teacher.conditions.join(', ')}</p>
            <p><strong>Experience:</strong> {teacher.experience}</p>
            <p><strong>Languages:</strong> {teacher.languages.join(', ')}</p>
            <p><strong>Lesson Info:</strong> {teacher.lesson_info}</p>
            <p><strong>Lessons Done:</strong> {teacher.lessons_done}</p>
            <p><strong>Levels:</strong> {teacher.levels.join(', ')}</p>   
    </li>
  )
}

export default TeachersItem