import { generateInterviewReport,getInterviewReportById,getAllInterviewReports,generateResumePdf } from "../services/interview.api";
import { useContext} from "react";
import { InterviewContext } from "../interview.context";

export const useInterview=()=>{
    const context=useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an Interview")
    }

    const{ loading,setLoading,report,setReport,reports,setReports}=context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        let response = null
        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            if(error.response?.status === 401) {
                alert("Login Required - Your session has expired");
                window.location.href = "/login";
                return null;
            }
            console.log(error);
            alert("Error generating report. Please try again.");
            return null;
        } finally {
            setLoading(false);
        }
    }


    const getReportById=async (interviewId)=>{
        setLoading(true)
        let response=null
        try {
             response=await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            if(error.response?.status === 401) {
                alert("Login Required");
                window.location.href = "/login";
            }
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports=async ()=>{
        setLoading(true)
        let response=null
        try {
            const response=await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }

        return response.interviewReports
    }

    const getResumePdf=async ({interviewReportId})=>{
        setLoading(true)
        let response=null
        try {
            response=await generateResumePdf({interviewReportId})
            const url=window.URL.createObjectURL(new Blob([response],{type:"application/pdf"}))
            const link=document.createElement("a")
            link.href=url
            link.setAttribute("download",`resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

     
      return { loading,report,reports,generateReport,getReportById,getReports,getResumePdf }
    
}