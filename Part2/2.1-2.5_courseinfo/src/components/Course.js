/* A component that renders the total exercises in a course
    - reduce method takes every part's exercise amount and adds them to a sum variable */
const Total = ({parts}) => {
  const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  return <b>Number of exercises: {total}</b>
}
  
const Part = ({name, exercises}) => <p>{name}: {exercises}</p>

/* A component that renders parts of the course by calling part component and total exercises by calling total component.
    - map method adds a part component for every part of the course */
const Content = ({parts}) => {
  return (
    <>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <Total parts={parts} />
    </>
  )
}
  
/* A component that renders a course heading and body by calling the content component. */
const Course = ({course}) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
    </div>
  )
}

export default Course