import React, { useState,  useEffect} from 'react'
import exportedObject from './services/persons'
import './App.css'
const Persons =({showPerson}) =>{
  return (
    <>{showPerson}</>
  )
}
const Notification= ({message})=>{
  if(message===null|| message===''){
    return null
  }
  return(
    <div className='message'>{message}</div>
  )
}
const ErrorMessage= ({message})=>{
  if(message===null|| message===''){
    return null
  }
  return(
    <div className='error'>{message}</div>
  )
}
const Filter =({newfilter, onChangeFilterhandler})=>{
  return(
    <form>
    <div>
      filter shown with: <input value={newfilter} onChange={onChangeFilterhandler}/>
    </div>
    </form>
  )
}
const PersonForm =({newName, onChangeNamehandler, newNumber, onNumberChangehandler, onClickHandler})=>{
  return(
    <form>
    <div>
      name: <input value={newName} onChange={onChangeNamehandler}/>
    </div>
    <div>number: <input value={newNumber} onChange={onNumberChangehandler}/></div>
    <div>
      <button type="submit" onClick={onClickHandler}>add</button>
    </div>
    </form>
  )

}
const App = () => {
    useEffect(() => {

      exportedObject
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])

  const [persons, setPersons] = useState([
    { name: '', number: '' , id: 0}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setfilter] = useState('')
  const [message, setMessage] =  useState('')
  const [errMessage, setErrMessage] =  useState('')



  const onChangeNamehandler = (event) =>{
    event.preventDefault()
    setNewName(event.target.value)
  }

  const onNumberChangehandler = (event) =>{
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const onClickHandler = (event) =>{
    event.preventDefault()
    const object = persons.find(person => person.name === newName)
    if(object){
      if (window.confirm(`${newName} is added to phonebook, replace the old number with new one?`)) {
        const newObject = {...object, number: newNumber}
        exportedObject
        .updataPerson(object.id, newObject)
        .then(response=>{
          console.log(response.data)
          setPersons(persons.map(person=>person.id!==object.id?person:response.data))
        })
        .catch(error=>{
          if(error.response.status == 400){
            setErrMessage(error.response.data.error)
            setTimeout(()=>setErrMessage(null), 5000)
            console.log(error.response.data.error)
          }else if(error.response.status == 404){
            setErrMessage(`Information of ${object.name} has already been removed from server`)
            setTimeout(()=>setErrMessage(null), 5000)
            setPersons(persons.filter(person=>person.id!==object.id))
          }else{
            console.log(error)
          }
        })
      }
      setNewName("")
      setNewNumber("")
    }else{
      exportedObject
      .addPerson({name: newName, number: newNumber})
      .then(response=>{
        console.log(response.data)
        setPersons(persons.concat(response.data))
        setMessage(`${newName} is already added to phonebook`)
        setTimeout(()=>setMessage(null), 5000)
        setNewName("")
        setNewNumber("")
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrMessage(error.response.data.error)
      })
    }
  }

  const handler = (persons, person)=>{
    if (window.confirm(`delete ${person.name}?`)) {
      exportedObject
      .deletePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id!==person.id))
        console.log(response)
      })
      console.log(person.id)
    }
  }

  const onChangeFilterhandler = (event) =>{
    setfilter(event.target.value)
  }
  const newPersons = persons.filter(person=>person.name.includes(newfilter))
  const showPerson = newfilter.length>0?newPersons.map(person=> {return(<div key = {person.name}>{person.name} {person.number} <button onClick={()=>handler(newPersons, person)}>delete</button></div>)}):persons.map(person=> {return(<div key = {person.name}>{person.name} {person.number} <button onClick={()=>handler(persons, person)}>delete</button></div>)})

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <ErrorMessage message={errMessage}/>
      <Filter newfilter={newfilter} onChangeFilterhandler={onChangeFilterhandler}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} onChangeNamehandler={onChangeNamehandler} newNumber={newNumber} onNumberChangehandler={onNumberChangehandler} onClickHandler={onClickHandler}/>
      <h3>Numbers</h3>
      <Persons showPerson={showPerson}/>
    </div>
  )
}
export default App