const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ sum }) => <b>total of {sum} exercises</b>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  var part = parts.map((part)=><Part key={part.id} part={part} />)
  return (
    <>
      {part}
    </>
  )
}

const Course =({course})=>{
  const parts = course.parts
  const total = parts.reduce((s, p) => {
    return s + p.exercises 
  }, 0)
  return(
    <>
    <Header name={course.name}/>
    <Content parts={course.parts}/>
    <Total sum = {total}/>
  </>
  )

}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


//   return <Course course={course} sum ={total}/>
  return (
    <div>
      <Header name="Web development curriculum"/>
      <Course course={courses[0]}/>
      <Course course={courses[1]}/>
    </div>
  )
}

// const App = () => {
//   const course = {
//     id: 1,
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10,
//         id: 1
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7,
//         id: 2
//       },
//       {
//         name: 'State of a component',
//         exercises: 14,
//         id: 3
//       },
//       {
//         name: 'Redux',
//         exercises: 11,
//         id: 4
//       }
//     ]
//   }
//   const parts = course.parts
//   const total = parts.reduce((s, p) => {
//     return s + p.exercises 
//   }, 0)

//   return <Course course={course} sum ={total}/>
// }

export default App