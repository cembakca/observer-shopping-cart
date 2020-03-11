export default function createElement(nodeName, attributes, ...children) {
  const element = document.createElement(nodeName);

  for(let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child) {
      element.appendChild(child);
    }
  });

  return element;
}