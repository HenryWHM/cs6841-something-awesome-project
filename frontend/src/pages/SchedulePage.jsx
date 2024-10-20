import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';
import '../styles/SchedulePage.css';  // Adjust the path accordingly

const SchedulePage = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  // State for managing the new schedule input and the list of schedules
  const [newTask, setNewTask] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');
  const [scheduleList, setScheduleList] = useState([]);

  // Add new task to the schedule list
  const handleAddTask = () => {
    if (newTask && newTime) {
      const newSchedule = { task: newTask, course: newCourse, date: newDate, time: newTime };
      setScheduleList([...scheduleList, newSchedule]);
      setNewTask('');  // Clear input fields after adding
      setNewCourse('');
      setNewDate('');
      setNewTime('');
    }
  };

  // Remove task from the schedule list
  const handleRemoveTask = (index) => {
    const updatedSchedule = scheduleList.filter((_, i) => i !== index);
    setScheduleList(updatedSchedule);
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start py-10 ${getters.userData.mode === 'dark' ? 'bg-darkBackground text-lightText' : 'bg-lightBackground text-darkText'}`}>
      {/* Page Title */}
      <h1 className="text-5xl font-extrabold mb-8">Your Schedule</h1>

      {/* Input for Task, Date and Time */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
        <div className="flex flex-col gap-4 mb-4">
          <input
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4 w-full bg-white text-black dark:bg-gray-900 dark:text-white w-full"
            type="text"
            placeholder="Task Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4 w-full bg-white text-black dark:bg-gray-900 dark:text-white w-full"
            type="text"
            placeholder="Course Title"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
          />
          <input
            className="w-full sm:w-48 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white w-full"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
          <input
            className="w-full sm:w-48 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-black dark:text-white w-full"
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:bg-darkAccent dark:hover:bg-gray-700 transition"
            onClick={handleAddTask}
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Display the Schedule List */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Today's Schedule</h2>
        {scheduleList.length === 0 ? (
          <p className="text-gray-500">No tasks scheduled yet. Start adding tasks!</p>
        ) : (
          <ul className="space-y-4">
            {scheduleList.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div>
                  <p className="font-semibold text-lg">{item.task}</p>
                  <p className="font-semibold text-lg">{item.course}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                  onClick={() => handleRemoveTask(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Navigate Back to Home Page */}
      <button
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition dark:bg-darkAccent dark:hover:bg-gray-700"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default SchedulePage;
