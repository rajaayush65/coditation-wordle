import { useEffect, useState } from "react";
import words from "../src/data/sgb-words.txt";
import Wordle from "./components/Wordle";

function App() {
  const [data, setData] = useState([]);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTextFile = async () => {
      await fetch(words)
        .then((res) => res.text())
        .then((result) => {
          console.log(result.split("\r\n"))
          setData(result.split("\r\n"));
          setLoading(false);
          return;
        });
    };
    fetchTextFile();
  }, []);

  useEffect(() => {
    const randomSolution = Math.floor(Math.random() * data.length);
    setSolution(data[randomSolution]);
  }, [loading]);
  console.log(solution);

  return (
    <div>
      {loading === false ? (
        <>
          <h1>Wordle</h1>
          {solution && <Wordle solution={solution} />}
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
}

export default App;
