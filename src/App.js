import React, { useState } from "react";
import UserContext from "./context/UserContext";
import { HashRouter, Routes, Route, Outlet, Navigate} from "react-router-dom";
import HomePage from "./components/home";
import DashboardLayout from "./components/dashboard/layouts/dashboard.layout";
import Dashboard from "./components/dashboard/pages/Dashboard";
import ManageGym from "./components/dashboard/pages/ManageGym";
import ManageUser from "./components/dashboard/pages/ManageUser";
import ManageMembership from "./components/dashboard/pages/ManageMembership";
import Reporting from "./components/dashboard/pages/Reporting";
import EditUser from "./components/dashboard/pages/EditUser";
import EditGym from "./components/dashboard/pages/Gym/editGym";
import ManageTrainer from "./components/dashboard/pages/Gym/manageTrainer";
import ManageClass from "./components/dashboard/pages/Gym/manageClass";
import Setting from "./components/dashboard/pages/Setting";

const PrivateRoute = ()=>{
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated? <DashboardLayout/> : <Navigate to="/"/>;
}
const App = () => {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <HashRouter>
            <Routes>
              <Route exact path="/" element={<HomePage/>} />
              <Route path="/" element={<PrivateRoute/>}>
                  <Route path="dashboard" element={<Dashboard/>} />
                  <Route path="gym" element={<ManageGym/>} />
                  <Route path="user" element={<ManageUser/>} />
                  <Route path="membership" element={<ManageMembership/>} />
                  <Route path="reporting" element={<Reporting/>} />
                  <Route path="settings" element={<Setting/>} />
                  <Route path="logout" element={<Dashboard/>} />
                  <Route path="edituser" element={<EditUser/>} />
                  <Route path="gymeditmain" element={<EditGym/>}/>
                  <Route path="gymedittrainer" element={<ManageTrainer/>}/>
                  <Route path="gymeditclass" element={<ManageClass/>} />
              </Route>
            </Routes>
          </HashRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
