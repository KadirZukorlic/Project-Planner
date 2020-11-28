import { Component } from './Component.js';

export class Tooltip extends Component {
  constructor(closeNotifierFunction, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunction;
    this.text = text;
    this.render();
  }

  closeTooltip = () => {
    this.detach();
    this.closeNotifier();
  };

  render() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const hostElScrollSize = this.hostElement.parentElement.scrollTop;
    // parentElement in order to refer to whole box.

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - hostElScrollSize - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // 500 px
    tooltipElement.style.top = y + 'px';

    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}
