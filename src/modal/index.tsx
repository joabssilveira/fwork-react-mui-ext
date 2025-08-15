import { Box, Button, Modal, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { ModalBoxStyledComponent } from "./modalBox";

export interface IModalComponentProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string,
  modalContent: ReactNode,
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const ModalComponent: React.FC<IModalComponentProps> = ({
  title,
  modalContent,
  onConfirm,
  ...props
}) => {
  const [openModal, setOpenModal] = useState(false);

  return <>
    <Modal open={openModal} onClose={() => setOpenModal(false)} style={{ padding: 20 }}>
      <ModalBoxStyledComponent >
        {title != null && <Typography variant='h6' gutterBottom color="text.primary">
          {title}
        </Typography>}

        {modalContent}

        <Box display='flex' justifyContent='flex-end' gap={2} mt={2}>
          <Button onClick={() => setOpenModal(false)} variant='outlined'>
            {onConfirm ? 'Cancelar' : 'Fechar'}
          </Button>
          {onConfirm != null && <Button onClick={(e) => {
            setOpenModal(false)
            onConfirm?.(e)
          }} variant='contained' color='primary'>
            Confirmar
          </Button>}
        </Box>
      </ModalBoxStyledComponent>
    </Modal>

    <div id='ModalComponent'
      {...props}

      onClick={(e) => {
        props.onClick?.(e)
        setOpenModal(true)
      }}
    >
      {props.children}
    </div>
  </>
}