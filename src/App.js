import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import { ThemeProvider } from "./context/themeprovider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <div>
          <Header />
          <Home />
          <footer>
            <Footer />
          </footer>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
