import dates from '../core/dates.js';
import bs from 'binary-search';
import { compare } from './movements';

/**
 * Helper class for list of movements ordered by date and time descending.
 *
 * The order is maintained when inserting into the array using the insert method
 * of this class.
 *
 * The order is not maintained if movements are inserted directly into the array
 * or if the date/time properties of the movements are changed.
 */
class MovementsArray {

  constructor(array) {
    this.array = [];
    this.keys = {}; // map for quick lookup (keys must be kept in sync with movements in the array)

    const arrCopy = array.slice();
    arrCopy.sort(compare);

    let index = 0;
    while (index < arrCopy.length) {
      this.insert(arrCopy[index++]);
    }
  }

  /**
   * Insert a movement into the array. The order of the array is maintained (by date and time).
   *
   * @param movement The movement to insert.
   * @returns {boolean} True, if the movement has been inserted (not present before), else false.
   */
  insert(movement) {
    if (!movement.key) throw new Error('Property "key" is missing');
    if (!movement.date) throw new Error('Property "date" is missing');
    if (!movement.time) throw new Error('Property "time" is missing');

    if (this.keys[movement.key] === undefined) {
      this.keys[movement.key] = dates.localToIsoUtc(movement.date, movement.time);
      let index = bs(this.array, movement, compare);
      if (index < 0) {
        index = (index + 1) * -1;
      }
      this.array.splice(index, 0, movement);

      return true;
    }

    return false;
  }
}

export default MovementsArray;
