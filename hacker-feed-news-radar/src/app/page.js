"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function Home() {
  const [page, setPage] = useState(1);

  const switchPageUp = () => {
    setPage((prev) => prev + 1);
  };

  const switchPageDown = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="container flex flex-col min-w-full min-h-screen mx-auto bg-emerald-600">
      <Header />
      <Main page={page} />
      <Footer
        switchPageUp={switchPageUp}
        switchPageDown={switchPageDown}
        page={page}
      />
    </div>
  );
}
