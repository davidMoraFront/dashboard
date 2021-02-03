import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { User } from '../../../shared/interfaces/user';
import { retry, catchError, tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/sortable.directive';
import { Config } from 'src/app/core/config/config';

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
export class UsersService {
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

  constructor(private http: HttpClient) {
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

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let users = sort(this.allUsers, sortColumn, sortDirection);

    // 2. filter
    users = users.filter(user => matches(user, searchTerm));
    const total = users.length;

    // 3. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  allUsers = this.getUsers().subscribe(res => this.allUsers = res);



  // HttpClient API get() method => Fetch users list
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(Config.apiURL + '/users')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch user
  getUser(id: number): Observable<User> {
    return this.http.get<User>(Config.apiURL + '/users/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

  
}
