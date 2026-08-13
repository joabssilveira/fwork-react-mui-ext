import { autocompleteClasses, Box, MenuItem, Modal, useTheme } from "@mui/material";
import React, { MutableRefObject, ReactNode, useEffect, useState } from "react";
import { AutocompleteClientComponent, IAutocompleteClientComponentProps } from ".";
import { ModalBoxStyledComponent } from "../modal/modalBox";

export enum AutocompleteClientExtOptionType {
  newItem,
  item,
}

export interface IAutocompleteClientExtOption<T extends {}> {
  id: string,
  type: AutocompleteClientExtOptionType,
  data: T | undefined,
}

export type AutocompleteClientComponentExtProps<T extends {}, MaxDepth extends number = 3,> = {
  addOption?: {
    el?: ReactNode,
    closeRef?: MutableRefObject<(() => void) | null | undefined>
  }
} & IAutocompleteClientComponentProps<IAutocompleteClientExtOption<T>, MaxDepth>

export const AutocompleteClientComponentExt = <T extends {}, MaxDepth extends number = 3,>(props: AutocompleteClientComponentExtProps<T, MaxDepth>) => {
  const { addOption, onGetData, getOptionKey, isOptionEqualToValue, renderOption, updateOptionsRef: updateDataRef, ...rest } = props
  const theme = useTheme()
  const [_anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  // EXPORTED METHOD...  
  useEffect(() => {
    if (addOption?.closeRef)
      addOption.closeRef.current = _closeDialog
  }, [])
  const _closeDialog = () => {
    setOpenPreviewModal(false)
    setAnchorEl(null)
  }
  // ...EXPORTED METHOD

  return <>
    <Modal
      open={openPreviewModal}
      onClose={() => {
        setOpenPreviewModal(false)
        setAnchorEl(null)
      }}
      style={{ padding: 20 }}
    >
      <ModalBoxStyledComponent style={{ maxWidth: '80%', background: theme.palette.background.default }}>
        {addOption?.el}
      </ModalBoxStyledComponent>
    </Modal>

    <AutocompleteClientComponent<IAutocompleteClientExtOption<T>, MaxDepth>
      {...rest}

      onGetData={async (filter: string, key: boolean) => {
        const userOptions = await onGetData?.(filter, key)
        const result = userOptions ?? []

        if (addOption) {
          result.unshift({
            id: '##new',
            type: AutocompleteClientExtOptionType.newItem,
            data: undefined,
          } as IAutocompleteClientExtOption<T>)
        }

        return result
      }}

      getOptionKey={getOptionKey ?? ((option: string | IAutocompleteClientExtOption<T>) => (option as IAutocompleteClientExtOption<T>).id)}

      isOptionEqualToValue={isOptionEqualToValue ?? ((option: IAutocompleteClientExtOption<T>, value: IAutocompleteClientExtOption<T>) => {
        return option.id == value.id
      })}

      renderOption={renderOption ?? ((props, option, state, ownerState) => {
        const { key, ...optionProps } = props;
        const { selected } = state;

        if (option.type == AutocompleteClientExtOptionType.newItem) {
          return (
            <MenuItem
              key={key}
              onClick={() => {
                setAnchorEl(null)
                setOpenPreviewModal(true)
              }}
              sx={{
                borderBottom: `1px solid transparent`,
                '&:hover': {
                  borderBottom: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  gap: 10,
                }}
              >
                <span>{'<Novo...>'}</span>
              </span>
            </MenuItem>
          );
        }

        return (
          <Box
            key={key}
            sx={{
              backgroundColor: selected ? 'primary.main' : 'transparent',
              '&:hover': {
                backgroundColor: selected ? 'primary.dark' : 'action.hover',
              },
              [`&.${autocompleteClasses.option}`]: {
                padding: '8px',
              },
            }}
            component="li"
            {...optionProps}
          >
            {ownerState.getOptionLabel(option)}
          </Box>
        );
      })}
    />
  </>
}