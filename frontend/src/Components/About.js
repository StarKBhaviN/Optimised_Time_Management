import React, { useState } from "react";
import "../Styles/About.css";
import calenderImage from "../Images/Calender.png";
import ClockImage from "../Images/Clock.png";
import HourGlassImage from "../Images/Hourglass.png";
import StopwatchImage from "../Images/Stopwatch.png";

function About() {
  // Initialize state for each card
  const [isFlipped, setIsFlipped] = useState([false, false, false, false]);

  // Function to toggle flip state of a card at given index
  const handleCardClick = (index) => {
    setIsFlipped((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="aboutOuter" id="about">
      <div className="setWidth">
        <h1>Time Management Matrix</h1>

        <div className="quads">
          {/* Render each card */}
          <div className="quad" onClick={() => handleCardClick(0)}>
            <img
              style={{ height: "54px", width: "54px" }}
              className="mb-2 animImg"
              src={calenderImage}
              alt="ImgUrgent"
            />
            <p style={{ marginBottom: "0px" }}>
              Urgent and <br /> Important
            </p>
          </div>
          <div className="quad" onClick={() => handleCardClick(1)}>
            <img
              style={{ height: "54px", width: "52px" }}
              className="mb-2 animImg"
              src={ClockImage}
              alt="ImgImp"
            />
            <p style={{ marginBottom: "0px" }}>
              Not Urgent and <br /> Important
            </p>
          </div>
          <div className="quad" onClick={() => handleCardClick(2)}>
            <img
              style={{ height: "54px", width: "110px" }}
              className="mb-2 animImg"
              src={HourGlassImage}
              alt="ImgNImp"
            />
            <p style={{ marginBottom: "0px" }}>
              Urgent and <br /> Not Important
            </p>
          </div>
          <div className="quad" onClick={() => handleCardClick(3)}>
            <img
              style={{ height: "54px", width: "54px" }}
              className="mb-2 animImg"
              src={StopwatchImage}
              alt="NimpNurg"
            />
            <p style={{ marginBottom: "0px" }}>
              Not Urgent and <br /> Not Important
            </p>
          </div>
        </div>
      </div>

      <div className="explanation setWidth">
        <h2>What is the Time Management Matrix?</h2>

        <div className="w-75 mt-2">
          <p className="text-start">
            A time management matrix is a powerful tool for categorizing tasks
            based on their urgency and importance. It helps individuals and
            businesses to prioritize their activities effectively in order to
            maximize productivity and facilitate goal achievement. The matrix
            divides tasks into four quadrants based on importance and urgency.
            <br />
          </p>
        </div>

        <h2>Flip Me!!!</h2>
        
        <div className="all-cards">
          {/* Render each card with individual flipped state */}
          <div
            className={`card-outer ${
              isFlipped[0] ? "is-flipped" : "is-not-flipped"
            }`}
            onClick={() => handleCardClick(0)}
          >
            <div className="front">
              <h3>Quadrant 1:</h3>
              <h6>
                Urgent & Important: <br /> (Do First)
              </h6>
              
            </div>
            <div className="back">
              <h3>Quadrant 1:</h3>
              <h6>
                Urgent & Important: <br /> (Do First)
              </h6>
              <br />
              <p>
                These are tasks that demand immediate attention and are crucial
                for achieving your goals / dealing with pressing issues. Examples include deadlines,
                emergencies and important meetings.
              </p>
            </div>
          </div>
          <div
            className={`card-outer ${isFlipped[1] ? "is-flipped" : ""}`}
            onClick={() => handleCardClick(1)}
          >
            <div className="front">
              <h3>Quadrant 2: </h3>
              <h6>
                Not Urgent, Important <br /> (Schedule)
              </h6>
            </div>
            <div className="back">
              <h3>Quadrant 2: </h3>
              <h6>
                Not Urgent, Important <br /> (Schedule)
              </h6>
              <br />
              <p>
                These tasks are important for long-term goals and personal
                growth but don't require immediate attention. They are proactive
                activities that prevent crises and contribute to personal and
                professional development.
              </p>
            </div>
          </div>
          <div
            className={`card-outer ${isFlipped[2] ? "is-flipped" : ""}`}
            onClick={() => handleCardClick(2)}
          >
            <div className="front">
              <h3>Quadrant 3:</h3>
              <h6>
                Urgent, Not Important <br /> (Delegate){" "}
              </h6>
            </div>
            <div className="back">
              <h3>Quadrant 3:</h3>
              <h6>
                Urgent, Not Important <br /> (Delegate){" "}
              </h6>
              <br />
              <p>
                These tasks seem urgent but don't contribute significantly to
                your long-term goals or priorities. They often involve
                interruptions, distractions, or unnecessary activities that can
                be delegated or minimized.
              </p>
            </div>
          </div>
          <div
            className={`card-outer ${isFlipped[3] ? "is-flipped" : ""}`}
            onClick={() => handleCardClick(3)}
          >
            <div className="front">
              <h3>Quadrant 4:</h3>
              <h6>
                Not Urgent / Important <br /> (Eliminate)
              </h6>
            </div>
            <div className="back">
              <h3>Quadrant 4:</h3>
              <h6>
                Not Urgent / Important <br /> (Eliminate)
              </h6>
              <br />
              <p>
                These tasks are neither urgent nor important and often serve as
                distractions. They consume time without contributing to personal
                or professional goals. It's best to eliminate or minimize these
                activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
