import { IconButton } from '@mui/material';
import { OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from 'notistack';
import React from 'react';
import { MdCancel } from 'react-icons/md';

const SnackCancelBtnComponent = (props: {
  snackbarId: SnackbarKey
}) => {
  const { closeSnackbar } = useSnackbar()
  return <IconButton onClick={() => { closeSnackbar(props.snackbarId); }}>
    <MdCancel />
  </IconButton>
}

const useSnackbarExt = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueSnackbarError = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      ...options,
      variant: 'error',
    });
  };

  const enqueueSnackbarPersistedError = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      variant: 'error',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...options,
    });
  };

  const enqueueSnackbarSuccess = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      ...options,
      variant: 'success',
    });
  };

  const enqueueSnackbarPersistedSuccess = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      variant: 'success',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...options,
    });
  };

  const enqueueSnackbarInfo = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      ...options,
      variant: 'info',
    });
  };

  const enqueueSnackbarPersistedInfo = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      variant: 'info',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...options,
    });
  };

  const enqueueSnackbarWarning = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      ...options,
      variant: 'warning',
    });
  };

  const enqueueSnackbarPersistedWarning = (msg: SnackbarMessage, options?: OptionsObject) => {
    enqueueSnackbar(msg, {
      variant: 'warning',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...options,
    });
  };

  return {
    enqueueSnackbarError,
    enqueueSnackbarPersistedError,
    enqueueSnackbarSuccess,
    enqueueSnackbarPersistedSuccess,
    enqueueSnackbarInfo,
    enqueueSnackbarPersistedInfo,
    enqueueSnackbarWarning,
    enqueueSnackbarPersistedWarning,
  };
};

export default useSnackbarExt;
