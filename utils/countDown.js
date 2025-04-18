import React, { useEffect, useState } from 'react'

const formatDuration = (seconds) => {
  const min = Math.floor(seconds / 60)
  let sec = seconds - min * 60
  if (sec < 10) {
    sec = `0${sec}`
  }
  return {
    min,
    sec,
  }
}

const duration = 120

function Countdown({ isTimeOver, setIsTimeOver }) {
  const [count, setCount] = useState(duration)
  useEffect(() => {
    let timer
    if (!isTimeOver) {
      setCount(duration)
      timer = setInterval(() => {
        setCount((counter) => {
          const updatedCounter = counter - 1
          if (updatedCounter === 0) {
            setIsTimeOver(true)
            return 0
          }
          return updatedCounter
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isTimeOver])
  return (
    <span>
      {formatDuration(count).min}:{formatDuration(count).sec}
    </span>
  )
}

export default Countdown
