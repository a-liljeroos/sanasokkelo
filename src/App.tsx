import { useState } from "react";
import "./App.scss";
import { generateMaze, getRandomWords } from "./utilities";
import { BsPlusCircle } from "react-icons/bs";
import { SlMinus } from "react-icons/sl";
import { TbRefresh } from "react-icons/tb";
import html2canvas from "html2canvas";
import bgImage from "./bg1.jpg";

interface Imaze {
  size: number[];
  wordAmount: number;
  maze: string[];
}

function App() {
  const [maze, setMaze] = useState<Imaze>({
    size: [20, 20],
    wordAmount: 10,
    maze: getRandomWords(10),
  });

  const saveImage = () => {
    html2canvas(document.querySelector(".word-canvas")!).then((canvas) => {
      const content = document.querySelector(".content")!;
      // content.appendChild(canvas);
      /* canvas.toBlob(function (blob) {
          window.saveAs(blob, "my_image.jpg");
        }); */
    });
  };

  return (
    <div className="App">
      <img className="bg-image" src={bgImage} alt="background" />
      <div className="content">
        <div className="title-wrapper">
          <h1>Sanasokkelo</h1>
          <h1>generaattori</h1>
        </div>

        <div className="settings">
          <div className="size-settings">
            <h3 className="word-settings-title">Asetukset</h3>
            <label htmlFor="">
              Leveys
              <input
                className="size-input"
                type="number"
                defaultValue={maze.size[0]}
                onChange={(e) => {
                  let size = [Number(e.target.value), maze.size[1]];
                  setMaze({ ...maze, size: size });
                }}
              />
              , korkeus
              <input
                className="size-input"
                type="number"
                defaultValue={maze.size[1]}
                onChange={(e) => {
                  let size = [maze.size[0], Number(e.target.value)];
                  setMaze({ ...maze, size: size });
                }}
              />
              kirjainta.
            </label>
            <label htmlFor="">
              Sanoja
              <input
                className="wordAmount-input"
                type="number"
                defaultValue={maze.wordAmount}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1) {
                    setMaze({ ...maze, wordAmount: value });
                  } else {
                    setMaze({ ...maze, wordAmount: 1 });
                  }
                  if (value <= 20) {
                    setMaze({ ...maze, wordAmount: value });
                  } else {
                    setMaze({ ...maze, wordAmount: 20 });
                  }
                }}
              />
              (max 20)
            </label>

            <h3 className="word-settings-title">Sanat</h3>
            <div className="words">
              {Array(maze.wordAmount)
                .fill(0)
                .map((element, index) => {
                  return (
                    <div className="word-input-cont">
                      <label className="word-input-label" htmlFor="">
                        {index + 1}.
                      </label>
                      <input
                        className="word-input"
                        type="text"
                        defaultValue={maze.maze[index]}
                        onChange={(e) => {
                          let newArray = [...maze.maze];
                          newArray[index] = e.target.value;
                          setMaze({ ...maze, maze: newArray });
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="button-group">
            <div
              role="button"
              className="add-word-btn"
              onClick={() => {
                if (maze.wordAmount < 20) {
                  setMaze({ ...maze, wordAmount: maze.wordAmount + 1 });
                }
              }}
            >
              <BsPlusCircle size={30} color="rgb(48, 48, 48)" />
            </div>
            <div
              role="button"
              className="add-word-btn"
              onClick={() => {
                if (maze.wordAmount > 1) {
                  setMaze({ ...maze, wordAmount: maze.wordAmount - 1 });
                }
              }}
            >
              <SlMinus size={30} color="rgb(48, 48, 48)" />
            </div>
          </div>
        </div>
        <button
          className="generate-button"
          onClick={() => {
            setMaze({ ...maze });
          }}
        >
          <TbRefresh color="rgb(48, 48, 48)" size={50} />
        </button>
        <div className="word-canvas-container">
          {/*          <button onClick={() => saveImage()} id="save-btn">
            Tallenna
          </button> */}
          <div className="canvas-cable" />
          <div className="word-canvas">
            {generateMaze(maze.maze, maze.size).map((line) => {
              return (
                <p className="word-line">
                  {line.split("").map((letter) => {
                    return <div className="letter">{letter}</div>;
                  })}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
