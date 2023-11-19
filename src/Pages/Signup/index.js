import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/auth_background.jpeg";
import { useState } from "react";
import API from "../../api";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const formOnChange = (value, field) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value.trim(),
    }));
    if (field === "email") {
      if (!value.trim()) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: `Email is required`,
        }));
      } else if (!validateEmail(value)) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: `Invalid Email`,
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    } else {
      if (!value.trim()) {
        setFormErrors((prev) => ({
          ...prev,
          [field]: `${field} is required`,
        }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
    }
  };

  const validateForm = () => {
    let isError = false;
    const { firstName, lastName, email, password } = formValues;
    if (!firstName) {
      isError = true;
      setFormErrors((prev) => ({
        ...prev,
        firstName: `firstName is required`,
      }));
    }
    if (!lastName) {
      isError = true;
      setFormErrors((prev) => ({
        ...prev,
        lastName: `lastName is required`,
      }));
    }
    if (!email) {
      isError = true;
      setFormErrors((prev) => ({
        ...prev,
        email: `email is required`,
      }));
    } else if (!validateEmail(email)) {
      setFormErrors((prev) => ({
        ...prev,
        email: `Invalid email`,
      }));
    }

    if (!password) {
      isError = true;
      setFormErrors((prev) => ({
        ...prev,
        password: `password is required`,
      }));
    }

    return isError;
  };

  const RegisterUser = (formValues) => {
    if (!validateForm()) {
      setLoading(true);
      API.signupUser({
        ...formValues,
      })
        .then((res) => {
          setLoading(false);
          toast.success("User registered successfully");
          navigate("/login");
        })
        .catch((err) => {
          setLoading(false);
          console.log("err: ", err);
          toast.error("Error in registering User");
        });
    }
  };

  return (
    <div className="login-page__container">
      <div className="blur-background"></div>
      <div className="login-form-overlay__container">
        {/* contains the right preview image  */}
        <div className="login-form-verlay-left__container">
          <img src={heroImage} />
        </div>

        {/* contains the acual form  */}
        <div className="login-form-verlay-right__container">
          <h1 className="heading">Welcome to Analytico</h1>
          <div className="form__container">
            <div className="input_group">
              <label className="input-label">First Name</label>
              <input
                className="input-box"
                onChange={(evt) => formOnChange(evt.target.value, "firstName")}
                value={formValues["firstName"]}
              />
              {formErrors["firstName"] && (
                <p className="error-text">{formErrors["firstName"]}</p>
              )}
            </div>
            <div className="input_group">
              <label className="input-label">Last Name</label>
              <input
                className="input-box"
                onChange={(evt) => formOnChange(evt.target.value, "lastName")}
                value={formValues["lastName"]}
              />
              {formErrors["lastName"] && (
                <p className="error-text">{formErrors["lastName"]}</p>
              )}
            </div>
            <div className="input_group">
              <label className="input-label">Email</label>
              <input
                className="input-box"
                onChange={(evt) => formOnChange(evt.target.value, "email")}
                value={formValues["email"]}
              />
              {formErrors["email"] && (
                <p className="error-text">{formErrors["email"]}</p>
              )}
            </div>

            <div className="input_group">
              <label className="input-label">Password</label>
              <input
                className="input-box password"
                type="password"
                onChange={(evt) => formOnChange(evt.target.value, "password")}
                value={formValues["password"]}
              />
              {formErrors["password"] && (
                <p className="error-text">{formErrors["password"]}</p>
              )}
            </div>
            <div
              className="primary-btn"
              onClick={() => {
                if (!loading) {
                  RegisterUser(formValues);
                }
              }}
            >
              {loading ? "Please wait..." : "Register"}
            </div>
            <p>
              Already have an account ?{" "}
              <span
                className="primary-link"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
