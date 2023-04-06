import { DEFAULT_OPTIONS, PIXEL_LIMIT } from "./helpers";

class ImageSpliter {
  #_options;
  #_container;
  #_row;
  #_box;
  #_divider;

  constructor(options) {
    this.#_options = { ...DEFAULT_OPTIONS, ...options };

    const { width, height, pixelUnit } = this.#_options;
    const limitReached =
      (width / pixelUnit) * (height / pixelUnit) > PIXEL_LIMIT;
    if (limitReached) {
      throw new Error("Too many pixels");
    }
    // CREATE container
    const container = document.getElementById(this.#_options.containerId);
    if (!container) {
      this.#_container = document.createElement("div");
      document.body.appendChild(this.#_container);
      this.#_container.id = this.#_options.containerId;
      this.#_container.style.position = "fixed";
    } else {
      this.#_container = container;
    }

    // ADD row
    this.#_container.innerHTML = "";
    this.#_row = document.createElement("div");
    this.#_row.className = "image__cracker-row";

    // ADD box
    this.#_box = document.createElement("span");
    this.#_box.className = "image__cracker-box";

    Object.entries(this.#_options).forEach(([key, value]) => {
      this[key] = value;
    });
    this.init();
  }

  set imageURL(value) {
    this.#_box.style.backgroundImage = `url(${value})`;
  }
  set pixelShape(value) {
    this.#_box.style.borderRadius = value === "circle" ? "50%" : "0";
  }

  set width(value) {
    this.#_container.style.width = `${value}px`;
    this.#_box.style.backgroundSize = `${value}px`;
  }
  set height(value) {
    this.#_container.style.height = `${value}px`;
  }

  set pixelUnit(value) {
    if (value < 5) value = 5;
    if (value > 100) value = 100;
    this.#_divider = value;
    this.#_box.style.width = `${value}px`;
    this.#_row.style.height = `${value}px`;
  }

  init() {
    //split the height to create rows
    for (let i = 0; i < this.#_options.height / this.#_divider; i++) {
      const row = this.#_row.cloneNode();

      //split the width to create box
      for (let j = 0; j < this.#_options.width / this.#_divider; j++) {
        const box = this.#_box.cloneNode();
        box.style.backgroundPosition = `-${j * this.#_divider}px -${
          i * this.#_divider
        }px`;
        box.style.setProperty(
          "--x",
          `${(j - this.#_options.width / this.#_divider / 2) * 10}px`
        );
        let random = Math.random();
        box.style.animationDuration = `${random * 3}s`;
        row.appendChild(box);
      }
      row.style.setProperty(
        "--y",
        `${(i - this.#_options.height / this.#_divider / 2) * 10}px`
      );

      this.#_container.appendChild(row);
    }
  }

  remove() {
    this.#_container.innerHTML = "";
  }
}

export default ImageSpliter;
