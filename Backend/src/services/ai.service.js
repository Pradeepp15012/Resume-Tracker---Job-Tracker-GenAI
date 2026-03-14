const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");


const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 to 100 indicating how well the candidate matches the job description"),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview "),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to anser this question, what points to cover, what approach to take etc.")
  })).describe("List of technical questions that can be asked in the interview"),

  behaviouralQuestions: z.array(z.object({
    question: z.string().describe("The behavioural question can be asked in the interview "),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to anser this question, what points to cover, what approach to take etc.")
  })).describe("List of behavioural questions that can be asked in the interview"),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill gap that candidate needs to work on"),
    severity: z.enum(["low", "medium", "high"]).describe("Severity of the skill gap")
  })).describe("List of skill gaps that candidate needs to work on before attending the interview"),
  preparationPlan: z.array(z.object({
    day: z.string().describe("The day of preparation plan"),
    focus: z.string().describe("The focus of the day, what to study, what topics to cover etc."),
    tasks: z.array(z.string()).describe("List of tasks to be completed on that day, like read a book, solve x number of questions etc."),
  })).describe("Preparation plan for the candidate, what to do on each day before the interview"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

  const prompt = `Generate an interview report for a candidate with the following details: 
    Resume: ${resume} 
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}
  `

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(interviewReportSchema)
    }
  })

  return JSON.parse(response.text);

}



module.exports = generateInterviewReport
