import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStream } from './value-stream.model';
import { ValueStreamPopupService } from './value-stream-popup.service';
import { ValueStreamService } from './value-stream.service';

@Component({
    selector: 'jhi-value-stream-delete-dialog',
    templateUrl: './value-stream-delete-dialog.component.html'
})
export class ValueStreamDeleteDialogComponent {

    valueStream: ValueStream;

    constructor(
        private valueStreamService: ValueStreamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valueStreamService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valueStreamListModification',
                content: 'Deleted an valueStream'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-value-stream-delete-popup',
    template: ''
})
export class ValueStreamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamPopupService: ValueStreamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valueStreamPopupService
                .open(ValueStreamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
