import React from "react";
import { createClient } from '@supabase/supabase-js'

export default async function Page() {

  const supabase = createClient("https://xhffsmexnbsqdkybtppv.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZmZzbWV4bmJzcWRreWJ0cHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1NDc5ODcsImV4cCI6MjA1NTEyMzk4N30.oAYrdTFTSW3gAMjjoD8HeMzioC-uE4cdHr7-zYDLgqY");

  const { data, error } = await supabase
    .from("user_anime_selections")
    .select();

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
      <section id="main"><pre>{error + " - " + JSON.stringify(data)}</pre></section>
    </main>
  );
}
