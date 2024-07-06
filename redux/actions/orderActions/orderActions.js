import {orderActionTypes} from './orderActionTypes'


export const setBookingDate = (payload) => {
    return {
        type: orderActionTypes.SET_BOOKING_DATE,
        payload,
    }
}

export const setBookingInfo = (payload) => {
    return {
        type: orderActionTypes.SET_BOOKING_INFO,
        payload,
    }
}

export const incrementAdults = (payload) => {
    return {
        type: orderActionTypes.INCREMENT_ADULTS,
        payload,
    }
}

export const incrementChildren = (payload) => {
    return {
        type: orderActionTypes.INCREMENT_CHILDREN,
        payload,
    }
}

export const decrementAdults = (payload) => {
    return {
        type: orderActionTypes.DECREMENT_ADULTS,
        payload,
    }
}

export const decrementChildren = (payload) => {
    return {
        type: orderActionTypes.DECREMENT_CHILDREN,
        payload,
    }
}
export const bookingInDate = (payload) => {
    return {
        type: orderActionTypes.BOOKING_ACCESS_DATE,
        payload,
    }
}
export const bookingOutDate = (payload) => {
    return {
        type: orderActionTypes.BOOKING_EXIT_DATE,
        payload,
    }
}