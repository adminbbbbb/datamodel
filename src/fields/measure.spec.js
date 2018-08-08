/* global describe, it, beforeEach */
/* eslint-disable no-unused-expressions */

import { expect } from 'chai';
import { FieldType } from 'muze-util';
import Measure from './measure';

describe('Measure Field Type', () => {
    const schema = {
        name: 'Miles_per_Gallon',
        type: FieldType.MEASURE,
        unit: 'cm',
        scale: '1000',
        numberformat: '12-3-3',
        description: 'This is description',
        defAggFn: () => {}
    };
    const data = [1, 3, 4, 78];
    let field;

    beforeEach(() => {
        field = new Measure(schema.name, data, schema);
    });

    describe('#unit', () => {
        it('should implement unit getter methods', () => {
            expect(field.unit()).to.equal(schema.unit);
        });
    });

    describe('#scale', () => {
        it('should implement scale getter methods', () => {
            expect(field.scale()).to.equal(schema.scale);
        });
    });

    describe('#numberformat', () => {
        it('should implement numberformat getter methods', () => {
            expect(field.numberformat()).to.equal(schema.numberformat);
        });
    });

    describe('#defAggFn', () => {
        it('should implement defAggFn getter methods', () => {
            expect(field.defAggFn()).to.equal(schema.defAggFn);
        });
    });

    describe('#domain', () => {
        it('should return measure domain', () => {
            const domain = field.domain();
            expect(domain).to.deep.equal([1, 78]);
        });
    });

    describe('#parse', () => {
        it('should return number for parsable field value', () => {
            expect(field.parse('123')).to.equal(123);
        });

        it('should return null for non-parsable field value', () => {
            expect(field.parse('not-a-number')).to.null;
            expect(field.parse(NaN)).to.null;
        });
    });
});
