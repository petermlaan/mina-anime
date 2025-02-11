import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
  return (
    <main>
      <form id="frmSearch">
        <button id="btnTest">Test</button>
        <label id="lblFilterWatched" htmlFor="chkFilterWatched">Dölj sedda
          <input type="checkbox" id="chkFilterWatched" />
        </label>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </form>
      <section id="main">{minaanime}</section>
    </main>
  );
}
