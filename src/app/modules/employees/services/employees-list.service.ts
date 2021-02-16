import { EmployeesService } from './employees.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Employee } from '../../../shared/interfaces/employee';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { SortColumn, SortDirection } from 'src/app/shared/directives/sortable.directive';

interface SearchResult {
  employees: Employee[];
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

function sort(employees: Employee[], column: SortColumn, direction: string): Employee[] {
  if (direction === '' || column === '') {
    return employees;
  } else if (column.includes('.')) {
    let arraySub = column.split('.');
    let col = arraySub[0];
    let subColumn = arraySub[arraySub.length - 1];
    return [...employees].sort((a, b) => {
      const res = compare(Object(a[col])[subColumn], Object(b[col])[subColumn]);
      return direction === 'asc' ? res : -res;
    });
  } else {
    return [...employees].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(employee: Employee, term: string) {
  return employee.name.toLowerCase().includes(term.toLowerCase())
    || employee.email.toLowerCase().includes(term.toLowerCase())
    || employee.address.city.toLowerCase().includes(term.toLowerCase())
    || employee.company.companyName.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _employees$ = new BehaviorSubject<Employee[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private http: HttpClient, private employeeService: EmployeesService) {}

  load(res: Employee[]) {
    setTimeout(() => {
      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._employees$.next(result.employees);
        this._total$.next(result.total);
      });
      this._search$.next();
    });
    this.allEmployees = res;
  }

  get employees$() { return this._employees$.asObservable(); }
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

  allEmployees = this.employeeService.getEmployees().subscribe(res => this.allEmployees = res);

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    
    // 1. sort
    let employees = sort(this.allEmployees, sortColumn, sortDirection);

    // 2. filter
    employees = employees.filter(employee => matches(employee, searchTerm));
    const total = employees.length;

    // 3. paginate
    employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({employees, total});
  }
}
