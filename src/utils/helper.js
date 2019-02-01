import { DataFormat } from '../enums';

/**
 * Checks whether the value is an array.
 *
 * @param  {*} val - The value to be checked.
 * @return {boolean} Returns true if the value is an array otherwise returns false.
 */
export function isArray (val) {
    return Array.isArray(val);
}

/**
 * Checks whether the value is an object.
 *
 * @param  {*} val - The value to be checked.
 * @return {boolean} Returns true if the value is an object otherwise returns false.
 */
export function isObject (val) {
    return val === Object(val);
}

/**
 * Checks whether the value is a string value.
 *
 * @param  {*} val - The value to be checked.
 * @return {boolean} Returns true if the value is a string value otherwise returns false.
 */
export function isString (val) {
    return typeof val === 'string';
}

/**
 * Checks whether the value is callable.
 *
 * @param {*} val - The value to be checked.
 * @return {boolean} Returns true if the value is callable otherwise returns false.
 */
export function isCallable (val) {
    return typeof val === 'function';
}

/**
 * Returns the unique values from the input array.
 *
 * @param {Array} data - The input array.
 * @return {Array} Returns a new array of unique values.
 */
export function uniqueValues (data) {
    return [...new Set(data)];
}

export const getUniqueId = () => `id-${new Date().getTime()}${Math.round(Math.random() * 10000)}`;

/**
 * Checks Whether two arrays have same content.
 *
 * @param {Array} arr1 - The first array.
 * @param {Array} arr2 - The 2nd array.
 * @return {boolean} Returns whether two array have same content.
 */
export function isArrEqual(arr1, arr2) {
    if (!isArray(arr1) || !isArray(arr2)) {
        return arr1 === arr2;
    }

    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

/**
 * It is the default number format function for the measure field type.
 *
 * @param {any} val - The input value.
 * @return {number} Returns a number value.
 */
export function formatNumber(val) {
    return val;
}

/**
 * Returns the detected data format.
 *
 * @param {any} data - The input data to be tested.
 * @return {string} Returns the data format name.
 */
export const detectDataFormat = (data) => {
    if (isString(data)) {
        return DataFormat.DSV_STR;
    } else if (isArray(data) && isArray(data[0])) {
        return DataFormat.DSV_ARR;
    } else if (isArray(data) && (data.length === 0 || isObject(data[0]))) {
        return DataFormat.FLAT_JSON;
    }
    return null;
};
