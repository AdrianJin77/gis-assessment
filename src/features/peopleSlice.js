import { createSlice } from "@reduxjs/toolkit"

export const peopleSlice = createSlice({
  name: "people",
  initialState: {
    value: [],
  },
  reducers: {
    setPeople: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setPeople } = peopleSlice.actions
export const selectPeople = (state) => state.people.value
export default peopleSlice.reducer
