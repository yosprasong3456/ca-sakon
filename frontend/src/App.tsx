import "./App.css";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import { SnackbarProvider } from "notistack";

function App() {
  // const [count, setCount] = useState(0);
  let theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
          },
        },
      },
    },
    spacing: 8,
    typography: {
      fontFamily: "Kanit",
      fontWeightLight: 300,
      fontWeightRegular: 400,
    },
    palette: {
      mode: "light",
      primary: !import.meta.env.DEV ? { main: "#00534F" } : { main: "#00534F" },

      //   main: blue["A200"],

      // },
      // secondary: pink,
      background: {
        // default: "black",
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={15}
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        className="Snackbar"
      />
        <Routes>
   
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
