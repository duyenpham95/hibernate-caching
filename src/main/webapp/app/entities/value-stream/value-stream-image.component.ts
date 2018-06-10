import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils, JhiAlertService } from 'ng-jhipster';

import { Observable } from 'rxjs/Observable';
import { ValueStream } from './value-stream.model';
import { ValueStreamService } from './value-stream.service';
import * as d3 from 'd3';
import * as jQuery from 'jquery';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValueStreamElementService } from '../value-stream-element/value-stream-element.service';
import { ValueStreamElement } from '../value-stream-element/value-stream-element.model';
import { ValueStreamTag } from '../value-stream-tag/value-stream-tag.model';
@Component({
    selector: 'jhi-value-stream-image',
    templateUrl: './value-stream-image.component.html',
    styleUrls: ['./value-stream-image.component.css']
})
export class ValueStreamImageComponent implements OnInit, OnDestroy {

    valueStream: ValueStream;
    valueStreamElements: ValueStreamElement[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private valueStreamService: ValueStreamService,
        private route: ActivatedRoute,
        private valueStreamElementService: ValueStreamElementService,
        public dialog: MatDialog,
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInValueStreams();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    loadData() {
        return new Promise((resolve, reject) => {
            this.valueStreamElementService.query().subscribe(
                (res: HttpResponse<ValueStreamElement[]>) => {
                    resolve(res.body);
                },
                (res: HttpErrorResponse) => {
                    this.onError(res.message);
                    reject(res.message);
                }
            );
        });
    }

    openDialog(dialog, valueStream, valueStreamElements) {
        return dialog.open(ValueStreamTagDialogComponent, {
            width: '250px',
            data: {
                'valueStream': valueStream,
                'valueStreamElements': valueStreamElements
            }
        });
    }

    enableDrag() {
        console.log('hello');
        const width = jQuery('.photo-container > img').width();
        const height = jQuery('.photo-container > img').height();

        const svg = d3.select('.svg-container > svg')
            .attr('width', width)
            .attr('height', height)
            .on('mousedown', mousedown)
            .on('mouseup', mouseup);
        let rect, start;
        const self = this;
        const dialog = this.dialog;

        function mousedown() {
            start = d3.mouse(this);

            rect = svg.append('rect')
                .attr('x', start[0])
                .attr('y', start[1])
                .attr('height', 0)
                .attr('width', 0)
                .attr('class', 'rect_temp')
                .style('stroke', 'darkgrey')
                .style('fill', 'none')
                .style('stroke-width', '3px');
            svg.on('mousemove', mousemove);
        }

        function mousemove(d) {
            const end = d3.mouse(this);
            rect.attr('width', Math.abs(end[0] - start[0]))
                .attr('height', Math.abs(end[1] - start[1]));

            if (end[0] < start[0]) {
                rect.attr('x', end[0]);
            }

            if (end[1] < start[1]) {
                rect.attr('y', end[1]);
            }
        }
        function mouseup() {
            svg.on('mousemove', null);
            console.log(rect.attr('width'));
            console.log(rect.attr('height'));
            console.log(rect.attr('x'));
            console.log(rect.attr('y'));

            const valueStreamTag = new ValueStreamTag();
            valueStreamTag.x = +rect.attr('x');
            valueStreamTag.y = +rect.attr('y');
            valueStreamTag.width = +rect.attr('width');
            valueStreamTag.height = +rect.attr('height');
            valueStreamTag.valueStream = new ValueStream();
            valueStreamTag.valueStream.id = self.valueStream.id;

            if (self.valueStream.valueStreamTags === undefined) {
                self.valueStream.valueStreamTags = new Array();
            }
            self.valueStream.valueStreamTags.push(valueStreamTag);

            $('.rect_temp').remove();
            self.loadData().then((response) => {
                const dialogRef = self.openDialog(self.dialog, self.valueStream, response);
                dialogRef.afterClosed().subscribe((result) => {
                    console.log('The dialog was closed ' + result);

                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    load(id) {
        this.valueStreamService.find(id)
            .subscribe((valueStreamResponse: HttpResponse<ValueStream>) => {
                this.valueStream = valueStreamResponse.body;
                console.log(this.valueStream);
                console.log(this.valueStream.valueStreamTags);
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
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

@Component({
    selector: 'jhi-value-stream-tag-dialog',
    templateUrl: './value-stream-tag-dialog.component.html'
})
export class ValueStreamTagDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ValueStreamTagDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            this.dialogRef.disableClose = true;
        }

    closeDialog(): void {
        this.dialogRef.close();
    }
}
