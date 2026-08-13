import { Popper, PopperProps, autocompleteClasses } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ApiClientUtils, NestedKeys } from 'fwork-jsts-common';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import useSnackbarExt from '../snackbarExt';

// function sleep(duration: number): Promise<void> {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }

function getNestedProperty<T>(obj: T, path: string): any {
  return path.split('.').reduce((acc, key) => acc && (acc as any)[key], obj);
}

export interface IAutocompleteClientComponentProps<T extends {}, MaxDepth extends number = 3,> extends Partial<AutocompleteProps<T, any, any, any, any>> {
  inputValueKeyName: NestedKeys<T, MaxDepth>,
  onGetData: (filter: string, keyValue: boolean) => T[] | undefined | Promise<T[] | undefined>
  initKeyValue?: any,
  initOptions?: readonly T[] | undefined,
  initOption?: T | undefined,
  onChangeItem?: (data?: T | null) => void,
  textFieldProps?: TextFieldProps,
  getOnInit?: boolean,
  getAllOnOpen?: boolean,
  fitDropDownWidth?: boolean,
  updateOptionsRef?: React.MutableRefObject<((filter: string, keyValue: boolean) => void) | null | undefined>
  updateOptionsWithValueRef?: React.MutableRefObject<((value: T) => void) | null | undefined>
}

const CustomPopper = (props: PopperProps) => {
  return <Popper {...props} style={{ width: "auto" }} placement="bottom-start" />;
};

export const AutocompleteClientComponent = <T extends {}, MaxDepth extends number = 3,>(props: IAutocompleteClientComponentProps<T, MaxDepth>) => {
  const { inputValueKeyName, initKeyValue, initOptions, initOption, onChangeItem, onGetData,
    textFieldProps, getOnInit, getAllOnOpen, fitDropDownWidth, updateOptionsRef, updateOptionsWithValueRef, ...rest } = props

  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar()
  const { enqueueSnackbarPersistedError } = useSnackbarExt()

  // EXPORTED METHOD...  
  React.useEffect(() => {
    if (updateOptionsRef)
      updateOptionsRef.current = doUpdateDataRef
    if (updateOptionsWithValueRef)
      updateOptionsWithValueRef.current = doUpdateDataWithValueRef
  }, [])
  const doUpdateDataRef = async (filter: string, keyValue: boolean) => {
    let dataResponse = await getData(filter, keyValue)
    setOptions(dataResponse ?? [])
  }
  const doUpdateDataWithValueRef = (value: T) => {
    setOptions(old => ([...old, value]))
  }
  // ...EXPORTED METHOD

  const getData = async (filter: string, keyValue: boolean) => {
    // if (loading) return
    setLoading(true)

    // await sleep(1e3);

    try {
      return await onGetData(filter, keyValue)
    } catch (error) {
      enqueueSnackbarPersistedError(ApiClientUtils.getErrorMessage(error))
    } finally {
      setLoading(false)
    }

    return undefined
  }

  const handleOpen = async () => {
    setOpen(true);

    // Chama a API ao abrir
    if (getAllOnOpen) {
      const dataResponse = await getData('', false);
      setOptions(dataResponse ?? []);
    }
  };

  React.useEffect(() => {
    if (getOnInit)
      (async () => {
        const dataResponse = await getData('', false)
        setOptions(dataResponse ?? [])
      })();
  }, [])

  React.useEffect(() => {
    if (initKeyValue)
      (async () => {
        const dataResponse = await getData(initKeyValue, true)

        setOptions(dataResponse ?? [])
        if (dataResponse?.length) {
          setInputValue(getNestedProperty(dataResponse[0], inputValueKeyName))
          // console.log(`SETINPUTVALUE->useEffect: [initKeyValue, inputValueKeyName]`)
        }
      })();
  }, [initKeyValue, inputValueKeyName])

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (initOption) {
      setInputValue(getNestedProperty(initOption, inputValueKeyName))
      // console.log(`SETINPUTVALUE->useEffect: [initOption, inputValueKeyName]: if (initOption)`)
    } else {
      setInputValue("")
      // console.log(`SETINPUTVALUE->useEffect: [initOption, inputValueKeyName]: if (initOption)...else...`)
    }
  }, [initOption, inputValueKeyName])

  React.useEffect(() => {
    const foundOption = options.find(o => props.getOptionKey?.(o) == (typeof props.value == 'string' ? props.value : props.getOptionKey?.(props.value as any)))
    if (foundOption) {
      setInputValue(getNestedProperty(foundOption, inputValueKeyName))
      // console.log(`SETINPUTVALUE->useEffect: [props.value, options, props.getOptionKey, inputValueKeyName]`)
    }
  }, [props.value, options, props.getOptionKey, inputValueKeyName])

  const typingTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleInputChange = (value: string) => {
    setInputValue(value);
    // console.log(`SETINPUTVALUE->handleInputChange`)

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(async () => {
      const dataResponse = await getData(value, false);
      setOptions(dataResponse ?? []);
    }, 200); // debounce
  };

  return (
    <>
      <Autocomplete<T>
        {...(rest as any)}

        // renderOption example
        // renderOption={(props, option, state, ownerState) => {
        //   const { key, ...optionProps } = props;
        //   const { selected } = state;
        //   return (
        //     <Box
        //       key={key}
        //       sx={{
        //         borderRadius: '8px',
        //         margin: '5px',
        //         backgroundColor: selected ? 'primary.main' : 'transparent',
        //         color: selected ? 'primary.contrastText' : 'inherit',
        //         '&:hover': {
        //           backgroundColor: selected ? 'primary.dark' : 'action.hover',
        //         },
        //         [`&.${autocompleteClasses.option}`]: {
        //           padding: '8px',
        //         },
        //       }}
        //       component="li"
        //       {...optionProps}
        //     >
        //       {ownerState.getOptionLabel(option)}
        //     </Box>
        //   );
        // }}

        // PopperComponent={CustomPopper}
        // new...
        filterOptions={rest.filterOptions ?? ((options) => options)}
        // ...new
        slots={{
          popper: fitDropDownWidth ? CustomPopper : undefined,
          ...rest.slots
        }}
        sx={{
          [`& .${autocompleteClasses.paper}`]: {
            minWidth: fitDropDownWidth ? "fit-content" : undefined,
          },
          ...rest.sx
        }}
        noOptionsText={rest.noOptionsText ?? (inputValue && !initOption ? 'Nenhum item!' : 'Digite para buscar...')}
        open={rest.open ?? open}
        onOpen={rest.onOpen ?? handleOpen}
        onClose={rest.onClose ?? handleClose}
        isOptionEqualToValue={rest.isOptionEqualToValue ?? ((option, value) => {
          return getNestedProperty(option, inputValueKeyName) === getNestedProperty(value, inputValueKeyName)
        })}
        getOptionLabel={rest.getOptionLabel ?? ((option) => {
          const result = getNestedProperty(option, inputValueKeyName) ?? ''
          return result
        })}
        options={rest.options ?? options ?? initOptions}
        loading={rest.loading ?? loading}
        inputValue={rest.inputValue ?? inputValue ?? ''}
        onChange={rest.onChange ?? ((_: any, newValue: T | null) => {
          setInputValue(newValue ? getNestedProperty(newValue, inputValueKeyName) : '')
          // console.log(`SETINPUTVALUE->onChange`)
          if (onChangeItem)
            onChangeItem(newValue)
        })}
        renderInput={rest.renderInput ?? ((params) => (
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
            onChange={(e) => handleInputChange(e.target.value)}
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