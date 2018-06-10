import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ValueStream } from './value-stream.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ValueStream>;

@Injectable()
export class ValueStreamService {

    private resourceUrl =  SERVER_API_URL + 'main/api/value-streams';

    constructor(private http: HttpClient) { }

    create(valueStream: ValueStream): Observable<EntityResponseType> {
        const copy = this.convert(valueStream);
        return this.http.post<ValueStream>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(valueStream: ValueStream): Observable<EntityResponseType> {
        const copy = this.convert(valueStream);
        return this.http.put<ValueStream>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ValueStream>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ValueStream[]>> {
        const options = createRequestOption(req);
        return this.http.get<ValueStream[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ValueStream[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ValueStream = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ValueStream[]>): HttpResponse<ValueStream[]> {
        const jsonResponse: ValueStream[] = res.body;
        const body: ValueStream[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ValueStream.
     */
    private convertItemFromServer(valueStream: ValueStream): ValueStream {
        const copy: ValueStream = Object.assign({}, valueStream);
        return copy;
    }

    /**
     * Convert a ValueStream to a JSON which can be sent to the server.
     */
    private convert(valueStream: ValueStream): ValueStream {
        const copy: ValueStream = Object.assign({}, valueStream);
        return copy;
    }
}
