import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Service } from 'src/app/services/service';

@Component({
  selector: 'app-student-chat',
  templateUrl: './student-chat.component.html',
  styleUrls: ['./student-chat.component.scss']
})
export class StudentChatComponent {
  chats: any[] = [];
  users: any;
  latestMessageId: string = '';
  content: string = '';

  isVisible = false;
  addChat = false;
  isConfirmLoading = false;
  coursesVisible = false;
  newChat = false;

 
  selectedChat: any;
  messages: any;
  courses: any;
  teachers: any;
  courseDetails: any
  visibleCourses: { [key: string]: boolean } = {};
  newChatTeacher: any;

  user =this.authService.getUserDetails();

  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  constructor(private service: Service, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadChats();
  }


  loadChats(): void {
    this.service.getChat().subscribe(
      (response) => {
        this.chats = response.chats;
      },
      (error) => {
        console.error('Error fetching chats:', error);
      }
    );
  }
  
  navigateToMessages(chat: any): void {
    const name = `${chat.Fname} ${chat.Lname}`;

    this.router.navigate([`/teacher/chat/${chat}`], {
      queryParams: { id: chat._id, name: name },
    });
  }

  sendMessage(): void {
    if (!this.selectedChat || !this.content.trim()) return;

    // Find the other user in the chat
  const otherUser = this.selectedChat.users.find((user: any) => user._id !== this.user._id);

    this.service.sendMessage(this.selectedChat._id, this.content, otherUser._id).subscribe(
      (response) => {
        this.content = ''; 
        console.log(response);
        this.loadMessages(this.selectedChat._id);
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }

  openChat(chat: any): void {
    this.selectedChat = '';
    this.selectedChat = chat;
    this.isVisible = true;
    this.loadMessages(chat._id);

  }

  loadMessages(chatId: string): void {
    this.service.getMessagesByChatId(chatId).subscribe(
      (response) => {
        this.messages = response.messages;
        this.scrollToBottom();
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getInitials(fname: string, lname: string): string {
    return `${fname.charAt(0)}${lname.charAt(0)}`.toUpperCase();
  }

  isHighlighted(chatId: string): boolean {
    return chatId === this.latestMessageId;
  }


  getChatName(chat: any): string {
    // Assuming `this.users` contains the logged-in user's information
    const otherUser = chat.users.find((user: any) => user._id !== this.user._id);
    return `${otherUser.Fname} ${otherUser.Lname}`;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }

  //add chat

  addChatModal(): void {
    this.fetchTeachers();
    this.addChat = true;
  }

  addChatCancel(): void{
    
    this.addChat = false;
  }


  fetchTeachers(): void {
    this.service.getTeachersforChat().subscribe(
      (response) => {
        const teachers = response.courseTeacherData;
  
        // Filter out teachers who are already in the chat users
        this.teachers = teachers.filter((teacher: any) => {
          // Check if the teacher's ID exists in any of the chat's users
          return !this.chats.some(chat =>
            chat.users.some((user: any) => user._id === teacher.teacherId)
          );
        });
  
        console.log("Filtered teachers:", this.teachers);
      },
      (error) => {
        console.error('Error fetching teachers:', error);
      }
    );
  }
  
  
  toggleCourseVisibility(course: any): void {
    // Close all other courses
    this.visibleCourses = {}; 

    // Toggle the visibility of the selected course
    this.visibleCourses[course._id] = !this.visibleCourses[course._id];

    if (this.visibleCourses[course._id]) {
      this.fetchTeachers();
    }
  }

  isCourseVisible(courseId: string): boolean {
    
    return this.visibleCourses[courseId] || false;
  }

  newChatModal(teacher: any){
    this.addChat = false;
    this.newChatTeacher = teacher
    console.log("selected student", teacher)
    this.newChat = true;
  }

  newChatCancel(){
    this.newChatTeacher = '';
    this.newChat = false;
  }

  newMessage(): void {
    if (!this.newChatTeacher || !this.content.trim()) return;

    this.service.newMessage(this.content, this.newChatTeacher.teacherId).subscribe(
      (response) => {
        this.content = ''; 
        console.log(response);
        this.loadChats();
        this.loadMessages(this.newChatTeacher.teacherId);
        this.newChat = false;
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
 

}
