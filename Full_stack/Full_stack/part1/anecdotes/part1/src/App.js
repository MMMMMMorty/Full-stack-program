import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)

  let n = anecdotes.length  // arbitrary length
  let a = Array(n).fill(0)
  const [votes, setVotes] = useState(a)
  console.log(votes)

  const handler = (votes, selected)=>{
    let newVotes = [...votes]
    newVotes[selected] +=1//cannot change the vites directly
    setVotes(newVotes)
  }


  return (
    <div>
      <Header header="Anecdote of the day"/>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button handler = {()=>handler(votes, selected)} text = "vote" />
      <Button handler = {()=>setSelected(selected+1)} text = "next anecdote" />
      <Header header="Anecdote with most votes"/>
      <MaxVote anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App

const Header = ({header}) =>{
  return(<h1>{header}</h1>)
}
const Button = ({handler, text})=>{
  return(
  <button onClick = {handler}> {text}</button>
  )
}

const MaxVote = ({anecdotes, votes} )=>{
  let maxNumber = 0
  let max = 0
  for(let i=0; i<votes.length; i++){
    if(votes[i]>maxNumber){
      maxNumber = votes[i]
      max = i
    }
  }
  console.log(max)
  return(
    <div>
      <div>{anecdotes[max]}<div> 
      </div> has {votes[max]} votes</div>
    </div>
  )
}