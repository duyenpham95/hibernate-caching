import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ValueStreamTag } from './value-stream-tag.model';
import { ValueStreamTagService } from './value-stream-tag.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-value-stream-tag',
    templateUrl: './value-stream-tag.component.html'
})
export class ValueStreamTagComponent implements OnInit, OnDestroy {
valueStreamTags: ValueStreamTag[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private valueStreamTagService: ValueStreamTagService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.valueStreamTagService.query().subscribe(
            (res: HttpResponse<ValueStreamTag[]>) => {
                this.valueStreamTags = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInValueStreamTags();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ValueStreamTag) {
        return item.id;
    }
    registerChangeInValueStreamTags() {
        this.eventSubscriber = this.eventManager.subscribe('valueStreamTagListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
