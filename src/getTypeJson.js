export default function getTypeJson(json) {

  const parsedJson = JSON.parse(json);
  let types = {};
  let result;
  
  const numberIs = {
    integer: {
      check(num) {
        if (Number.isInteger(num) && Math.floor(num) === num) {
          return this.result;
        }
      },
      result: 'Integer',
    },
    float: {
      check(num) {
        if (!Number.isInteger(num) && num % 1 !== 0) {
          return this.result;
        }
      },
      result: 'Double',
    },
  };

  const objectIs = {
    null: {
      check(obj) {
        if (obj === null && Object.is(obj, null)) {
          return this.result;
        }
      },
      result: 'Null',
    },
    array: {
      check(obj) {
        if (Array.isArray(obj)) {
          return this.result;
        }
      },
      result: 'Array',
    },
    object: {
      check(obj) {
        if (obj != null && obj.constructor.name === "Object") {
          return this.result;
        }
      },
      result: 'Object',
    },
  };
  
  const stringIs = {
    ip: {
      check: function (str) {
        const regexExp = /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  
        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'IP address ',
    },
    url: {
      check: function (str) {
        const regexExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'URL address ',
    },
    email: {
      check: function (str) {
        const regexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Email address ',
    },
    zip: {
      check: function (str) {
        const regexExp = /^\d{5}(?:[-\s]\d{4})?$/;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'zip (postal code)',
    },
    uuid: {
      check: function (str) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'UUID',
    },
    phone: {
      check: function (str) {
        const regexExp = /(?<=^|\s|>|\;|\:|\))(?:\+|3|8|0|\()[\d\-\(\) ]{8,}\d/gm;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Phone number',
    },
    word: {
      check: function (str) {
        const regexExp = /^[a-z']{3,}$/i;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Word',
    },
    title: {
      check: function (str) {
        const regexExp = /^(([a-z']{3,})([\s.,!?]{0,2})){2,10}$/i;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Title',
    },
    longText: {
      check: function (str) {
        const regexExp = /^(([a-z']{3,})([\s.,!?]{0,2})){11,}$/i;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Long text',
    },
    address : {
      check: function (str) {
        const regexExp = /^[0-9]+ [A-z ]*(?:[A-z]| (?:#|APT|BLDG|FL|STE|UNIT|RM|DEPT)+ [A-z0-9]+)+(?:\n|, ){1}[A-z]+[A-z ]+[A-z]+, [A-Z]{2} [0-9]{5}$/gm;

        if (regexExp.test(str)) {
          return this.result;
        }
      },
      result: 'Address  (street address )',
    },
    date: {
      check(str) {
        const regexExp = /^((((0?[1-9][-/.](0?[1-9]|1[0-2]))|([12][0-9][-/.]((0?[13-9])|1[0-2]))|(((1[0-9])|(2[0-8]))[-/.]0?2)|(30[-/.]((0?[13-9])|1[0-2]))|(31[-/.]((0?[13578])|10|12)))[-/.][0-9]{4})|(29[-/.]0?2-(([0-9]{2}((0[48])|([2468][048])|([13579][26])))|((([02468][048])|([13579][26]))00))))$/i;
  
        if (regexExp.test(str) || Date.parse(str)) {
          return this.result;
        }
      },
      result: 'Date',
    },
  };

  const runChecker = (object, value) => {
    for (const key in object) {
      if (object[key].check(value)) {
        return object[key].result;
      }
    }
  }

  const parseType = (value) => {
  
    switch (typeof value) {
      case 'boolean':
        return 'boolean';
  
      case 'number':
        return runChecker(numberIs, value);
  
      case 'string':
        let newValue;
  
        try {
          newValue = JSON.parse(value);
        } catch {
          newValue = value;
        }
  
        if (typeof newValue !== 'string') {
          return parseType(newValue);
        }

        return runChecker(stringIs, newValue);
  
      case 'object':
        return runChecker(objectIs, value);
  
      default:
        return 'undefined';
    }
  };
  
  for (const key in parsedJson) {
    types = {
      ...types,
      [key]: parseType(parsedJson[key]),
    }
  };
  
  result = JSON.stringify(types);

  return result;
};