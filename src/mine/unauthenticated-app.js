/** @jsx jsx */
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Dialog } from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import React from 'react';
import { Button, Centered, CircleButton } from './components/libs';
import Logo from './components/logo';
import { useAuth } from './context/auth-context';

function LoginForm({onSubmit, buttonText}) {

}

function Modal({ button, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {React.cloneElement(button, { onClick: () => setIsOpen(true) })}
      <Dialog isOpen={isOpen}>
        <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CircleButton onClick={() => setIsOpen(false)}>
            <VisuallyHidden>Close</VisuallyHidden>
            <span aria-hidden>×</span>
          </CircleButton>
        </div>
        {children}
      </Dialog>
    </>
  )
}

const ModalTitle = styled.h3({
  textAlign: 'center',
  fontSize: '2em',
})

function UnauthenticatedApp() {
  const { login, register } = useAuth();

  return (
    <Centered>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div css={{ display: 'flex' }}>
        <Modal button={<Button css={{ marginRight: 6 }}>Login</Button>}>
          <ModalTitle>Login</ModalTitle>
          <LoginForm onSubmit={login} buttonText="Login" />
        </Modal>
      </div>
    </Centered>
  )
}

export default UnauthenticatedApp;
