import { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * 
 * @param {*} callBack () => {} callback function code to execute on  
 * @param {*} input props passed to the callback function
 * @param {*} time NUMBER designated time for timer to execute
 */

const useTimoutTimer = (callback, time = 1000, input) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(input)
    }, time)
    return () => clearTimeout(timer)
  }, [])
}

useTimoutTimer.propTypes = {
  callback: PropTypes.func.isRequired,
  input: PropTypes.object,
  time: PropTypes.number
}

export default useTimoutTimer

