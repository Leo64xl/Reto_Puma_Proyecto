import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/GraphicsAd.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export const GraphicsAd = () => {
  const [categoryData, setCategoryData] = useState({});
  const [tallaData, setTallaData] = useState({});
  const [teamData, setTeamData] = useState({});
  const [originData, setOriginData] = useState({});

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/form-stats/category"
        );
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de categorías:", error);
      }
    };

    const fetchTallaData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/form-stats/talla"
        );
        setTallaData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de tallas:", error);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/form-stats/team"
        );
        setTeamData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de equipos:", error);
      }
    };

    const fetchOriginData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/form-stats/origin"
        );
        setOriginData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de origen:", error);
      }
    };

    fetchCategoryData();
    fetchTallaData();
    fetchTeamData();
    fetchOriginData();
  }, []);

  const generateBarChartData = (data, label) => ({
    labels: Object.keys(data),
    datasets: [
      {
        label: label,
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const generatePieChartData = (data, label) => {
    const total = Object.values(data).reduce((sum, value) => sum + value, 0);
    const percentageData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        ((value / total) * 100).toFixed(2),
      ])
    );

    return {
      labels: Object.keys(percentageData),
      datasets: [
        {
          label: label,
          data: Object.values(percentageData),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="graphics-ad-container">
      <h1 className="title mt-1" style={{ color: "#e3b04b" }}>
       Estadisticas
      </h1>
      <h2 className="subtitle mt-1" style={{ color: "#ffffff" }}>
        Graficacion de Datos
      </h2>

      <div className="chart-container">
        <div className="chart-wrapper">
          <h2>Categorias Seleccionadas</h2>
          <Bar data={generateBarChartData(categoryData, "Personas")} />
        </div>

        <div className="chart-wrapper">
          <h2>Tallas Solicitadas</h2>
          <Bar data={generateBarChartData(tallaData, "Numero de Personas que eligieron la talla")} />
        </div>

        <div className="chart-wrapper">
          <h2>Equipos Ingresados</h2>
          <Bar data={generateBarChartData(teamData, "Numero de Personas en el Equipo")} />
        </div>

        <div className="chart-wrapper">
          <h2>Lugar de Procedencia</h2>
          <div className="pie-chart-container">
            <Pie
              data={generatePieChartData(originData, "Porcentaje de Personas")}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                  datalabels: {
                    color: "#ffffff",
                    anchor: "end",
                    align: "end",
                    formatter: (value, context) => {
                      const total = context.chart.data.datasets[0].data.reduce(
                        (sum, val) => sum + val,
                        0
                      );
                      const percentage = total
                        ? ((value / total) * 100).toFixed(2)
                        : 0;
                      return `${percentage}%`;
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};