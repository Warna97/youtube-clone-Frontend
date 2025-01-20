import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(email: string, password: string): Observable<User> {
    // Implement actual login logic here
    return new Observable(subscriber => {
      // Simulated API call
      setTimeout(() => {
        const user: User = {
          id: '1',
          name: 'Test User',
          email: email,
          avatar: 'https://via.placeholder.com/40'
        };
        this.currentUserSubject.next(user);
        subscriber.next(user);
        subscriber.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}
