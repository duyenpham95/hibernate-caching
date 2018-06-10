import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStreamTag } from './value-stream-tag.model';
import { ValueStreamTagPopupService } from './value-stream-tag-popup.service';
import { ValueStreamTagService } from './value-stream-tag.service';

@Component({
    selector: 'jhi-value-stream-tag-delete-dialog',
    templateUrl: './value-stream-tag-delete-dialog.component.html'
})
export class ValueStreamTagDeleteDialogComponent {

    valueStreamTag: ValueStreamTag;

    constructor(
        private valueStreamTagService: ValueStreamTagService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.valueStreamTagService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'valueStreamTagListModification',
                content: 'Deleted an valueStreamTag'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-value-stream-tag-delete-popup',
    template: ''
})
export class ValueStreamTagDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamTagPopupService: ValueStreamTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.valueStreamTagPopupService
                .open(ValueStreamTagDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
