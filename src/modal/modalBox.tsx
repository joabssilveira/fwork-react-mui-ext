import { Box, styled } from "@mui/material";

export const ModalBoxStyledComponent = styled(Box)(({ theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: 700, 
    maxHeight: '90vh',
    
    padding: 20,
    display: 'flex',
    borderRadius: 20,
    flexDirection: 'column',
    boxSizing: 'border-box',
    background: theme.palette.background.paper,
    boxShadow: theme.palette.mode == 'dark' ? '0px 0px 35px 0px rgba(0,0,0,0.7)' : '0px 0px 35px 0px rgba(0,0,0,0.2)'
  }
})