import { Box, styled } from "@mui/material";

export const ModalBoxStyledComponent = styled(Box)(({ theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 700, 
    background: theme.palette.background.paper,
    borderRadius: 20,
    padding: 20,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
  }
})