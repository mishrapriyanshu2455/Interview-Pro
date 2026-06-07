const express=require("express")
const authMiddleware=require("../middleware/auth.middleware")
const interviewController=require("../controllers/interview.controller")
const upload=require("../middleware/file.middleware")


const interviewRouter = express.Router()



/**
 * @route POST /api/interview
 * @desc generate new interview report on the basis of user self description,resume pdf and job description
 * @access Private (requires authentication)
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterViewReportController)


/**
 * @route GET /api/interview/report/:interviewId
 * @desc get interview report by interviewId.
 * @access Private (requires authentication)
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @desc get all interview reports of logged in user.
 * @access Private (requires authentication)
 */
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @desc generate resume pdf based on user self description,resume and job description .
 * @access Private (requires authentication)
 */
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports=interviewRouter