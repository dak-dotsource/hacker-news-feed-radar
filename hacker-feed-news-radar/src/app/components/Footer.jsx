import React from "react";

export default function Footer({ switchPageUp, switchPageDown, page }) {
  return (
    <footer className="-bottom-0 flex justify-center ">
      <button onClick={switchPageDown} disabled={page === 1}>
        ◀️
      </button>
      <h4>{page}</h4>
      <button onClick={switchPageUp} disabled={page === 10}>
        ▶️
      </button>
    </footer>
  );
}
