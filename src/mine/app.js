import React from 'react';
import { FullPageSpinner } from './components/libs';
import { useUser } from './context/user-context';
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));
const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));

function App() {
  const user = useUser();

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;
