
import { Route, Routes, useLocation, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Nav from './components/Nav'
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
import Footer from './components/Footer'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Collection from './pages/Collection'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import NotFound from './pages/NotFound'
import Ai from './components/Ai'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  let {userData} = useContext(userDataContext)
  let location = useLocation()

  return (
    <div className='overflow-x-hidden'>
    <ToastContainer />
    {userData && <Nav />}
         
      <Routes>
        <Route path='/login' element={userData ? (<Navigate to={location.state?.from || "/"}/>) : (<Login />)}/>
        <Route path='/register' element={userData ? (<Navigate to={location.state?.from || "/"} />) : (<Register />)}/>
        
        <Route path='/' element={userData ? <Home /> : <Navigate to="/login" state={{from: location.pathname}}/>}/>
        <Route path='/about' element={userData ? <About /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/contact' element={userData ? <Contact /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/collection' element={userData ? <Collection /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/product' element={userData ? <Product /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/productDetail/:productId' element={userData ? <ProductDetail /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/cart' element={userData ? <Cart /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/placeorder' element={userData ? <PlaceOrder /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='/order' element={userData ? <Order /> : <Navigate to="/login" state={{from: location.pathname}} />} />
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Ai />
      {userData && <Footer />}
    </div>
  )
}

export default App
