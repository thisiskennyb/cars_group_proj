import { getCar } from "../api/api"
import { useEffect, useState } from "react"


export default function MyGarage () {

    const [userCars, setUserCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            const cars = await getCar()
            setUserCars(cars)
        }
        fetchCars()

    }, [])

    console.log(userCars)

    return (

        <>
        {userCars.map((car, index) => (<div key={index} className="car-box">
            <h1>{car.make}</h1>
            <h3>{car.model}</h3>
            <h3>{car.year}</h3>
            <h3>{car.option}</h3>
            </div>))} 
        </>
    )
}