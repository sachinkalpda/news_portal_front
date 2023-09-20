import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import ForZeroFor from "./pages/ForZeroFor";

// private routes function components
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  
  const auth = useAuth();
  if(auth.loading){
    
    return <Loader />
  }
  return (
    <div className="App ">
      <BrowserRouter>
        <div className="container max-sm:px-1 sm:px-1 mx-auto xl:px-8">
          <Header />
          <main className="py-3 min-h-1/2 w-full" style={{minHeight: '50vh'}}>
            <Routes>
              <Route path="*" element={<ForZeroFor />} />
              <Route path="/" element={<Home />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
