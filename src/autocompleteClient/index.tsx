// 16-10-2024

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ApiClientUtils } from 'fwork-jsts-common/src/apiClient';
import { useSnackbar } from 'notistack';
import * as React from 'react';

// function sleep(duration: number): Promise<void> {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }

export interface IAutocompleteClientComponentProps<T extends {}> extends Partial<AutocompleteProps<any, any, any, any, any>> {
  inputValueKeyName: string,
  onGetData: (filter: string, keyValue: boolean) => T[] | undefined | Promise<T[] | undefined>
  initKeyValue?: any,
  onChangeItem?: (data?: T | null) => void,
  textFieldProps?: TextFieldProps
}

export const AutocompleteClientComponent = <T extends {},>(props: IAutocompleteClientComponentProps<T>) => {
  console.log('DropDownSearchComponent')

  const { initKeyValue, onChangeItem, inputValueKeyName: labelName, onGetData, textFieldProps, ...rest } = props

  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()

  const getData = async (filter: string, keyValue: boolean) => {
    if (loading) return
    setLoading(true)

    // await sleep(1e3);

    try {
      return await onGetData(filter, keyValue)
    } catch (error) {
      enqueueSnackbar(ApiClientUtils.getErrorMessage(error), { variant: 'error' })
    } finally {
      setLoading(false)
    }

    return undefined
  }

  const handleOpen = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (initKeyValue)
      (async () => {
        const dataResponse = await getData(initKeyValue, true)

        setOptions(dataResponse ?? [])
        if (dataResponse?.length)
          setInputValue((dataResponse[0] as any)[labelName])
      })();
  }, [initKeyValue])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Autocomplete
        {...rest}
        open={rest.open ?? open}
        onOpen={rest.onOpen ?? handleOpen}
        onClose={rest.onClose ?? handleClose}
        isOptionEqualToValue={rest.isOptionEqualToValue ?? ((option, value) => option.name === value.name)}
        getOptionLabel={rest.getOptionLabel ?? ((option) => option.name)}
        options={rest.options ?? options}
        loading={rest.loading ?? loading}
        inputValue={rest.inputValue ?? inputValue}
        onChange={rest.onChange ?? ((_: any, newValue: T | null) => {
          console.log('onchange')
          console.log(newValue)
          setInputValue(newValue ? (newValue as any)[labelName] : '')
          if (onChangeItem)
            onChangeItem(newValue)
        })}
        renderInput={rest.renderInput ?? ((params) => (
          <TextField
            {...params}
            {...textFieldProps}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
            onChange={(e) => setInputValue(e.target.value)}
          />
        ))}
        onKeyDown={rest.onKeyDown ?? (async (event) => {
          if (event.key === 'Enter') {
            let dataResponse = await getData(inputValue, false)
            setOptions(dataResponse ?? [])
          }
        })}
      />
    </>
  );
}