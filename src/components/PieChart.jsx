import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie data={data} options={{ animation: { animateRotate: true } }} />
    </div>
  );
};

export default PieChart;
