// 16-10-2024

import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExecuteIcon from '@mui/icons-material/PlayArrow'
import { CircularProgress, TooltipProps, useTheme } from '@mui/material'
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial'
import SpeedDialAction, { SpeedDialActionProps } from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import * as React from 'react'

export type IFloatActionButtonComponentItem = {
  toolTip?: TooltipPropsExt,
  // onClick?: () => void,
  // icon?: React.ReactNode
} & SpeedDialActionProps

export type TooltipPropsExt = Omit<TooltipProps, 'children'>

export interface IFloatActionButtonComponentProps extends SpeedDialProps {
  cancelProps?: IFloatActionButtonComponentItem,
  confirmProps?: IFloatActionButtonComponentItem,
  deleteProps?: IFloatActionButtonComponentItem,
  addProps?: IFloatActionButtonComponentItem,
  editProps?: IFloatActionButtonComponentItem,
  executeProps?: IFloatActionButtonComponentItem,
  icon?: React.ReactNode,
  progress?: Boolean,
  customActions?: {
    content: React.ReactNode,
    toolTip?: TooltipPropsExt,
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  }[]
}

export const FloatActionButtonComponent: React.FC<IFloatActionButtonComponentProps> = ({
  cancelProps,
  confirmProps,
  deleteProps,
  addProps,
  editProps,
  executeProps,
  progress,
  customActions,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const theme = useTheme()

  const getDefault = () => {
    const result: IFloatActionButtonComponentItem[] = []

    if (executeProps) result.push({
      ...executeProps,
      icon: executeProps.icon ?? <ExecuteIcon />,
      toolTip: executeProps.toolTip ?? {
        title: 'Executar'
      }
    })
    if (addProps) result.push({
      ...addProps,
      icon: addProps.icon ?? <AddIcon />,
      toolTip: addProps.toolTip ?? {
        title: 'Novo'
      }
    })
    if (editProps) result.push({
      ...editProps,
      icon: editProps.icon ?? <EditIcon />,
      toolTip: editProps.toolTip ?? {
        title: 'Editar/Alterar'
      }
    })
    if (deleteProps) result.push({
      ...deleteProps,
      icon: deleteProps.icon ?? <DeleteIcon />,
      toolTip: deleteProps.toolTip ?? {
        title: 'Remover'
      }
    })
    if (cancelProps) result.push({
      ...cancelProps,
      icon: cancelProps.icon ?? <CloseIcon />,
      toolTip: cancelProps.toolTip ?? {
        title: 'Cancelar'
      }
    })
    if (confirmProps) result.push({
      ...confirmProps,
      icon: confirmProps.icon ?? <CheckIcon />,
      toolTip: confirmProps.toolTip ?? {
        title: 'Confirmar'
      },
      sx: {
        bgcolor: theme.palette.success.main,
        '&:hover': {
          bgcolor: theme.palette.success.dark,
          color: 'white'
        },
        ...confirmProps.sx,
      }
    })

    return result
  }

  return <SpeedDial
    {...rest}
    ariaLabel={rest.ariaLabel ?? "FloatActionButton"}
    sx={{ position: 'fixed', bottom: 16, right: 16, ...rest.sx }}
    icon={
      rest?.icon && progress || progress ? <CircularProgress size={30} style={{ color: 'white' }} /> : rest?.icon ? rest?.icon : <SpeedDialIcon />
    }
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}>

    {customActions?.map((a, idx) => <SpeedDialAction
      key={idx}
      slotProps={{
          tooltip: a.toolTip as any
        }}
      // icon={<Tooltip {...(a.toolTip ?? { title: '' })}>
      //   <>{a.content}</>
      // </Tooltip>
      // }
      icon={a.content}
      onClick={(e) => {
        handleClose()
        a.onClick?.(e)
      }}
    />)}

    {getDefault().map((item, idx) => {
      const { toolTip, ...itemProps } = item

      return <SpeedDialAction
        {...itemProps}
        slotProps={{
          tooltip: toolTip as any,
        }}
        key={idx + (customActions?.length ?? 0)}
        // icon={<Tooltip {...(item.toolTip ?? { title: '' })}>
        //   <>{item.icon}</>
        // </Tooltip>
        // }
        icon={item.icon}
        onClick={(e) => {
          handleClose()
          item.onClick?.(e)
        }}
      />
    })}

  </SpeedDial>
}
