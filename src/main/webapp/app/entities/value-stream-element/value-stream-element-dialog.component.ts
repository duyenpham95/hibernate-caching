import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ValueStreamElement } from './value-stream-element.model';
import { ValueStreamElementPopupService } from './value-stream-element-popup.service';
import { ValueStreamElementService } from './value-stream-element.service';

@Component({
    selector: 'jhi-value-stream-element-dialog',
    templateUrl: './value-stream-element-dialog.component.html'
})
export class ValueStreamElementDialogComponent implements OnInit {

    valueStreamElement: ValueStreamElement;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private valueStreamElementService: ValueStreamElementService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valueStreamElement.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valueStreamElementService.update(this.valueStreamElement));
        } else {
            this.subscribeToSaveResponse(
                this.valueStreamElementService.create(this.valueStreamElement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ValueStreamElement>>) {
        result.subscribe((res: HttpResponse<ValueStreamElement>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ValueStreamElement) {
        this.eventManager.broadcast({ name: 'valueStreamElementListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-value-stream-element-popup',
    template: ''
})
export class ValueStreamElementPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamElementPopupService: ValueStreamElementPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valueStreamElementPopupService
                    .open(ValueStreamElementDialogComponent as Component, params['id']);
            } else {
                this.valueStreamElementPopupService
                    .open(ValueStreamElementDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
