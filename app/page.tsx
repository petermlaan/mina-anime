import React from "react";
import { createClient } from '@supabase/supabase-js'

export default async function Page() {
  const supabase = createClient(
    process.env.SUPABASE_URL ?? "",
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");

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
