const Header = (props) => {
  return ( <h1>{props.course}</h1> )
}

const Part = (props) => {
  return (
    <p>
      {props.section.name} {props.section.exercises}
    </p>
    )
}

const Content = (props) => {
  return (
    <div>
      <Part section={props.parts[0]} />
      <Part section={props.parts[1]} />
      <Part section={props.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.map(part => part.exercises)
                                       .reduce((previous, current) => previous + current, 0)
                                       }
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App