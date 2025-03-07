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
    <main className="mt-35 mb-10 flex-grow  md:container mx-auto">
      <h1 className="font-bold text-center text-3xl mb-5">
        Newsfeed <br /> {new Date().toLocaleDateString()}
      </h1>
      <div className="my-4 w-full flex justify-center">
        <span className="rounded-md text-sm italic mr-2 bg-red-200 px-4 py-2">
          link
        </span>
        <span className="rounded-md text-sm italic mr-2 bg-yellow-200 px-4 py-2">
          ask
        </span>
        <span className="rounded-md text-sm italic mr-2 bg-lime-300 px-4 py-2">
          job
        </span>
      </div>
      <ul>
        {data ? (
          data.map((d) => (
            <li
              key={d.id}
              className={`border-b-1 p-4 ${
                d.type === "link"
                  ? "bg-red-200"
                  : d.type === "ask"
                  ? "bg-yellow-200"
                  : "bg-lime-300"
              }`}
            >
              <h2 className="font-bold">
                {d.title}{" "}
                <span className="font-normal text-sm">({d.time_ago})</span>
              </h2>
              <p className="italic text-sm text-gray-700">
                from {d.user} |{" "}
                <span>{new Date(d.time * 1000).toLocaleString("de-DE")}</span> |
                <span>{d.points} Points</span>
              </p>

              {d.type !== "ask" && (
                <a
                  href={`${d.url}`}
                  target="_blank"
                  title={d.url}
                  className="rounded-md inline-block bg-green-400 hover:bg-green-600 hover:italic transition duration-300 px-2 py-1 text-sm my-1"
                >
                  view in a new tab
                </a>
              )}
              <p className="text-sm italic text-gray-700">
                {d.comments_count} comments
              </p>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </main>
  );
}
