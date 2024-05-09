import React from "react"
import PropTypes from "prop-types"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup"
import { styled } from "@mui/system"

export default function Popup({ id, open, anchor, vehicles }) {
  Popup.propTypes = {
    id: PropTypes.any,
    open: PropTypes.bool,
    anchor: PropTypes.any,
    vehicles: PropTypes.array,
  }
  return (
    <BasePopup id={id} open={open} anchor={anchor} vehicles={vehicles} placement={"bottom"}>
      <PopupBody>
        {vehicles && vehicles.length ? (
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">name</TableCell>
                  <TableCell align="center">model</TableCell>
                  <TableCell align="center">manufacturer</TableCell>
                  <TableCell align="center">vehicle class</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={index + vehicle.name}>
                    <TableCell align="center">{vehicle.name}</TableCell>
                    <TableCell align="center">{vehicle.model}</TableCell>
                    <TableCell align="center">{vehicle.manufacturer}</TableCell>
                    <TableCell align="center">{vehicle.vehicle_class}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>Empty Data</p>
        )}
      </PopupBody>
    </BasePopup>
  )
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
}

// const blue = {
//   200: "#99CCFF",
//   300: "#66B2FF",
//   400: "#3399FF",
//   500: "#007FFF",
//   600: "#0072E5",
//   700: "#0066CC",
// }

const PopupBody = styled("div")(
  ({ theme }) => `
    width: max-content
    padding: 12px 16px
    margin: 8px
    border-radius: 8px
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]}
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"}
    box-shadow: ${theme.palette.mode === "dark" ? `0px 4px 8px rgb(0 0 0 / 0.7)` : `0px 4px 8px rgb(0 0 0 / 0.1)`}
    font-family: "IBM Plex Sans", sans-serif
    font-weight: 500
    font-size: 0.875rem
    z-index: 1
  `
)
