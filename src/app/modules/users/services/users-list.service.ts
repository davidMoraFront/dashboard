import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { User } from '../../../shared/interfaces/user';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/sortable.directive';

interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number | Object, v2: string | number | Object) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(users: User[], column: SortColumn, direction: string): User[] {
  if (direction === '' || column === '') {
    return users;
  } else if (column.includes('.')) {
    let arraySub = column.split('.');
    let col = arraySub[0];
    let subColumn = arraySub[arraySub.length - 1];
    return [...users].sort((a, b) => {
      const res = compare(Object(a[col])[subColumn], Object(b[col])[subColumn]);
      return direction === 'asc' ? res : -res;
    });
  } else {
    return [...users].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(user: User, term: string) {
  return user.name.toLowerCase().includes(term.toLowerCase())
    || user.email.toLowerCase().includes(term.toLowerCase())
    || user.address.city.toLowerCase().includes(term.toLowerCase())
    || user.company.companyName.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class UsersListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient, private userService: UsersService) {}

  load(res: User[]) {
    setTimeout(() => {
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });
      this._search$.next();
    });
    this.allUsers = res;
  }

  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  allUsers = this.userService.getUsers().subscribe(res => this.allUsers = res);

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    console.log(this.allUsers);
    
    

    // 1. sort
    let users = sort(this.allUsers, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }
}
