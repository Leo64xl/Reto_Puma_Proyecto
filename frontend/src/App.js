import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboards";
import Login from "./components/Login";
import Register from "./components/Register";
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
import GraphicsAdmin from "./pages/GraphicsAdmin";
import PageResults from "./pages/PageResults";
import ResultsAdd from "./pages/ResultsAdd";
import ResultsEdit from "./pages/ResultsEdit";
import RouteView from "./pages/RouteView";
import RouteAdmin from "./pages/RouteAdmin";
import RoutesEd from "./pages/RoutesEd";
import Advertesiments from "./pages/Advertesiments";
import AddAdvert from "./pages/AddAdvert";
import EditAdvert from "./pages/EditAdvert";

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/result/winners" element={<PageResults />} /> 
          <Route path="/result/winners/add" element={<ResultsAdd />} />
          <Route path="/result/winners/edit/:id" element={<ResultsEdit />} />
          <Route path="/ruta" element={<RouteView />} />
          <Route path="/ruta/admin" element={<RouteAdmin />} />
          <Route path="/ruta/admin/edit/:id" element={<RoutesEd />} />
          <Route path="/advertisements" element={<Advertesiments />} />
          <Route path="/advertisements/admin" element={<AddAdvert />} />
          <Route path="/advertisements/admin/edit/:id" element={<EditAdvert />} />
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
          <Route path="/forms/view/admin/graphics" element={<GraphicsAdmin />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
