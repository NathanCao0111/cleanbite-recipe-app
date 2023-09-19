import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AuthState from "./contexts/AuthContext/AuthState";
import routes from "./constants/routes/router";
import PrivateRoute from "./HOCs/PrivateRoute";
import GlobalStyles from "./components/GlobalStyles";
import DefaultLayout from "./components/DefaultLayout";
import RecipesState from "./contexts/RecipesContext/RecipesState";
import SiteState from "./contexts/SiteContext/SiteState";

function App() {
  return (
    <GlobalStyles>
      <Router>
        <SiteState>
          <AuthState>
            <RecipesState>
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
            </RecipesState>
          </AuthState>
        </SiteState>
      </Router>
    </GlobalStyles>
  );
}

export default App;
