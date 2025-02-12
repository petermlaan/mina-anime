'use client';

import Image from "next/image";
import styles from "./page.module.css";
import React from "react";

export default function Page() {

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Submitted!");
  }

  return (
    <main>
      <form id="frmSearch" onSubmit={onSubmit}>
        <button id="btnTest">Test</button>
        <label id="lblFilterWatched" htmlFor="chkFilterWatched">Dölj sedda
          <input type="checkbox" id="chkFilterWatched" />
        </label>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </form>
      <section id="main"></section>
    </main>
  );
}
