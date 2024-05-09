import { configureStore } from "@reduxjs/toolkit"
import peopleReducer from "../features/peopleSlice"

export default configureStore({
  reducer: {
    people: peopleReducer,
  },
})
