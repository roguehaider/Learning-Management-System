// toast.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, ToastMessage } from '../toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  messages: ToastMessage[] = [];
  private subscription!: Subscription;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.toastState.subscribe((message: ToastMessage) => {
      this.messages.push(message);
      setTimeout(() => this.removeToast(message), 3000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeToast(message: ToastMessage) {
    this.messages = this.messages.filter(msg => msg !== message);
  }
}
