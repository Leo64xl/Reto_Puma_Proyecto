import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboards";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import BuyProduct from "./pages/BuyProduct";
import Forms from "./pages/Forms";
import FormAdd from "./pages/FormAdd";
import FormControl from "./pages/FormControl";
import FormCheckAdmin from "./pages/FormCheckAdmin";
import EditRegister from "./pages/EditRegister";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/users" element={<Users />} />  
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="/products/buy/:id" element={<BuyProduct />} />   
          <Route path="/forms/register" element={<Forms />} />    
          <Route path="/forms/register/edit/:id" element={<EditRegister />} /> 
          <Route path="/forms/register/add" element={<FormAdd />} />
          <Route path="/forms/view/admin" element={<FormControl />} /> 
          <Route path="/forms/view/admin/form/:id" element={<FormCheckAdmin />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
