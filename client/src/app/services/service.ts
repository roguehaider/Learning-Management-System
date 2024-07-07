import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { Diary } from '../pages/teacher/teacher-diary/teacher-diary.component';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  //student
  getStudents(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.get<any>(`${this.apiUrl}admin/getStudents`, { withCredentials: true });

  }

  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/students/update`, student, { withCredentials: true });
  }


  // router.post('/admin/class/addStudents' , auth , checkAuth("Admin") , handleAddStudents)
  addStudentToClass(student: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}admin/class/addStudents`, student, { withCredentials: true });
  }


  // admin/class/addTeacher ADD TEACHER TO CLASS
  addTeacherToClass(teacher: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}admin/class/addTeacher`, teacher, { withCredentials: true });
  }


  // router.post('/admin/class/removeStudent/:id' , auth  , checkAuth("Admin") , handleRemoveStudent)
  deleteStudentFromClass(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post<any>(`${this.apiUrl}admin/class/removeStudent/${id}`, id, { withCredentials: true });
  }

  // admin/class/removeCourse/:id
  deleteCourseFromClass(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post<any>(`${this.apiUrl}admin/removeCourse/${id}`, id, { withCredentials: true });
  }

  createClass(classData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}admin/createClass`, classData, { withCredentials: true });
  }


  //create course
  createCourse(courseData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}admin/createCourse`, courseData, { withCredentials: true });
  }

  // /admin/updateCourse/:id
  updateCourse(courseData: any, id: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.put(`${this.apiUrl}admin/updateCourse/${id}`, courseData, { withCredentials: true });
  }
  // delete class
  deleteClass(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.delete<any>(`${this.apiUrl}admin/deleteClass/${id}`, { withCredentials: true });
  }
  // delete course
  deleteCourse(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.delete<any>(`${this.apiUrl}deleteCourse/${id}`, { withCredentials: true });
  }
  //register user
  registerUser(student: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post<any>(`${this.apiUrl}admin/register`, student, { withCredentials: true });
  }
  deleteUser(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.delete<any>(`${this.apiUrl}admin/removeUser/${id}`, { withCredentials: true });
  }

  //admin teacher

  getTeacher(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}admin/getTeachers`, { withCredentials: true });

  }

  updateTeacher(teacher: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/teachers/update`, teacher, { withCredentials: true });
  }

  //admin classes
  getClasses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}admin/getClasses`, { withCredentials: true });
  }
  getClassById(id: string) {
    return this.http.get<any>(`${this.apiUrl}admin/getClass/${id}`, { withCredentials: true });
  }
  //admin courses
  getCourses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}admin/allCourses`, { withCredentials: true });
  }
  // router.post('/admin/class/addCourse' , auth  , checkAuth("Admin") , handleAddCourse)
  addCourseInClass(courseData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}admin/class/addCourse`, courseData, { withCredentials: true });
  }
  //admin course by id
  getCourseById(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}admin/getCourse/${id}`, { withCredentials: true });
  }

  //admin announcements
  getAnnouncements(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}allAnnouncements`, { withCredentials: true });
  }
  createAnnouncement(announcementData: any): Observable<any> {
    const url = `${this.apiUrl}announcement`;
    return this.http.post(url, announcementData, { withCredentials: true });
  }

  //admin sugestions
  getAllSuggestions(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.get(`${this.apiUrl}allSuggestions`, { withCredentials: true });
  }

  deleteSuggestion(_id: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.delete<any>(`${this.apiUrl}deleteSuggestion/${_id}`, { withCredentials: true });
  }

  //teacher---------------------------------------------------------------------------------------------------------------------------------------
  //teacher-courses
  getTeacherCourses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/courses`, { withCredentials: true });
  }
  // teacher/course/:id GET COURSE BY ID
  getTeacherCourseById(id: string) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/course/${id}`, { withCredentials: true });
  }

  getTeacherSuggestions(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.get(`${this.apiUrl}teacher/suggestion`, { withCredentials: true });
  }

  postTeacherSuggestion(suggestion: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}teacher/suggestion`, suggestion, { withCredentials: true });
  }

  postDiary(diary: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}teacher/course/diary`, diary, { withCredentials: true });
  }
  getTeacherDiaries(date: string): Observable<Diary[]> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem('user');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.get<any>(`${this.apiUrl}teacher/dairies/${date}`, { withCredentials: true });
  }

  // /teacher/course/diary/update/:dairy_id
  updateTeacherDiary(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}teacher/course/diary/update/${data._id}`, data, { withCredentials: true });
  }
  // getTeacherAttendance(): Observable<any> {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = localStorage.getItem('refreshToken');

  //   document.cookie = `accessToken=${accessToken}`;
  //   document.cookie = `refreshToken=${refreshToken}`;
  //   return this.http.get<any>(`${this.apiUrl}teacher/attendence`, { withCredentials: true });
  // }

  //mark attendance
  createTeacherAttendance(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}teacher/attendence`, data, { withCredentials: true });
  }

  getAttendanceByClass(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
  
    return this.http.get<any>(`${this.apiUrl}teacher/attendence`, {withCredentials: true});
  }
  getAttendanceByDate(date: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
  
    return this.http.get<any>(`${this.apiUrl}teacher/attendence/${date}`, {withCredentials: true});
  }

  // teacher/course/students  get courses for attendance
  getStudentsOfClass(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
  
    return this.http.get<any>(`${this.apiUrl}teacher/class/students`, { withCredentials: true });
  }
  

  //teacher leaves
  getLeaveRequests(date: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/leaves/${date}`, { withCredentials: true });
  }

  // teacher/course/assesment
  createAssessment(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}teacher/course/assesment`, data, { withCredentials: true });
  }

  // teacher/course/assesments/:id
 getAssessmentByCourse(courseID: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/course/assesments/${courseID}`, { withCredentials: true });
  }

  // teacher/course/assesment/marks
  putAssessmentMarks(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}teacher/course/assesment/marks`, data, { withCredentials: true });
  }
  // teacher/course/assesments/update
  updateAssessmentMarks(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.put<any>(`${this.apiUrl}teacher/course/assesments/update`, data, { withCredentials: true });
  }

  // teacher/course/student/remarks POST REMARKS
  putRemarks(data: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}teacher/course/student/remarks`, data, { withCredentials: true });
  }


  // student------------------------------------------------------------------------------------------------------------------------------------
  getStudentCourses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}student/courses`, { withCredentials: true });
  }

  // Method to post student remarks
  postStudentRemarks(remarkData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}student/remarks`, remarkData, { withCredentials: true });
  }
  // student/leave
  postStudentLeave(leaveData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.post<any>(`${this.apiUrl}student/leave`, leaveData, { withCredentials: true });
  }
  // student/leave/:date
  getStudentLeaves(date: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}student/leave/${date}`, { withCredentials: true });
  }
}

