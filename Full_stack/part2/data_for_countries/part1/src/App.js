import { useState,  useEffect} from 'react'
import axios from 'axios'
const Countries =({newCountries, newfilter, newCountry, setnewCountry, temp, setTemp, wind, setWind, iconAdd, setIconAdd}) =>{
  if (newCountries.length>10) {
    if (newfilter.length===0) {
      return(
        <div></div>
      )
    } else {
      return(
        <div>Too many matches, specify another filter</div>
      )
    }
  } else {
    if (newCountries.length===1) {
        return(
          <>
          <Country country={newCountries[0]} temp={temp} setTemp={setTemp} wind={wind} setWind={setWind} iconAdd={iconAdd} setIconAdd={setIconAdd}/>
          </>
        )
    } else {
      const handler = (country)=>{
        setnewCountry(country)
      }
      return(
        <>
        {newCountries.map(country=> {return(<div key = {country.name.common}>{country.name.common}<button onClick={()=>handler(country)}>show</button></div>)})}
        <Country country={newCountry} temp={temp} setTemp={setTemp} wind={wind} setWind={setWind} iconAdd={iconAdd} setIconAdd={setIconAdd}/>
        </>
      )
    }
  }
}

const Country = ({country, temp, setTemp, wind, setWind, iconAdd, setIconAdd})=>{
  var l=[]
  if (!country.languages){
    return(
      <></>
    )
  }
  var address = "https://api.openweathermap.org/data/2.5/weather?q="
  var realAdd = address + country.capital + '&appid=' +  process.env.REACT_APP_API_KEY
  console.log(country.capital)
  console.log(realAdd)
  axios
  .get(realAdd)
  .then(response => {
    console.log('promise fulfilled')
    console.log(response.data)
    setTemp(Math.round((response.data.main.temp  - 273.15)*100)/100)
    setWind(response.data.wind.speed)
    setIconAdd("http://openweathermap.org/img/wn/"+response.data.weather[0].icon+"@2x.png")
  })

  Object.values(country.languages).forEach((value)=>{l.push(value)})
  const languages = l.map(language=><li key= {language}>{language}</li>)
  return(
    <div key = {country.name.common}>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <br></br>
    <div>
      <b>languages</b>
    <ul>{languages}</ul>
    </div>
    <div>
    <img alt="flag" src={country.flags.png}></img>
    </div>
    <div><h3>Weather in {country.capital}</h3></div>
    <div>temperature {temp} Celsius</div>
    <div><img alt="weather" src={iconAdd}></img></div>
    <div>wind {wind} m/s</div>
    </div>
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

const App = () => {
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const [countries, setCountries ]= useState([
    { name: {common:''}, capital: '' ,area:'', languages:[], flags:{png:''}}
  ]) 
  const [newCountry, setnewCountry ]= useState([
    { name: {common:''}, capital: '' ,area:'', languages:[], flags:{png:''}}
  ]) 
  // const [newName, setNewName] = useState('')
  // const [newNumber, setNewNumber] = useState('')
  const [newfilter, setfilter] = useState('')
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState('')
  const [iconAdd, setIconAdd] = useState('')


  const onChangeFilterhandler = (event) =>{
    setfilter(event.target.value)
  }

  const newCountries = countries.filter(country=>{
    var pat=new RegExp(newfilter, 'i');

  return (pat.test(country.name.common));})
  
  return (
    <div>
      <h2>find country</h2>
      <Filter newfilter={newfilter} onChangeFilterhandler={onChangeFilterhandler}/>
      <Countries newCountries={newCountries} newfilter={newfilter} newCountry={newCountry} setnewCountry={setnewCountry} temp={temp} setTemp={setTemp} wind={wind} setWind={setWind} iconAdd={iconAdd} setIconAdd={setIconAdd} />
    </div>
  )
}
export default App