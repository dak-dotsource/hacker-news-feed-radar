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
          data.map((d) => (
            <li key={d.id} className="border-b-1">
              <h2>{d.title}</h2>
              <p>{d.points} Points</p>
              <p>User: {d.user}</p>
              <p>Time: {new Date(d.time * 1000).toLocaleString("de-DE")}</p>
              <p>{d.time_ago}</p>
              <a href={`${d.url}`} target="blank">
                {d.url}
              </a>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </main>
  );
}
