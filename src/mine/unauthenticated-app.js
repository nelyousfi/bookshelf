/** @jsx jsx */
import {jsx} from '@emotion/core'
import styled from '@emotion/styled'
import {Dialog} from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import React from 'react'
import {
  Button,
  Centered,
  CircleButton,
  FormGroup,
  Spinner,
} from './components/libs'
import Logo from './components/logo'
import {useAuth} from './context/auth-context'

function useIsMounted() {
  const mounted = React.useRef(false)
  React.useLayoutEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])
  return mounted
}

function useCallbackStatus() {
  const isMounted = useIsMounted()
  const [{status, error}, setState] = React.useState(
    (state, action) => ({...state, action}),
    {status: 'rest', error: null},
  )

  const safeSetState = (...args) =>
    isMounted.current ? setState(...args) : null

  const isPending = status === 'pending'
  const isRejected = status === 'rejected'

  function run(promise) {
    if (!promise || !promise.then) {
      throw new Error(
        'The argument passed to useCallbackStatus.run() must be a promise',
      )
    }
    safeSetState({status: 'pending'})
    return promise.then(
      value => {
        safeSetState({status: 'rest'})
        return value
      },
      error => {
        safeSetState({status: 'rejected', error})
        return Promise.reject(error)
      },
    )
  }

  return {
    isPending,
    isRejected,
    error,
    status,
    run,
  }
}

function LoginForm({onSubmit, buttonText}) {
  const {isPending, isRejected, status, error, run} = useCallbackStatus()

  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
      </FormGroup>
      <div>
        <Button type="submit">
          {buttonText} {isPending ? <Spinner css={{marginLeft: 5}} /> : null}
        </Button>
      </div>
      {isRejected ? (
        <div css={{color: 'red'}}>{error ? error.message : null}</div>
      ) : null}
    </form>
  )
}

function Modal({button, children}) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      {React.cloneElement(button, {onClick: () => setIsOpen(true)})}
      <Dialog isOpen={isOpen}>
        <div css={{display: 'flex', justifyContent: 'flex-end'}}>
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
  const {login, register} = useAuth()

  return (
    <Centered>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div css={{display: 'flex'}}>
        <Modal button={<Button css={{marginRight: 6}}>Login</Button>}>
          <ModalTitle>Login</ModalTitle>
          <LoginForm onSubmit={login} buttonText="Login" />
        </Modal>
        <Modal button={<Button variant="secondary">Register</Button>}>
          <ModalTitle>Register</ModalTitle>
          <LoginForm onSubmit={register} buttonText="Register" />
        </Modal>
      </div>
    </Centered>
  )
}

export default UnauthenticatedApp
