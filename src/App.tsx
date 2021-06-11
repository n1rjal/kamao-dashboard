import "./App.css";
import HomePage from "./pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/SideBar/SideBar";
import { DataContextProvider } from "./contexts/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./HOC/ProtectedRoute";
import CompetitionPage from "./pages/CompetitionPage";
import CompetitonDetailPage from "./pages/CompetitonDetailPage";
import Std404 from "./components/Std404/Std404";
import CompanyPage from "./pages/CompanyPage";
import CompanyDetailPage from "./pages/CompanyDetailPage";

import { ToastContainer } from "react-toastify";
import PostPage from "./pages/PostPage";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataContextProvider>
          <ProtectedRoute>
            <Router>
              <NavBar />
              <SideBar />
              <section className="App__margeBy15rem">
                <Switch>
                  <Route path="/" exact>
                    <HomePage />
                  </Route>
                  <Route path="/competition/:compId" exact>
                    <CompetitonDetailPage />
                  </Route>
                  <Route path="/competition" exact>
                    <CompetitionPage />
                  </Route>
                  <Route path="/company/:id" exact>
                    <CompanyDetailPage />
                  </Route>
                  <Route path="/company" exact>
                    <CompanyPage />
                  </Route>
                  <Route path="/posts" exact>
                    <PostPage />
                  </Route>

                  <Std404
                    {...{
                      message1: "404 Error",
                      message2: "We belive you are lost",
                    }}
                  />
                </Switch>
              </section>
            </Router>
            <Footer></Footer>
          </ProtectedRoute>
        </DataContextProvider>
      </header>
      <ToastContainer limit={3} />
    </div>
  );
}
export default App;
