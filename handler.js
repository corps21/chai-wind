import * as Constants from "./constants.js";
import { resolveCustom } from "./utils.js";

const staticHandler = {
  text: textTypeHandler,
  bg: backgroundTypeHandler,
  rounded: borderTypeHandler,
  border: borderTypeHandler,
  z: zIndexTypeHandler,
  overflow: overflowTypeHandler,
  w: widthTypeHandler,
  h: heightTypeHandler,
  flex: flexBoxHandler,
  items: flexBoxHandler,
  justify: flexBoxHandler,
  grid: gridTypeHandler,
  row: gridTypeHandler,
  col: gridTypeHandler,
};

const mapConstantsToHandler = {
  supportedMarginTypes: marginTypeHandler,
  supportedPaddingTypes: paddingTypeHandler,
  supportedPositionTypes: positionTypeHandler,
  supportedDisplayTypes: displayTypeHandler,
};

const mappedHandlers = {};

Object.keys(mapConstantsToHandler).forEach((key) => {
  const constants = Constants[key];
  const fns = mapConstantsToHandler[key];
  constants.forEach((constant) => {
    mappedHandlers[constant] = fns;
  });
});

export const handler = Object.assign(staticHandler, mappedHandlers);

function textTypeHandler(element, _type, [value, intensity = null]) {
  const handleCustom = (value) => {
    // chai-text-[12px]
    if (Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))) {
      element.style.fontSize = value;
    }
    // chai-text-[#dadada]
    else if (
      Constants.supportedPrefixes.some((prefix) => value.startsWith(prefix))
    ) {
      element.style.color = value;
    }
  };

  const handleDefault = (value) => {
    // chai-text-sm
    if (
      Object.keys(Constants.fontSizeMap).some((fontSize) => fontSize === value)
    ) {
      const size = Constants.fontSizeMap[value];
      element.style.fontSize = `${size}`;
    }
    // chai-text-left
    else if (
      Constants.supportedAlignTypes.some((alignType) => alignType === value)
    ) {
      element.style.textAlign = value;
    }
    // chai-text-red-500
    else if (
      Object.keys(Constants.tailwindColorMap).some(
        (color) => color === value,
      ) &&
      intensity !== null
    ) {
      const color = Constants.tailwindColorMap[value];
      element.style.color = color[intensity];
    }
    // chai-text-current
    else if (
      Object.keys(Constants.colorSpecialMap).some((color) => color === value)
    ) {
      element.style.color = Constants.colorSpecialMap[value];
    } else {
      element.style.color = value;
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function backgroundTypeHandler(element, _type, [value, intensity = null]) {
  const handleCustom = (value) => {
    // chai-bg-[#dadada]
    if (
      Constants.supportedPrefixes.some((prefix) => value.startsWith(prefix))
    ) {
      element.style.backgroundColor = value;
    }
  };

  const handleDefault = () => {
    // chai-bg-red-500
    if (
      Object.keys(Constants.tailwindColorMap).some(
        (color) => color === value,
      ) &&
      intensity !== null
    ) {
      const color = Constants.tailwindColorMap[value];
      element.style.backgroundColor = color[intensity];
    }
    // chai-bg-current
    else if (
      Object.keys(Constants.colorSpecialMap).some((color) => color === value)
    ) {
      element.style.backgroundColor = Constants.colorSpecialMap[value];
    } else {
      element.style.backgroundColor = value;
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function marginTypeHandler(element, type, [value]) {
  const handleCustom = (value) => {
    // chai-mx-[1rem]
    if (Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))) {
      switch (type) {
        case "m":
          element.style.margin = value;
          break;
        case "ml":
          element.style.marginLeft = value;
          break;
        case "mr":
          element.style.marginRight = value;
          break;
        case "mt":
          element.style.marginTop = value;
          break;
        case "mb":
          element.style.marginBottom = value;
          break;
        case "mx":
          element.style.marginInline = value;
          break;
        case "my":
          element.style.marginBlock = value;
          break;
      }
    }
  };

  const handleDefault = (value) => {
    // chai.mx-auto
    if (
      Object.keys(Constants.spacingMap).some((spacing) => spacing === value)
    ) {
      switch (type) {
        case "m":
          if (value === "auto") {
            element.style.margin = "auto";
          } else {
            element.style.margin = `${Constants.spacingMap[value]}rem`;
          }
          break;
        case "ml":
          element.style.marginLeft = `${Constants.spacingMap[value]}rem`;
          break;
        case "mr":
          element.style.marginRight = `${Constants.spacingMap[value]}rem`;
          break;
        case "mt":
          element.style.marginTop = `${Constants.spacingMap[value]}rem`;
          break;
        case "mb":
          element.style.marginBottom = `${Constants.spacingMap[value]}rem`;
          break;
        case "mx":
          if (value === "auto") {
            element.style.marginInline = "auto";
          } else {
            element.style.marginInline = `${Constants.spacingMap[value]}rem`;
          }
          break;
        case "my":
          if (value === "auto") {
            element.style.marginBlock = "auto";
          } else {
            element.style.marginBlock = `${Constants.spacingMap[value]}rem`;
          }
          break;
      }
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function paddingTypeHandler(element, type, [value]) {
  const handleCustom = (value) => {
    // chai-px-[1rem]
    if (Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))) {
      switch (type) {
        case "p":
          element.style.padding = value;
          break;
        case "pl":
          element.style.paddingLeft = value;
          break;
        case "pr":
          element.style.paddingRight = value;
          break;
        case "pt":
          element.style.paddingTop = value;
          break;
        case "pb":
          element.style.paddingBottom = value;
          break;
        case "px":
          element.style.paddingInline = value;
          break;
        case "py":
          element.style.paddingBlock = value;
          break;
      }
    }
  };

  const handleDefault = (value) => {
    // chai-px-auto
    if (
      Object.keys(Constants.spacingMap).some((spacing) => spacing === value)
    ) {
      switch (type) {
        case "p":
          if (value === "auto") {
            element.style.padding = "auto";
          } else {
            element.style.padding = `${Constants.spacingMap[value]}rem`;
          }
          break;
        case "pl":
          element.style.paddingLeft = `${Constants.spacingMap[value]}rem`;
          break;
        case "pr":
          element.style.paddingRight = `${Constants.spacingMap[value]}rem`;
          break;
        case "pt":
          element.style.paddingTop = `${Constants.spacingMap[value]}rem`;
          break;
        case "pb":
          element.style.paddingBottom = `${Constants.spacingMap[value]}rem`;
          break;
        case "px":
          if (value === "auto") {
            element.style.paddingInline = "auto";
          } else {
            element.style.paddingInline = `${Constants.spacingMap[value]}rem`;
          }
          break;
        case "py":
          if (value === "auto") {
            element.style.paddingBlock = "auto";
          } else {
            element.style.paddingBlock = `${Constants.spacingMap[value]}rem`;
          }
          break;
      }
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function borderTypeHandler(
  element,
  type,
  [value, intensity = null, prop = null],
) {
  if (type === "rounded") {
    const handleCustom = (value) => {
      // chai-rounded-[1rem]
      if (
        Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))
      ) {
        element.style.borderRadius = value;
      }
    };

    const handleDefault = (value) => {
      // chai-rounded-sm
      if (Object.keys(Constants.radiusMap).some((radius) => radius === value)) {
        element.style.borderRadius = Constants.radiusMap[value];
      } else {
        element.style.borderRadius = value;
      }
    };

    resolveCustom(value, handleCustom, handleDefault);
  } else if (type === "border") {
    element.style.border = "1px solid #000";

    if (value) {
      // chai-border-[1px]
      const handleCustom = (value) => {
        if (
          Constants.supportedPrefixes.some((prefix) => value.startsWith(prefix))
        ) {
          element.style.borderColor = value;
        } else if (
          Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))
        ) {
          element.style.borderWidth = value;
        }
      };

      const handleDefault = (value) => {
        if (
          // chai-border-red-100
          Object.keys(Constants.tailwindColorMap).some(
            (color) => color === value,
          ) &&
          intensity !== null
        ) {
          const color = Constants.tailwindColorMap[value];
          element.style.borderColor = color[intensity];
        } else if (
          // chai-border-x-*
          Constants.supportedBorderValues.some(
            (borderValue) => borderValue === value,
          ) &&
          intensity !== null
        ) {
          const handleCustom = (borderValue) => {
            // chai-border-x-[1px], chai-border-y-[1rem]

            if (
              Constants.supportedSuffixes.some((suffix) =>
                borderValue.endsWith(suffix),
              )
            ) {
              switch (value) {
                case "x":
                  element.style.borderInlineWidth = borderValue;
                  break;
                case "y":
                  element.style.borderBlockWidth = borderValue;
                  break;
                case "t":
                  element.style.borderTopWidth = borderValue;
                  break;
                case "b":
                  element.style.borderBottomWidth = borderValue;
                  break;
                case "l":
                  element.style.borderLeftWidth = borderValue;
                  break;
                case "r":
                  element.style.borderRightWidth = borderValue;
                  break;
              }
            } else if (
              Constants.supportedPrefixes.some((prefix) =>
                borderValue.startsWith(prefix),
              )
            ) {
              // chai-border-x-[#fff], chai-border-y-[rgb(0,0,0)]
              switch (value) {
                case "x":
                  element.style.borderInlineColor = borderValue;
                  break;
                case "y":
                  element.style.borderBlockColor = borderValue;
                  break;
                case "t":
                  element.style.borderTopColor = borderValue;
                  break;
                case "b":
                  element.style.borderBottomColor = borderValue;
                  break;
                case "l":
                  element.style.borderLeftColor = borderValue;
                  break;
                case "r":
                  element.style.borderRightColor = borderValue;
                  break;
              }
            }
          };

          const handleDefault = (displayValue) => {
            // chai-border-x-1, chai-border-y-2
            switch (value) {
              case "x":
                element.style.borderInlineWidth = `${displayValue}px`;
                break;
              case "y":
                element.style.borderBlockWidth = `${displayValue}px`;
                break;
              case "t":
                element.style.borderTopWidth = `${displayValue}px`;
                break;
              case "b":
                element.style.borderBottomWidth = `${displayValue}px`;
                break;
              case "l":
                element.style.borderLeftWidth = `${displayValue}px`;
                break;
              case "r":
                element.style.borderRightWidth = `${displayValue}px`;
                break;
            }

            // chai-border-x-red-500, chai-border-y-blue-100
            if (
              Object.keys(Constants.tailwindColorMap).some(
                (color) => color === intensity,
              ) &&
              prop !== null
            ) {
              const color = Constants.tailwindColorMap[intensity];

              switch (value) {
                case "x":
                  element.style.borderInlineColor = color[prop];
                  break;
                case "y":
                  element.style.borderBlockColor = color[prop];
                  break;
                case "t":
                  element.style.borderTopColor = color[prop];
                  break;
                case "b":
                  element.style.borderBottomColor = color[prop];
                  break;
                case "l":
                  element.style.borderLeftColor = color[prop];
                  break;
                case "r":
                  element.style.borderRightColor = color[prop];
                  break;
              }
            }
          };

          resolveCustom(intensity, handleCustom, handleDefault);
        }
      };

      resolveCustom(value, handleCustom, handleDefault);
    }
  }
}

function positionTypeHandler(element, type) {
  // chai-absolute, chai-relative, chai-fixed, chai-sticky, chai-static
  element.style.position = type;
}

function zIndexTypeHandler(element, _type, [value]) {
  // chai-z-10, chai-z-auto

  const handleCustom = (value) => {
    element.style.zIndex = value;
  };

  const handleDefault = (value) => {
    if (Constants.zIndexMap.some((zIndex) => zIndex === value)) {
      element.style.zIndex = value;
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function displayTypeHandler(element, type) {
  // chai-block, chai-inline-block
  element.style.display = type;
}

function overflowTypeHandler(element, _type, [value, intensity = null]) {
  // chai-overflow-hidden
  if (
    Constants.supportedOverflowTypes.some(
      (overflowType) => overflowType === value,
    )
  ) {
    element.style.overflow = value;
  }
  // chai-overflow-x-hidden
  else if (value === "x") {
    switch (intensity) {
      case "hidden":
        element.style.overflowX = "hidden";
        break;
      case "scroll":
        element.style.overflowX = "scroll";
        break;
      case "visible":
        element.style.overflowX = "visible";
        break;
      case "auto":
        element.style.overflowX = "auto";
        break;
    }
  }
  // chai-overflow-y-hidden
  else if (value === "y") {
    switch (intensity) {
      case "hidden":
        element.style.overflowY = "hidden";
        break;
      case "scroll":
        element.style.overflowY = "scroll";
        break;
      case "visible":
        element.style.overflowY = "visible";
        break;
      case "auto":
        element.style.overflowY = "auto";
        break;
    }
  }
}

function widthTypeHandler(element, _type, [value]) {
  // chai-w-[1rem]
  const handleCustom = (value) => {
    if (Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))) {
      element.style.width = value;
    }
  };

  // chai-w-full
  const handleDefault = (value) => {
    if (
      Object.keys(Constants.supportedWidthTypes).some(
        (widthType) => widthType === value,
      )
    ) {
      element.style.width = Constants.supportedWidthTypes[value];
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function heightTypeHandler(element, _type, [value]) {
  // chai-h-[1rem]
  const handleCustom = (value) => {
    if (Constants.supportedSuffixes.some((suffix) => value.endsWith(suffix))) {
      element.style.height = value;
    }
  };

  // chai-h-full
  const handleDefault = (value) => {
    if (
      Object.keys(Constants.supportedHeightTypes).some(
        (heightType) => heightType === value,
      )
    ) {
      element.style.height = Constants.supportedHeightTypes[value];
    }
  };

  resolveCustom(value, handleCustom, handleDefault);
}

function flexBoxHandler(element, type, [value, intensity]) {
  // chai-flex
  if (!value && !intensity) {
    element.style.display = "flex";
    return;
  }
  switch (value) {
    // chai-flex-row
    case "row":
    case "col":
      if (!intensity)
        element.style.flexDirection = Constants.flexDirectionMap[value];
      else
        element.style.flexDirection =
          Constants.flexDirectionMap[value + "-" + intensity];
      break;

    // chai-flex-wrap
    case "wrap":
    case "nowrap":
      if (!intensity) element.style.flexWrap = Constants.flexWrapMap[value];
      else
        element.style.flexWrap = Constants.flexWrapMap[value + "-" + intensity];
      break;
  }
  console.log(type);
  switch (type) {
    // chai-items-center
    case "items":
      element.style.alignItems = Constants.alignItemsMap[value];
      break;
    // chai-justify-center
    case "justify":
      element.style.justifyContent = Constants.justifyContentMap[value];
  }
}

function gridTypeHandler(element, type, [value, intensity]) {
  // chai-grid
  if (!value && !intensity) {
    element.style.display = "grid";
    return;
  }

  switch (value) {
    case "cols":
      // chai-grid-cols-none
      if (["none", "subgrid"].some((gridValue) => gridValue === intensity)) {
        element.style.gridTemplateColumns = intensity;
      }
      // chai-grid-cols-2
      else {
        element.style.gridTemplateColumns = `repeat(${intensity}, minmax(0, 1fr))`;
      }
      break;

    case "rows":
      // chai-grid-rows-none
      if (["none", "subgrid"].some((gridValue) => gridValue === intensity)) {
        element.style.gridTemplateRows = intensity;
      }
      // chai-grid-rows-2
      else {
        element.style.gridTemplateRows = `repeat(${intensity}, minmax(0, 1fr))`;
      }
      break;
  }

  switch (type) {
    case "row": {
      if (Constants.gridTypes.some((gridRowType) => gridRowType === value)) {
        switch (value) {
          // chai-row-auto
          case "auto":
            element.style.gridAutoRows = "auto";
            break;
          // chai-row-span-2
          case "span":
            element.style.gridRow = `span ${intensity} / ${intensity}`;
            break;
          // chai-row-start-2
          case "start":
            element.style.gridRowStart = intensity;
            break;

          // chai-row-end-2
          case "end":
            element.style.gridRowEnd = intensity;
            break;
        }
      } else {
        element.style.gridRow = value;
      }
      break;
    }
    case "col": {
      if (Constants.gridTypes.some((gridRowType) => gridRowType === value)) {
        switch (value) {
          // chai-col-auto
          case "auto":
            element.style.gridAutoColumns = "auto";
            break;
          // chai-col-span-2
          case "span":
            element.style.gridColumn = `span ${intensity} / ${intensity}`;
            break;
          // chai-col-start-2
          case "start":
            element.style.gridColumnStart = intensity;
            break;
          // chai-col-end-2
          case "end":
            element.style.gridColumnEnd = intensity;
            break;
        }
      } else {
        element.style.gridColumn = value;
      }
      break;
    }
  }
}
