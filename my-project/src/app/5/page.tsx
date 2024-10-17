"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [altura, setAltura] = useState(null);
  const [radio, setRadio] = useState(null);
  const [error, setError] = useState(null);

  const calcular = async () => {
    try {
      const data = {
        predictions: [
          {
            points: [
              { x: 1, y: 2 },
              { x: 3, y: 4 },
              // ... más puntos
            ],
          },
        ],
      };

      const response = await axios.post(
        "http://127.0.0.1:5000/api/calculate",
        data
      );
      setAltura(response.data.altura);
      setRadio(response.data.radio);
    } catch (err) {
      console.error("Error al calcular:", err);
    }
  };

  return (
    <div>
      <h1>Calculadora de Espárragos</h1>
      <button onClick={calcular}>Calcular</button>
      {altura && <p>Altura: {altura}</p>}
      {radio && <p>Radio: {radio}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
