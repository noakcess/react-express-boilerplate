/*
45 minutes should be enough time to complete this task, but feel free to take up to 60 minutes

Your task is to implement the prettyPrint function such that it takes an object  and returns a pretty string representation.

The input parameter "data" will always be a non-null object. The values in the object are limited to either strings or objects. Object values follow the same rules.

The output should be a string with keys indented 2 spaces and new lines separating the key-value pairs. An example and expected result is provided below.

Implementation rules: We want you to implement this yourself-- you can use the full breadth of the language supported in this repl, but please don't import any libraries or use a built-in pretty-print function. You're free to modify the function or add additional functions if you deem necessary.

Note again that values in the data will always be either strings or objects all the way down, you don't have to consider other types.

Your code will be evaluated for correctness and readability.

You can't use pre-built functions such as JSON.stringify

You should use this editor to solve the problem, please do not paste code.
*/

const prettyPrint = async (data) => {
    const tab = '  ';
    let prettyResult = '';
    const parse = async (key = false, val = false, tabs = tab, comma = ',') => {
        if (['string', 'number'].includes(typeof val)) {
            if (key) prettyResult += `${tabs}"${key}": "${val}"${comma}`;
        } else {
            prettyResult += `\n${tabs}"${key}":`;
            const keys = Object.keys(val);
            if (keys.length === 0) prettyResult += ` {}`;
            else {
                prettyResult += ` {\n`;
                keys.map(async (key, index) => {
                    const comma = (keys.length === 0 || index === (keys.length - 1) ? '' : ',');
                    prettyResult += await parse(key, val[key], tabs + tab, comma);
                });
                prettyResult += `${tabs}\n${tabs}}${comma}\n`;
            }
        }
    };
    
    
    if (typeof data === 'object') {
        prettyResult += `{\n`;
        const keys = Object.keys(data);
        keys.map( async ( key, index ) => {
            const comma = (keys.length === 0 || index === (keys.length - 1) ? '' : ',');
            await parse(key, data[key], tab, comma);
            return false;
        });
        
        prettyResult += `}`;
    }
    console.log(expectedResult);
    console.log(prettyResult);
    
    return prettyResult;
};

const exampleJson = {"name":"Jon","facts":{"car":"Ford","address":{"city":"New York"},"watch":"Casio","other": {}}};

const expectedResult = `{
  "name": "Jon",
  "facts": {
    "car": "Ford",
    "address": {
      "city": "New York"
    },
    "watch": "Casio",
    "other": {}
  }
}`;

// This should print true if your solution is implemented correctly
console.log(expectedResult === prettyPrint(exampleJson));
