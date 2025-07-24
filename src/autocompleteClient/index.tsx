import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ApiClientUtils } from 'fwork-jsts-common';
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
  textFieldProps?: TextFieldProps,
  getOnInit?: boolean,
}

export const AutocompleteClientComponent = <T extends {},>(props: IAutocompleteClientComponentProps<T>) => {
  const { initKeyValue, onChangeItem, inputValueKeyName, onGetData, textFieldProps, getOnInit, ...rest } = props

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

  function getNestedProperty<T>(obj: T, path: string): any {
    return path.split('.').reduce((acc, key) => acc && (acc as any)[key], obj);
  }

  React.useEffect(() => {
    if (getOnInit)
      getData('', false)
  }, [])

  React.useEffect(() => {
    if (initKeyValue)
      (async () => {
        const dataResponse = await getData(initKeyValue, true)

        setOptions(dataResponse ?? [])
        if (dataResponse?.length)
          setInputValue(getNestedProperty(dataResponse[0], inputValueKeyName))
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
        isOptionEqualToValue={rest.isOptionEqualToValue ?? ((option, value) => {
          return getNestedProperty(option, inputValueKeyName) === getNestedProperty(value, inputValueKeyName)
        })}
        getOptionLabel={rest.getOptionLabel ?? ((option) => {
          const result = getNestedProperty(option, inputValueKeyName)
          return result
        })}
        options={rest.options ?? options}
        loading={rest.loading ?? loading}
        inputValue={rest.inputValue ?? inputValue ?? ''}
        onChange={rest.onChange ?? ((_: any, newValue: T | null) => {
          setInputValue(newValue ? getNestedProperty(newValue, inputValueKeyName) : '')
          if (onChangeItem)
            onChangeItem(newValue)
        })}
        renderInput={rest.renderInput ?? ((params) => (
          // <TextField
          //   {...params}
          //   {...textFieldProps}
          //   InputProps={{
          //     ...params.InputProps,
          //     endAdornment: (
          //       <>
          //         {loading ? <CircularProgress color="inherit" size={20} /> : null}
          //         {params.InputProps?.endAdornment}
          //       </>
          //     ),
          //   }}
          //   onChange={(e) => setInputValue(e.target.value)}
          // />
          <TextField
            {...params}
            {...textFieldProps}
            slotProps={{
              input: {
                ...params.InputProps, // Preserva as configurações existentes
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps?.endAdornment}
                  </>
                ),
              },
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