import { useEffect, useState, memo } from "react";
import { Line } from "react-chartjs-2";

export const LineChart = memo(({ data: chartData }) => {
  const [linechartData, setLineChartData] = useState(null);

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Users",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: true,
          autoSkipPadding: 10,
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
    const Months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "June",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
    const femaleUsers = chartData
      ?.filter((data) => data.gender === "FEMALE")
      .reduce((acc, curr) => {
        const productsTotal = Object.values(curr.products).reduce(
          (acc, curr) => acc + curr,
          0
        );
        const dataDate = new Date(curr.day);
        const dateString = `${dataDate.getDate()} ${
          Months[dataDate.getMonth()]
        } ${dataDate.getFullYear()}`;

        return {
          ...acc,
          [dateString]: acc[dateString]
            ? acc[dateString] + productsTotal
            : productsTotal,
        };
      }, {});

    const maleUsers = chartData
      ?.filter((data) => data.gender === "MALE")
      .reduce((acc, curr) => {
        const productsTotal = Object.values(curr.products).reduce(
          (acc, curr) => acc + curr,
          0
        );
        const dataDate = new Date(curr.day);
        const dateString = `${dataDate.getDate()} ${
          Months[dataDate.getMonth()]
        } ${dataDate.getFullYear()}`;

        return {
          ...acc,
          [dateString]: acc[dateString]
            ? acc[dateString] + productsTotal
            : productsTotal,
        };
      }, {});

    const datesSet = new Set([
      ...Object.keys(femaleUsers),
      ...Object.keys(maleUsers),
    ]);

    setLineChartData({
      labels: [...datesSet],
      datasets: [
        {
          label: "Male",
          fill: false,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: Object.values(maleUsers),
        },
        {
          label: "Female",
          fill: false,
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
      {linechartData && (
        <Line
          data={linechartData}
          options={options}
          className="chart-container"
        />
      )}
    </>
  );
});
