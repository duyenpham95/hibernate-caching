import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ValueStreamElementComponent } from './value-stream-element.component';
import { ValueStreamElementDetailComponent } from './value-stream-element-detail.component';
import { ValueStreamElementPopupComponent } from './value-stream-element-dialog.component';
import { ValueStreamElementDeletePopupComponent } from './value-stream-element-delete-dialog.component';

export const valueStreamElementRoute: Routes = [
    {
        path: 'value-stream-element',
        component: ValueStreamElementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamElements'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'value-stream-element/:id',
        component: ValueStreamElementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamElements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valueStreamElementPopupRoute: Routes = [
    {
        path: 'value-stream-element-new',
        component: ValueStreamElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamElements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream-element/:id/edit',
        component: ValueStreamElementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamElements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream-element/:id/delete',
        component: ValueStreamElementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamElements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
