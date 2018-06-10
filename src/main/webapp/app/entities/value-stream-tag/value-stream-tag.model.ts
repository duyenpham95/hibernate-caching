import { BaseEntity } from './../../shared';

export class ValueStreamTag implements BaseEntity {
    constructor(
        public id?: number,
        public tagName?: string,
        public x?: number,
        public y?: number,
        public height?: number,
        public width?: number,
        public valueStream?: BaseEntity,
    ) {
    }
}
