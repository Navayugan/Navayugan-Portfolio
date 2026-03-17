import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import './App.css';
import { useEffect } from 'react';


function changeTitleIcon(iconURL){
    const link = document.querySelector("link[rel~='icon']");
    if(link){
      link.href = iconURL;
    }else{
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = iconURL;
      document.head.appendChild(newLink);
    }
  }

const App = () => {
  const location = useLocation();

  useEffect(()=>{
    changeTitleIcon("/src/assets/title-logo-01.png");
  },[]);

    useEffect(() => {
      document.title = 'Navayugan K | Full Stack Developer';
    }, []);

  return (
    <ThemeProvider>
      <div className="app">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
