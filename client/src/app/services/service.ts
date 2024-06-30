import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';


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
  createClass(classData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}admin/createClass`, classData, { withCredentials: true });
  }

  createCourse(courseData: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;

    return this.http.post(`${this.apiUrl}admin/createCourse`, courseData, { withCredentials: true });
  }

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
  getCourseById(id: string) {
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
  getTeacherDiaries(): Observable<{ diaries: any }> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const user = localStorage.getItem(`user`)

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<{ diaries: any }>(`${this.apiUrl}teacher/diaries`, { withCredentials: true });
  }

  getTeacherAttendance(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/attendence`, { withCredentials: true });
  }

  //teacher leaves
  getLeaveRequests(date: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}leaves/${date}`, { withCredentials: true });
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
}

