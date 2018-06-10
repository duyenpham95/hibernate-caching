import { BaseEntity } from './../../shared';

export class ValueStream implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public imageContentType?: string,
        public image?: any,
        public valueStreamTags?: BaseEntity[],
    ) {
    }
}
