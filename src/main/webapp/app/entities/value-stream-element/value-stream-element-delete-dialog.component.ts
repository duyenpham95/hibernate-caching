import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStreamElement } from './value-stream-element.model';
import { ValueStreamElementPopupService } from './value-stream-element-popup.service';
import { ValueStreamElementService } from './value-stream-element.service';

@Component({
    selector: 'jhi-value-stream-element-delete-dialog',
    templateUrl: './value-stream-element-delete-dialog.component.html'
})
export class ValueStreamElementDeleteDialogComponent {

    valueStreamElement: ValueStreamElement;

    constructor(
        private valueStreamElementService: ValueStreamElementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valueStreamElementService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valueStreamElementListModification',
                content: 'Deleted an valueStreamElement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-value-stream-element-delete-popup',
    template: ''
})
export class ValueStreamElementDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamElementPopupService: ValueStreamElementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valueStreamElementPopupService
                .open(ValueStreamElementDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
