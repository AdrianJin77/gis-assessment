import React, { useState } from "react"
import { useSelector } from "react-redux"
import { selectPeople } from "./features/peopleSlice"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Popup from "./components/popup"
import Filter from "./components/filter"

export default function First() {
  const peoples = useSelector(selectPeople)
  const [anchor, setAnchor] = useState(null)
  const [vehicles, setVehicles] = useState([])

  const handleClick = async (event, vehicle) => {
    setAnchor(anchor ? null : event.currentTarget)
    try {
      const vehiclePromises = vehicle.map((url) => fetch(url).then((response) => response.json()))
      const vehicleData = await Promise.all(vehiclePromises)
      setVehicles(vehicleData)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    }
  }

  const open = Boolean(anchor)
  const id = open ? "simple-popup" : undefined
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of People</h1>
      <Filter />
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table sx={{ minWidth: "30%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align="center">height</TableCell>
              <TableCell align="center">mass</TableCell>
              <TableCell align="center">gender</TableCell>
              <TableCell align="center">edited</TableCell>
              <TableCell align="center">status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peoples.map((people, index) => (
              <TableRow key={index + "table" + people.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {people.name}
                </TableCell>
                <TableCell align="center">{people.height}</TableCell>
                <TableCell align="center">{people.mass}</TableCell>
                <TableCell align="center">{people.gender}</TableCell>
                <TableCell align="center">{people.edited}</TableCell>
                <TableCell align="center">
                  <Button variant="text" onClick={(e) => handleClick(e, people.vehicles)}>
                    Show vehicles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popup id={id} open={open} anchor={anchor} vehicles={vehicles} />
    </div>
  )
}
