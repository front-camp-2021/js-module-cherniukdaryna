export default class DoubleSlider {
  element;
  subElements = {};

  constructor({
    min = 100,
    max = 200,
    formatValue = value => value,
    selected = {
      from: min,
      to: max
    },
    precision = 0,
    filterName = ''
  } = {}) {
    this.min = min;
    this.max = max;
    this.formatValue = formatValue;
    this.selected = selected;
    this.filterName = filterName;
    this.precision = 10 ** precision;
    this.render();
    this.rangeSlider();
  }

  getTemplate () {
    const { from, to } = this.selected;
    return `<div id="range" class="range-slider">
    <span id="test-result" data-element="from">${this.formatValue(from)}</span>
    <div class="range-slider__inner">
      <span data-element="progress" class="range-slider__progress"></span>
      <span data-element="thumbLeft" class="range-slider__thumb-left"></span>
      <span data-element="thumbRight" class="range-slider__thumb-right"></span>
    </div>
    <span id="test-result" data-element="to">${this.formatValue(to)}</span>
  </div>`
  }

  render () {
    const slider = document.createElement('div');
    slider.innerHTML = this.getTemplate();
    this.element = slider;
  }

  rangeSlider () {
    const line = this.element.querySelector('.range-slider__progress');
    const range = this.element.querySelector('.range-slider__inner');
    const allRange = this.element.querySelector('.range-slider');
    const spanTo = allRange.children[2];
    const spanFrom = allRange.children[0];
    const draggerLine = range.children[0];
    const draggerLeft = range.children[1];
    const draggerRight = range.children[2];
    const draggerLeftWidth = 6;
    const draggerRightWidth = 6;

    let down = false;
    let rangeWidth;
    let rangeLeft;
    let rangeRight;

    draggerLeft.style.width = draggerLeftWidth + 'px';
    draggerLeft.style.left = -draggerLeftWidth + 'px';
    draggerLeft.style.marginLeft = (draggerLeftWidth / 3.5) + 'px';

    draggerRight.style.width = draggerRightWidth + 'px';
    draggerRight.style.right = -draggerRightWidth + 'px';
    draggerRight.style.marginRight = (draggerRightWidth / 3.5) + 'px';

    const rangeTotal = this.max - this.min;
    const minValue = this.min;
    const maxValue = this.max;
    const myPrecision = this.precision;

    function left (e) {
      let coordsLeft = draggerLeft.getBoundingClientRect();
      let coordsRight = draggerRight.getBoundingClientRect();
      let coordsLine = range.getBoundingClientRect();
      const windowInnerWidth = window.innerWidth

      if(coordsLeft.right < coordsRight.left){
        updateDraggerLeft(e);

        draggerLine.style.left = coordsLeft.right - Math.ceil((windowInnerWidth * 7)/100) + 'px' ;
        draggerLine.style.width = coordsRight.left - coordsLeft.right + 'px';
      }

      const left1 = draggerLeft.style.left;
      const leftShift = (6 + parseFloat(left1)) * rangeTotal / coordsLine.width;
      const from = Math.round((minValue + leftShift) * myPrecision) / myPrecision;

      spanFrom.innerHTML = from;
    }

    function right (a) {
      let coordsLeft = draggerLeft.getBoundingClientRect();
      let coordsRight = draggerRight.getBoundingClientRect();
      let coordsLine = range.getBoundingClientRect();

      if(coordsRight.left > coordsLeft.right){
        updateDraggerRight(a);
        draggerLine.style.width = coordsRight.left - coordsLeft.right + 'px';
      }

      const right1 = draggerRight.style.left;
      const rightShift = (6 + parseFloat(right1)) * rangeTotal /coordsLine.width;
      const to = Math.round((minValue + rightShift) * myPrecision) / myPrecision;

      spanTo.innerHTML = to;
    }

    range.addEventListener("mousedown", function(a) {
      rangeWidth = this.offsetWidth;
      rangeRight = this.offsetLeft;
      down = true;

      if (a.target.classList.contains("range-slider__thumb-right") ){
        updateDraggerRight(a);

        document.addEventListener("mousemove", right);

        document.removeEventListener("mousemove", left);
      }
      return false;
    });

    range.addEventListener("mousedown", function(e) {
      rangeWidth = this.offsetWidth;
      rangeLeft = this.offsetLeft;
      down = true;

      if (e.target.classList.contains("range-slider__thumb-left")) {
        updateDraggerLeft(e);

        document.addEventListener("mousemove", left);
        document.removeEventListener("mousemove", right);
      }
      return false;
    });

    document.addEventListener("mouseup", function() {
      down = false;

      document.dispatchEvent(new CustomEvent('range-selected', {
        bubbles: true,
        detail: {
          filterName: this.filterName,
          value: {
            from: spanFrom.innerHTML,
            to: spanTo.innerHTML
          }
        }
      }));
    });

    function updateDraggerLeft(e) {
      if (down && e.pageX >= rangeLeft && e.pageX <= (rangeLeft + rangeWidth)){
        draggerLeft.style.left = e.pageX - rangeLeft - draggerLeftWidth + 'px';
        if (typeof onDrag == "function") onDrag(Math.round(((e.pageX - rangeLeft) / rangeWidth) * 100));
      }
    }

    function updateDraggerRight(a) {
      if (down && a.pageX >= rangeRight && a.pageX <= (rangeRight + rangeWidth)) {
        draggerRight.style.left = a.pageX - rangeRight - draggerRightWidth + 'px';
        if (typeof onDrag == "function") onDrag(Math.round(((a.pageX - rangeRight) / rangeWidth) * 100));
      }
    }
  }

  remove () {
    if(this.element){
      this.element.remove();
    }
  }

  destroy () {
    this.remove();
    this.element = null;
  }
}
