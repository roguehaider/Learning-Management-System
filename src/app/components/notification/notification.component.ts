import { DatePipe } from "@angular/common";
import { Component } from "@angular/core";
import { Timestamp } from "firebase/firestore";
import { Subscription } from "rxjs";
import { FirestoreService } from "src/app/services/firestore.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
  providers: [DatePipe],
})
export class NotificationComponent {
  notifications: any[] = [];
  showNotifications = false;
  currentUser: any;
  currentReminderIndex: number = 0;
  remindersData: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private firestore: FirestoreService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    let currentUser = null;
    this.notifications = [];

    let currentLocalStorageUser = localStorage.getItem("user");
    let currentSessionUser = sessionStorage.getItem("user");
    if (currentLocalStorageUser) {
      currentUser = JSON.parse(currentLocalStorageUser!);
    } else {
      currentUser = JSON.parse(currentSessionUser!);
    }
    if (currentUser) {
      this.currentUser = currentUser;
    }

    this.fetchRemindersData();

    const notificationsSubscription = this.firestore
      .getObservableData("notifications")
      .subscribe((notificationsData) => {
        // console.log("Feching notification...", notificationsData);

        this.notifications = notificationsData;
      });
    this.subscriptions.push(notificationsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.map((subscription) => {
      subscription.unsubscribe();
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  fetchNotificationsData() {
    let notificationsData: any = [];
    this.firestore
      .getAllData("notifications")
      .then((response: any) => {
        console.log("fetching Notifications:", response);
        this.notifications = response;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  fetchRemindersData() {
    const currentDate = new Date();
    const remindersSubscription = this.firestore
      .getTodaysUnreadReminders(currentDate, this.currentUser.userId)
      .subscribe((remindersData) => {
        console.log("Getting Reminders...", remindersData);
        this.setReminderTimeoutForSortedReminders(remindersData);
      });

    this.subscriptions.push(remindersSubscription);
  }

  convertDateTimeFromSeconds(timestamp: any): string {
    if (timestamp && timestamp instanceof Timestamp) {
      const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
      return this.datePipe.transform(date, "MM dd, yyyy 'at' hh:mm a")!;
    }
    return "";
  }

  // Function to set reminder timeout for each reminder
  setReminderTimeoutForSortedReminders(sortedReminders: any[]) {
    if (this.currentReminderIndex < sortedReminders.length) {
      
      const reminder = sortedReminders[this.currentReminderIndex];
      const currentTime = new Date().getTime() / 1000; // Current time in seconds
      console.log('reminder.call_back_date.seconds:', reminder.call_back_date.seconds, currentTime);
      const reminderTime = reminder.call_back_date.seconds; // Reminder time in seconds

      if (reminderTime > currentTime) {
        const timeout = (reminderTime - currentTime) * 1000; // Timeout in milliseconds
console.log('Timeout:', sortedReminders[this.currentReminderIndex].call_back_date.toDate());

        setTimeout(() => {
          this.showSwirlPopupForReminder(reminder);
          this.currentReminderIndex++;
          this.setReminderTimeoutForSortedReminders(sortedReminders); // Recursive call for next reminder
        }, timeout);
      } else {
        this.currentReminderIndex++;
        this.setReminderTimeoutForSortedReminders(sortedReminders); // Recursive call for next reminder
        console.log("Adding notification! Reminder passed");
        const lead_id = reminder.lead_id;
        this.firestore
          .getById(lead_id, "Leads")
          .then((lead: any) => {
            const notificationData = {
              notification_title: "Call Back Reminder",
              call_back_date: reminder.call_back_date,
              user_id: reminder.user_id,
              created_by: this.currentUser.name,
              business_name: lead.business_name,
              contact_name: lead.first_name + " " + lead.last_name,
              phone_number: lead.phone_number,
            };
            this.addNotification(notificationData);
            this.firestore
              .delete("reminders", reminder.id)
              .then(() => {
                this.fetchRemindersData();
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  // Function to show swirl popup for a reminder
  showSwirlPopupForReminder(reminder: any) {
    const lead_id = reminder.lead_id;
    this.firestore
      .getById(lead_id, "Leads")
      .then((lead: any) => {
        Swal.fire({
          title: "Call Back Reminder",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Okay",
          denyButtonText: `Make Call`,
          position: "center",
          width: "26em",
          icon: "info",
          html: ` Business Name:<b>${lead.business_name}</b><br>
              Contact Name:<b>${lead.first_name} ${lead.last_name}</b><br>
              Phone Number:<b>${lead.phone_number}</b><br>`,
        }).then((result) => {
          if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
          } else if (result.isDenied) {
            // Swal.fire("Changes are not saved", "", "info");
          }
        });
        const notificationData = {
          notification_title: "Call Back Reminder",
          call_back_date: reminder.call_back_date,
          user_id: reminder.user_id,
          created_by: this.currentUser.name,
          business_name: lead.business_name,
          contact_name: lead.first_name + " " + lead.last_name,
          phone_number: lead.phone_number,
        };
        this.addNotification(notificationData);
        this.firestore
          .delete("reminders", reminder.id)
          .then(() => {
            this.fetchRemindersData();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNotification(notification: any): void {
    this.firestore
      .addDatatoDb(notification, "notifications")
      .then(() => {
        console.log("Notification added successfully");
      })
      .catch((error) => {
        console.error("Error adding Notification: ", error);
      });
  }
}
