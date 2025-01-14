/** @jsx jsx */
import {jsx} from '@emotion/core'

import {useAuth} from './context/auth-context'
import {useUser} from './context/user-context'
import * as mq from '../styles/media-queries'
import * as colors from './styles/colors'
import styled from '@emotion/styled'
import {Link, Router, Redirect} from '@reach/router'
import {ListItemProvider} from './context/list-item-context'

function AuthenticatedApp() {
  const {logout} = useAuth()
  const user = useUser()

  return (
    <div
      css={{
        margin: '0 auto',
        padding: '2em 0',
        maxWidth: '840px',
        width: '100%',
        display: 'grid',
        gridGap: '1em',
        gridTemplateColumns: '3fr 9fr',
        [mq.small]: {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          width: '100%',
          padding: '2em 1em',
        },
      }}
    >
      <div>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            top: '10px',
            right: '10px',
          }}
        >
          {user.username}
          <button
            onClick={logout}
            css={{
              marginLeft: '10px',
            }}
          >
            Logout
          </button>
        </div>
        <Nav />
      </div>
      <main css={{width: '100%'}} />
      <Routes />
      <footer />
    </div>
  )
}

function Nav(params) {
  return (
    <nav
      css={{
        position: 'sticky',
        top: '2em',
        padding: '3em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          padding: '0.5em 1em',
          position: 'static',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
          '& [aria-current="page"]': {
            borderLeft: `5px solid ${colors.indigo}`,
            background: colors.gray10,
            ':hover': {
              background: colors.gray10,
            },
          },
        }}
      >
        <li>
          <NavLink to="/list">Reading List</NavLink>
        </li>
        <li>
          <NavLink to="/finished">Finished Books</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
      </ul>
    </nav>
  )
}

const NavLink = styled(Link)({
  display: 'block',
  padding: '8px 15px 8px 10px',
  margin: '5px 0',
  width: '100%',
  height: '100%',
  color: colors.text,
  borderRadius: '2px',
  borderLeft: '5px solid transparent',
  ':hover': {
    color: colors.indigo,
    textDecoration: 'none',
    background: colors.gray10,
  },
})

function RedirectHome() {
  return <Redirect to="/list" />
}

function Routes() {
  return (
    <ListItemProvider>
      <Router>
        <RedirectHome path="/" />
        <ReadingListScreen path="/list" />
      </Router>
    </ListItemProvider>
  )
}

function ReadingListScreen() {
  return <h1>Hello to ReadingListScreen</h1>
}

export default AuthenticatedApp
