import { useState, useEffect } from 'react';
import getTypeJson from './getTypeJson.js';
import './App.css';
const defaultJson = `{
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
	"p": [
		1,
		2,
		3
	],
	"g": "null",
	"o": null,
	"h": "123 Fake Street, Fake City, FK 12345",
	"i": {
		"a": 1
	},
	"f": "https://gist.github.com/",
	"a": "true",
	"b": "1",
	"c": 1,
	"d": "2.5"
}`;

const App = () => {
  const [valueTextArea, setValueTextArea] = useState('');
  const [types, setTypes] = useState({});
  const [parsedTypes, setParsedTypes] = useState({});
  const [parsedJson, setParsedJson] = useState({});
  const [resultTextArea, setResultTextArea] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);

    try {
      setParsedJson(JSON.parse(valueTextArea));
      setTypes(getTypeJson(valueTextArea));
      setParsedTypes(JSON.parse(types));
    } catch {
      setError(true);
    }
  }, [valueTextArea, types]);

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
                placeholder="Insert your JSON"
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
                onClick={() => {
                  setResultTextArea(getTypeJson(valueTextArea));
                }}
              >
                Submit
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={() => {
                  setValueTextArea('');
                  setResultTextArea('');
                }}
              >
                Reset
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link"
                onClick={() => {
                  setValueTextArea(defaultJson);
                }}
              >
                Default JSON
              </button>
            </div>
          </div>
        </section>


      </div>
      <div className="container">
        <section className="section">
          <div className="field">
            <label className="label">Result JSON</label>
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Result"
                defaultValue={resultTextArea}
              >
              </textarea>
            </div>
          </div>
        </section>
      </div>

      <div className="container">
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
                {!error ? (Object.keys(parsedJson).map((key, i) => {
                  return (<tr key={i}>
                    <td>{key}</td>
                    <td>{`${parsedJson[key]}`}</td>
                    <td>
                      {parsedTypes[key]}
                    </td>
                  </tr>)
                })) : (
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
