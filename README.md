# Guess the type

My solution: [DEMO LINK](https://gitroko.github.io/guess-the-type/)

Possible types which you have to guess:
- array (list) // [1,2,3] || "[1,2,3]"
- object (dictionary) // {}
- boolean (binary) // true/false || "true"/"false"
- integer (integer number) // 1 || "1"
- double (floating-point digit) // 1.5 || "1.5"
- zip (postal code) // usa format: "xxxxx-xxxx"
- uuid (universal unique identifier) // uuid
- phone (phone number) // ukraine mobile format:
    - +380501234567
    - +38-050-123-45-67
    - 38050134567
    - 80501234567
    - 0501234567
    - 050-123-45-67
    - 050-12-34-567
    - 050 123 45 67
- date (date or datetime) // 10 dec 2022 || 10-12-2022 || 2022-12-10 || 2022/12/10
- ip (internet protocol address)
- url (uniform resource locator address)
- email (email address) 
- address (street address) // USA adress format: 
    - 123 Fake Street, Fake City, FK 12345
    - 123 Fake Street # 3, Fake City, FK 12345
- text (long text) // more then 10 words
- title (short text) // from 2 to 10 words
- word (a word) // 1 word
- undefined (everything else)


## To add a validation function in a file getTypeJson.js:
    Add object to stringIs || objectIs || numberIs:
    const stringIs = {
        <your_type>: {
        check: function (str): < (string): => this.result > { 
                
                < your_condition >

                return this.result;
            }
        },
        result: '< your_type_title >',
        },
        ...,
    }
# Task

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