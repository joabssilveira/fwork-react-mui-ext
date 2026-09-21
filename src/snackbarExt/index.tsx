import { IconButton } from '@mui/material';
import { closeSnackbar, OptionsObject, SnackbarKey, SnackbarMessage, useSnackbar } from 'notistack';
import React from 'react';
import { MdCancel } from 'react-icons/md';

export type EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => SnackbarKey

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

  const enqueueSnackbarError: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'error',
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarPersistedError: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'error',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarSuccess: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'success',
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarPersistedSuccess: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'success',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarInfo: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'info',
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarPersistedInfo: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'info',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarWarning: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'warning',
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
    });
  };

  const enqueueSnackbarPersistedWarning: EnqueueSnackbarExt = (msg: SnackbarMessage, options?: OptionsObject & { closePrior?: SnackbarKey[] }) => {
    const {closePrior, ...rest} = options ?? {}

    if (options?.closePrior?.length)
      for (const prior of options.closePrior)
        closeSnackbar(prior)

    return enqueueSnackbar(msg, {
      variant: 'warning',
      persist: true,
      action: (id) => <SnackCancelBtnComponent snackbarId={id} />,
      ...rest,
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
