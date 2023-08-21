import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AuthState from "./contexts/AuthContext/AuthState";
import routes from "./routes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthState>
        <div className="app">
          <Header />
          <Routes>
            {routes.map((route, index) => {
              const { path, component: Component, isPrivate } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute component={Component} />
                    ) : (
                      <Component />
                    )
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AuthState>
    </Router>
  );
}

export default App;
