import { BaseEntity } from './../../shared';

export class ValueStreamElement implements BaseEntity {
    constructor(
        public id?: number,
        public elementName?: string,
    ) {
    }
}
