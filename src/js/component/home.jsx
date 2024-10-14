import React, { useEffect, useState } from "react";

function Home({ seconds }) {
  return (
    <div className="card text-center">
      <div className="card-header">
        <i className="fas fa-clock fa-2x"></i>
      </div>
      <div className="card-body">
        <h5 className="card-title">Contador de Segundos</h5>
        <div className="bigCounter">
          <span className="digit">{Math.floor(seconds / 100000) % 10}</span>
          <span className="digit">{Math.floor(seconds / 10000) % 10}</span>
          <span className="digit">{Math.floor(seconds / 1000) % 10}</span>
          <span className="digit">{Math.floor(seconds / 100) % 10}</span>
          <span className="digit">{Math.floor(seconds / 10) % 10}</span>
          <span className="digit">{Math.floor(seconds) % 10}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdownValue, setCountdownValue] = useState(null);
  const [alertValue, setAlertValue] = useState(null); // Para la alerta

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          // Alertar si se alcanza el tiempo específico
          if (alertValue !== null && prevSeconds + 1 === alertValue) {
            alert(`¡Has alcanzado ${alertValue} segundos!`);
          }
          return prevSeconds + 1; // Contador hacia adelante
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, alertValue]);

  const handleReset = () => {
    setSeconds(0);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleCountdownChange = (e) => {
    setCountdownValue(e.target.value ? parseInt(e.target.value) : null);
    setSeconds(e.target.value ? parseInt(e.target.value) : 0); // Establecer el tiempo en segundos
    setIsRunning(false); // Detener el contador al ingresar el valor
  };

  const handleAlertChange = (e) => {
    setAlertValue(e.target.value ? parseInt(e.target.value) : null); // Establecer el tiempo de alerta
  };

  return (
    <div className="container text-center mt-5">
      <Home seconds={seconds} />
      <div className="mt-3">
        <button className="btn btn-primary me-2" onClick={handleReset}>
          Reiniciar
        </button>
        <button className="btn btn-secondary" onClick={handleStartStop}>
          {isRunning ? "Detener" : "Iniciar"}
        </button>
      </div>
      <div className="mt-3">
        <input
          type="number"
          className="form-control"
          placeholder="Establecer cuenta regresiva"
          onChange={handleCountdownChange}
        />
      </div>
      <div className="mt-3">
        <input
          type="number"
          className="form-control"
          placeholder="Establecer alerta"
          onChange={handleAlertChange}
        />
      </div>
    </div>
  );
}

export default App;



