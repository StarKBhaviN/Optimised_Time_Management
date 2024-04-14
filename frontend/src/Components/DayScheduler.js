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

    // Add wake up time
    daySchedule.slots.push({
      time: "08:00",
      task: "Wake up",
    });

    // Add lunch time
    daySchedule.slots.push({
      time: "12:00",
      task: "Lunch",
    });

    // Add dinner time
    daySchedule.slots.push({
      time: "18:00",
      task: "Dinner",
    });

    // Add sleep time
    daySchedule.slots.push({
      time: "22:00",
      task: "Sleep",
    });

    // Sort tasks by priority (importance and urgency)
    tasks.sort((a, b) => {
      if (a.importance !== b.importance) {
        return b.importance - a.importance;
      }
      return b.urgency - a.urgency;
    });

    let currentTime = new Date(date);
    currentTime.setHours(8, 0); // Start from 8:00 AM

    tasks.forEach((task) => {
      if (task.duration > 0) {
        const taskStartTime = new Date(currentTime);
        daySchedule.slots.push({
          time: getTimeString(taskStartTime.getHours(), taskStartTime.getMinutes()),
          task: task.title,
        });
        currentTime.setMinutes(currentTime.getMinutes() + task.duration * 60);
      }
    });

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
