import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ValueStreamElementService,
    ValueStreamElementPopupService,
    ValueStreamElementComponent,
    ValueStreamElementDetailComponent,
    ValueStreamElementDialogComponent,
    ValueStreamElementPopupComponent,
    ValueStreamElementDeletePopupComponent,
    ValueStreamElementDeleteDialogComponent,
    valueStreamElementRoute,
    valueStreamElementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...valueStreamElementRoute,
    ...valueStreamElementPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ValueStreamElementComponent,
        ValueStreamElementDetailComponent,
        ValueStreamElementDialogComponent,
        ValueStreamElementDeleteDialogComponent,
        ValueStreamElementPopupComponent,
        ValueStreamElementDeletePopupComponent,
    ],
    entryComponents: [
        ValueStreamElementComponent,
        ValueStreamElementDialogComponent,
        ValueStreamElementPopupComponent,
        ValueStreamElementDeleteDialogComponent,
        ValueStreamElementDeletePopupComponent,
    ],
    providers: [
        ValueStreamElementService,
        ValueStreamElementPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayValueStreamElementModule {}
