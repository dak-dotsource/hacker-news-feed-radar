import React from "react";

export default function Footer({ switchPageUp, switchPageDown, page }) {
  return (
    <footer className="-bottom-0 flex justify-center text-2xl p-10 gap-3 ">
      <button
        onClick={switchPageDown}
        disabled={page === 1}
        className="cursor-pointer"
      >
        ◀️
      </button>
      <h4>{page}</h4>
      <button
        onClick={switchPageUp}
        disabled={page === 10}
        className="cursor-pointer"
      >
        ▶️
      </button>
    </footer>
  );
}
