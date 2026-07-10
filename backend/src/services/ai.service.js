const {GoogleGenAI, Type} = require("@google/genai")
const {z} = require("zod")


const interviewReportSchema = z.object({
    matchScore: z.number().min(0).max(100).describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).min(5).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).min(3).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).min(7).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated, only the title no 'Interview Report' or 'Report' or 'Job Description' etc. should be included in the title"),
})

const questionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING },
        intention: { type: Type.STRING },
        answer: { type: Type.STRING },
    },
    required: [ "question", "intention", "answer" ],
    propertyOrdering: [ "question", "intention", "answer" ],
}

const interviewReportResponseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            minimum: 0,
            maximum: 100,
        },
        technicalQuestions: {
            type: Type.ARRAY,
            minItems: "5",
            items: questionSchema,
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            minItems: "5",
            items: questionSchema,
        },
        skillGaps: {
            type: Type.ARRAY,
            minItems: "3",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: {
                        type: Type.STRING,
                        format: "enum",
                        enum: [ "low", "medium", "high" ],
                    },
                },
                required: [ "skill", "severity" ],
                propertyOrdering: [ "skill", "severity" ],
            },
        },
        preparationPlan: {
            type: Type.ARRAY,
            minItems: "7",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    focus: { type: Type.STRING },
                    tasks: {
                        type: Type.ARRAY,
                        minItems: "2",
                        items: { type: Type.STRING },
                    },
                },
                required: [ "day", "focus", "tasks" ],
                propertyOrdering: [ "day", "focus", "tasks" ],
            },
        },
        title: { type: Type.STRING },
    },
    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
        "title",
    ],
    propertyOrdering: [
        "title",
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillGaps",
        "preparationPlan",
    ],
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured")
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })


  const prompt = `Generate an interview report for a candidate with the following details:
  Resume: ${resume}
  Self Description: ${selfDescription}
  Job Description: ${jobDescription}

  Requirements:
  - Return at least 5 technical questions.
  - Return at least 5 behavioral questions.
  - Return at least 3 skill gaps.
  - Return a 7-day preparation plan.
  - Make every question and task specific to the resume, self description, and job description.
  `

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportResponseSchema,
    }
  })

  return interviewReportSchema.parse(JSON.parse(response.text))
}

module.exports = generateInterviewReport
