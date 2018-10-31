import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Employee, JOB_TITLE_KITCHEN, AREA, STATUS } from '../shared/employee.model';
import { EmployeeKitchen } from '../shared/employee-kitchen.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Employee[] = [
  new EmployeeKitchen({
    name: 'a juliao',
    birthDate: new Date(2012, 8, 22),
    username: 'b',
    hireDate: new Date(),
    status: STATUS.ACTIVE,
    area: AREA.KITCHEN,
    jobTitle: JOB_TITLE_KITCHEN.CHEF,
    tipRate: .23
  } as EmployeeKitchen),
  new EmployeeKitchen({
    name: 'b juliao',
    birthDate: new Date(2010, 8, 22),
    username: 'a',
    hireDate: new Date(2017, 10, 12),
    status: STATUS.ACTIVE,
    area: AREA.KITCHEN,
    jobTitle: JOB_TITLE_KITCHEN.CHEF,
    tipRate: .23
  } as EmployeeKitchen)
];

/**
 * Data source for the EmployeesList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeesListDataSource extends DataSource<Employee> {
  data: Employee[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Employee[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Employee[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Employee[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'username': return compare(+a.username, +b.username, isAsc);
        case 'age': return compare(+a.age, +b.age, isAsc);
        case 'hireDate': return compare(+a.hireDate, +b.hireDate, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
