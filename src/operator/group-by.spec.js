/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { getFieldArr, getReducerObj, groupBy } from './group-by';
import DataModel from '../index';
import { defReducer, fnList } from './group-by-function';

const data1 = [
    { profit: 10, sales: 20, city: 'a', state: 'aa' },
    { profit: 15, sales: 25, city: 'b', state: 'bb' },
    { profit: 10, sales: 20, city: 'a', state: 'ab' },
    { profit: 15, sales: 25, city: 'b', state: 'ba' },
];
const schema1 = [
    { name: 'city', type: 'dimension' },
    { name: 'state', type: 'dimension' },
    { name: 'profit', type: 'measure' },
    { name: 'sales', type: 'measure' },
];

describe('Test groupBy', () => {
    describe('#getFieldArr', () => {
        it('should return field data for the given fields', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            expect(getFieldArr(dataModel1, ['city', 'state'])).to.deep.equal(['city', 'state']);
        });
        it('should return all field data if no fields provided ', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            expect(getFieldArr(dataModel1)).to.deep.equal(['city', 'state']);
        });
        it('should return only valid fields if invalid fields provided', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            expect(getFieldArr(dataModel1, ['city', 'state', 'abc', 'profit'])).to
                            .deep.equal(['city', 'state']);
        });
    });

    describe('#getReducerObj', () => {
        it('should return default reducer', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            expect(getReducerObj(dataModel1)).to.deep.equal({
                profit: defReducer,
                sales: defReducer,
            });
        });
        it('should return default reducer when no reducer is passed in parameter', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            expect(getReducerObj(dataModel1, {})).to.deep.equal({
                profit: defReducer,
                sales: defReducer,
            });
        });
        it('should return given reducer passed in params', () => {
            const dataModel1 = new DataModel(data1, schema1, { name: 'ModelA' });
            expect(getReducerObj(dataModel1, {
                profit: 'avg'
            })).to.deep.equal({
                profit: fnList.avg,
                sales: fnList.sum,
            });
        });
    });

    describe('#groupBy', () => {
        it('should return a grouped dataModel', () => {
            const dataModel1 = (new DataModel(data1, schema1, { name: 'ModelA' }));
            const reqData = {
                schema: [
                { name: 'city', type: 'dimension', subtype: 'categorical' },
                { name: 'profit', type: 'measure', subtype: 'continuous' },
                { name: 'sales', type: 'measure', subtype: 'continuous' },
                ],
                data: [
                ['a', 20, 40],
                ['b', 30, 50],
                ],
                uids: [0, 1]
            };
            const compData = groupBy(dataModel1, ['city']).getData();
            expect(compData).to.deep.equal(reqData);
        });

        it('should return a grouped dataModel after projection', () => {
            const dataModel1 = new DataModel(data1, schema1, { name: 'ModelA' })
                .project(['city', 'sales']);

            const reqData = {
                schema: [
                { name: 'city', type: 'dimension', subtype: 'categorical' },
                { name: 'sales', type: 'measure', subtype: 'continuous' },
                ],
                data: [
                ['a', 40],
                ['b', 50],
                ],
                uids: [0, 1]
            };
            const compData = groupBy(dataModel1, ['city']).getData();
            expect(compData).to.deep.equal(reqData);
        });
    });
});
