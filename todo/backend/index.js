import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import { User, Assignment, Submission } from "./schema.js";

const app = express();
const secret = "lab_secret";

connectDB().then(()=>{
  console.log("db is running ");
});
app.use(cors());
app.use(express.json());

const ensureUsers = async () => {
  const admin = await User.findOne({ username: "admin", role: "admin" });
  if (!admin) await User.create({ username: "admin", password: "admin123", role: "admin" });
  const student = await User.findOne({ username: "student", role: "student" });
  if (!student) await User.create({ username: "student", password: "student123", role: "student" });
};

ensureUsers();

app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || username.length < 3) return res.status(400).json({ message: "Invalid username" });
  if (!password || password.length < 6) return res.status(400).json({ message: "Invalid password" });
  if (role !== "admin" && role !== "student") return res.status(400).json({ message: "Invalid role" });
  const existing = await User.findOne({ username, role });
  if (existing) return res.status(400).json({ message: "User already exists" });
  const user = await User.create({ username, password, role });
  res.json({ id: user._id, username: user.username, role: user.role });
});

app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });
  if (role !== "admin" && role !== "student") return res.status(400).json({ message: "Invalid role" });
  const user = await User.findOne({ username, role });
  const ok = user && (await bcrypt.compare(password, user.password));
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secret);
  res.json({ token });
});

app.post("/assignment/create", async (req, res) => {
  const assignment = await Assignment.create(req.body);
  res.json(assignment);
});

app.get("/assignments", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

app.get("/assignments/:id", async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) return res.status(404).json({ message: "Assignment not found" });
  res.json(assignment);
});

app.post("/submit", async (req, res) => {
  const assignment = await Assignment.findById(req.body.assignment_id);
  if (!assignment) return res.status(400).json({ message: "Invalid assignment" });
  const submission = await Submission.create({
    student_name: req.body.student_name,
    assignment_id: assignment._id.toString(),
    assignment_title: assignment.title,
    answer: req.body.answer
  });
  res.json(submission);
});

app.get("/submissions", async (req, res) => {
  const submissions = req.query.student_name
    ? await Submission.find({ student_name: req.query.student_name })
    : await Submission.find();
  res.json(submissions);
});

app.post("/submissions/grade", async (req, res) => {
  const submission = await Submission.findByIdAndUpdate(
    req.body.id,
    { grade: req.body.grade, status: "Graded" },
    { new: true }
  );
  res.json(submission);
});

app.listen(3000,()=>{
  console.log("server running at 3000");
});
