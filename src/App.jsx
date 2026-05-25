import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import RouteThread from "./components/RouteThread";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Projects from "./components/Projects";
import BikeMap from "./components/BikeMap";
import Hikes from "./components/Hikes";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Header />
        <RouteThread />
        <main>
          <Hero />
          <About />
          <Education />
          <Projects />
          <BikeMap />
          <Hikes />
          <Contact />
        </main>
        <Footer />
      </LanguageProvider>
    </ThemeProvider>
  );
}
