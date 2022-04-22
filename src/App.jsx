import { useState, useEffect } from 'react';
import getTypeJson from './getTypeJson.js';
import { defaultJson } from './defaultJson';
import './App.css';
const App = () => {
  const [valueTextArea, setValueTextArea] = useState('');
  const [types, setTypes] = useState(null);
  const [parsedTypes, setParsedTypes] = useState(null);
  const [parsedJson, setParsedJson] = useState(null);
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
                {(!error && parsedJson&& parsedTypes) 
                  ? (Object.keys(parsedJson).map((key, i) => {
                  return (<tr key={i}>
                    <td>{JSON.stringify(key)}</td>
                    <td>{`${JSON.stringify(parsedJson[key])}`}</td>
                    <td>
                      {parsedTypes[key]}
                    </td>
                  </tr>)
                  })) 
                  : (
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
