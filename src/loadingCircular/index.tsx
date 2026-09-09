// 16-10-2024

import { alpha, CircularProgress } from '@mui/material';
import Fade from '@mui/material/Fade';
import * as React from 'react';
import { useLoadingCircular } from './context';

export const LoadingCircularComponent = () => {
  const loadingCircular = useLoadingCircular()
  return (
    <Fade
      in={loadingCircular?.loadingCount > 0}
      style={{
        transitionDelay: loadingCircular?.loadingCount > 0 ? '800ms' : '0ms',
      }}
      unmountOnExit
    >
      <div style={{
        zIndex: 10000,
        position: 'fixed', display: "flex", justifyContent: 'center', alignItems: 'center', top: 0, bottom: 0, left: 0, right: 0,
        background: alpha('#000000', .7)
      }}>
        <CircularProgress />
      </div>
    </Fade>
  )

}
