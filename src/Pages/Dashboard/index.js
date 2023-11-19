import { useEffect, useState } from "react";
import API from "../../api";
import { FilterModal } from "./Components/FilterModal";
import { BarChart } from "./Components/BarChart";
import { LineChart } from "./Components/LineChart";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    gender: "",
    age: "",
  });

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [dataLoding, setDataLoading] = useState(false);

  const getChartData = (filters = {}) => {
    setDataLoading(true);
    API.getAnalytics(filters)
      .then((res) => {
        setDataLoading(false);
        const { data } = res;
        setChartData(data);
      })
      .catch((err) => {
        setDataLoading(false);
        toast.error("Unable to get chart data");
        console.log("chart error: ", err);
      });
  };

  const onApplyFilter = (filters) => {
    console.log("filters applied: ", filters);
    const { startDate, endDate, gender, age } = filters;

    setFilters((prev) => ({
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      gender,
      age,
    }));

    const query = {};

    if (startDate) {
      query.startDate = new Date(startDate).getTime();
    }
    if (endDate) {
      query.endDate = new Date(endDate).getTime();
    }
    if (gender) {
      query.gender = gender;
    }
    if (age) {
      query.age = age;
    }

    setShowFilterModal(false);

    getChartData(query);
  };

  const onReset = () => {
    setFilters((prev) => ({
      ...prev,
      startDate: "",
      endDate: "",
      gender: "",
      age: "",
    }));
    setShowFilterModal(false);
    getChartData({});
  };

  const onCancel = () => {
    setShowFilterModal(false);
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <>
      <div className="dashboard__container">
        <button
          className="add-filter-btn"
          onClick={() => {
            setShowFilterModal(true);
          }}
        >
          Add Filters
        </button>
        <div className="charts__container">
          {dataLoding ? (
            <p className="">Loading...</p>
          ) : (
            <>
              <BarChart data={chartData} />
              <LineChart data={chartData} />
            </>
          )}
        </div>
      </div>

      {showFilterModal && (
        <FilterModal
          onApplyFilter={onApplyFilter}
          setShowModal={setShowFilterModal}
          filters={filters}
          onReset={onReset}
          onCancel={onCancel}
        />
      )}
    </>
  );
};
