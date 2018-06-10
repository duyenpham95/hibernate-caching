import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ValueStreamTagService,
    ValueStreamTagPopupService,
    ValueStreamTagComponent,
    ValueStreamTagDetailComponent,
    ValueStreamTagDialogComponent,
    ValueStreamTagPopupComponent,
    ValueStreamTagDeletePopupComponent,
    ValueStreamTagDeleteDialogComponent,
    valueStreamTagRoute,
    valueStreamTagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...valueStreamTagRoute,
    ...valueStreamTagPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ValueStreamTagComponent,
        ValueStreamTagDetailComponent,
        ValueStreamTagDialogComponent,
        ValueStreamTagDeleteDialogComponent,
        ValueStreamTagPopupComponent,
        ValueStreamTagDeletePopupComponent,
    ],
    entryComponents: [
        ValueStreamTagComponent,
        ValueStreamTagDialogComponent,
        ValueStreamTagPopupComponent,
        ValueStreamTagDeleteDialogComponent,
        ValueStreamTagDeletePopupComponent,
    ],
    providers: [
        ValueStreamTagService,
        ValueStreamTagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayValueStreamTagModule {}
