import { useEffect, useState, memo } from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = memo(({ data: chartData }) => {
  const [barchartData, setBarChartData] = useState(null);

  const options = {
    indexAxis: "y",
    scales: {
      y: {
        title: {
          display: true,
          text: "Product",
        },
      },
      x: {
        title: {
          display: true,
          text: "Users",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  useEffect(() => {
    const yLabels = chartData.length ? Object.keys(chartData[0].products) : [];
    const femaleUsers = chartData
      ?.filter((data) => data.gender === "FEMALE")
      .reduce((acc, curr) => {
        const productTotal = Object.entries(curr.products).reduce(
          (_acc, [product, value]) => ({
            ..._acc,
            [product]: acc[product] ? acc[product] + value : value,
          }),
          acc
        );

        return { ...acc, ...productTotal };
      }, {});

    const maleUsers = chartData
      ?.filter((data) => data.gender === "MALE")
      .reduce((acc, curr) => {
        const productTotal = Object.entries(curr.products).reduce(
          (_acc, [product, value]) => ({
            ..._acc,
            [product]: acc[product] ? acc[product] + value : value,
          }),
          acc
        );

        return { ...acc, ...productTotal };
      }, {});

    setBarChartData({
      labels: yLabels,
      datasets: [
        {
          label: "Male",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: Object.values(maleUsers),
        },
        {
          label: "Female",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: Object.values(femaleUsers),
        },
      ],
    });
  }, [chartData]);

  return (
    <>
      {barchartData && (
        <Bar
          data={barchartData}
          options={options}
          className="chart-container"
        />
      )}
    </>
  );
});
