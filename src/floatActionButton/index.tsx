// 16-10-2024

import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MenuIcon from '@mui/icons-material/Menu'
import ExecuteIcon from '@mui/icons-material/PlayArrow'
import { CircularProgress } from '@mui/material'
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import * as React from 'react'

export interface IFloatActionButtonComponentProps extends SpeedDialProps {
  onCancelClick?: () => void,
  onConfirmClick?: () => void,
  onDeleteClick?: () => void,
  onAddClick?: () => void,
  onEditClick?: () => void,
  onExecuteClick?: () => void,
  icon?: React.ReactNode,
  progress?: Boolean,
}

export const FloatActionButtonComponent: React.FC<IFloatActionButtonComponentProps> = ({
  onCancelClick,
  onConfirmClick,
  onDeleteClick,
  onAddClick,
  onEditClick,
  onExecuteClick,
  progress,
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
      rest?.icon && progress || progress ? <CircularProgress size={30} style={{ color: 'white' }} /> : rest?.icon ? rest?.icon : <MenuIcon />
    }
    onClose={handleClose}
    onOpen={handleOpen}
    open={open}>

    {onCancelClick && <SpeedDialAction
      icon={
        <CloseIcon onClick={() => {
          handleClose()
          onCancelClick()
        }} />
      }
      onClick={handleClose}
    />}

    {onConfirmClick && <SpeedDialAction
      icon={
        <CheckIcon style={{
          backgroundColor: 'transparent',
        }}
          onClick={() => {
            handleClose()
            onConfirmClick()
          }} />}
      onClick={handleClose}
    />}

    {onDeleteClick && <SpeedDialAction
      icon={
        <DeleteIcon onClick={() => {
          handleClose()
          onDeleteClick()
        }} />
      }
      onClick={handleClose}
    />}

    {onAddClick && <SpeedDialAction
      icon={
        <AddIcon onClick={() => {
          handleClose()
          onAddClick()
        }} />
      }
      onClick={handleClose}
    />}

    {onEditClick && <SpeedDialAction
      icon={
        <EditIcon onClick={() => {
          handleClose()
          onEditClick()
        }} />
      }
      onClick={handleClose}
    />}

    {onExecuteClick && <SpeedDialAction
      icon={
        <ExecuteIcon onClick={() => {
          handleClose()
          onExecuteClick()
        }} />
      }
      onClick={handleClose}
    />}

  </SpeedDial>
}
