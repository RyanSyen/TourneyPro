import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
// import { logInWithEmailAndPassword } from "./firebase/firebase";

function App() {
  const [count, setCount] = useState(0);
  console.log(import.meta.env.VITE_SOME_KEY);
  console.log(import.meta.env);
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
      // onClick={() =>
      //   // logInWithEmailAndPassword("yisyen123@gmail.com", "yisyen123")
      // }
      >
        Login
      </button>
    </>
  );
}

export default App;
