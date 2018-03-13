/* global describe, it */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import Measure from './measure';
// import Dimension from './dimension';
// import DateTime from './datetime';

describe('Checking clone functionality of the Fields', () => {
    it('Measure ', () => {
        const schema = {
                a: 1,
                b: 2,
            },
            data = [10, 20, 30],
            name = 'demoMeasure',
            measure = new Measure(name, data, schema),
            cloneMeasure = measure.clone(),
            newData = [15, 25, 35],
            newCloneMeasure = measure.clone(newData);

        expect(cloneMeasure instanceof Measure).to.be.true;
        expect(cloneMeasure.data).to.deep.equal(data);
        expect(cloneMeasure.schema).to.deep.equal(schema);

        schema.a = 5;
        data[0] = 100;
        expect(cloneMeasure.schema.a).to.deep.equal(1);
        expect(cloneMeasure.data[0]).to.deep.equal(10);
        expect(newCloneMeasure.data).to.deep.equal(newData);
    });
});