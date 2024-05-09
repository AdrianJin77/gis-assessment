import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPeople } from "./features/peopleSlice"
import First from "./first"
import { getData } from "./utils/api"

function App() {
  const dispatch = useDispatch()
  const fetchData = async () => {
    const data = await getData("https://swapi.dev/api/people")
    dispatch(setPeople(data.results))
  }
  useEffect(() => {
    fetchData()
  }, [dispatch])
  return (
    <div>
      <First />
    </div>
  )
}

export default App
