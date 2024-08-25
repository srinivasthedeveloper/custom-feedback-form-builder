import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateForm } from './screens/CreateForm';
import { Dashboard } from './screens/Dashboard';
import { FormDetail } from './screens/FomDetail';
import { Login } from './screens/Login';
import { urlRoutes } from './utils/Routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={urlRoutes.login} element={<Login />} />
        <Route path={urlRoutes.dashboard} element={<Dashboard />} />
        <Route path={urlRoutes.newForm} element={<CreateForm />} />
        <Route path={urlRoutes.formDetails} element={<FormDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
