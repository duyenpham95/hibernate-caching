import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ValueStreamService,
    ValueStreamPopupService,
    ValueStreamComponent,
    ValueStreamDetailComponent,
    ValueStreamDialogComponent,
    ValueStreamPopupComponent,
    ValueStreamDeletePopupComponent,
    ValueStreamDeleteDialogComponent,
    valueStreamRoute,
    valueStreamPopupRoute,
    ValueStreamResolvePagingParams,
    ValueStreamImageComponent,
    ValueStreamTagDialogComponent
} from './';
import { MaterialModule } from '../../material.module';

const ENTITY_STATES = [
    ...valueStreamRoute,
    ...valueStreamPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES),
        MaterialModule,
    ],
    declarations: [
        ValueStreamComponent,
        ValueStreamDetailComponent,
        ValueStreamDialogComponent,
        ValueStreamDeleteDialogComponent,
        ValueStreamPopupComponent,
        ValueStreamDeletePopupComponent,
        ValueStreamImageComponent,
        ValueStreamTagDialogComponent,
    ],
    entryComponents: [
        ValueStreamComponent,
        ValueStreamDialogComponent,
        ValueStreamPopupComponent,
        ValueStreamDeleteDialogComponent,
        ValueStreamDeletePopupComponent,
        ValueStreamImageComponent,
        ValueStreamTagDialogComponent,
    ],
    providers: [
        ValueStreamService,
        ValueStreamPopupService,
        ValueStreamResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayValueStreamModule {}
