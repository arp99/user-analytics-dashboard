import { useEffect, useState } from "react";
import API from "../../api";
import { FilterModal } from "./Components/FilterModal";
import { BarChart } from "./Components/BarChart";
import { LineChart } from "./Components/LineChart";
import { toast } from "react-toastify";
import {
  copyToClipboard,
  deleteCookie,
  formQueryString,
  getCookie,
  searchStringToObject,
  setCookie,
} from "../../utils";
import { CopySimple, Check } from "phosphor-react";
import { useNavigate } from "react-router-dom";

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
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

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

    setCookie("filters", JSON.stringify(query));

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
    deleteCookie("filters");
  };

  const onCancel = () => {
    setShowFilterModal(false);
  };

  const copyMagicUrl = (filters) => {
    const queryString = formQueryString(filters);
    let url = `${window.location.origin}${window.location.pathname}`;
    if (queryString) {
      url = `${window.location.origin}${
        window.location.pathname
      }?${formQueryString(filters)}`;
    }
    if (copyToClipboard(url)) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  useEffect(() => {
    const urlFilters = searchStringToObject(window.location.search);

    if (urlFilters && Object.keys(urlFilters).length) {
      setCookie("filters", JSON.stringify(urlFilters));
      setFilters(urlFilters);
      getChartData(urlFilters);
      navigate("/", {
        replace: true,
      });
    } else {
      const savedFilters = getCookie("filters");
      if (savedFilters) {
        const filters = JSON.parse(savedFilters);
        setFilters(filters);
        getChartData(filters);
      } else {
        getChartData();
      }
    }
  }, []);

  return (
    <>
      <div className="dashboard__container">
        <div className="d-flex">
          <button
            className="add-filter-btn"
            onClick={() => {
              setShowFilterModal(true);
            }}
          >
            Add Filters
          </button>
          <div className="copy-url-btn  d-flex align-items-center">
            Copy Magic URL
            <div
              onClick={() => {
                copyMagicUrl(filters);
              }}
            >
              {" "}
              {copied ? <Check /> : <CopySimple />}
            </div>
          </div>
        </div>
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

        <div className="logout-btn" onClick={() => {
          onLogout()
        }}>Logout</div>
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
