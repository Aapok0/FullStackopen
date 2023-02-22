const Total = ({parts}) => {
  const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  return <b>Number of exercises: {total}</b>
}
  
const Part = ({name, exercises}) => <p>{name}: {exercises}</p>
  
const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <Total parts={parts} />
    </>
  )
}
  
const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
    </div>
  )
}

export default Course