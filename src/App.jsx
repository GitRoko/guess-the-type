import { useState, useEffect } from 'react';
import './App.css';

const myJSON = `{
  "u": "2022 dec 10",
  "t": "28/02/2022",
  "s": "How it's made How it's made How it's made How it's made How it's made How it's made",
  "r": "How it's made",
  "q": "qwerty",
  "m": "192.168.0.2",
  "n": "+380501234567",
  "l": "12345-1234",
  "k": "a24a6ea4-ce75-4665-a070-57453082c256",
  "j": "qwerty@gmail.com",
  "e": "[1,2,3]",
  "p": [1,2,3],
  "g": "null",
  "o": null,
  "h": "123 Fake Street, Fake City, FK 12345",
  "i": { "a": 1 },
  "f": "https://gist.github.com/",
  "a": "true",
  "b": "1",
  "c": 1,
  "d": "2.5"
}`;

const App = () => {
  const [newJson, setNewJson] = useState(myJSON);
  const [newItems, setNewItems] = useState(newJson);
  const [valueTextArea, setValueTextArea] = useState(newJson);
  const [error, setError] = useState(false);

  let typeItems = {};

  useEffect(() => {
    setError(false);

    const temp = () => {
      try {
        return JSON.parse(newJson);
      } catch {
        setError(true);
        return newJson;
      }
    };

    setNewItems(temp);
  }, [newJson]);

  const whatNumber = (num) => Number.isInteger(num) ? 'integer' : 'double';

  const objectIsNull = (obj) => (obj === null && Object.is(obj, null)) ? true : false;

  const objectIsArray = (obj) => (Array.isArray(obj)) ? true : false;

  // Function "stringIs" checks the string for the type hidden in it, if there is none, then it tries to recognize what kind of string it is.
  // Add check: 
  //  1. - add function stingIs<your type>(str) => return boolean;
  //  2. - add condition:
  //    if (stingIs<your type>(temp)) {
  //      return '<your type name>';
  //    }

  const stringIs = (string) => {
    let temp;

    try {
      temp = JSON.parse(string);
    } catch {
      temp = string;
    }

    if (typeof temp !== 'string') {
      return parseType(temp);
    }

    // 1. - add function here

    const stringIsIP = (str) => {
      const regexExp = /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      return regexExp.test(str);
    };

    const stringIsURL = (str) => {
      const regexExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

      return regexExp.test(str);
    };

    const stringIsEmail = (str) => {
      const regexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      return regexExp.test(str);
    };

    const stringIsZipCode = (str) => {
      const regexExp = /^\d{5}(?:[-\s]\d{4})?$/;
      // const regexExp = /^\d{5}$/;

      return regexExp.test(str);
    };

    const stringIsUUID = (str) => {
      const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

      return regexExp.test(str);
    };

    const stringIsPhone = (str) => {
      const regexExp = /(?<=^|\s|>|\;|\:|\))(?:\+|3|8|0|\()[\d\-\(\) ]{8,}\d/gm;

      return regexExp.test(str);
    };

    const stringIsWord = (str) => {
      const regexExp = /^[a-z']{3,}$/i;

      return regexExp.test(str);
    };

    const stringIsTitle = (str) => {
      const regexExp = /^(([a-z']{3,})([\s.,!?]{0,2})){2,10}$/i;

      return regexExp.test(str);
    };

    const stringIsLongText = (str) => {
      const regexExp = /^(([a-z']{3,})([\s.,!?]{0,2})){11,}$/i;

      return regexExp.test(str);
    };

    const stringIsAddress = (str) => {
      const regexExp = /^[0-9]+ [A-z ]*(?:[A-z]| (?:#|APT|BLDG|FL|STE|UNIT|RM|DEPT)+ [A-z0-9]+)+(?:\n|, ){1}[A-z]+[A-z ]+[A-z]+, [A-Z]{2} [0-9]{5}$/gm;

      return regexExp.test(str);
    };

    const stringIsDate = (str) => {
      const regexExp = /^((((0?[1-9][-/.](0?[1-9]|1[0-2]))|([12][0-9][-/.]((0?[13-9])|1[0-2]))|(((1[0-9])|(2[0-8]))[-/.]0?2)|(30[-/.]((0?[13-9])|1[0-2]))|(31[-/.]((0?[13578])|10|12)))[-/.][0-9]{4})|(29[-/.]0?2-(([0-9]{2}((0[48])|([2468][048])|([13579][26])))|((([02468][048])|([13579][26]))00))))$/i;

      if (regexExp.test(str) || Date.parse(str)) {
        return true;
      }

      return false;
    };

    // 2. - Add condition here

    if (stringIsIP(temp)) {
      return 'ip (internet protocol address)';
    }
    if (stringIsURL(temp)) {
      return 'URL';
    }
    if (stringIsEmail(temp)) {
      return 'Email';
    }
    if (stringIsZipCode(temp)) {
      return 'zip (postal code)';
    }
    if (stringIsUUID(temp)) {
      return 'UUID';
    }
    if (stringIsPhone(temp)) {
      return 'Phone number';
    }
    if (stringIsWord(temp)) {
      return 'Word';
    }
    if (stringIsTitle(temp)) {
      return 'Title';
    }
    if (stringIsLongText(temp)) {
      return 'Long text';
    }
    if (stringIsDate(temp)) {
      return 'Date';
    }
    if (stringIsAddress(temp)) {
      return 'address (street address)';
    }

    return 'undefined';
  };

  const parseType = (value) => {

    switch (typeof value) {
      case 'boolean':
        return 'boolean';

      case 'number':
        return whatNumber(value);

      case 'string':

        return stringIs(value);

      case 'object':
        if (objectIsNull(value)) {
          return 'null';
        }
        if (objectIsArray(value)) {
          return 'array';
        }
        return 'object';

      default:
        return 'undefined';
    }
  };

  for (const item in newItems) {
    typeItems = {
      ...typeItems,
      [item]: parseType(newItems[item]),
    }
  };

  return (
    <div className="App">
      <div className="container">
        <section className="section">
          <h1 className="title">Guess the type</h1>

          <div className="field">
            <label className="label">Just insert your JSON</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Textarea"
                value={valueTextArea}
                onChange={(event) => {
                  setValueTextArea(event.target.value);
                }}
              >
              </textarea>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                onClick={() => setNewJson(valueTextArea)}
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={() => {
                  setValueTextArea(myJSON);
                  setNewJson(myJSON);
                }}
              >
                Default JSON
              </button>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="table-container">
            <table className="table is-striped">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                  <th>Guess type is</th>
                </tr>
              </thead>
              <tbody>
                {!error ? (Object.keys(newItems).map((key, i) => (
                  <tr key={i}>
                    <td>{key}</td>
                    <td>{JSON.stringify(newItems[key])}</td>
                    <td>
                      {JSON.stringify(typeItems[key])}
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td>Enter correct JSON</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
