import React, { Suspense, lazy, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";


import Lenis from "@studio-freight/lenis";
import AdminHome from "./Admin/AdminHome.jsx";
import AdminOrders from "./Admin/AdminOrders.jsx";



function App() {
  const location = useLocation();
  const path = location.pathname;

  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced) return;

    lenisRef.current = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    };

    const start = () => {
      if (!rafIdRef.current) rafIdRef.current = requestAnimationFrame(raf);
      lenisRef.current?.start();
    };

    const stop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lenisRef.current?.stop();
    };

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    start();

    const onDocClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenisRef.current?.scrollTo(target, { duration: 1, offset: -80 });
    };
    document.addEventListener("click", onDocClick, { passive: false });

    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      document.removeEventListener("click", onDocClick);
      document.documentElement.style.scrollBehavior = prev || "";
      stop();
      lenisRef.current?.destroy();
    };
  }, []);

  return (
    <div>
      
        <Suspense fallback={<div></div>}>
          <Routes>
            {/* Customer Routes */}

            <Route path="/" element={<AdminHome />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
