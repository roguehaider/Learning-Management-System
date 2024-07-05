import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
    _id: string;
    Fname: string;
    Lname: string;
    role: string;
    roll_No: string;
    class_id: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient, private router: Router) { }

    isLoggedIn(): boolean {
        // Check if access token exists in localStorage
        return localStorage.getItem('user') !== null;
    }
    refreshToken(): Observable<any> {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log("token refresh", refreshToken)
        return this.http.post(`${this.apiUrl}refresh`, { refreshToken });
    }
    //Login
    login(credentials: any) {
        return this.http.post<any>('http://localhost:8000/login', credentials)
            .pipe(
                tap(response => {
                    localStorage.setItem('userData', JSON.stringify(response.user));
                })
            );
    }
    logout(user: any): Observable<any> {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
    
        document.cookie = `accessToken=${accessToken}`;
        document.cookie = `refreshToken=${refreshToken}`;
       
        return this.http.post<any>(`http://localhost:8000/logout`, user,  { withCredentials: true });
      }
    getUserRole(): string | null {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.role || null;
    }
    getUserName(): string | null {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData.Fame || null;
    }
    getUser(): string | null {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        return userData || null;
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }
    getUserDetails() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      }
}
