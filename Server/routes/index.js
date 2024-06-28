const express = require('express');

const auth = require('../middleware/auth')

const {checkAuth} = require('../middleware/checkAuthorization')

 // common
const {handleUserLogin, 
    handleUserLogout,
    handleRefreshToken} = require('../controllers/Authentication/user')
 
const {handleCreateSuggestion, 
    getAllsuggestions,
    getSuggestionsByUser,
    deleteSuggestion} = require('../controllers/Student/suggestion')

// admin  
const {handleUserRegister,
    handleGetStudents,
    handleGetTeachers, 
    HandleRemoveUser,
    handleUpdateStudent,
    handleUpdateTeacher} = require('../controllers/Admin/registration')
  
const {handleCreateAnnounce, 
    getAllAnnounce, 
    deleteAnnounce} = require('../controllers/Admin/announcements')   

const {handleCreateClass,
    handleDeleteClass,
    handleAddClassTeacher,
    handleAddStudents,
    handleRemoveStudent,
    handleAddCourse,
    handleRemoveCourse,
    handleGetClasses,
    handleGetClassById}= require('../controllers/Admin/class')

const {handleCreateCourse,
    handleUpdateCourse,
    handleDeleteCourse,
    getAllCourses,
    handleGetCourseById} = require('../controllers/Admin/course')   

// teacher side 
const {handleGetCourse, 
    GetCourseById } = require('../controllers/Teacher/course') 

const {handlePostRemarks,
    handleGetAllRemarks} = require('../controllers/Teacher/remarks')

const { handlePostDiary ,
    handleUpdateDiary,
    handleGetAllDiaries} = require('../controllers/Teacher/diary')  

const {handleCreateAttendence,
    getStudentsOfClass,
    getAttendenceByClass,
    getAttendenceByDate} = require('../controllers/Teacher/attendence')

const {handleCreateAssessment,
    handleAddAssesmentMarks,
    getAssesmentsByCourse,
    updateMarksByStudent}= require('../controllers/Teacher/assessment')

// student side

const {handleGetStudentCourses,
    handleGetStudentCourseById} = require('../controllers/Student/course')

const {handleGetDiary} = require('../controllers/Student/diary') 

const {handleStudentPostRemarks,
    handleGetRemarksByCourse} = require('../controllers/Student/remarks')

const {getStudentAttendance} = require('../controllers/Student/attendence')   

const {getStudentAssementByCourse} = require('../controllers/Student/assesment');

const router = express.Router();

router.get('/' , (req , res)=>{
    res.send('hello form server')
})

// 1 authentication routes and controllers 

// 1 login 

router.post('/login',handleUserLogin )

// 2 logout

router.post('/logout', auth, handleUserLogout)

// 3 refresh token

router.get('/refresh' , handleRefreshToken)

// Admin routes and controllers 

// 5 register

router.post('/admin/register' , auth , checkAuth("Admin") , handleUserRegister)

// 6 delete teacher / student 

router.delete('/admin/removeUser/:id' , auth , checkAuth('Admin') , HandleRemoveUser)

// update student

router.put('/admin/students/update' , auth , checkAuth("Admin"), handleUpdateStudent)

// update teacher

router.put('/admin/teachers/update' , auth , checkAuth("Admin"), handleUpdateTeacher)

// 7 get students

router.get('/admin/getStudents' , auth , checkAuth('Admin') , handleGetStudents)

// 9 get teahers

router.get('/admin/getTeachers' , auth , checkAuth('Admin') , handleGetTeachers)

// 10 create class 

router.post('/admin/createClass' , auth  , checkAuth("Admin") , handleCreateClass)

// 11 delete class 

router.delete('/admin/deleteClass/:id' , auth  , checkAuth("Admin") , handleDeleteClass)

// 12 get all classes 

router.get('/admin/getClasses' , auth , checkAuth("Admin") , handleGetClasses)

// 13 get class by id  

router.get('/admin/getClass/:id' , auth , checkAuth('Admin') , handleGetClassById)

// 14 add course to class 

router.post('/admin/addCourse' , auth  , checkAuth("Admin") , handleAddCourse)

// 15 remove course 

router.post('/admin/removeCourse/:id' , auth  , checkAuth("Admin") , handleRemoveCourse)

// add Class teacher to class

router.post('/admin/class/addTeacher' , auth , checkAuth("Admin") ,handleAddClassTeacher)

// 16 add students to class 

router.post('/admin/addStudents' , auth , checkAuth("Admin") , handleAddStudents)

// 17 remove Student 

router.post('/admin/removeStudent/:id' , auth  , checkAuth("Admin") , handleRemoveStudent)

// 18 create course 

router.post('/admin/createCourse' , auth  , checkAuth("Admin") , handleCreateCourse)

// 19 update course 

router.get('/admin/updateCourse/:id' , auth  , checkAuth("Admin") , handleUpdateCourse)

// 20 delete course 

router.delete('/deleteCourse/:course_id' , auth  , checkAuth("Admin") , handleDeleteCourse)

// 21 get all courses 

