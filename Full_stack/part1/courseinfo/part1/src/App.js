const App = () => {
  // const course = 'Half Stack application development'
  // const part1 = 'Fundamentals of React'
  // const exercises1 = 10
  // const part2 = 'Using props to pass data'
  // const exercises2 = 7
  // const part3 = 'State of a component'
  // const exercises3 = 14
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      {/* <Header course={course} />
      <Content part1={parts[0].name} exercises1={parts[0].exercises} part2 = {parts[1].name} exercises2 = {parts[1].exercises} part3 = {parts[2].name} exercises3 = {parts[2].exercises}/>
      <Total exercises1={parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises} /> */}
    </div>
  )
}

export default App

const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) =>{
  return (
    <div>
    <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises} />
    <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises} />
    <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises} />
    {/* <p>
        {props.part1} {props.exercises1}
    </p>
    <p>
        {props.part2} {props.exercises2}
    </p>
    <p>
        {props.part3} {props.exercises3}
    </p> */}
    </div>
  )
}
const Total = (props) =>{
  return (
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises +props.parts[2].exercises}</p>
  )
}

const Part = (props) =>{
  return (
  <p>
    {props.part} {props.exercises}
  </p>
  )
}