/** @jsx jsx */
import {jsx, keyframes} from '@emotion/core'
import styled from '@emotion/styled'
import {FaSpinner} from 'react-icons/fa'
import * as colors from '../styles/colors'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

export function Spinner(props) {
  return (
    <FaSpinner
      css={{animation: `${spin} 1s linear infinite`}}
      aria-label="loading"
      {...props}
    />
  )
}

export const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

export function FullPageSpinner() {
  return (
    <div css={{marginTop: '3em', fontSize: '4em'}}>
      <Spinner />
    </div>
  )
}

export const Centered = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100vh',
})

export const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
)

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
}

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})