router.get('/admin/allCourses' , auth , checkAuth('Admin') , getAllCourses)

// 22 get class by id  

router.get('/admin/getCourse/:id' , auth , checkAuth('Admin') , handleGetCourseById)

// 23 create Announcement

router.post('/announcement' , auth , checkAuth("Admin") , handleCreateAnnounce)

// 24 get Announcements  // common route

router.get('/allAnnouncements' , auth , getAllAnnounce)

// 25 delete Announcements

router.delete('/deleteAnnouncement/:id' , auth , checkAuth("Admin") , deleteAnnounce)

// 26 get all suggestions

router.get('/allSuggestions' , auth , checkAuth("Admin") ,  getAllsuggestions)

// 27 delete suggestion

router.delete('/deleteSuggestion/:id' , auth , checkAuth("Admin") , deleteSuggestion)






// Teacher Routes and Controllers

// get all courses

router.get('/teacher/courses' , auth , checkAuth("Teacher") , handleGetCourse)

// get course by id 

router.get('/teacher/course/:id', auth , checkAuth("Teacher") , GetCourseById)

// post dairy in specific course 

router.post('/teacher/course/diary' , auth , checkAuth("Teacher") , handlePostDiary)

// update diary

router.post('/teacher/course/diary/update/:dairy_id' , auth , checkAuth("Teacher") ,handleUpdateDiary)

// get all diaries posted bt teacher

router.get('/teacher/dairies' , auth , checkAuth("Teacher"),handleGetAllDiaries)

// get students for attendence and others 

router.get('/teacher/course/students' , auth , checkAuth("Teacher") , getStudentsOfClass)

// create attendence of specific class

router.post('/teacher/attendence', auth , checkAuth("Teacher") , handleCreateAttendence)

// get attendence by class 

router.get('/teacher/attendence' , auth , checkAuth("Teacher") , getAttendenceByClass);

// get attendence by date 

router.get('/teacher/attendence/:date' , auth , checkAuth("Teacher") , getAttendenceByDate);

// create assesment

router.post('/teacher/course/assesment' , auth , checkAuth("Teacher"),handleCreateAssessment)

// put marks of student in assesment

router.post('/teacher/course/assesment/marks',auth,checkAuth("Teacher"),handleAddAssesmentMarks)

// get assesments by course 

router.get('/teacher/course/assesments/:id',auth,checkAuth("Teacher") , getAssesmentsByCourse)

// update student marks 

router.put('/teacher/course/assesments/update' , auth , checkAuth("Teacher"),updateMarksByStudent)

// post remarks about student 

router.post('/teacher/course/student/remarks' , auth , checkAuth("Teacher"),handlePostRemarks)

// get remarks and comments on remarks  

router.get('/teacher/course/student/remarks',auth , checkAuth("Teacher") ,handleGetAllRemarks)

//  post suggestion

router.post('/teacher/suggestion' , auth , checkAuth("Teacher") , handleCreateSuggestion)

//  get suggestions posted by Teacher 

router.get('/teacher/suggestion' , auth , checkAuth("Teacher") ,  getSuggestionsByUser)








// student routes and controllers

// get all courses 

router.get('/student/courses' , auth , checkAuth("Student") , handleGetStudentCourses)

// get course by id

router.get('/student/course/:id',auth ,checkAuth("Student"),handleGetStudentCourseById)

// get diaries

router.get('/student/diary/:date', auth , checkAuth("Student") , handleGetDiary)

// post remarks about teacher

router.post('/student/remarks' , auth , checkAuth("Student") ,handleStudentPostRemarks)

// get remarks from courese teacher

router.get('/student/remaks/:course_id' , auth , checkAuth("Student") ,handleGetRemarksByCourse)

// get attendence 

router.get('/student/attendence' , auth , checkAuth("Student") ,getStudentAttendance)

// get assesment by course 

router.get('/student/course/grades/:id' , auth , checkAuth("Student") , getStudentAssementByCourse)

//  post suggestion

router.post('/suggestion' , auth , checkAuth("Student") , handleCreateSuggestion)

//  get suggestions posted by student 

router.get('/suggestion' , auth , checkAuth("Student") ,  getSuggestionsByUser)




module.exports=router;


// Admin side
// add / remove / update student 
// add / remove / update teacher
// add /remove classes ,courses
// suggestions
// annoucments


// Admin side pending
// update user
// adding picture , other details
// adding account
// delete data after some time 



// teacher side 

// 1 Suggestion                    tick
// 2 Live meeting                           pending
// 3 Remarks                       tick
// 4 Announcement                  tick
// 5 Attendence                    tick      
// 6 Assesments                    tick
// 7 get All courses               tick 
// 8 chat                                   pending
// 9 post diary                    tick
//10 share notes                            pending
//11 approve leave                          pending




// Student's parent side 

//1 announcements                  tick
//2 get all courses                tick
//3 attendence                     tick 
//4 grades                         tick 
//5 chat
//6 live meeting
//7 diary                          tick 
//8 put suggestion                 tick
//9 put leave
//10 remarks                       tick
//11 get notes
