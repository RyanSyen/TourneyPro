import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "./lib/firebase/firebase";
import { abortController } from "./lib/axios/axios";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handleOnTabClose = (e) => {
      e.preventDefault();
      // Chrome will only show dialog if user has interacted with the page
      return (e.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleOnTabClose, {
      capture: true,
    });

    return () => {
      // cleanup event listener to prevent memory leak
      window.removeEventListener("beforeunload", handleOnTabClose);
      // cancel all exisiting http requests
      abortController.abort();
    };
  }, []);
  // console.log(import.meta.env);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button
        onClick={() =>
          logInWithEmailAndPassword("yisyen123@gmail.com", "Yisyen@123")
        }
      >
        Login
      </button>
      <button
        onClick={() =>
          registerWithEmailAndPassword({
            email: "yisyen123+test1@gmail.com",
            password: "Yisyen@123",
          })
        }
      >
        Register
      </button>
    </>
  );
}

export default App;
