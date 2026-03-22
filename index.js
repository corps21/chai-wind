import { handler } from "./handler.js";

export default function start(prefix = "chai-") {

  // 1. Scanning Dom for chai classes
  const elements = Array.from(document.querySelectorAll(`[class*="${prefix}"]`));

  // 2. Handling chai classes
  elements.forEach((element) => {

    const chaiClasses = Array.from(element.classList).filter((className) =>
      className.startsWith(prefix),
    );

    chaiClasses.forEach((chaiClass) => {
      const parts = chaiClass.split("-");
      const [_prefix,type, ...props] = parts;

      if(handler[type] === undefined) {
        console.warn(`Chai: Handler for ${type} is not defined`);
      } else {
        handler[type](element,type ,props);
      }

      // 3. Removing chai classes from element
      element.classList.remove(chaiClass);

    });
  });
}

start();


