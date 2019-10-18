import React, { useEffect } from "react";
import styles from "./App.module.scss";
import Page from "./Page";
import { useAppState, CallbackContext } from "../state";
import axios from "axios";

function App() {
  const [state, callbacks] = useAppState();

  useEffect(() => {
    axios("./data/example.md").then(result => callbacks.addPage(result.data));
  }, [callbacks]);

  return (
    <CallbackContext.Provider value={callbacks}>
      <div className={styles.App}>
        {state.pages.map((page, i) => (
          <div key={i}>
            <h2>page {i + 1}</h2>
            <Page {...page} />
          </div>
        ))}
      </div>
    </CallbackContext.Provider>
  );
}

export default App;
