import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthState from "./contexts/AuthContext/AuthState";
import routes from "./constants/routes/router";
import PrivateRoute from "./components/PrivateRoute";
import GlobalStyles from "./components/GlobalStyles";
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <GlobalStyles>
      <Router>
        <AuthState>
          <div className="app">
            <Routes>
              {routes.map((route, index) => {
                const { path, component: Component, isPrivate } = route;
                return (
                  <Route
                    key={index}
                    path={path}
                    element={
                      isPrivate ? (
                        <DefaultLayout>
                          <PrivateRoute component={Component} />
                        </DefaultLayout>
                      ) : (
                        <DefaultLayout>
                          <Component />
                        </DefaultLayout>
                      )
                    }
                  />
                );
              })}
            </Routes>
          </div>
        </AuthState>
      </Router>
    </GlobalStyles>
  );
}

export default App;
