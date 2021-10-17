import { defineProperty } from 'src/lib/object-property';
/**
 * CRUD on array fields with prisma has no builtin methods. This file aims to aggregate all array operations and reuse them.
 */

/**
 * Removes the item with the specified id from the list.
 * @returns the list without the
 * @usage organisation.products.removeById(5), removes the products with id 5.
 */

defineProperty({
  prototype: Array.prototype,
  name: 'removeById',
  value: function (id) {
    return this.filter((item) => item.id != id);
  },
});
// Object.defineProperty(Array.prototype, 'removeById', {
//   value: function (id) {
//     return this.filter((item) => item.id != id);
//   },
// });

/**
 * Removes items with the specified field equal to the value from the list.
 * @returns the list without the
 * @usage organisation.products.removeByField({field: currency, value: 'USD'}), removes all products with currency = 'USD'.
 */
defineProperty({
  prototype: Array.prototype,
  name: 'removeByField',
  value: function ({ field, value }) {
    return this.filter((item) => item[field] != value);
  },
});
// Object.defineProperty(Array.prototype, 'removeByField', {
//   value: function ({ field, value }) {
//     return this.filter((item) => item[field] != value);
//   },
// });
