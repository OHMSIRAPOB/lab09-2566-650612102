"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Task } from "@/components/Task";
import { TaskInput } from "@/components/TaskInput";
import { nanoid } from "nanoid";
import { useState } from "react";

export default function Home() {
  //tasks = array of {id: string, title: string, completed: boolean}
  const [tasks, setTasks] = useState([]);
  const [c1, setC1] = useState(0);
  const [c2, setC2] = useState(0);

  const addTask = (newTaskTitle) => {
    const newTask = { id: nanoid(), title: newTaskTitle, completed: false };
    const newTasks = [...tasks, newTask];
    setC1(c1+1);
    setTasks(newTasks);
  };

    const deleteTask = (taskId) => {
      const taskToDelete = tasks.find((task) => task.id === taskId);
      if (taskToDelete && taskToDelete.completed) {
       setC2(Math.max(c2 -1,0));
      }
     
     const newTask = tasks.filter((task) => task.id !== taskId);
     setC1(c1-1);
     setTasks(newTask);
  };

    
    

  const toggleDoneTask = (taskId) => {
    //structuredClone will copy an array or an object "deeply"
    //So objects within an object will be copied too
    const newTasks = structuredClone(tasks);
    //search for a task based on condition
    const task = newTasks.find((x) => x.id === taskId);
    const isTaskCompleted = task.completed;
    task.completed = !task.completed;
    setTasks(newTasks);

    if(task.completed && !isTaskCompleted) {
      setC2(c2+1);
    } else if (!task.completed && isTaskCompleted) {
      setC2(Math.max(c2 -1, 0));
    }
  };

  return (
    // Main container
    <div className="container mx-auto">
      {/* header section */}
      <Header />
      {/* tasks container */}
      <div style={{ maxWidth: "400px" }} className="mx-auto">
        {/* Task summary */}
        <p className="text-center text-secondary fst-italic">
          All ({c1}) Done ({c2})
        </p>
        {/* task input */}
        <TaskInput addTaskFunc={addTask} />

        {/* tasks mapping*/}
        {tasks.map((task) => (
          <Task
            id={task.id}
            title={task.title}
            deleteTaskFunc={deleteTask}
            toggleDoneTaskFunc={toggleDoneTask}
            completed={task.completed}
            key={task.id}
          />
        ))}
      </div>

      {/* //footer section */}
      <Footer year="2023" fullName="Sirapob Lueangprasert" studentId="650612102" />
    </div>
  );
}
