import React from 'react'
import { getMonthWeeks } from './helpers/getMonthWeeks'
import CalendarDay from './calendarDay'
import { weekdays } from 'constants/calendar'
import { common2 } from 'locales/common2'
import { useRouter } from 'next/router'

export default function CalendarTable({ date, locale, disabled }) {
  const router = useRouter()

  const weeks = getMonthWeeks(date, {
    useFixedWeeks: true,
    ISOWeek: true,
    locale,
    weekStartsOn: 1,
    firstWeekContainsDate: true,
  })

  return (
    <table className='rdp-table' role='grid'>
      <thead className='rdp-head'>
        <tr className='rdp-head_row'>
          {weekdays.map((weekday, idx) => {
            return (
              <th key={idx} scope='col' className='rdp-head_cell'>
                <span className='weekday'>
                  {common2[router.locale][weekday]}
                </span>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody className='rdp-body'>
        {weeks.map((item) => (
          <tr key={item.weekNumber} className='rdp-row'>
            {item.dates.map((day) => (
              <td key={day.toISOString()} className='rdp-cell'>
                <CalendarDay day={day} disabledDays={disabled} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
