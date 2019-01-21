import FieldParser from '../field-parser';
import InvalidAwareTypes from '../../../invalid-aware-types';

/**
 * A FieldParser which parses the categorical values.
 *
 * @public
 * @class
 * @implements {FieldParser}
 */
export default class CategoricalParser extends FieldParser {
  /**
   * Parses a single value of a field and returns the stringified form.
   *
   * @public
   * @param {string|number} val - The value of the field.
   * @return {string} Returns the stringified value.
   */
    parse (val) {
        let result;
        // check if invalid date value
        if (!InvalidAwareTypes.isInvalid(val)) {
            result = String(val).trim();
        } else {
            result = InvalidAwareTypes.getInvalidType(val);
        }
        return result;
    }
}
