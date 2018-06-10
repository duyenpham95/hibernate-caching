import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayValueStreamModule } from './value-stream/value-stream.module';
import { GatewayValueStreamElementModule } from './value-stream-element/value-stream-element.module';
import { GatewayValueStreamTagModule } from './value-stream-tag/value-stream-tag.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayValueStreamModule,
        GatewayValueStreamElementModule,
        GatewayValueStreamTagModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
