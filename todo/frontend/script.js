const api = "http://localhost:3000";
const message = document.getElementById("message");

const showMessage = (text, isError = false) => {
  if (!message) return;
  message.textContent = text;
  message.style.color = isError ? "#b91c1c" : "#166534";
};

const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,}$/.test(username);
const isValidPassword = (password) => password.length >= 6;
const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem("token") || ""}` });

const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("admin_username").value.trim();
    const password = document.getElementById("admin_password").value;
    if (!isValidUsername(username)) return showMessage("Admin username must be at least 3 characters", true);
    if (!isValidPassword(password)) return showMessage("Password must be at least 6 characters", true);
    axios
      .post(`${api}/login`, { username, password, role: "admin" })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "admin");
        window.location.href = "./admin.html";
      })
      .catch(() => showMessage("Invalid admin login", true));
  });
}

const adminRegisterForm = document.getElementById("adminRegisterForm");
if (adminRegisterForm) {
  adminRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("admin_reg_username").value.trim();
    const password = document.getElementById("admin_reg_password").value;
    const confirm = document.getElementById("admin_reg_confirm").value;
    if (!isValidUsername(username)) return showMessage("Admin username must be at least 3 characters", true);
    if (!isValidPassword(password)) return showMessage("Password must be at least 6 characters", true);
    if (password !== confirm) return showMessage("Passwords do not match", true);
    axios
      .post(`${api}/register`, { username, password, role: "admin" })
      .then(() => {
        showMessage("Admin registered successfully");
        adminRegisterForm.reset();
      })
      .catch((err) => showMessage(err.response?.data?.message || "Admin registration failed", true));
  });
}

const studentLoginForm = document.getElementById("studentLoginForm");
if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("student_username").value.trim();
    const password = document.getElementById("student_password").value;
    if (!isValidUsername(username)) return showMessage("Student username must be at least 3 characters", true);
    if (!isValidPassword(password)) return showMessage("Password must be at least 6 characters", true);
    axios
      .post(`${api}/login`, { username, password, role: "student" })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", "student");
        window.location.href = "./student.html";
      })
      .catch(() => showMessage("Invalid student login", true));
  });
}

const studentRegisterForm = document.getElementById("studentRegisterForm");
if (studentRegisterForm) {
  studentRegisterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("student_reg_username").value.trim();
    const password = document.getElementById("student_reg_password").value;
    const confirm = document.getElementById("student_reg_confirm").value;
    if (!isValidUsername(username)) return showMessage("Student username must be at least 3 characters", true);
    if (!isValidPassword(password)) return showMessage("Password must be at least 6 characters", true);
    if (password !== confirm) return showMessage("Passwords do not match", true);
    axios
      .post(`${api}/register`, { username, password, role: "student" })
      .then(() => {
        showMessage("Student registered successfully");
        studentRegisterForm.reset();
      })
      .catch((err) => showMessage(err.response?.data?.message || "Student registration failed", true));
  });
}

const assignmentForm = document.getElementById("assignmentForm");
if (assignmentForm) {
  assignmentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value.trim();
    const course = document.getElementById("course").value.trim();
    const due_date = document.getElementById("due_date").value;
    const description = document.getElementById("description").value.trim();
    if (title.length < 3) return showMessage("Title is too short", true);
    if (course.length < 2) return showMessage("Course is too short", true);
    if (!due_date) return showMessage("Select due date", true);
    if (description.length < 5) return showMessage("Description is too short", true);
    axios
      .post(
        `${api}/assignment/create`,
        { title, course, due_date, description },
        { headers: authHeaders() }
      )
      .then(() => {
        showMessage("Assignment created");
        assignmentForm.reset();
      })
      .catch((err) => showMessage(err.response?.data?.message || "Assignment create failed", true));
  });
}

const loadAssignments = document.getElementById("loadAssignments");
if (loadAssignments) {
  loadAssignments.addEventListener("click", () => {
    axios.get(`${api}/assignments`).then((res) => {
      const list = document.getElementById("assignmentsList");
      list.innerHTML = "";
      res.data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.title} | ${item.course} | ${item.due_date}`;
        list.appendChild(li);
      });
    });
  });
}

