import { LoadingService } from './../../../../core/services/loading.service';
import { Observable } from 'rxjs';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { User } from 'src/app/shared/interfaces/user';
import { UsersListService } from '../../services/users-list.service';

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

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private router: Router, public usersListService: UsersListService, public usersService: UsersService) {
    this.users$ = usersListService.users$;
    this.total$ = usersListService.total$;
   }

  ngOnInit(): void {
    this.path = this.router.url.split('/').slice(1);
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

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id).subscribe(res => res);
  }

}
