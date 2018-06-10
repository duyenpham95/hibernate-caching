import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ValueStreamComponent } from './value-stream.component';
import { ValueStreamDetailComponent } from './value-stream-detail.component';
import { ValueStreamPopupComponent } from './value-stream-dialog.component';
import { ValueStreamDeletePopupComponent } from './value-stream-delete-dialog.component';
import { ValueStreamImageComponent } from './value-stream-image.component';
@Injectable()
export class ValueStreamResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const valueStreamRoute: Routes = [
    {
        path: 'value-stream',
        component: ValueStreamComponent,
        resolve: {
            'pagingParams': ValueStreamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'value-stream/:id',
        component: ValueStreamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'value-stream/vsd-image/:id',
        component: ValueStreamImageComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valueStreamPopupRoute: Routes = [
    {
        path: 'value-stream-new',
        component: ValueStreamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream/:id/edit',
        component: ValueStreamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream/:id/delete',
        component: ValueStreamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreams'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
