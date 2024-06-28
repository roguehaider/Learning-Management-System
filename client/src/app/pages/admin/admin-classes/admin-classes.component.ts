import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Service } from 'src/app/services/service';
export interface Classes {
  id: string;
  name: string;
  mobile: string;
  salary: string;
  joiningDate: string;
}
@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent {

  isVisible = false;

  classes: Classes[] = [ ];
  constructor(private router: Router,private modal: NzModalService, private service: Service) {}
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

  navigateToAdd() {
    this.router.navigate(['/admin/add-teacher']); 
  }

  showDeleteConfirm(name: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure remove ${name}?`,
      // nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}

