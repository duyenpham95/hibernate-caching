import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValueStreamTag } from './value-stream-tag.model';
import { ValueStreamTagPopupService } from './value-stream-tag-popup.service';
import { ValueStreamTagService } from './value-stream-tag.service';
import { ValueStream, ValueStreamService } from '../value-stream';

@Component({
    selector: 'jhi-value-stream-tag-dialog',
    templateUrl: './value-stream-tag-dialog.component.html'
})
export class ValueStreamTagDialogComponent implements OnInit {

    valueStreamTag: ValueStreamTag;
    isSaving: boolean;

    valuestreams: ValueStream[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private valueStreamTagService: ValueStreamTagService,
        private valueStreamService: ValueStreamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.valueStreamService.query()
            .subscribe((res: HttpResponse<ValueStream[]>) => { this.valuestreams = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.valueStreamTag.id !== undefined) {
            this.subscribeToSaveResponse(
                this.valueStreamTagService.update(this.valueStreamTag));
        } else {
            this.subscribeToSaveResponse(
                this.valueStreamTagService.create(this.valueStreamTag));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ValueStreamTag>>) {
        result.subscribe((res: HttpResponse<ValueStreamTag>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ValueStreamTag) {
        this.eventManager.broadcast({ name: 'valueStreamTagListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackValueStreamById(index: number, item: ValueStream) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-value-stream-tag-popup',
    template: ''
})
export class ValueStreamTagPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private valueStreamTagPopupService: ValueStreamTagPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.valueStreamTagPopupService
                    .open(ValueStreamTagDialogComponent as Component, params['id']);
            } else {
                this.valueStreamTagPopupService
                    .open(ValueStreamTagDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
