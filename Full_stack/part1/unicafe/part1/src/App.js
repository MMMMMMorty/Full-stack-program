import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
//good, neutral, and bad.
  return (
    <div>
      <Header context='give feedback'/>
      <Button handler={()=>setGood(good + 1)} text='good'/>
      <Button handler={()=>setNeutral(neutral + 1)} text='neutral'/>
      <Button handler={()=>setBad(bad + 1)} text='bad'/>
      <Header context='statistics'/>
      <Statistics good={good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App

const Statistics = (props) => {
  if(props.good+props.neutral+props.bad === 0){
    return(
      <div>No feedback given</div>
    )
  }
  let positive = (props.good/(props.good+props.neutral+props.bad))*100
  positive = positive.toString() + "%"
  return (
    <div>
      <table>
      <StatisticLine text='good' value={props.good}/>
      <StatisticLine text='neutral' value={props.neutral}/>
      <StatisticLine text='bad' value={props.bad}/>
      <StatisticLine text='all' value={props.good+props.neutral+props.bad}/>
      <StatisticLine text='average' value={(props.good*1+props.neutral*0+props.bad*(-1))/(props.good+props.neutral+props.bad)}/>
      <StatisticLine text='positive' value={positive}/>
      </table>
    </div>
  )
}
const Button = ({handler, text}) =>{
  return(
    <button onClick = {handler}>{text}</button>
  )
}

const Header = ({context}) =>{
  return(
    <div>
    <h1>{context}</h1>
    </div>
  )
}

const StatisticLine  = ({text, value}) =>{
  return (<tr>{text} {value}</tr>)
}