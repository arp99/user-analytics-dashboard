import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FilterModal = ({
  setShowModal,
  onApplyFilter,
  onReset,
  filters,
  onCancel,
}) => {
  const { startDate, endDate, ..._filters } = filters;

  const [localFilters, setLocalFilters] = useState({
    startDate: startDate ?  new Date(startDate) : "",
    endDate: endDate ? new Date(endDate) : "",
    ..._filters,
  });

  console.log("localfilters: ", localFilters)

  const onChange = (dates) => {
    const [start, end] = dates;
    setLocalFilters((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));
  };

  return (
    <div
      className="filter-modal__overlay"
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div
        className="filter-modal__container"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <div className="filter_contents">
          <div className="filter-date">
            <label> Chose Date Range</label>
            <DatePicker
            dateFormat={"dd-MM-yyyy"}
              selected={localFilters?.startDate}
              selectsRange
              startDate={localFilters?.startDate}
              endDate={localFilters?.endDate}
              onChange={onChange}
            />
          </div>
          <div className="filter-age">
            <div className="title"> Chose Age : </div>
            <div className="d-flex">
              <input
                name="15-25"
                type="radio"
                checked={localFilters?.age === "15-25" ? true : false}
                onChange={() => {
                  setLocalFilters((prev) => ({
                    ...prev,
                    age: "15-25",
                  }));
                }}
              />
              <label for="15-25">15-25</label>
            </div>
            <div className="d-flex">
              <input
                name=">25"
                type="radio"
                checked={localFilters?.age === ">25" ? true : false}
                onChange={() => {
                  setLocalFilters((prev) => ({
                    ...prev,
                    age: ">25",
                  }));
                }}
              />
              <label for=">25">{">25"}</label>
            </div>
          </div>
          <div className="filter-gender">
            <div className="title"> Chose Gender : </div>
            <div className="d-flex">
              <input
                name="MALE"
                type="radio"
                checked={localFilters?.gender === "MALE" ? true : false}
                onChange={() => {
                  setLocalFilters((prev) => ({
                    ...prev,
                    gender: "MALE",
                  }));
                }}
              />
              <label for="MALE">Male</label>
            </div>
            <div className="d-flex">
              <input
                name="FEMALE"
                type="radio"
                checked={localFilters?.gender === "FEMALE" ? true : false}
                onChange={() => {
                  setLocalFilters((prev) => ({
                    ...prev,
                    gender: "FEMALE",
                  }));
                }}
              />
              <label for="FEMALE">{"Female"}</label>
            </div>
          </div>
          <div className="action-btns__container">
            <div className="reset-btn" onClick={onReset}>
              Reset all
            </div>
            <div className="reset-btn" onClick={onCancel}>
              Cancel
            </div>
            <div
              className="apply-btn"
              onClick={() => onApplyFilter(localFilters)}
            >
              Apply
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
