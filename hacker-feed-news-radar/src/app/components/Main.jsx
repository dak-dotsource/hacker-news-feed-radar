"use client";

import { useState, useEffect } from "react";
import api from "../lib/api";

export default function Main({ page }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // fetch data from API
  const fetchData = async () => {
    try {
      const response = await api.get(`${page}.json`);
      console.log(response);
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Something went wrong! Please try again later!");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // Check Errorhandling
  /* da die API keinen gescheiten Statuscode zurückgibt, checke ich, ob ich ein Array zurückbekomme */
  const fetchWrongData = async () => {
    try {
      const response = await api.get(`x.json`);
      console.log(response);
      if (Array.isArray(response.data)) {
        setData(response.data);
        setError(null);
      } else {
        throw new Error();
      }
    } catch (error) {
      setError("Something went wrong! Please try again later!");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // fetch data when page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <main className="mt-35 mb-10 flex items-center flex-col flex-grow md:container mx-auto">
      <h1 className="font-bold text-center text-yellow-200 text-3xl mb-5">
        Newsfeed {new Date().toLocaleDateString()}
      </h1>

      {/* button to fetch wrong data */}
      <button
        onClick={fetchWrongData}
        /*  className="bg-white px-4 py-2 rounded-md text-red-500 border-1 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer font-bold self-end transition duration-300" */
        className="btn btn-error text-neutral-content self-end "
      >
        get error
      </button>

      {/* show legend for different colors */}
      <div className="my-4 w-full flex justify-center text-gray-700">
        <span className="rounded-md text-sm italic mr-2 bg-indigo-200 px-4 py-2">
          link
        </span>
        <span className="rounded-md text-sm italic mr-2 bg-yellow-200 px-4 py-2">
          ask
        </span>
        <span className="rounded-md text-sm italic mr-2 bg-lime-300 px-4 py-2">
          job
        </span>
      </div>

      {/* show error or loading message */}
      {error && (
        <p className="text-red-500 font-bold bg-red-200 px-4 py-2 rounded-md shadow-lg shadow-red-800 ">
          {error}
        </p>
      )}
      {loading && (
        <p className="bg-indigo-500 flex mx-auto items-center justify-evenly text-white rounded-md px-4 py-2 w-max">
          <svg
            className="text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-500"
            ></path>
          </svg>
          Processing…
        </p>
      )}
      <ul className="shadow-xl shadow-amber-300 rounded-lg w-max-[800px]">
        {data &&
          data.length > 0 &&
          data.map((d) => (
            <li
              key={d.id}
              className={`border-b-1 border-indigo-500 p-4 first:rounded-t-lg last:rounded-b-lg last:border-b-0 ${
                d.type === "link"
                  ? "bg-indigo-200"
                  : d.type === "ask"
                  ? "bg-yellow-200"
                  : "bg-lime-300"
              }`}
            >
              <h2 className="font-bold text-gray-700">
                {d.title}{" "}
                <span className="font-normal  text-sm">({d.time_ago})</span>
              </h2>
              <p className="italic text-sm text-gray-700">
                from {d.user} |{" "}
                <span>{new Date(d.time * 1000).toLocaleString("de-DE")}</span> |{" "}
                <span>{d.points} Points</span>
              </p>

              {d.type !== "ask" && (
                <>
                  <a
                    href={`${d.url}`}
                    target="_blank"
                    title={d.url}
                    className="rounded-md mr-5 inline-block bg-indigo-600 text-amber-300   hover:bg-indigo-500 hover:italic transition duration-300 px-2 py-1 text-sm my-1"
                  >
                    view post
                  </a>
                  <a
                    href={`${d.url}`}
                    target="_blank"
                    title={d.domain}
                    className="rounded-md inline-block bg-indigo-600 text-amber-300   hover:bg-indigo-500 hover:italic transition duration-300 px-2 py-1 text-sm my-1"
                  >
                    visit domain
                  </a>
                </>
              )}
              <p className="text-sm italic text-gray-700">
                {d.comments_count} comments
              </p>
            </li>
          ))}
      </ul>
    </main>
  );
}
