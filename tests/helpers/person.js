export class Person {
  constructor({ name, ssn }) {
    this.name = name;
    this.ssn = ssn;
  }

  isEqual(other) {
    return this.ssn == other.ssn;
  }
}

const matchingSSN = '123-45-6789';

export const alice = new Person({ name: 'Alice', ssn: matchingSSN });
export const alice2 = new Person({ name: 'Alice 2', ssn: matchingSSN });
export const bob = new Person({ name: 'Bob', ssn: '999-99-9999' });
