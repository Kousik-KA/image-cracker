const DEFAULT_OPTIONS = {
  containerId: "container",
  imageURL: "https://picsum.photos/200",
  width: 100,
  height: 100,
  pixelUnit: 10,
  pixelShape: "square",
};

class ImageSpliter {
  #_options;
  #_container;
  #_row;
  #_box;
  #_divider;

  constructor(options) {
    this.#_options = { ...DEFAULT_OPTIONS, ...options };
    const container = document.getElementById(this.#_options.containerId);
    if (!container) {
      this.#_container = document.createElement("div");
      document.body.appendChild(this.#_container);
      this.#_container.id = this.#_options.containerId;
    } else {
      this.#_container = container;
    }
    this.#_row = document.createElement("div");
    this.#_row.className = "row";

    this.#_box = document.createElement("div");
    this.#_box.className = "box";

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
    for (let i = 0; i < this.#_options.height / this.#_divider; i++) {
      const row = this.#_row.cloneNode();
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
}

new ImageSpliter({
  imageURL: "vite.svg",
  width: 200,
  height: 200,
  pixelUnit: 10,
  pixelShape: "circle",
});
