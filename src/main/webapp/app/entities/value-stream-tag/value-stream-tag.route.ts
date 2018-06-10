import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ValueStreamTagComponent } from './value-stream-tag.component';
import { ValueStreamTagDetailComponent } from './value-stream-tag-detail.component';
import { ValueStreamTagPopupComponent } from './value-stream-tag-dialog.component';
import { ValueStreamTagDeletePopupComponent } from './value-stream-tag-delete-dialog.component';

export const valueStreamTagRoute: Routes = [
    {
        path: 'value-stream-tag',
        component: ValueStreamTagComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamTags'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'value-stream-tag/:id',
        component: ValueStreamTagDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamTags'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const valueStreamTagPopupRoute: Routes = [
    {
        path: 'value-stream-tag-new',
        component: ValueStreamTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream-tag/:id/edit',
        component: ValueStreamTagPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'value-stream-tag/:id/delete',
        component: ValueStreamTagDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ValueStreamTags'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
