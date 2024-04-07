import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // Import Chart library
import { useColorModeValue } from "@chakra-ui/react";

const ProgressPieChart = ({ progress }) => {
  const chartRef = useRef(null);
  const primaryColor = useColorModeValue("blue", "blue");
  const secondaryColor = useColorModeValue("orange", "orange");
  const refusedColor = useColorModeValue("red", "red");

  useEffect(() => {
    const ctx = chartRef.current;

    // Ensure canvas and context are available
    if (ctx) {
      // Destroy the previous chart instance if it exists
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }

      // Render the new chart
      const newChartInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Completed", "Remaining", "Refused"],
          datasets: [
            {
              data: [progress, 100 - progress, 100-progress],
              backgroundColor: [primaryColor, secondaryColor, refusedColor],
              hoverBackgroundColor: [primaryColor, secondaryColor, refusedColor],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      // Store the new chart instance in the ref
      chartRef.current.chartInstance = newChartInstance;
    }
  }, [progress, primaryColor, secondaryColor, refusedColor]);

  return <canvas ref={chartRef} />;
};

export default ProgressPieChart;

