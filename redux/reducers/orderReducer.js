import { orderActionTypes } from '../actions/orderActions/orderActionTypes'
import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  isWeekend,
  addDays,
} from 'date-fns'

const initialState = {
  orderItems: [],
  order: {
    dates: null,
    businessDays: 0,
    holidays: 0,
    residence_id: 0,
    adult: 0,
    children: 0,
    apartment: null,
    price: 0,
    holidayPrice: 0,
    inDate: null,
    outDate: null,
  },
}

const orderReducer = (state = initialState, action) => {
  const { payload } = action
  const { order } = state
  switch (action.type) {
    case orderActionTypes.SET_BOOKING_DATE:
      return {
        ...state,
        order: {
          ...state.order,
          dates: payload,
          ...calculateBookingDates({ ...order, dates: payload }),
        },
      }

    case orderActionTypes.SET_BOOKING_INFO:
      return {
        ...state,
        order: { ...order, ...payload },
      }
    case orderActionTypes.INCREMENT_ADULTS:
      return {
        ...state,
        order: { ...order, adult: order.adult + 1 },
      }
    case orderActionTypes.INCREMENT_CHILDREN:
      return {
        ...state,
        order: { ...order, children: order.children + 1 },
      }
    case orderActionTypes.DECREMENT_ADULTS:
      return {
        ...state,
        order: { ...order, adult: order.adult === 1 ? 1 : order.adult - 1 },
      }
    case orderActionTypes.DECREMENT_CHILDREN:
      return {
        ...state,
        order: {
          ...order,
          children: order.children === 0 ? 0 : order.children - 1,
        },
      }
    case orderActionTypes.BOOKING_ACCESS_DATE:
      return {
        ...state,
        order: {
          ...state.order,
          inDate: payload,
          ...calculateBookingDates({ ...order, inDate: payload }),
        },
      }

    case orderActionTypes.BOOKING_EXIT_DATE:
      return {
        ...state,
        order: {
          ...state.order,
          outDate: payload,
          ...calculateBookingDates({ ...order, outDate: payload }),
        },
      }
    default:
      return state
  }
}

export default orderReducer

function calculateBookingDates(order) {
  if (
    !order.inDate ||
    !order.outDate ||
    !order.dates?.to ||
    !order.dates?.from
  ) {
    return {}
  }
  const { dates, inDate, outDate } = order

  let addDay = 0
  let firstDay = 0
  let lastDay = 1 // date difference doesn't include last day

  if (inDate === '19.00' && outDate === '09.00') {
    addDay = 0.5
  }
  if (inDate === '19.00') {
    firstDay = -1
  }
  if (outDate === '09.00') {
    lastDay = 0
  }

  let differenceAllDays = differenceInCalendarDays(dates.to, dates.from)
  let differenceBusinessDays = differenceInBusinessDays(dates.to, dates.from)
  const lastDayIsWeekend = isWeekend(dates.to)
  const firstDayIsWeekend = isWeekend(dates.from)
  let weekends = differenceAllDays - differenceBusinessDays
  if (lastDayIsWeekend) {
    weekends += lastDay
  } else {
    differenceBusinessDays += lastDay
  }
  if (firstDayIsWeekend) {
    weekends += firstDay + addDay
  } else {
    differenceBusinessDays += firstDay + addDay
  }

  return {
    businessDays: differenceBusinessDays,
    holidays: weekends,
  }
}
