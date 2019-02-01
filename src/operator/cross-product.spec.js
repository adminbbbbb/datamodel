/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { crossProduct } from './cross-product';
import DataModel from '../index';

const data1 = [
    { profit: 10, sales: 20, city: 'a' },
    { profit: 15, sales: 25, city: 'b' },
];
const schema1 = [
    { name: 'profit', type: 'measure' },
    { name: 'sales', type: 'measure' },
    { name: 'city', type: 'dimension' },
];
const data2 = [
    { population: 200, city: 'a' },
    { population: 250, city: 'b' },
];
const schema2 = [
    { name: 'population', type: 'measure' },
    { name: 'city', type: 'dimension' },
];

describe('CrossProduct Functionality', () => {
    describe('#crossProduct', () => {
        it('should perform crossProduct on two datamodels', () => {
            const dataModel1 = new DataModel(data1, schema1, { name: 'ModelA' });
            const dataModel2 = new DataModel(data2, schema2, { name: 'ModelB' });
            const crossDataModel = crossProduct(dataModel1, dataModel2);
            expect(crossDataModel.getData()).to.deep.equal({
                schema: [
                { name: 'profit', type: 'measure', subtype: 'continuous' },
                { name: 'sales', type: 'measure', subtype: 'continuous' },
                { name: 'ModelA.city', type: 'dimension', subtype: 'categorical' },
                { name: 'population', type: 'measure', subtype: 'continuous' },
                { name: 'ModelB.city', type: 'dimension', subtype: 'categorical' },
                ],
                data: [
                [10, 20, 'a', 200, 'a'],
                [10, 20, 'a', 250, 'b'],
                [15, 25, 'b', 200, 'a'],
                [15, 25, 'b', 250, 'b'],
                ],
                uids: [0, 1, 2, 3]
            });
        });
        it('should perform crossProduct on two datamodels with given filterFn', () => {
            const dataModel1 = new DataModel(data1, schema1, { name: 'ModelA' });
            const dataModel2 = new DataModel(data2, schema2, { name: 'ModelB' });
            const crossDataModel = crossProduct(dataModel1, dataModel2,
                (dmFields1, dmFields2) => dmFields1.city.value === dmFields2.city.value, true);

            expect(crossDataModel.getData()).to.deep.equal({
                schema: [
                { name: 'profit', type: 'measure', subtype: 'continuous' },
                { name: 'sales', type: 'measure', subtype: 'continuous' },
                { name: 'city', type: 'dimension', subtype: 'categorical' },
                { name: 'population', type: 'measure', subtype: 'continuous' },
                ],
                data: [
                [10, 20, 'a', 200],
                [15, 25, 'b', 250],
                ],
                uids: [0, 1]
            });
        });

        it('should throw an error if two datamodels have the same name', () => {
            const dataModel1 = new DataModel(data1, schema1, { name: 'ModelA' });
            const dataModel2 = new DataModel(data2, schema2, { name: 'ModelA' });
            const mockedCrossProductFn = () => crossProduct(dataModel1, dataModel2,
                (dmFields1, dmFields2) => dmFields1.city.value === dmFields2.city.value, true);

            expect(mockedCrossProductFn).to.throw('DataModels must have different alias names');
        });
    });
});
