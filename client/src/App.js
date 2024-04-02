import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Chart from "chart.js/auto";
import Questions from "./Questions";

const endpoint_url_get_all = "http://localhost:3000/get-all";
const endpoint_url_get_terms = "http://localhost:3000/get-terms";
const endpoint_url_get_courses = "http://localhost:3000/get-courses";

function App() {
  const [allDataList, setAllDataList] = useState([]);
  const [termsList, setTermsList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const getAllData = () => {
    Axios.get(endpoint_url_get_all)
      .then((response) => {
        setAllDataList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getTerms = () => {
    Axios.get(endpoint_url_get_terms)
      .then((response) => {
        setTermsList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getCourses = () => {
    Axios.get(endpoint_url_get_courses)
      .then((response) => {
        setCourseList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const init = () => {
    getAllData();
    getTerms();
    getCourses();
  };

  const handleTermChange = (event) => {
    setSelectedTerm(event.target.value);
    console.log(selectedTerm);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    console.log(selectedFilter);
  };

  const handleQuestionChange = (event) => {
    setSelectedQuestion(event.target.value);
    console.log(selectedQuestion);
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    console.log(selectedCourse);
  };

  const renderChart = () => {
    const labels = allDataList.map((item) => item.course_id);
    const values = allDataList.map((item) => item.average_score);

    const existingChart = Chart.getChart("myChart");
    if (existingChart) {
      existingChart.destroy();
    }

    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bar Chart",
            data: values,
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (allDataList.length > 0) {
      renderChart();
    }
  }, [allDataList]);

  return (
    <div className="App">
      <button onClick={init}>INIT</button>
      {/* Performs getTerms and getAllData requests */}

      <select value={selectedTerm} onChange={handleTermChange}>
        <option value="">Select Term</option>
        {termsList.map((item) => (
          <option key={item.term_id} value={item.term_id}>
            {item.term_id}
          </option>
        ))}
      </select>

      <select value={selectedFilter} onChange={handleFilterChange}>
        <option value="">Select Filter</option>
        <option value="course">Filter By Course</option>
        <option value="question">Filter By Question</option>
      </select>

      <select value={selectedQuestion} onChange={handleQuestionChange}>
        <option value="">Select Survey Question</option>
        {Questions.map((item) => (
          <option key={item.name} value={item.name}>
            {item.question}
          </option>
        ))}
      </select>

      <select value={selectedCourse} onChange={handleCourseChange}>
        <option value="">Select Course</option>
        {courseList.map((item) => (
          <option key={item.course_id} value={item.course_id}>
            {item.course_id}
          </option>
        ))}
      </select>

      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

export default App;
