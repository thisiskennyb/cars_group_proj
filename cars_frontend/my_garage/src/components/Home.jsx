import { useEffect, useState } from "react"
import axios from 'axios';
import MultipleSelect from "./DropDown";
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
export default function Home () {

  const [shouldRedirect, setShouldRedirect] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)  
  
    const[years, setYears] = useState([])
    const[selectedYear, setSelectedYear] = useState("select one")

    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState("select one")
    
    const [models, setModels] = useState([])
    const [selectedModel, setSelectedModel] = useState("select one")
    
    const [options, setOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState("select one")
    
    const [isOption, setIsOption] = useState(false)
    
// passed into MultipleSelet for dropdown label    
    const selectFields = ["Year", "Make", "Model", "Option"]


// Fetches Years when page loads
    useEffect (() => {
        const fetchYears = async () => {
          const url = 'https://fueleconomy.gov/ws/rest/vehicle/menu/year';
          const options = {
          method: 'GET',
          headers: {
          'Accept': 'application/json',
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const reslutsArray =  result.menuItem
        const filteredArray = reslutsArray.map(item => item.value)
        setYears(filteredArray)
        console.log(filteredArray);
      } catch (error) {
 console.error(error);
    }
        }
        fetchYears()
    }, [])



// Fetches Makes for specified year when the state changes for selectedYear
    useEffect (() => {
        const fetchMakes = async () => {
          const url = `https://fueleconomy.gov/ws/rest/vehicle/menu/make?year=${selectedYear}`;
          const options = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
          }
        };

        try {
          const response = await fetch(url, options);
          const result = await response.json();
          const resultsArray =  result.menuItem
          const filteredArray = resultsArray.map(item => item.value)
          setMakes(filteredArray)
          console.log(filteredArray);
        } catch (error) {
          console.error(error);
          }
          }
        fetchMakes()
    }, [selectedYear])


// Fetches models for specified makes and years when the state changes for selectedMake
useEffect (() => {
  const fetchModels = async () => {
      const url = `https://fueleconomy.gov/ws/rest/vehicle/menu/model?year=${selectedYear}&make=${selectedMake}`;
      const options = {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const resultsArray =  result.menuItem
      const filteredArray = resultsArray.map(item => item.value)
      setModels(filteredArray)
      console.log(filteredArray);
    } catch (error) {
      console.error(error);
      }
      }
    fetchModels()
}, [selectedMake]);


// Fetches Options for specified year/make/model when the state changes for selectedModel
useEffect (() => {
  const fetchOptions = async () => {
      const url = `https://fueleconomy.gov/ws/rest/vehicle/menu/options?year=${selectedYear}&make=${selectedMake}&model=${selectedModel}`;
      const options = {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result)
      const resultsArray =  result.menuItem
      console.log(resultsArray)
     if (!Array.isArray(resultsArray)){
      setOptions([resultsArray['text']])
     }
     else{

       const filteredArray = resultsArray.map(item => item.text)
       
       setOptions(filteredArray)
       setIsOption(true)
       console.log(filteredArray);
      }
    } catch (error) {
      console.error(error);
      }
      }
    fetchOptions()
}, [selectedModel]);

// sets selectedYear state value to selected value
    const handleYearChange = (event) => {
      const arrayLength = event.target.value.length
        console.log(event.target.value)
        setSelectedYear(event.target.value)
        
      };

// sets selectedMake state value to selected value
    const handleMakeChange = (e) => {
      console.log(e.target.value)
      setSelectedMake(e.target.value)
    }

// sets sectedModel state value to selected value
    const handleModelChange = (e) => {
      setSelectedModel(e.target.value)
    }

// sets selectedOption state value to selected value
    const handleOptionChange = (e) => {
      setSelectedOption(e.target.value)
    }

    const addToGarage = () =>{
      const token = localStorage.getItem("token")
      if(token){
        console.log("token here")
        alert(`succesfully added ${selectedMake} ${selectedModel}`)
       
      }
      else{
        
       setShouldRedirect(true)
      }
    }
    if(shouldRedirect){return <Navigate to='/login'/>}
    else{return (
        <>
        <MultipleSelect data={years} handleChange={handleYearChange} selectedValue={selectedYear} selectField={selectFields[0]}/>
        <MultipleSelect data={makes} handleChange={handleMakeChange} selectedValue={selectedMake} selectField={selectFields[1]}/>
        <MultipleSelect data={models} handleChange={handleModelChange} selectedValue={selectedModel} selectField={selectFields[2]}/>
        <MultipleSelect data={options} handleChange={handleOptionChange} selectedValue={selectedOption} selectField={selectFields[3]}/>
        <Button onClick={addToGarage} variant="contained">Add to Garage</Button>
       </>
    )}
}