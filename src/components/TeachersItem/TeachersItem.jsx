

const TeachersItem = ({teacher}) => {
   console.log('Rendering teacher item:', teacher);
   
  return (
    <li>
      <img 
        src={teacher.avatar_url || 'default-avatar.png'} 
        alt={`Avatar of ${teacher.name}`} 
        className={css.avatar} 
      />
      <h2>{teacher.name}</h2>
      <p><strong>Conditions:</strong> {teacher.conditions?.join(', ') || 'No conditions listed'}</p>
      <p><strong>Experience:</strong> {teacher.experience}</p>
      <p><strong>Languages:</strong> {teacher.languages?.join(', ') || 'No languages listed'}</p>
      <p><strong>Lesson Info:</strong> {teacher.lesson_info}</p>
      <p><strong>Lessons Done:</strong> {teacher.lessons_done}</p>
      <p><strong>Levels:</strong> {teacher.levels?.join(', ') || 'No levels listed'}</p>   
    </li>
  )
}

export default TeachersItem