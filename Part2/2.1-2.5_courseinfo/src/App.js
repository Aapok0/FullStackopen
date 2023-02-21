const Total = ({exercises}) => {
  const total = exercises.reduce((sum, exercises) => sum + exercises, 0)

  return <b>Number of exercises {total}</b>
}

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  const exercises = parts.map(part => part.exercises)

  return (
    <>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
      <Total exercises={exercises} />
    </>
  )
}

const Header = ({name}) => <h1>{name}</h1>

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App