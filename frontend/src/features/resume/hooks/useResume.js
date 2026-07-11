import { generateResume, getAllResumes, getResumeById, deleteResume, downloadResumePdf } from "../services/resume.api"
import { useContext, useEffect } from "react"
import { ResumeContext } from "../resume.context"
import { useParams } from "react-router-dom"

export const useResume = () => {
    const context = useContext(ResumeContext)
    const { resumeId } = useParams()

    if (!context) {
        throw new Error("useResume must be used within a ResumeProvider")
    }

    const { loading, setLoading, resume, setResume, resumes, setResumes } = context

    const generateNewResume = async (formData) => {
        setLoading(true)
        let response = null
        try {
            response = await generateResume(formData)
            if (response && response.resume) setResume(response.resume)
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
        return response ? response.resume : null
    }

    const getResume = async (id) => {
        setLoading(true)
        let response = null
        try {
            response = await getResumeById(id)
            if (response && response.resume) setResume(response.resume)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response ? response.resume : null
    }

    const getResumes = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllResumes()
            if (response && response.resumes) setResumes(response.resumes)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response ? response.resumes : []
    }

    const downloadPdf = async (id) => {
        setLoading(true)
        try {
            const response = await downloadResumePdf(id)
            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${id}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const deleteResumeById = async (id) => {
        setLoading(true)
        try {
            await deleteResume(id)
            setResumes((prev) => prev.filter((r) => r._id !== id))
            if (resume?._id === id) setResume(null)
            return true
        } catch (error) {
            console.log(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (resumeId) {
            getResume(resumeId)
        }
    }, [resumeId])

    return { loading, resume, resumes, generateNewResume, getResume, getResumes, downloadPdf, deleteResumeById }
}
