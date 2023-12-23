import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React from 'react';

import AppLogo from '../../common/AppLogo.tsx';
import { CloseBtnLink, ContentWrapper, StyledModal } from './Modal.styles.ts';

interface CustomModalProps {
  children: React.ReactNode;
  title: string;
  desc: string;
  open: boolean;
  onClose: () => void;
}

const BaseModal = (props: CustomModalProps) => {
  const { open, onClose, title, desc, children } = props;

  return (
    <StyledModal
      open={open || false}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      closeAfterTransition // if true, the modal waits until a nested transition is completed before closing
      disableAutoFocus={false} // dont set to true for accessibility
      disableEnforceFocus={false} // dont set to true for accessibility
      disableEscapeKeyDown={false} // if true, esc key will not trigger onClose
      disablePortal // if true, children will be under parent DOM
      disableRestoreFocus={false} // if true, modal will not restore focus to previously focused element after modal is unmounted
      disableScrollLock // if true, scroll lock behavior is disabled
      hideBackdrop={false} // if true, backdrop is not rendered
      keepMounted // keep children in DOM, this is useful for SEO, better open performance on mobile
      // onTransitionEnter={props.onTransitionEnter || ''}
      // onTransitionExited={props.onTransitionExited || ''}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        },
      }}
    >
      <ContentWrapper>
        <Box
          className="flex-center"
          sx={{ padding: '30px 0', overflow: 'none' }}
        >
          <AppLogo
            enableOnclick={false}
            textSize="clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)"
            isHidden={false}
          />
        </Box>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {desc}
        </Typography>
        {children}
        <Container
          sx={{
            textAlign: 'center',
            paddingTop: '32px',
            paddingBottom: '15px',
          }}
        >
          <CloseBtnLink
            variant="body2"
            underline="none"
            color="inherit"
            onClick={() => onClose()}
          >
            Close
          </CloseBtnLink>
        </Container>
      </ContentWrapper>
    </StyledModal>
  );
};

export default BaseModal;
