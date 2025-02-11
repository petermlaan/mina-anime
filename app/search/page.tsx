import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import { useRouter } from 'next/router';

const preventDefault = <T extends HTMLFormElement>(f: (e: React.FormEvent<T>) => void) => (e: React.FormEvent<T>) => {
  e.preventDefault();
  f(e);
};

interface FormProps {
  action?: string;
}

const MyForm: React.FC<FormProps> = ({ action = '/search' }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleParam = (setValue: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: action,
      query: { q: query },
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleParam(setQuery)}
        placeholder="Search..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;

/*import { useState } from 'react';
import { useRouter } from 'next/router';

const preventDefault = f => e => {
  e.preventDefault();
  f(e);
};

export default ({ action = '/search' }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleParam = setValue => e => setValue(e.target.value);

  const handleSubmit = preventDefault(() => {
    router.push({
      pathname: action,
      query: { q: query },
    });
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleParam(setQuery)}
        placeholder="Search..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};
*/
/*export default function Home() {
  return (
    <main>
      <form id="frmSearch">
        <label id="lblTopSearch" htmlFor="chkTopSearch" hidden>Toppsök
          <input type="checkbox" id="chkTopSearch" hidden />
        </label>
        <label id="lblType" htmlFor="selType" hidden>Typ
          <select id="selType" hidden>
            <option value=""></option>
            <option value="tv">TV</option>
            <option value="movie">Film</option>
          </select>
        </label>
        <input id="txtQuery" type="search" hidden />
        <button id="btnSearch" type="submit" hidden>Sök</button>
        <button id="btnPrevPage" className="disabled" disabled hidden>&lt; Föreg</button>
        <button id="btnNextPage" className="disabled" disabled hidden>Nästa &gt;</button>
        <label id="lblShowList" htmlFor="chkShowList">Visa lista
          <input type="checkbox" id="chkShowList" />
        </label>
      </form>
      <section id="cMain"></section>
    </main>
  );
}
*/
