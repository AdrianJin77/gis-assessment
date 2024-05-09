import React, { useState } from "react"
import { TextField, Button, Box } from "@mui/material"
import { useDispatch } from "react-redux"
import { setPeople } from "../features/peopleSlice"
import { getData } from "../utils/api"
export default function Filter() {
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState("")
  const handleSearch = async () => {
    const data = await getData(`https://swapi.dev/api/people/?search=${searchText}`)
    dispatch(setPeople(data.results))
  }
  return (
    <Box style={{ display: "flex" }}>
      <TextField
        id="outlined-basic"
        label="search"
        variant="outlined"
        sx={{ mx: 2 }}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button variant="contained" style={{ height: "50px" }} onClick={() => handleSearch()}>
        Search
      </Button>
    </Box>
  )
}
