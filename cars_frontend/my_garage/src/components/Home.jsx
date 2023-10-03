import { useEffect, useState } from "react"
import axios from 'axios';
import MultipleSelect from "./DropDown";

export default function Home () {

    const[years, setYears] = useState([])
    const[selectedYear, setSelectedYear] = useState(null)
    // const [year, setYear] = useState([]);
    const [makes, setMakes] = useState([]);

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
 setYears(result.menuItem)
 console.log(result.menuItem);
} catch (error) {
 console.error(error);
}
        }

        fetchYears()

    }, [])


//     useEffect (() => {
//         const fetchYears = async () => {
            

//     const url = `https://car-data.p.rapidapi.com/cars/makes?year=${year}`;
// const options = {
//  method: 'GET',
//  headers: {
//   'X-RapidAPI-Key': '175e2ce5fbmshbe29e7f8c04a5bfp1059dajsn8adb67107d6c',
//   'X-RapidAPI-Host': 'car-data.p.rapidapi.com'
//  }
// };

// try {
//  const response = await fetch(url, options);
//  const result = await response.json();
 
//  console.log(result);
// } catch (error) {
//  console.error(error);
// }
//         }

//         fetchYears()

//     }, [year])

    const handleChange = (event) => {
        console.log(event.target.value)
        const {
          target: { value },
        } = event;
        setSelectedYear(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      console.log(year)

    return(
        <>
        <MultipleSelect data={years} handleChange={handleChange}/>
        {/* <MultipleSelect data={makes} /> */}
        
        </>
    )
}