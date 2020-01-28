/**
 * DimensionSubtype enum defines the sub types of the Dimensional Field.
 *
 * @readonly
 * @enum {string}
 */
const DimensionSubtype = {
    CATEGORICAL: 'categorical',
    TEMPORAL: 'temporal',
    BINNED: 'binned',
    ID: '__id'
};

export default DimensionSubtype;
