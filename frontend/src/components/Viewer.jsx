/* global smplr */
import React, { memo } from 'react'
import PropTypes from 'prop-types'

import useSmplrJs from './hooks/useSmplrJs'

const Viewer = memo(({ mode, onReady, onModeChange, spaceID, clientToken}) => {
  useSmplrJs({ onLoad })
  function onLoad () {
    const space = new smplr.Space({
      spaceId: spaceID,
      clientToken: clientToken,
      containerId: 'smplr-container'
    })
    space.startViewer({
      preview: true,
      mode,
      allowModeChange: true,
      onModeChange,
      onReady: () => onReady(space),
      onError: error => console.error('Could not start viewer', error)
    })
  }

  return (
    <div
      style={{
        position: 'relative',
        paddingBottom: '60%'
      }}
    >
      <div
        id='smplr-container'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: 'whitesmoke'
        }}
      />
    </div>
  )
})

Viewer.propTypes = {
  mode: PropTypes.string.isRequired,
  onReady: PropTypes.func.isRequired,
  onModeChange: PropTypes.func,
  spaceID: PropTypes.string,
  clientToken: PropTypes.string
}

export default Viewer