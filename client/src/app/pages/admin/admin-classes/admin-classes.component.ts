import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
export interface Classes {
  _id: string;
  name: string;
}
@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent {

  isVisible = false;

  classes: Classes[] = [];
  newClass: Partial<Classes> = {
    name: '',
  }

  constructor(private router: Router, private modal: NzModalService, private service: Service) { }
  ngOnInit(): void {
    this.fetchClasses();
  }
  fetchClasses(): void {
    this.service.getClasses()
      .subscribe(
        response => {
          console.log(response)
          this.classes = response.classes;
          console.log(this.classes)
        },
        error => {
          console.error('Error fetching classes:', error);
          // Handle error, show error message, etc.
        }

      );
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');

    this.service.createClass(this.newClass)
      .subscribe(
        response => {
          console.log('Class created successfully:', response);
          this.isVisible = false;
          this.fetchClasses();
          this.newClass = { name: '' };        },
        error => {
          console.error('Error creating class:', error);
        }
      )
  
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  navigateToClassDetail(classDetail: Classes): void {
    const className = encodeURIComponent(classDetail.name);
    const classId = classDetail._id;
    this.router.navigate([`/admin/class-detail/${className}`], { queryParams: { id: classId } });
  }
}

