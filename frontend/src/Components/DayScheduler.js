import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/DayScheduler.css";

const Scheduler = () => {
  const auth_token_id = localStorage.getItem("OTM_Token");
  const [schedule, setSchedule] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Display one day per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/tasks/get_all_tasks",
          {
            headers: {
              Authorization: `Bearer ${auth_token_id}`,
            },
          }
        );

        const tasks = response.data;
        const generatedSchedule = generateSchedule(tasks);
        setSchedule(generatedSchedule);
      } catch (error) {
        console.error("Error fetching tasks:", error.response.data.error);
      }
    };

    fetchData();
  }, [auth_token_id]);

  const generateSchedule = (tasks) => {
    const now = new Date();
    const schedule = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() + i);

      const daySchedule = {
        date: date.toDateString(),
        slots: [],
      };

      // Add fixed schedule events
      daySchedule.slots.push({ time: "08:00", task: "Wake up" });
      daySchedule.slots.push({ time: "12:00", task: "Lunch" });
      daySchedule.slots.push({ time: "18:00", task: "Dinner" });
      daySchedule.slots.push({ time: "22:00", task: "Sleep" });


      const shuffledTasks = shuffleArray(tasks);

      shuffledTasks.forEach((task, index) => {
        const startTime = new Date(date);
        startTime.setHours(9 + index);
        daySchedule.slots.push({
          time: getTimeString(startTime.getHours(), startTime.getMinutes()),
          task: task.Title,
        });
      });

      // Sort tasks within the day's schedule by time
      daySchedule.slots.sort((a, b) => a.time.localeCompare(b.time));

      schedule.push(daySchedule);
    }

    return schedule;
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getTimeString = (hours, minutes) => {
    const pad = (num) => (num < 10 ? "0" + num : num);
    return pad(hours) + ":" + pad(minutes);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = schedule.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Schedule for Next 5 Days</h1>
      {currentItems.map((day, index) => (
        <div key={index}>
          <h2>{day.date}</h2>
          <div className="schTable">
            <table id="scheduleTable">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {day.slots.map((slot, slotIndex) => (
                  <tr key={slotIndex}>
                    <td>{slot.time}</td>
                    <td>{slot.task}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div className="pagination" style={{border : "0px solid red", display : "flex", alignItems : "center", justifyContent : "space-evenly", width : "80%", marginLeft : "10%", marginTop : "10px"}}>
        {schedule.map((day, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : "" }
            id="myBtn"
          >
            {day.date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
