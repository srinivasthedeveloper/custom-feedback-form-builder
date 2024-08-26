import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { CreateForm } from './screens/CreateForm';
import { Dashboard } from './screens/Dashboard';
import { FormDetail } from './screens/FormDetail';
import { Login } from './screens/Login';
import { UserAbout } from './screens/UserScreens/About';
import { UserHome } from './screens/UserScreens/Home';
import { UserProject } from './screens/UserScreens/Project';
import { urlRoutes } from './utils/Routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={urlRoutes.login} element={<Login />} />
        {/* admin routes */}
        <Route
          path={urlRoutes.dashboard}
          element={
            <ProtectedRoute authKey={'isAdminLogin'}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={urlRoutes.newForm}
          element={
            <ProtectedRoute authKey={'isAdminLogin'}>
              <CreateForm />
            </ProtectedRoute>
          }
        />
        <Route
          path={urlRoutes.formDetails}
          element={
            <ProtectedRoute authKey={'isAdminLogin'}>
              <FormDetail />
            </ProtectedRoute>
          }
        />
        {/* admin routes end */}

        {/* user routes */}
        <Route
          path={urlRoutes.userDashboard}
          element={
            <ProtectedRoute authKey={'isUserLogin'}>
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path={urlRoutes.userAbout}
          element={
            <ProtectedRoute authKey={'isUserLogin'}>
              <UserAbout />
            </ProtectedRoute>
          }
        />
        <Route
          path={urlRoutes.userProject}
          element={
            <ProtectedRoute authKey={'isUserLogin'}>
              <UserProject />
            </ProtectedRoute>
          }
        />
        {/* user routes end */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
