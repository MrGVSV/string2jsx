# String2JSX
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



## Documentation

### Props

| Required Props | Type                | Description                                                  |
| -------------- | ------------------- | ------------------------------------------------------------ |
| children       | `string | string[]` | Contains the string (or array of strings) to be converted.   |
| map            | `object`            | Contains all of the conversion mappins and their respective options. |

### Map Options

| Key         | Type                   | Required | Description                                                  |
| ----------- | ---------------------- | -------- | ------------------------------------------------------------ |
| from        | `RegExp`               | yes      | The regex used to find all matches within the string.        |
| to          | `JSX.Element | string` | yes      | The JSX Element to replace any found matches.                |
| props       | `object`               | no       | The props to pass to the new JSX Element (these can also go on the given "to" element). <br /><br />Defaults to `{}`. |
| isChild     | `boolean`              | no       | Sets the match (or the specified matchGroup) as the new JSX Element's "children" prop.<br /><br />Defaults to `false`. |
| useForProps | `string[]`             | no       | Sets the match (or the specified matchGroup) to each  prop in this list for the new JSX Element.<br /><br />Defaults to `[]`. |
| matchGroup  | `number`               | no       | Specifies the regex match group to use for the above options.<br /><br />Defaults to `0`. |

