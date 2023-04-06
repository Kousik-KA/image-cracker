# Image Cracker

Image-cracker is a lightweight and customizable JavaScript library that allows you to break down an image into small pixel elements and bring them together into a single image via animation in your web application. It is compatible with any frontend framework or library, such as React, Angular, Vue.

## Installation

To install `image-cracker` using npm, run the following command:

```bash
npm install image-cracker
```

## Usage

To use `image-cracker`, import it into your JavaScript file:

```javascript
import ImageSplitter from "image-cracker";
```

Import the CSS stylesheet to include `image-cracker` styles:

```javascript
import "image-cracker/styles/image-cracker.css";
```

## Code Example

Here's an example of how to use `image-cracker`:

```javascript
import ImageSplitter from "image-cracker";
import "image-cracker/styles/image-cracker.css";

<div id="image-cracker-container"></div>;

new ImageSplitter({
  containerId: "image-cracker-container",
  imageURL: `{window.location.origin}/sample.png`,
  width: 100,
  height: 100,
  pixelUnit: 10,
  pixelShape: "square",
});
```

**Note on Performance:** Please note that there is a limit on the number of pixel elements that can be rendered in the browser to avoid performance issues. The limit is currently set at 2000 elements. To calculate the number of pixel elements, use the following formula:

> `Total pixel elements = (width / pixelUnit) * (height / pixelUnit)`

For example, in the options provided above, the total number of pixel elements would be:

> `Total pixel elements = (100/10) * (100/10) = 100`

## Options

When animating an image, you need to pass an `Options` object with the following keys:

| key         | type   | default                                                  | values                     |
| ----------- | ------ | -------------------------------------------------------- | -------------------------- |
| containerId | string | 'container'                                              |                            |
| height      | number | 100                                                      |                            |
| width       | number | 100                                                      |                            |
| ImageURL    | string | '[https://picsum.photos/200](https://picsum.photos/200)' | ''                         |
| pixelShape  | string | 'square'                                                 | 'square', 'circle'         |
| pixelUnit   | number | 10                                                       | minimum=5 and maximum =100 |

## Methods

The following methods are available on the imageSplitter object:

```javascript
const imageSplitter = new ImageSplitter({
  containerId: "image-cracker-container",
  imageURL: `{window.location.origin}/sample.png`,
  width: 100,
  height: 100,
  pixelUnit: 10,
  pixelShape: "square",
});
```

- ##### remove()
  ```javascript
  imageSplitter.remove();
  ```

## License

`image-cracker` is licensed under the ISC License.
