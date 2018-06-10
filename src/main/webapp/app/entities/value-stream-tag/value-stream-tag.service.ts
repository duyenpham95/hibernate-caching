import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ValueStreamTag } from './value-stream-tag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ValueStreamTag>;

@Injectable()
export class ValueStreamTagService {

    private resourceUrl =  SERVER_API_URL + 'main/api/value-stream-tags';

    constructor(private http: HttpClient) { }

    create(valueStreamTag: ValueStreamTag): Observable<EntityResponseType> {
        const copy = this.convert(valueStreamTag);
        return this.http.post<ValueStreamTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(valueStreamTag: ValueStreamTag): Observable<EntityResponseType> {
        const copy = this.convert(valueStreamTag);
        return this.http.put<ValueStreamTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ValueStreamTag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ValueStreamTag[]>> {
        const options = createRequestOption(req);
        return this.http.get<ValueStreamTag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ValueStreamTag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ValueStreamTag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ValueStreamTag[]>): HttpResponse<ValueStreamTag[]> {
        const jsonResponse: ValueStreamTag[] = res.body;
        const body: ValueStreamTag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ValueStreamTag.
     */
    private convertItemFromServer(valueStreamTag: ValueStreamTag): ValueStreamTag {
        const copy: ValueStreamTag = Object.assign({}, valueStreamTag);
        return copy;
    }

    /**
     * Convert a ValueStreamTag to a JSON which can be sent to the server.
     */
    private convert(valueStreamTag: ValueStreamTag): ValueStreamTag {
        const copy: ValueStreamTag = Object.assign({}, valueStreamTag);
        return copy;
    }
}
