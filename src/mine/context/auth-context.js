/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import {useAsync} from 'react-async'
import {FullPageSpinner} from '../../components/lib'
import {bootstrapAppData} from '../../utils/bootstrap'
import * as authClient from '../../utils/auth-client'

const AuthContext = React.createContext()

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false)
  const {
    data = {user: null, listItems: []},
    error,
    isRejected,
    isPending,
    isSettled,
    reload,
  } = useAsync({
    promiseFn: bootstrapAppData,
  })

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true)
    }
  }, [isSettled])

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageSpinner />
    }
    if (isRejected) {
      return (
        <div css={{color: 'red'}}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      )
    }
  }

  const login = form => authClient.login(form).then(reload)
  const register = form => authClient.register(form).then(reload)
  const logout = () => authClient.logout().then(reload)

  return (
    <AuthContext.Provider value={{data, login, register, logout}} {...props} />
  )
}

function useAuth() {
  const authContext = React.useContext(AuthContext)
  if (authContext === undefined) {
    throw new Error('useAuth should be used inside AuthContext')
  }
  return authContext
}

export {AuthProvider, useAuth}
