import Ember from 'ember';

const {
  Object: EmberObject
} = Ember;

export const Person = EmberObject.extend({
  isEqual(other) {
    return this.ssn == other.ssn;
  }
});

const matchingSSN = '123-45-6789';

export const alice = Person.create({ name: 'Alice', ssn: matchingSSN });
export const alice2 = Person.create({ name: 'Alice 2', ssn: matchingSSN });
export const bob = Person.create({ name: 'Bob', ssn: '999-99-9999' });
