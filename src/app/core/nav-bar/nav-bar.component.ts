import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getRouterState } from '../../store';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  title: string;

  parentRoute: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.pipe(
      select(getRouterState),
      filter(routerState => !!routerState),
    ).subscribe((routerState) => {
      const data = routerState.state.activatedRouteSnapshot.data;
      const activatedRouteSnapshot = routerState.state.activatedRouteSnapshot;

      if (activatedRouteSnapshot.url.length) {
        const parentUrl = activatedRouteSnapshot.parent.url
          .map(a => a.path)
          .join('/');

        this.parentRoute = parentUrl ? parentUrl : '/';
      } else {
        this.parentRoute = '';
      }

      this.title = data.title ? data.title : 'Team International Employees';
    });
  }

  ngOnInit() {
  }

}
