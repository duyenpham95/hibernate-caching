import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { ValueStream } from './value-stream.model';
import { ValueStreamService } from './value-stream.service';

@Component({
    selector: 'jhi-value-stream-detail',
    templateUrl: './value-stream-detail.component.html'
})
export class ValueStreamDetailComponent implements OnInit, OnDestroy {

    valueStream: ValueStream;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private valueStreamService: ValueStreamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValueStreams();
    }

    load(id) {
        this.valueStreamService.find(id)
            .subscribe((valueStreamResponse: HttpResponse<ValueStream>) => {
                this.valueStream = valueStreamResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInValueStreams() {
        this.eventSubscriber = this.eventManager.subscribe(
            'valueStreamListModification',
            (response) => this.load(this.valueStream.id)
        );
    }
}
