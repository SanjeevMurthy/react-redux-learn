import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const getName = ["rakesh", "sanjeev", "ramesh"];

class Api {
  static getName() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], getName));
      }, delay);
    });
  }
}

export default Api;
