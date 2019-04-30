/**
 * The wrapper class on top of the primitive value of a field.
 *
 * @todo Need to have support for StringValue, NumberValue, DateTimeValue
 * and GeoValue. These types should expose predicate API mostly.
 */
class Value {

  /**
   * Creates new Value instance.
   *
   * @param {*} val - the primitive value from the field cell.
   * @param {string | Field} field - The field from which the value belongs.
   */
    constructor (parsedVal, val, field) {
        const descriptorConfig = {
            enumerable: false,
            configurable: false,
            writable: false,
        };
        Object.defineProperties(this, {
            _value: {
                ...descriptorConfig,
                value: val
            },
            _parsedValue: {
                ...descriptorConfig,
                value: parsedVal
            }
        });

        this.field = field;
    }

  /**
   * Returns the field value.
   *
   * @return {*} Returns the current value.
   */
    get value () {
        return this._value;
    }

    get parsedValue () {
        return this._parsedValue;
    }

  /**
   * Converts to human readable string.
   *
   * @override
   * @return {string} Returns a human readable string of the field value.
   *
   */
    toString () {
        return String(this.value);
    }

  /**
   * Returns the value of the field.
   *
   * @override
   * @return {*} Returns the field value.
   */
    valueOf () {
        return this.value;
    }
}

export default Value;
