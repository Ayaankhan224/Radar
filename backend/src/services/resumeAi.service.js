const { GoogleGenAI, Type } = require("@google/genai")
const { z } = require("zod")

const resumeHtmlSchema = z.object({
  html: z.string().describe("Complete HTML code for a professional resume with embedded CSS styling")
})

const resumeHtmlResponseSchema = {
  type: Type.OBJECT,
  properties: {
    html: { type: Type.STRING }
  },
  required: ["html"],
  propertyOrdering: ["html"]
}

async function generateResumeHtml(formData) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured")
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  })

  const prompt = `Generate a professional, compact single-page HTML resume with embedded CSS styling based on the following information:

Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Location: ${formData.location || 'Not provided'}
LinkedIn: ${formData.linkedin || 'Not provided'}
Professional Summary: ${formData.summary || 'Not provided'}
Work Experience: ${formData.experience || 'Not provided'}
Education: ${formData.education || 'Not provided'}
Skills: ${formData.skills || 'Not provided'}
Projects: ${formData.projects || 'Not provided'}

Requirements:
- Create a clean, professional single-page resume design that fits on one A4 page
- Use compact layout with minimal spacing to fit all content on one page
- Use modern CSS with good typography but keep it concise
- Include all sections that have content in a condensed format
- Make it print-friendly (A4 size optimized, single page)
- Use a professional color scheme (dark text on white background)
- Ensure the HTML is self-contained with embedded CSS
- Use semantic HTML structure
- Include minimal margins and padding for printing (use CSS to control page breaks)
- Make it look professional and ATS-friendly
- Use a clean, modern layout with name at top, followed by contact info, then sections
- Keep descriptions brief and to the point
- Use bullet points for skills and experience
- Set page size to A4 with @page CSS rule
- Use CSS to ensure content fits on one page: @page { size: A4; margin: 0.3cm; }
- Use compact font sizes (10-12pt for body, larger for headings)

Return only the complete HTML code with embedded CSS, no additional text or explanations.`

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: resumeHtmlResponseSchema,
    }
  })

  return resumeHtmlSchema.parse(JSON.parse(response.text))
}

module.exports = generateResumeHtml
