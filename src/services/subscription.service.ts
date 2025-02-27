import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {


  private isSubscribedSubject = new BehaviorSubject<boolean>(this.getStoredSubscription());
  isSubscribed$ = this.isSubscribedSubject.asObservable();

  constructor() {}

  private getStoredSubscription(): boolean {
    return JSON.parse(localStorage.getItem('isSubscribed') || 'false');
  }

  setSubscription(status: boolean) {
    this.isSubscribedSubject.next(status);
    localStorage.setItem('isSubscribed', JSON.stringify(status));
  }

  getSubscriptionStatus(): boolean {
    return this.isSubscribedSubject.value;
  }
}
