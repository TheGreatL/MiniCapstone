import { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import PropTypes from "prop-types";
Chart.register(...registerables);

export default function PieChart({ data, options }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,

      options: options,
    });

    return () => {
      myPieChart.destroy(); // Cleanup on unmount
    };
  }, [data, options]);

  return <canvas ref={chartRef} style={{ width: "200px", height: "500px" }} />;
}
PieChart.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
};
