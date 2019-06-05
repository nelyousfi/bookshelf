import React from 'react';
import { useAuth } from './auth-context';

const UserContext = React.createContext();

function UserProvider(props) {
  const { data: { user } } = useAuth();

  return (
    <UserContext.Provider value={user} {...props} />
  );
}

function useUser() {
  const userContext = React.useContext(UserContext);

  if (userContext === 'undefined') {
    throw new Error('You should use useUser inside a UserProvider');
  }

  return userContext;
}

export { UserProvider, useUser };

