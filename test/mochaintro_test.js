const assert =  require('assert');

class Car {

    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom'
    }
}

let car;
beforeEach(() => {
    car = new Car();
});

describe('Car Test',() => {
  it('can park', () => {
    assert.equal(car.park(),'stopped');
  });

  it('can drive', () => {
    assert.equal(car.drive(),'vroom');
  })
});