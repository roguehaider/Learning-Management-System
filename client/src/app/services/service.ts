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

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    // const headers = new HttpHeaders({
    //   'accessToken': `${localStorage.getItem('accessToken')}`
    // });
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   // 'Authorization': `Bearer ${accessToken}`
    // });
    // return this.http.get<any>(`${this.apiUrl}admin/getStudents`, { headers });
    return this.http.get<any>(`${this.apiUrl}admin/getStudents`, { withCredentials: true });

  }

  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}admin/students/update`, student, { withCredentials: true });
  }

  addStudents(classId: string, studentIds: string[]): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    // Set tokens as cookies
    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
   

    const body = {
      class_id: classId,
      students: studentIds
    };

    return this.http.post<any>(`${this.apiUrl}/admin/addStudents`, body, { withCredentials: true });
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
    return this.http.get<any>(`${this.apiUrl}admin/getClasses`,  { withCredentials: true });
  }

  //admin courses
  getCourses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}admin/allCourses`,  { withCredentials: true });
  }


  //admin announcements
  getAnnouncements(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}allAnnouncements`,  { withCredentials: true });
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

  //teacher
  //teacher-courses
  getTeacherCourses(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    document.cookie = `accessToken=${accessToken}`;
    document.cookie = `refreshToken=${refreshToken}`;
    return this.http.get<any>(`${this.apiUrl}teacher/courses`,  { withCredentials: true });
  }
}

