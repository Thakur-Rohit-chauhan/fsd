import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  course: String,
  due_date: String,
  description: String
});

const submissionSchema = new mongoose.Schema({
  student_name: String,
  assignment_id: String,
  assignment_title: String,
  answer: String,
  submission_date: { type: String, default: () => new Date().toISOString().slice(0, 10) },
  status: { type: String, default: "Submitted" },
  grade: { type: String, default: "Pending" }
});

const User = mongoose.model("User", userSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Submission = mongoose.model("Submission", submissionSchema);

export { User, Assignment, Submission };
