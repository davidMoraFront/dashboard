import { BreadcrumbService } from './../../../../shared/services/breadcrumb.service';
import { LoadingService } from './../../../../core/services/loading.service';
import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { User } from 'src/app/shared/interfaces/user';
import { UsersListService } from '../../services/users-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UsersService]
})
export class UsersListComponent implements OnInit {
  public path: Array<string>;
  users$: Observable<User[]>;
  total$: Observable<number>;
  title: string = 'Users list';
  
  userDeleteText: string = '';
  modalBody: string = 'Are you sure you want to delete the user ';
  modalTitle: string = 'User delete';

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private router: Router, 
    public usersListService: UsersListService, 
    public usersService: UsersService,
    private modalService: NgbModal,
    private breadcrumbService:BreadcrumbService) {
    this.users$ = usersListService.users$;
    this.total$ = usersListService.total$;
   }

  ngOnInit(): void {
    this.path = this.router.url.split('/').slice(1);
    this.breadcrumbService.set(this.path);
    setTimeout(() => {
      this.usersService.getUsers().subscribe((res: User[]) => this.usersListService.load(res));
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.usersListService.sortColumn = column;
    this.usersListService.sortDirection = direction;
  }

  openModal(user: User) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.modalTitle = this.title;
    modalRef.componentInstance.modalBody = this.modalBody + user.name;
    modalRef.componentInstance.data = user;
    modalRef.result.then(res => {
      if (res) {
        this.usersService.deleteUser(user.id).subscribe();
        this.usersService.getUsers().subscribe((res: User[]) => this.usersListService.load(res));
      }
    })
  }

}
