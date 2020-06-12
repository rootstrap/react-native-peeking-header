# react-native-peeking-header

Simple header component that hides when scrolling down and shows up again when scrolling up.
## Installation

```
npm install react-native-peeking-header
```

or

```
yarn add react-native-peeking-header
```

## Result

![](https://media.giphy.com/media/SRqtEZdptlDo0LAOw2/giphy.gif)

## Usage

The component functions as a `scrollview` and has a render prop to render your header.

```js
import PeekingHeader from 'react-native-peeking-header';

import YourComponent from './YourComponent';


const App = () => (
  <PeekingHeader renderHeader={top => <YourComponent showBackground={top} />}>
    // scrollable content
  </PeekingHeader>
)
```

## License

**@rootstrap/react-native-peeking-header** is available under the MIT license. See the LICENSE file for more info.

## Credits

**react-native-peeking-header** is maintained by [Rootstrap](http://www.rootstrap.com) with the help of our [contributors](https://github.com/rootstrap/react-native-peeking-header/contributors).

[<img src="https://s3-us-west-1.amazonaws.com/rootstrap.com/img/rs.png" width="100"/>](http://www.rootstrap.com)
