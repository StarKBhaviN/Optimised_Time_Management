import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Navbar({ a_token, auth_token_id }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (a_token) {
          const response = await axios.get(
            "http://127.0.0.1:5000/api/user/info",
            {
              headers: {
                Authorization: `Bearer ${auth_token_id}`,
              },
            }
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [a_token, auth_token_id]);

  const btnSignClicked = () => {
    if (a_token) {
      localStorage.removeItem("OTM_Token");
      toast.warn("Logged out Successfully...", {
        position: "bottom-left",
      });
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  
  return (
    <>
      <div className="navDiv">
        <nav className="navStyle">
          <i
            className="fa-solid fa-arrow-right"
            style={{ marginLeft: "25px" }}
          ></i>
          <a
            className="clsHome cmnLink ms-3 animApply animNavText"
            href="#home"
          >
            Home
          </a>
          <a
            className="clsAbout cmnLink ms-3 animApply animNavText"
            href="#about"
          >
            About
          </a>
          <div className="btnSetNav" style={{ border: "0px solid red" }}>
            <div className="setBtnNav cmnBtn btnSignIn me-4">
              <button
                className="clsSignIn innerLink animApply animNavText"
                onClick={btnSignClicked}
              >
                {a_token ? userData?.Name || "Loading..." : "Sign In"}
                {<FontAwesomeIcon icon={faArrowRightFromBracket} style={{marginLeft : "6px"}}/>}
              </button>
            </div>
            <div className="setBtnNav cmnBtn btnJoinUs">
              <a
                className="clsJoinUs innerLink animApply animNavText"
                href="#addTask"
              >
                Add Task
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
