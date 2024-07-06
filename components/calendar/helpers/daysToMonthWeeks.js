import addDays from 'date-fns/addDays'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import endOfISOWeek from 'date-fns/endOfISOWeek'
import endOfWeek from 'date-fns/endOfWeek'
import getISOWeek from 'date-fns/getISOWeek'
import getWeek from 'date-fns/getWeek'
import startOfISOWeek from 'date-fns/startOfISOWeek'
import startOfWeek from 'date-fns/startOfWeek'

/** Return the weeks between two dates.  */
export function daysToMonthWeeks(fromDate, toDate, options) {
  const toWeek = options?.ISOWeek
    ? endOfISOWeek(toDate)
    : endOfWeek(toDate, options)
  const fromWeek = options?.ISOWeek
    ? startOfISOWeek(fromDate)
    : startOfWeek(fromDate, options)

  const nOfDays = differenceInCalendarDays(toWeek, fromWeek)
  const days = []

  for (let i = 0; i <= nOfDays; i++) {
    days.push(addDays(fromWeek, i))
  }

  const weeksInMonth = days.reduce((result, date) => {
    const weekNumber = options?.ISOWeek
      ? getISOWeek(date)
      : getWeek(date, options)

    const existingWeek = result.find((value) => value.weekNumber === weekNumber)
    if (existingWeek) {
      existingWeek.dates.push(date)
      return result
    }
    result.push({
      weekNumber,
      dates: [date],
    })
    return result
  }, [])

  return weeksInMonth
}
