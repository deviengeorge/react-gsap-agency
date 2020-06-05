import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Route } from "react-router-dom";
import "./styles/App.scss";

// Component
import Header from "./components/header";
import Navigation from "./pages/navigation";

// pages
import Home from "./pages/home";
import CaseStudies from "./pages/caseStudies";
import Approach from "./pages/approach";
import Services from "./pages/services";
import About from "./pages/about";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/case-studies", name: "Case Studies", Component: CaseStudies },
  { path: "/approach", name: "Approach", Component: Approach },
  { path: "/services", name: "Services", Component: Services },
  { path: "/about-us", name: "About Us", Component: About },
];

// Routes

function debounce(fn, ms) {
  let timer;
  return () => {
    clearInterval(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function App() {
  // Prevent flashing white
  gsap.to("body", 0, { css: { visibility: "visible" } });
  // Setting Up The Dimenstions Screen
  const [dimenstions, setDimenstions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // Grab inner height of window for mobile response when dealing with vh
    let vh = dimenstions.height * 0.01;
    // Set css variable vh
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    const debounceHandleResize = debounce(function handleResize() {
      setDimenstions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debounceHandleResize);

    return () => {
      window.removeEventListener("resize", debounceHandleResize);
    };
  });

  return (
    <>
      <Header dimenstions={dimenstions} />
      {console.log(dimenstions.width)}
      <div className='App'>
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </>
  );
}

export default App;
