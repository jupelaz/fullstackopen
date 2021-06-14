import React, { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button } from '@chakra-ui/react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })
  return (
    <Box>
      <div style={hideWhenVisible}>
        <Button margin='.5em' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button margin='.5em' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </Box>
  )
})

Togglable.propTypes = {
  props: PropTypes.string,
}
export default Togglable
