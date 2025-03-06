"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";
export default function Main({ page }) {
  const [data, setData] = useState(null);

  // fetch data from api
  const fetchData = async () => {
    try {
      const response = await api.get(`${page}.json`);
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("HALLO", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <main className="mt-35 flex-grow">
      <h1>Newsfeed</h1>
      <ul>
        {data ? (
          data.map((d) => <li key={d.id}>{d.title}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </main>
  );
}
