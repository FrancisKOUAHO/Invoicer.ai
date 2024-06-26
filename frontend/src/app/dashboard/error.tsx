'use client'

import { useEffect } from 'react'

const Error = ({ error, reset }: { error: any; reset: () => void }) => {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Essayez à nouveau</button>
    </div>
  )
}

export default Error
