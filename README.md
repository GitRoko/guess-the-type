# Guess the type

You have to create a web app to convert one json to another json file. Feel free to create your own sophisticated UI.
Input JSON structure example:
```json
{
    "a": "1",
    "b": true,
    "c": [1,2,3],
    "d": "https://gist.github.com/"
}
```
The output should be the guess of types per every field and return a corresponding json:
```json
{
    "a": "integer",
    "b": "boolean",
    "c": "array",
    "d": "url"
}
```
Possible types which you have to guess:
- array (list)
- object (dictionary)
- boolean (binary)
- integer (integer number)
- double (floating-point digit)
- zip (postal code)
- uuid (universal unique identifier)
- phone (phone number)
- date (date or datetime)
- ip (internet protocol address)
- url (uniform resource locator address)
- email (email address)
- address (street address)
- text (long text)
- title (short text)
- word (a word)
- undefined (everything else)

Acceptance criteria:
- Web page should be browser-only, OS-agnostic, no additional software required
- Only client-side, no server dependency
- Code should be clean and extendable for more types
- UI should be simple and work properly
- The output order should be the same as an input value
- Try to guess as accurately as possible (I'll run my own json files to check the accuracy)
- There is no strong requirements about types, decide yourself which to pick if any ambiguity
- The code should be hosted on Github
- README.MD should include clear instruction on how to run it and how it works