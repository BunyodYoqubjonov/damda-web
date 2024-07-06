import { differenceInCalendarDays } from 'date-fns'
import { BookingActionTypes } from '../actions/bookingActions/bookingActionTypes'

const initialState = {
  bookingRooms: [],
  dates: null,
  days: 0,
  pickup_from_airport: false,
  airport: null,
  isResident: true,
  breakfastPrice: 0,
}

const bookingReducer = (state = initialState, action) => {
  const { payload } = action

  switch (action.type) {
    case BookingActionTypes.BOOKINGS_DATE:
      const newBookingState = { ...state, dates: payload }
      return {
        ...state,
        dates: payload,
        days: differenceInDays(payload),
        bookingRooms: calculateRoomPrice(newBookingState, state.bookingRooms),
      }

    case BookingActionTypes.CLEAR_BOOKING:
      const removeQuantity = state.bookingRooms.map((item) => {
        return {
          ...item,
          cartQuantity: 0,
        }
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, removeQuantity),
        dates: null,
        days: 0,
        pickup_from_airport: false,
        airport: null,
        isResident: true,
        breakfastPrice: 0,
      }

    case BookingActionTypes.SET_BOOKING_ITEMS:
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, payload),
      }

    case BookingActionTypes.SET_BREAKFAST_PRICE:
      return {
        ...state,
        breakfastPrice: payload,
      }

    case BookingActionTypes.ADD_TO_ROOM:
      const addRooms = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartQuantity: item.cartQuantity + 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, addRooms),
      }

    case BookingActionTypes.REMOVE_TO_ROOM:
      const removeRooms = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartQuantity: item.cartQuantity - 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, removeRooms),
      }

    case BookingActionTypes.SET_IS_BREAKFAST:
      const newRooms = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            isBreakfast: payload.isBreakfast,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, newRooms),
      }

    case BookingActionTypes.SET_IS_RESIDENT:
      const newState = { ...state, isResident: payload }
      return {
        ...state,
        isResident: payload,
        bookingRooms: calculateRoomPrice(newState, state.bookingRooms),
      }

    case BookingActionTypes.ADD_ADULT:
      const newBookingRooms = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartAdults: item.cartAdults + 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, newBookingRooms),
      }

    case BookingActionTypes.REDUCE_ADULT:
      const removeBookingRooms = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartAdults: item.cartAdults - 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, removeBookingRooms),
      }

    case BookingActionTypes.ADD_CHILDREN:
      const addNewChildren = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartChildren: item.cartChildren + 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, addNewChildren),
      }

    case BookingActionTypes.REDUCE_CHILDREN:
      const removeNewChildren = state.bookingRooms.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            cartChildren: item.cartChildren - 1,
          }
        }
        return item
      })
      return {
        ...state,
        bookingRooms: calculateRoomPrice(state, removeNewChildren),
      }

    case BookingActionTypes.SET_PICKUP_FROM_AIRPORT:
      return {
        ...state,
        pickup_from_airport: payload,
      }

    case BookingActionTypes.SET_AIRPORT:
      return {
        ...state,
        airport: payload,
      }

    default:
      return state
  }
}
export default bookingReducer

function differenceInDays(dates) {
  if (!dates?.to || !dates?.from) {
    return 0
  }
  return differenceInCalendarDays(dates.to, dates.from)
}

function calculateRoomPrice(state, bookingRooms) {
  let days = differenceInDays(state.dates)
  let calculatedRooms = []

  bookingRooms.forEach((item) => {
    let price
    let roomPrice = 0
    let totalBreakfastPrice = 0
    let totalPrice = 0
    let priceObj = item.prices?.find(
      (price) => price.person === item.cartAdults
    )
    if (state.isResident) {
      price = priceObj?.resident_price || 0
    } else {
      price = priceObj?.nonresident_price || 0
    }
    roomPrice = price * item.cartQuantity * days
    if (item.isBreakfast) {
      totalBreakfastPrice = state.breakfastPrice * item.cartAdults * days
    }
    totalPrice = roomPrice + totalBreakfastPrice
    let result = {
      ...item,
      price,
      roomPrice,
      totalPrice,
      totalBreakfastPrice,
    }
    calculatedRooms.push(result)
  })

  return calculatedRooms
}
