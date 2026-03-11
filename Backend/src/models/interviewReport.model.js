const mongoose = require('mongoose');

/**
 * - job description schema
 * - resume text
 * - self description 
 * - Technical questions 
 * - behavioural questions
 * - skill gaps
 * - preparation plan
 * - 
 */

const technicalQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Technical question is required"]
  }, 
  intention: {
    type: String,
    required: [true, "Intention is required"]
  },
  answer: {
    type: String,
    required: [true, "Answer is required"]
  }
}, {
  _id: false
})

const behaviouralQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Technical question is required"],
  },
  intention: {
    type: String,
    required: [true, "Intention is required"],
  },
  answer: {
    type: String,
    required: [true, "Answer is required"],
  },
}, {
  _id: false
});

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"],
  },
  reason: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"],
  },
}, {
  _id: false
})

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: {
    type: [String],
    required: [true, "Tasks are required"],
  }
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"]
  },
  resume: {
    type: String
  },
  selfDescription: {
    type: String,
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  technicalQuestions: [technicalQuestionSchema],
  behaviouralQuestions: [behaviouralQuestionSchema],
  skillGaps: [skillGapSchema],
  preparationPlan: [preparationPlanSchema],
}, {
  timestamps: true
})

const interviewReportModel = mongoose.model("interviewReport", interviewReportSchema)

module.exports = interviewReportModel;