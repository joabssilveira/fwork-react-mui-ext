// 16-10-2024

import { LinearProgress } from '@mui/material';
import Fade from '@mui/material/Fade';
import * as React from 'react';
import { useLoadingBar } from './context';

export const LoadingBarComponent = () => {
  const loadingBar = useLoadingBar()
  return (
    <Fade
      in={loadingBar.loadingCount > 0}
      style={{
        transitionDelay: loadingBar ? '800ms' : '0ms',
      }}
      unmountOnExit
    >
      <LinearProgress style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000000000
      }} color='warning' />
    </Fade>
  )
}
