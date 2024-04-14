import React, { useState, useEffect } from "react";
import axios from "axios";

const Scheduler = () => {
  const auth_token_id = localStorage.getItem("OTM_Token");
  const [schedule, setSchedule] = useState([]);

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

  const getTimeString = (hours, minutes) => {
    const pad = (num) => (num < 10 ? "0" + num : num);
    return pad(hours) + ":" + pad(minutes);
  };

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

      // Add tasks to the schedule
      tasks.forEach((task) => {
        const startTime = new Date(date);
        startTime.setHours(9 + daySchedule.slots.length - 4); // Increment time for each task
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

  return (
    <div>
      <h1>Schedule for Next 5 Days</h1>
      {schedule.map((day, index) => (
        <div key={index}>
          <h2>{day.date}</h2>
          <ul>
            {day.slots.map((slot, slotIndex) => (
              <li key={slotIndex}>
                {slot.time} - {slot.task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Scheduler;
