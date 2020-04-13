# String2JSX
[![npm version](https://badge.fury.io/js/string2jsx.svg)](https://badge.fury.io/js/string2jsx)

String2JSX converts an input string into a JSX Element. For an approach that does not return a Fragment or that has more control over its matches, try using [react-process-string](https://github.com/EfogDev/react-process-string).



## Usage
```jsx
let conversion = [
  {
    from: /Hello/,
    to: "Goodbye"
  },
  {
    from: /, world/,
    to: <span style={{color: 'red'}} />,
    isChild: true
  },
  {
    from: /!/,
    to: <span>...</span>,
    props: {
      className: 'kinda-dark-tbh'
    }
  }
]

<String2JSX map={conversion}>
    Hello, world!
</String2JSX>
  
// Output: 
<>
  <span>Goodbye</span><span style={{color: 'red'}}>world</span><span className={'kinda-dark-tbh'}>...</span>
</>
```



## Installation

Install the module using [NPM](https://www.npmjs.com/get-npm):

```bash
npm i string2jsx
```

Then simply import it with:

```javascript
import String2JSX from 'string2JSX'
```



## Documentation

### Props

| Required Props | Type                | Required        | Description                                                  |
| -------------- | ------------------- | ------------------------------------------------------------ | -------------- |
| children       | `string` or `string[]` | yes | Contains the string (or array of strings) to be converted. |
| map            | `object`            | yes         | Contains all of the conversion mappins and their respective options. |
| parent | `JSX.Element` | no | Contains the conversions in the given parent element. Props on the given element will be maintained. Any props passed to the `String2JSX` element will be passed to this parent.<br /><br />Defaults to `React.Fragment`. |
| defaultMatchGroup | `number` | no | Overrides all maps to default to the given regex match group.<br /><br />Defaults to `0`. |

### Map Options

| Key         | Type                   | Required | Description                                                  |
| ----------- | ---------------------- | -------- | ------------------------------------------------------------ |
| from        | `RegExp`               | yes      | The regex used to find all matches within the string.        |
| to          | `JSX.Element` or `string` | yes      | The JSX Element to replace any found matches.                |
| props       | `object`               | no       | The props to pass to the new JSX Element (these can also go on the given "to" element). <br /><br />Defaults to `{}`. |
| isChild     | `boolean`              | no       | Sets the match (or the specified matchGroup) as the new JSX Element's "children" prop.<br /><br />Defaults to `false`. |
| useForProps | `string[]`             | no       | Sets the match (or the specified matchGroup) to each  prop in this list for the new JSX Element.<br /><br />Defaults to `[]`. |
| matchGroup  | `number`               | no       | Specifies the regex match group to use for the above options.<br /><br />Defaults to `defaultMatchGroup`. |

