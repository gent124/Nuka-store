import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import RootComponent from "./components/RootComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/bodyComponents/home/Home";
import Inventory from "./components/bodyComponents/inventory/Inventory";
import SignInSide from "./components/bodyComponents/signin/SignIn";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated on app load
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

  const theme = createTheme({
    // Theme configuration
  });

  if (isLoading) {
    // Render a loading indicator while checking authentication status
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <RootComponent onLogout={handleLogout}/>
                ) : (
                  <SignInSide onSignIn={handleSignIn} />
                )
              }
            >
              {/* <Route index element={<RootPage />} /> */}
              <Route path="/home" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
            </Route>
          </Routes>
        </CssBaseline>
      </Router>
    </ThemeProvider>
  );
}

export default App;
