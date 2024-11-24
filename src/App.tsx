import React, { useState, useEffect, useRef } from "react";

enum GameState {
  NotStarted = "notStarted",
  Going = "going",
  Stopped = "stopped",
}

type Gif = string;

function App() {
  // State'ler
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const [message, setMessage] = useState<string>("Başlamak için tıklayın");
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const timeoutRef = useRef<number>(0);

  const [goingGifs, setGoingGifs] = useState<Gif[]>([
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHcweG8yZm93cmpuNHh1OXk2ZmgzNXhvOTJmNzdjem5jNm05eWFpdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaq6GnxDlJaBq/giphy.webp",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemprN2ppeTNyb3FjNDRqY3ExanMyYW5xOW5teTY4MGxuaG43OGpzOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zvgb12U8GNjvq/giphy.webp",
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExajJwYnZlMnh4MG5ic2lsMDhpc2Z3eTZ0aDJxYjBqbmxhdm82aTZ6YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/y8Mz1yj13s3kI/giphy.webp",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHJrd256ODVjeHVhYnN3Y3o3ZjN2OHVuOG0wYzJvaXVjNnRjaXY1cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ni4cpi0uUkd6U/200.webp",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXliaTcxazFhdXY5eHRxMjE1amdzbTNkamtzbmRwazYzMG9lMjM1biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/X05U0gOPkQ4G4/giphy.webp",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Y1ZzE0cXVieGVuMmYydWc1M3gzMXBub3Z6OWphcDkzc2UwZmNlNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tfUW8mhiFk8NlJhgEh/giphy.webp",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG5hYWRtaXNkNms5M29ndDZxZHZubnh4NjltaTFqd29xenhrZXFqeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cGtQdFzemzLihopw35/giphy.webp",
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2N6bXI4bWFqMmx2c3FkMzlseTI5MGcwYm4wbWIwYzdrYjZnbGk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Lcn0yF1RcLANG/giphy.webp",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjF1YnZxNzNsZGZjMjFnaGxpaWp5bjlsMWFuODEzeW9xdW1zaTYxZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/giVvDFs5deYrKCKpD4/giphy.webp"
  ]);

  const [currentGif, setCurrentGif] = useState<Gif | null>(null);

  useEffect(() => {
    if (gameState === GameState.Going) {
      const randomTime = Math.floor(Math.random() * 3000) + 2000;
      timeoutRef.current = setTimeout(() => {
        setGameState(GameState.Stopped);
        setMessage("Dur!");
      }, randomTime);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [gameState]);

  const handleButtonClick = (): void => {
    if (gameState === GameState.NotStarted) {
      startGame();
    } else if (gameState === GameState.Stopped) {
      setIsGameOver(true);
      setMessage("Oyun sona erdi! Yanlış zamanda hareket ettiniz.");
      setScore(0);
      setCurrentGif(
        "https://media4.giphy.com/media/AXsNB2z0a2ldS/200w.webp?cid=790b7611vdjhahwpthiozdxifspcxsqn1ydbk3hena3xdkmd&ep=v1_gifs_search&rid=200w.webp&ct=g"
      );
    } else if (gameState === GameState.Going) {
      setScore((prevScore) => prevScore + 1);
      setMessage("Hareket ettiniz!");
      const randomIndex = Math.floor(Math.random() * goingGifs.length);
      setCurrentGif(goingGifs[randomIndex]);
    }
  };

  const startGame = (): void => {
    setGameState(GameState.Going);
    setMessage("Başlat!");
    setScore(0);
    setIsGameOver(false);
    setCurrentGif(null);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-color ${gameState === GameState.Stopped
          ? "bg-red-500"
          : gameState === GameState.NotStarted
            ? "bg-indigo-500"
            : "bg-green-500"
        }`}
    >
      <p className="text-white text-2xl font-semibold mb-4">{message}</p>
      <p className="text-white text-lg font-medium mb-8">Skor: {score}</p>

      {!isGameOver ? (
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 text-lg font-bold text-green-700 bg-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          Tıklayın
        </button>
      ) : (
        <button
          onClick={startGame}
          className="px-6 py-3 text-lg font-bold text-red-700 bg-white rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-110 active:scale-95"
        >
          Tekrar Başlat
        </button>
      )}

      {currentGif && (
        <img
          src={currentGif}
          alt="Going GIF"
          className="mt-4 w-64 h-64 mb-6 rounded-lg shadow-lg absolute right-10"
        />
      )}
    </div>
  );
}

export default App;
