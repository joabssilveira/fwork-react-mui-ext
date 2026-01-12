// 16-10-2024

import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExecuteIcon from '@mui/icons-material/PlayArrow'
import { CircularProgress, Tooltip, TooltipProps } from '@mui/material'
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import * as React from 'react'

export interface TooltipPropsExt extends Omit<TooltipProps, 'children'> {

}

export interface IFloatActionButtonComponentProps extends SpeedDialProps {
  cancelProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
  confirmProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
  deleteProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
  addProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
  editProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
  executeProps?: {
    toolTip?: TooltipPropsExt,
    onClick?: () => void,
  },
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

    {customActions?.map(a => <SpeedDialAction
      icon={<Tooltip {...(a.toolTip ?? { title: '' })}>
       <>{a.content}</>
      </Tooltip>
      }
      onClick={handleClose}
    />)}

    {cancelProps && <SpeedDialAction
      icon={<Tooltip {...(cancelProps.toolTip ?? { title: '' })}>
        <CloseIcon onClick={() => {
          handleClose()
          cancelProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

    {confirmProps && <SpeedDialAction
      icon={<Tooltip {...(confirmProps.toolTip ?? { title: '' })}>
        <CheckIcon onClick={() => {
          handleClose()
          confirmProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

    {deleteProps && <SpeedDialAction
      icon={<Tooltip {...(deleteProps.toolTip ?? { title: '' })}>
        <DeleteIcon onClick={() => {
          handleClose()
          deleteProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

    {addProps && <SpeedDialAction
      icon={<Tooltip {...(addProps.toolTip ?? { title: '' })}>
        <AddIcon onClick={() => {
          handleClose()
          addProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

    {editProps && <SpeedDialAction
      icon={<Tooltip {...(editProps.toolTip ?? { title: '' })}>
        <EditIcon onClick={() => {
          handleClose()
          editProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

    {executeProps && <SpeedDialAction
      icon={<Tooltip {...(executeProps.toolTip ?? { title: '' })}>
        <ExecuteIcon onClick={() => {
          handleClose()
          executeProps?.onClick?.()
        }} />
      </Tooltip>
      }
      onClick={handleClose}
    />}

  </SpeedDial>
}