const assignmentsCards = document.getElementById("assignmentsCards");
if (assignmentsCards) {
  axios.get(`${api}/assignments`).then((res) => {
    assignmentsCards.innerHTML = "";
    if (!res.data.length) {
      assignmentsCards.innerHTML = "<div class='assignment-box'>No assignments available</div>";
      return;
    }
    res.data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "assignment-card";
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p class="assignment-meta"><strong>Course:</strong> ${item.course}</p>
        <p class="assignment-meta"><strong>Due Date:</strong> ${item.due_date}</p>
        <p class="assignment-description">${item.description}</p>
        <button type="button" data-id="${item._id}">Submit Assignment</button>
      `;
      const btn = card.querySelector("button");
      btn.addEventListener("click", () => {
        window.location.href = `./student-assignment.html?id=${item._id}`;
      });
      assignmentsCards.appendChild(card);
    });
  });
}

const assignmentDetails = document.getElementById("assignmentDetails");
const assignmentSubmitForm = document.getElementById("assignmentSubmitForm");
if (assignmentDetails && assignmentSubmitForm) {
  const params = new URLSearchParams(window.location.search);
  const assignmentId = params.get("id");
  if (!assignmentId) {
    showMessage("Assignment not selected", true);
  } else {
    axios
      .get(`${api}/assignments/${assignmentId}`)
      .then((res) => {
        const item = res.data;
        assignmentDetails.innerHTML = `
          <h3>${item.title}</h3>
          <p class="assignment-meta"><strong>Course:</strong> ${item.course}</p>
          <p class="assignment-meta"><strong>Due Date:</strong> ${item.due_date}</p>
          <p class="assignment-description">${item.description}</p>
        `;
      })
      .catch(() => showMessage("Assignment not found", true));

    assignmentSubmitForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const student_name = localStorage.getItem("username") || "";
      const answer = document.getElementById("answer").value.trim();
      if (student_name.length < 3) return showMessage("Login again as student", true);
      if (answer.length < 5) return showMessage("Answer is too short", true);
      axios
        .post(
          `${api}/submit`,
          { student_name, assignment_id: assignmentId, answer },
          { headers: authHeaders() }
        )
        .then(() => {
          showMessage("Assignment submitted successfully");
          assignmentSubmitForm.reset();
        })
        .catch((err) => showMessage(err.response?.data?.message || "Submission failed", true));
    });
  }
}

const loadMySubmissions = document.getElementById("loadMySubmissions");
if (loadMySubmissions) {
  loadMySubmissions.addEventListener("click", () => {
    const username = localStorage.getItem("username") || "";
    axios.get(`${api}/submissions`, { params: { student_name: username }, headers: authHeaders() }).then((res) => {
      const list = document.getElementById("statusList");
      list.innerHTML = "";
      res.data.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.assignment_title} | ${item.status} | Grade: ${item.grade}`;
        list.appendChild(li);
      });
    });
  });
}

const loadSubmissions = document.getElementById("loadSubmissions");
if (loadSubmissions) {
  loadSubmissions.addEventListener("click", fetchSubmissions);
}

function fetchSubmissions() {
  axios.get(`${api}/submissions`, { headers: authHeaders() }).then((res) => {
    const list = document.getElementById("submissionsList");
    list.innerHTML = "";
    res.data.forEach((item) => {
      const li = document.createElement("li");
      const row = document.createElement("div");
      row.className = "row";

      const text = document.createElement("div");
      text.textContent = `${item.student_name} | ${item.assignment_title} | ${item.status} | ${item.grade}`;

      const gradeInput = document.createElement("input");
      gradeInput.value = item.grade === "Pending" ? "" : item.grade;
      gradeInput.placeholder = "Grade";

      const gradeBtn = document.createElement("button");
      gradeBtn.textContent = "Save";
      gradeBtn.addEventListener("click", () => {
        const grade = gradeInput.value.trim();
        if (!grade) return showMessage("Enter grade before saving", true);
        axios
          .post(`${api}/submissions/grade`, { id: item._id, grade }, { headers: authHeaders() })
          .then(() => {
            showMessage("Grade saved");
            fetchSubmissions();
          })
          .catch((err) => showMessage(err.response?.data?.message || "Grade update failed", true));
      });

      row.appendChild(text);
      row.appendChild(gradeInput);
      row.appendChild(gradeBtn);
      li.appendChild(row);
      list.appendChild(li);
    });
  });
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "./index.html";
  });
}
