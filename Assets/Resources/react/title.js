var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function() {
  "use strict";
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = "*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}/*\n! tailwindcss v3.4.19 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-feature-settings: normal; /* 2 */\n  font-variation-settings: normal; /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden]:where(:not([hidden=\"until-found\"])) {\n  display: none;\n}\n.pointer-events-none {\n  pointer-events: none;\n}\n.pointer-events-auto {\n  pointer-events: auto;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.inset-0 {\n  inset: 0px;\n}\n.bottom-0 {\n  bottom: 0px;\n}\n.bottom-1 {\n  bottom: 0.25rem;\n}\n.bottom-4 {\n  bottom: 1rem;\n}\n.left-0 {\n  left: 0px;\n}\n.right-0 {\n  right: 0px;\n}\n.right-1 {\n  right: 0.25rem;\n}\n.right-12 {\n  right: 3rem;\n}\n.right-4 {\n  right: 1rem;\n}\n.right-8 {\n  right: 2rem;\n}\n.top-0 {\n  top: 0px;\n}\n.top-1 {\n  top: 0.25rem;\n}\n.top-40 {\n  top: 10rem;\n}\n.top-64 {\n  top: 16rem;\n}\n.mx-1 {\n  margin-left: 0.25rem;\n  margin-right: 0.25rem;\n}\n.mb-0 {\n  margin-bottom: 0px;\n}\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n.mb-10 {\n  margin-bottom: 2.5rem;\n}\n.mb-12 {\n  margin-bottom: 3rem;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n.mb-4 {\n  margin-bottom: 1rem;\n}\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n.mb-8 {\n  margin-bottom: 2rem;\n}\n.mb-auto {\n  margin-bottom: auto;\n}\n.ml-2 {\n  margin-left: 0.5rem;\n}\n.ml-4 {\n  margin-left: 1rem;\n}\n.ml-6 {\n  margin-left: 1.5rem;\n}\n.mr-2 {\n  margin-right: 0.5rem;\n}\n.mr-4 {\n  margin-right: 1rem;\n}\n.mr-6 {\n  margin-right: 1.5rem;\n}\n.mr-8 {\n  margin-right: 2rem;\n}\n.mt-1 {\n  margin-top: 0.25rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.mt-8 {\n  margin-top: 2rem;\n}\n.mt-auto {\n  margin-top: auto;\n}\n.inline {\n  display: inline;\n}\n.flex {\n  display: flex;\n}\n.hidden {\n  display: none;\n}\n.h-10 {\n  height: 2.5rem;\n}\n.h-12 {\n  height: 3rem;\n}\n.h-20 {\n  height: 5rem;\n}\n.h-24 {\n  height: 6rem;\n}\n.h-4 {\n  height: 1rem;\n}\n.h-5 {\n  height: 1.25rem;\n}\n.h-6 {\n  height: 1.5rem;\n}\n.h-full {\n  height: 100%;\n}\n.w-0 {\n  width: 0px;\n}\n.w-1 {\n  width: 0.25rem;\n}\n.w-1\\/2 {\n  width: 50%;\n}\n.w-1\\/3 {\n  width: 33.333333%;\n}\n.w-1\\/4 {\n  width: 25%;\n}\n.w-12 {\n  width: 3rem;\n}\n.w-24 {\n  width: 6rem;\n}\n.w-3 {\n  width: 0.75rem;\n}\n.w-3\\/4 {\n  width: 75%;\n}\n.w-4 {\n  width: 1rem;\n}\n.w-40 {\n  width: 10rem;\n}\n.w-60 {\n  width: 15rem;\n}\n.w-64 {\n  width: 16rem;\n}\n.w-72 {\n  width: 18rem;\n}\n.w-80 {\n  width: 20rem;\n}\n.w-96 {\n  width: 24rem;\n}\n.w-\\[1px\\] {\n  width: 1px;\n}\n.w-\\[325px\\] {\n  width: 325px;\n}\n.w-\\[36rem\\] {\n  width: 36rem;\n}\n.w-\\[450px\\] {\n  width: 450px;\n}\n.w-\\[600px\\] {\n  width: 600px;\n}\n.w-\\[800px\\] {\n  width: 800px;\n}\n.w-auto {\n  width: auto;\n}\n.w-full {\n  width: 100%;\n}\n.flex-1 {\n  flex: 1 1 0%;\n}\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n.shrink-0 {\n  flex-shrink: 0;\n}\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@keyframes pulse {\n\n  50% {\n    opacity: .5;\n  }\n}\n.animate-pulse {\n  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n.resize {\n  resize: both;\n}\n.flex-row {\n  flex-direction: row;\n}\n.flex-col {\n  flex-direction: column;\n}\n.items-start {\n  align-items: flex-start;\n}\n.items-end {\n  align-items: flex-end;\n}\n.items-center {\n  align-items: center;\n}\n.items-baseline {\n  align-items: baseline;\n}\n.justify-start {\n  justify-content: flex-start;\n}\n.justify-end {\n  justify-content: flex-end;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.justify-around {\n  justify-content: space-around;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.text-ellipsis {\n  text-overflow: ellipsis;\n}\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n.whitespace-pre-wrap {\n  white-space: pre-wrap;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.border {\n  border-width: 1px;\n}\n.border-2 {\n  border-width: 2px;\n}\n.border-4 {\n  border-width: 4px;\n}\n.border-8 {\n  border-width: 8px;\n}\n.border-b {\n  border-bottom-width: 1px;\n}\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n.border-l-2 {\n  border-left-width: 2px;\n}\n.border-l-4 {\n  border-left-width: 4px;\n}\n.border-r-2 {\n  border-right-width: 2px;\n}\n.border-t-2 {\n  border-top-width: 2px;\n}\n.border-\\[\\#00ffff\\] {\n  --tw-border-opacity: 1;\n  border-color: rgb(0 255 255 / var(--tw-border-opacity, 1));\n}\n.border-\\[\\#ff3333\\] {\n  --tw-border-opacity: 1;\n  border-color: rgb(255 51 51 / var(--tw-border-opacity, 1));\n}\n.border-cyan-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(34 211 238 / var(--tw-border-opacity, 1));\n}\n.border-cyan-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(8 145 178 / var(--tw-border-opacity, 1));\n}\n.border-cyan-900 {\n  --tw-border-opacity: 1;\n  border-color: rgb(22 78 99 / var(--tw-border-opacity, 1));\n}\n.border-gray-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(75 85 99 / var(--tw-border-opacity, 1));\n}\n.border-gray-700 {\n  --tw-border-opacity: 1;\n  border-color: rgb(55 65 81 / var(--tw-border-opacity, 1));\n}\n.border-gray-800 {\n  --tw-border-opacity: 1;\n  border-color: rgb(31 41 55 / var(--tw-border-opacity, 1));\n}\n.border-red-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));\n}\n.border-red-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));\n}\n.border-transparent {\n  border-color: transparent;\n}\n.border-white {\n  --tw-border-opacity: 1;\n  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));\n}\n.border-t-cyan-400 {\n  --tw-border-opacity: 1;\n  border-top-color: rgb(34 211 238 / var(--tw-border-opacity, 1));\n}\n.bg-\\[\\#00ffff\\] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(0 255 255 / var(--tw-bg-opacity, 1));\n}\n.bg-\\[\\#ff3333\\] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 51 51 / var(--tw-bg-opacity, 1));\n}\n.bg-black {\n  --tw-bg-opacity: 1;\n  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));\n}\n.bg-cyan-400 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(34 211 238 / var(--tw-bg-opacity, 1));\n}\n.bg-cyan-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(8 145 178 / var(--tw-bg-opacity, 1));\n}\n.bg-cyan-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(22 78 99 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity, 1));\n}\n.bg-red-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(220 38 38 / var(--tw-bg-opacity, 1));\n}\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n}\n.bg-opacity-10 {\n  --tw-bg-opacity: 0.1;\n}\n.bg-opacity-100 {\n  --tw-bg-opacity: 1;\n}\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n.bg-opacity-80 {\n  --tw-bg-opacity: 0.8;\n}\n.bg-opacity-95 {\n  --tw-bg-opacity: 0.95;\n}\n.p-1 {\n  padding: 0.25rem;\n}\n.p-12 {\n  padding: 3rem;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.p-6 {\n  padding: 1.5rem;\n}\n.p-8 {\n  padding: 2rem;\n}\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.px-12 {\n  padding-left: 3rem;\n  padding-right: 3rem;\n}\n.px-16 {\n  padding-left: 4rem;\n  padding-right: 4rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.py-6 {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n.pb-20 {\n  padding-bottom: 5rem;\n}\n.pl-2 {\n  padding-left: 0.5rem;\n}\n.pl-32 {\n  padding-left: 8rem;\n}\n.pl-5 {\n  padding-left: 1.25rem;\n}\n.pl-8 {\n  padding-left: 2rem;\n}\n.pr-3 {\n  padding-right: 0.75rem;\n}\n.pr-4 {\n  padding-right: 1rem;\n}\n.pt-4 {\n  padding-top: 1rem;\n}\n.text-center {\n  text-align: center;\n}\n.text-right {\n  text-align: right;\n}\n.font-mono {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n.font-sans {\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n.text-4xl {\n  font-size: 2.25rem;\n  line-height: 2.5rem;\n}\n.text-5xl {\n  font-size: 3rem;\n  line-height: 1;\n}\n.text-6xl {\n  font-size: 3.75rem;\n  line-height: 1;\n}\n.text-7xl {\n  font-size: 4.5rem;\n  line-height: 1;\n}\n.text-8xl {\n  font-size: 6rem;\n  line-height: 1;\n}\n.text-9xl {\n  font-size: 8rem;\n  line-height: 1;\n}\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.font-bold {\n  font-weight: 700;\n}\n.leading-none {\n  line-height: 1;\n}\n.leading-normal {\n  line-height: 1.5;\n}\n.tracking-tighter {\n  letter-spacing: -0.05em;\n}\n.tracking-wider {\n  letter-spacing: 0.05em;\n}\n.tracking-widest {\n  letter-spacing: 0.1em;\n}\n.text-\\[\\#00ffff\\] {\n  --tw-text-opacity: 1;\n  color: rgb(0 255 255 / var(--tw-text-opacity, 1));\n}\n.text-\\[\\#e2e8f0\\] {\n  --tw-text-opacity: 1;\n  color: rgb(226 232 240 / var(--tw-text-opacity, 1));\n}\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgb(0 0 0 / var(--tw-text-opacity, 1));\n}\n.text-cyan-100 {\n  --tw-text-opacity: 1;\n  color: rgb(207 250 254 / var(--tw-text-opacity, 1));\n}\n.text-cyan-400 {\n  --tw-text-opacity: 1;\n  color: rgb(34 211 238 / var(--tw-text-opacity, 1));\n}\n.text-cyan-500 {\n  --tw-text-opacity: 1;\n  color: rgb(6 182 212 / var(--tw-text-opacity, 1));\n}\n.text-cyan-600 {\n  --tw-text-opacity: 1;\n  color: rgb(8 145 178 / var(--tw-text-opacity, 1));\n}\n.text-gray-300 {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity, 1));\n}\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity, 1));\n}\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity, 1));\n}\n.text-gray-600 {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity, 1));\n}\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n}\n.text-green-500 {\n  --tw-text-opacity: 1;\n  color: rgb(34 197 94 / var(--tw-text-opacity, 1));\n}\n.text-purple-400 {\n  --tw-text-opacity: 1;\n  color: rgb(192 132 252 / var(--tw-text-opacity, 1));\n}\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity, 1));\n}\n.text-red-600 {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity, 1));\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.text-yellow-400 {\n  --tw-text-opacity: 1;\n  color: rgb(250 204 21 / var(--tw-text-opacity, 1));\n}\n.opacity-0 {\n  opacity: 0;\n}\n.opacity-100 {\n  opacity: 1;\n}\n.opacity-30 {\n  opacity: 0.3;\n}\n.opacity-50 {\n  opacity: 0.5;\n}\n.opacity-60 {\n  opacity: 0.6;\n}\n.opacity-70 {\n  opacity: 0.7;\n}\n.opacity-80 {\n  opacity: 0.8;\n}\n.shadow-\\[0_0_15px_rgba\\(0\\2c 255\\2c 255\\2c 0\\.3\\)\\] {\n  --tw-shadow: 0 0 15px rgba(0,255,255,0.3);\n  --tw-shadow-colored: 0 0 15px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-\\[0_0_20px_rgba\\(0\\2c 255\\2c 255\\2c 0\\.3\\)\\] {\n  --tw-shadow: 0 0 20px rgba(0,255,255,0.3);\n  --tw-shadow-colored: 0 0 20px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-\\[0_0_30px_rgba\\(255\\2c 0\\2c 0\\2c 0\\.3\\)\\] {\n  --tw-shadow: 0 0 30px rgba(255,0,0,0.3);\n  --tw-shadow-colored: 0 0 30px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.transition {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-colors {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-opacity {\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-transform {\n  transition-property: transform;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.duration-100 {\n  transition-duration: 100ms;\n}\n.duration-200 {\n  transition-duration: 200ms;\n}\n.duration-300 {\n  transition-duration: 300ms;\n}\n.duration-500 {\n  transition-duration: 500ms;\n}\n.duration-75 {\n  transition-duration: 75ms;\n}\n.ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n@font-face {\n  font-family: 'Melete-Bold';\n  src: url('res:Fonts/Melete-Bold');\n}\n\n@font-face {\n  font-family: 'Melete-Medium';\n  src: url('res:Fonts/Melete-Medium');\n}\n\n@font-face {\n  font-family: 'Melete-Regular';\n  src: url('res:Fonts/Melete-Regular');\n}\n\n@font-face {\n  font-family: 'Melete-Light';\n  src: url('res:Fonts/Melete-Light');\n}\n\n@font-face {\n  font-family: 'Melete-UltraLight';\n  src: url('res:Fonts/Melete-UltraLight');\n}\n\n@font-face {\n  font-family: 'SourceHanCodeJP';\n  src: url('res:Fonts/SourceHanCodeJP');\n}\n\n/* コントローラーアイコン用フォント */\n@font-face {\n  font-family: 'kenney_input_keyboard_&_mouse';\n  src: url('res:Fonts/kenney_input_keyboard_&_mouse');\n}\n\n@font-face {\n  font-family: 'kenney_input_nintendo_switch_2';\n  src: url('res:Fonts/kenney_input_nintendo_switch_2');\n}\n\n@font-face {\n  font-family: 'kenney_input_playstation_series';\n  src: url('res:Fonts/kenney_input_playstation_series');\n}\n\n:root {\n  font-family: sans-serif;\n  font-size: 16px;\n}\n\n/* 回転のアニメーション定義 */\n@keyframes custom-spin {\n  from {\n    /* ReactUnityでは rotate 単体プロパティが安定します */\n    /* transform: rotate(...) よりも処理負荷が軽く、ReactUnityでの動作が安定しているため採用 */\n    rotate: 0deg;\n  }\n\n  to {\n    rotate: 360deg;\n  }\n}\n\n.custom-spin {\n  animation-name: custom-spin;\n  animation-duration: 1s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n\n  /* 回転の中心を要素の真ん中に固定 */\n  transform-origin: center;\n}\n\n/* マーキー（横スクロール）アニメーション */\n@keyframes marquee {\n  0% {\n    translate: 0 0;\n  }\n\n  100% {\n    translate: -50% 0;\n  }\n}\n\n.animate-marquee {\n  animation-name: marquee;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n}/*$vite$:1*/";
  document.head.appendChild(__vite_style__);
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
  }
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production = {};
  var hasRequiredReactJsxRuntime_production;
  function requireReactJsxRuntime_production() {
    if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
    hasRequiredReactJsxRuntime_production = 1;
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_production.jsx = jsxProd;
    reactJsxRuntime_production.jsxs = jsxProd;
    return reactJsxRuntime_production;
  }
  var hasRequiredJsxRuntime;
  function requireJsxRuntime() {
    if (hasRequiredJsxRuntime) return jsxRuntime.exports;
    hasRequiredJsxRuntime = 1;
    {
      jsxRuntime.exports = requireReactJsxRuntime_production();
    }
    return jsxRuntime.exports;
  }
  var jsxRuntimeExports = requireJsxRuntime();
  var react = { exports: {} };
  var react_production = {};
  var hasRequiredReact_production;
  function requireReact_production() {
    if (hasRequiredReact_production) return react_production;
    hasRequiredReact_production = 1;
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    }, assign = Object.assign, emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null }, hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result;
        ctor = ctor();
        ctor.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject;
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error;
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = ctor);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    react_production.Activity = REACT_ACTIVITY_TYPE;
    react_production.Children = Children;
    react_production.Component = Component;
    react_production.Fragment = REACT_FRAGMENT_TYPE;
    react_production.Profiler = REACT_PROFILER_TYPE;
    react_production.PureComponent = PureComponent;
    react_production.StrictMode = REACT_STRICT_MODE_TYPE;
    react_production.Suspense = REACT_SUSPENSE_TYPE;
    react_production.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    react_production.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    react_production.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    react_production.cacheSignal = function() {
      return null;
    };
    react_production.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    react_production.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    react_production.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    react_production.createRef = function() {
      return { current: null };
    };
    react_production.forwardRef = function(render2) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render: render2 };
    };
    react_production.isValidElement = isValidElement;
    react_production.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    react_production.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    react_production.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    react_production.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    react_production.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    react_production.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    react_production.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    react_production.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    react_production.useDebugValue = function() {
    };
    react_production.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    react_production.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    react_production.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    react_production.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    react_production.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    react_production.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    react_production.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    react_production.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    react_production.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    react_production.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    react_production.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    react_production.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    react_production.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    react_production.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    react_production.version = "19.2.3";
    return react_production;
  }
  var hasRequiredReact;
  function requireReact() {
    if (hasRequiredReact) return react.exports;
    hasRequiredReact = 1;
    {
      react.exports = requireReact_production();
    }
    return react.exports;
  }
  var reactExports = requireReact();
  var shim = { exports: {} };
  var useSyncExternalStoreShim_production = {};
  var hasRequiredUseSyncExternalStoreShim_production;
  function requireUseSyncExternalStoreShim_production() {
    if (hasRequiredUseSyncExternalStoreShim_production) return useSyncExternalStoreShim_production;
    hasRequiredUseSyncExternalStoreShim_production = 1;
    var React = requireReact();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is, useState = React.useState, useEffect = React.useEffect, useLayoutEffect = React.useLayoutEffect, useDebugValue = React.useDebugValue;
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
      useLayoutEffect(
        function() {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect(
        function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          return subscribe(function() {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst });
          });
        },
        [subscribe]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    var shim2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
    useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim2;
    return useSyncExternalStoreShim_production;
  }
  var hasRequiredShim;
  function requireShim() {
    if (hasRequiredShim) return shim.exports;
    hasRequiredShim = 1;
    {
      shim.exports = requireUseSyncExternalStoreShim_production();
    }
    return shim.exports;
  }
  var shimExports = requireShim();
  var withSelector = { exports: {} };
  var useSyncExternalStoreWithSelector_production = {};
  var hasRequiredUseSyncExternalStoreWithSelector_production;
  function requireUseSyncExternalStoreWithSelector_production() {
    if (hasRequiredUseSyncExternalStoreWithSelector_production) return useSyncExternalStoreWithSelector_production;
    hasRequiredUseSyncExternalStoreWithSelector_production = 1;
    var React = requireReact();
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = React.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
    useSyncExternalStoreWithSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: false, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function() {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = true;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return memoizedSelection = currentSelection;
              }
              return memoizedSelection = nextSnapshot;
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return memoizedSnapshot = nextSnapshot, currentSelection;
            memoizedSnapshot = nextSnapshot;
            return memoizedSelection = nextSelection;
          }
          var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function() {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot ? void 0 : function() {
              return memoizedSelector(maybeGetServerSnapshot());
            }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function() {
          inst.hasValue = true;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    return useSyncExternalStoreWithSelector_production;
  }
  var hasRequiredWithSelector;
  function requireWithSelector() {
    if (hasRequiredWithSelector) return withSelector.exports;
    hasRequiredWithSelector = 1;
    {
      withSelector.exports = requireUseSyncExternalStoreWithSelector_production();
    }
    return withSelector.exports;
  }
  var withSelectorExports = requireWithSelector();
  var __assign$3 = function() {
    __assign$3 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$3.apply(this, arguments);
  };
  function createDictionaryWatcher(dictionary, displayName) {
    var ctx = reactExports.createContext(void 0);
    ctx.displayName = displayName;
    var createSubscriber = function(fields, isEqual) {
      var snapshot = __assign$3({}, dictionary);
      return {
        subscribe: function(onStoreChange) {
          snapshot = __assign$3({}, dictionary);
          var remove = dictionary === null || dictionary === void 0 ? void 0 : dictionary.AddListener(function() {
            var prev = snapshot;
            snapshot = __assign$3({}, dictionary);
            if (!fields)
              onStoreChange();
            else {
              var it = fields.values();
              for (var field = it.next().value; field; field = it.next().value) {
                if (isEqual ? !isEqual(prev[field], snapshot[field]) : prev[field] !== snapshot[field]) {
                  onStoreChange();
                  break;
                }
              }
            }
          });
          if (!remove) {
            console.warn("".concat(displayName, " dictionary does not provide a change listener"));
          }
          return function() {
            return remove === null || remove === void 0 ? void 0 : remove();
          };
        },
        getSnapshot: function() {
          return snapshot;
        }
      };
    };
    var defaultSubscriber = createSubscriber();
    var Provider = function GlobalsProvider(_a) {
      var children = _a.children;
      var value = shimExports.useSyncExternalStore(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot);
      return reactExports.createElement(ctx.Provider, { value }, children);
    };
    function useDictionaryContext() {
      var context = reactExports.useContext(ctx);
      if (context === void 0) {
        throw new Error("".concat(displayName, ".useContext must be used within a ").concat(displayName, ".Provider"));
      }
      return context;
    }
    function useValue(subscribeToAllFields, fieldEqual) {
      if (subscribeToAllFields === void 0) {
        subscribeToAllFields = false;
      }
      var fields = reactExports.useMemo(function() {
        return /* @__PURE__ */ new Set();
      }, []);
      var fieldsRef = reactExports.useRef(fields);
      var _a = reactExports.useState(false), allFieldsSubscribed = _a[0], setAllFieldsSubscribed = _a[1];
      subscribeToAllFields || (subscribeToAllFields = allFieldsSubscribed);
      var subscriber = reactExports.useMemo(function() {
        return subscribeToAllFields ? defaultSubscriber : createSubscriber(fieldsRef.current, fieldEqual);
      }, [subscribeToAllFields, fieldEqual]);
      var value = shimExports.useSyncExternalStore(subscriber.subscribe, subscriber.getSnapshot, subscriber.getSnapshot);
      var proxy = new Proxy(value, {
        get: function(target, p, receiver) {
          fields.add(p);
          return value[p];
        },
        ownKeys: function(target) {
          if (!allFieldsSubscribed)
            setAllFieldsSubscribed(true);
          return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor: function(target, p) {
          fields.add(p);
          return __assign$3(__assign$3({}, Reflect.getOwnPropertyDescriptor(target, p)), { value: value[p] });
        }
      });
      return proxy;
    }
    function useSelector(selector, isEqual) {
      return withSelectorExports.useSyncExternalStoreWithSelector(defaultSubscriber.subscribe, defaultSubscriber.getSnapshot, defaultSubscriber.getSnapshot, selector, isEqual);
    }
    return { context: ctx, Provider, useValue, useContext: useDictionaryContext, useSelector };
  }
  var globalsWatcher = createDictionaryWatcher(Globals, "globalsContext");
  var useGlobals = globalsWatcher.useValue;
  var constants = { exports: {} };
  var reactReconcilerConstants_production = {};
  var hasRequiredReactReconcilerConstants_production;
  function requireReactReconcilerConstants_production() {
    if (hasRequiredReactReconcilerConstants_production) return reactReconcilerConstants_production;
    hasRequiredReactReconcilerConstants_production = 1;
    reactReconcilerConstants_production.ConcurrentRoot = 1;
    reactReconcilerConstants_production.ContinuousEventPriority = 8;
    reactReconcilerConstants_production.DefaultEventPriority = 32;
    reactReconcilerConstants_production.DiscreteEventPriority = 2;
    reactReconcilerConstants_production.IdleEventPriority = 268435456;
    reactReconcilerConstants_production.LegacyRoot = 0;
    reactReconcilerConstants_production.NoEventPriority = 0;
    return reactReconcilerConstants_production;
  }
  var hasRequiredConstants;
  function requireConstants() {
    if (hasRequiredConstants) return constants.exports;
    hasRequiredConstants = 1;
    {
      constants.exports = requireReactReconcilerConstants_production();
    }
    return constants.exports;
  }
  var constantsExports = requireConstants();
  var version = "0.21.0";
  var __extends$1 = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var ErrorBoundary = (
    /** @class */
    (function(_super) {
      __extends$1(ErrorBoundary2, _super);
      function ErrorBoundary2(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, error: null };
        return _this;
      }
      ErrorBoundary2.getDerivedStateFromError = function(error) {
        return { hasError: true, error };
      };
      ErrorBoundary2.prototype.componentDidCatch = function(error, errorInfo) {
      };
      ErrorBoundary2.prototype.render = function() {
        var _a, _b;
        if (this.state.hasError) {
          return jsxRuntimeExports.jsxs("view", { id: "__react-unity-error-boundary", style: { color: "crimson", padding: 20, fontSize: 16 }, children: [jsxRuntimeExports.jsx("view", { style: { marginBottom: "12px" }, children: ((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || "" }), jsxRuntimeExports.jsx("view", { children: ((_b = this.state.error) === null || _b === void 0 ? void 0 : _b.stack) || "" })] });
        }
        return this.props.children;
      };
      return ErrorBoundary2;
    })(reactExports.Component)
  );
  function DefaultView(_a) {
    var children = _a.children, withHelpers = _a.withHelpers, renderCount2 = _a.renderCount;
    return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: !withHelpers ? children : jsxRuntimeExports.jsx(ErrorBoundary, { children }, renderCount2) });
  }
  var ObjectsRepo = (
    /** @class */
    /* @__PURE__ */ (function() {
      function ObjectsRepo2() {
        var _this = this;
        this.indices = [{}];
        this.objects = /* @__PURE__ */ new WeakMap();
        this.setObject = function(index, item) {
          var it = _this.indices[index];
          if (!it) {
            it = _this.indices[index] = {};
          }
          _this.objects.set(it, item);
        };
        this.addObject = function(item) {
          if (!item)
            return -1;
          var it = {};
          var ind = _this.indices.length;
          _this.indices.push(it);
          _this.objects.set(it, item);
          return ind;
        };
        this.getObject = function(index) {
          if (index < 0)
            return void 0;
          var it = _this.indices[index];
          return _this.objects.get(it);
        };
      }
      return ObjectsRepo2;
    })()
  );
  var reactReconciler = { exports: {} };
  var reactReconciler_production = { exports: {} };
  var scheduler = { exports: {} };
  var scheduler_production = {};
  var hasRequiredScheduler_production;
  function requireScheduler_production() {
    if (hasRequiredScheduler_production) return scheduler_production;
    hasRequiredScheduler_production = 1;
    (function(exports$1) {
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for (; 0 < index; ) {
          var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
          if (0 < compare(parent, node))
            heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
          else break a;
        }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a: for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
            var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
            if (0 > compare(left, last))
              rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
            else if (rightIndex < length && 0 > compare(right, last))
              heap[index] = right, heap[rightIndex] = last, index = rightIndex;
            else break a;
          }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
      }
      exports$1.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports$1.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        var localDate = Date, initialTime = localDate.now();
        exports$1.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback) pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
          }
      }
      var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
      function shouldYieldToHost() {
        return needsPaint ? true : exports$1.unstable_now() - startTime < frameInterval ? false : true;
      }
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports$1.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports$1.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask) hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      var schedulePerformWorkUntilDeadline;
      if ("function" === typeof localSetImmediate)
        schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports$1.unstable_now());
        }, ms);
      }
      exports$1.unstable_IdlePriority = 5;
      exports$1.unstable_ImmediatePriority = 1;
      exports$1.unstable_LowPriority = 4;
      exports$1.unstable_NormalPriority = 3;
      exports$1.unstable_Profiling = null;
      exports$1.unstable_UserBlockingPriority = 2;
      exports$1.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports$1.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports$1.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports$1.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports$1.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports$1.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports$1.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports$1.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports$1.unstable_shouldYield = shouldYieldToHost;
      exports$1.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
    })(scheduler_production);
    return scheduler_production;
  }
  var hasRequiredScheduler;
  function requireScheduler() {
    if (hasRequiredScheduler) return scheduler.exports;
    hasRequiredScheduler = 1;
    {
      scheduler.exports = requireScheduler_production();
    }
    return scheduler.exports;
  }
  var hasRequiredReactReconciler_production;
  function requireReactReconciler_production() {
    if (hasRequiredReactReconciler_production) return reactReconciler_production.exports;
    hasRequiredReactReconciler_production = 1;
    (function(module) {
      module.exports = function($$$config) {
        function createFiber(tag, pendingProps, key, mode) {
          return new FiberNode(tag, pendingProps, key, mode);
        }
        function noop() {
        }
        function formatProdErrorMessage(code) {
          var url = "https://react.dev/errors/" + code;
          if (1 < arguments.length) {
            url += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var i = 2; i < arguments.length; i++)
              url += "&args[]=" + encodeURIComponent(arguments[i]);
          }
          return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        }
        function getNearestMountedFiber(fiber) {
          var node = fiber, nearestMounted = fiber;
          if (fiber.alternate) for (; node.return; ) node = node.return;
          else {
            fiber = node;
            do
              node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
            while (fiber);
          }
          return 3 === node.tag ? nearestMounted : null;
        }
        function assertIsMounted(fiber) {
          if (getNearestMountedFiber(fiber) !== fiber)
            throw Error(formatProdErrorMessage(188));
        }
        function findCurrentFiberUsingSlowPath(fiber) {
          var alternate = fiber.alternate;
          if (!alternate) {
            alternate = getNearestMountedFiber(fiber);
            if (null === alternate) throw Error(formatProdErrorMessage(188));
            return alternate !== fiber ? null : fiber;
          }
          for (var a = fiber, b = alternate; ; ) {
            var parentA = a.return;
            if (null === parentA) break;
            var parentB = parentA.alternate;
            if (null === parentB) {
              b = parentA.return;
              if (null !== b) {
                a = b;
                continue;
              }
              break;
            }
            if (parentA.child === parentB.child) {
              for (parentB = parentA.child; parentB; ) {
                if (parentB === a) return assertIsMounted(parentA), fiber;
                if (parentB === b) return assertIsMounted(parentA), alternate;
                parentB = parentB.sibling;
              }
              throw Error(formatProdErrorMessage(188));
            }
            if (a.return !== b.return) a = parentA, b = parentB;
            else {
              for (var didFindChild = false, child$0 = parentA.child; child$0; ) {
                if (child$0 === a) {
                  didFindChild = true;
                  a = parentA;
                  b = parentB;
                  break;
                }
                if (child$0 === b) {
                  didFindChild = true;
                  b = parentA;
                  a = parentB;
                  break;
                }
                child$0 = child$0.sibling;
              }
              if (!didFindChild) {
                for (child$0 = parentB.child; child$0; ) {
                  if (child$0 === a) {
                    didFindChild = true;
                    a = parentB;
                    b = parentA;
                    break;
                  }
                  if (child$0 === b) {
                    didFindChild = true;
                    b = parentB;
                    a = parentA;
                    break;
                  }
                  child$0 = child$0.sibling;
                }
                if (!didFindChild) throw Error(formatProdErrorMessage(189));
              }
            }
            if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
          }
          if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
          return a.stateNode.current === a ? fiber : alternate;
        }
        function findCurrentHostFiberImpl(node) {
          var tag = node.tag;
          if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
          for (node = node.child; null !== node; ) {
            tag = findCurrentHostFiberImpl(node);
            if (null !== tag) return tag;
            node = node.sibling;
          }
          return null;
        }
        function findCurrentHostFiberWithNoPortalsImpl(node) {
          var tag = node.tag;
          if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
          for (node = node.child; null !== node; ) {
            if (4 !== node.tag && (tag = findCurrentHostFiberWithNoPortalsImpl(node), null !== tag))
              return tag;
            node = node.sibling;
          }
          return null;
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch (type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function createCursor(defaultValue) {
          return { current: defaultValue };
        }
        function pop(cursor) {
          0 > index$jscomp$0 || (cursor.current = valueStack[index$jscomp$0], valueStack[index$jscomp$0] = null, index$jscomp$0--);
        }
        function push(cursor, value) {
          index$jscomp$0++;
          valueStack[index$jscomp$0] = cursor.current;
          cursor.current = value;
        }
        function clz32Fallback(x) {
          x >>>= 0;
          return 0 === x ? 32 : 31 - (log$1(x) / LN2 | 0) | 0;
        }
        function getHighestPriorityLanes(lanes) {
          var pendingSyncLanes = lanes & 42;
          if (0 !== pendingSyncLanes) return pendingSyncLanes;
          switch (lanes & -lanes) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
              return 64;
            case 128:
              return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return lanes & 4194048;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              return lanes & 62914560;
            case 67108864:
              return 67108864;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 0;
            default:
              return lanes;
          }
        }
        function getNextLanes(root, wipLanes, rootHasPendingCommit) {
          var pendingLanes = root.pendingLanes;
          if (0 === pendingLanes) return 0;
          var nextLanes = 0, suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
          root = root.warmLanes;
          var nonIdlePendingLanes = pendingLanes & 134217727;
          0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
          return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
        }
        function checkIfRootIsPrerendering(root, renderLanes2) {
          return 0 === (root.pendingLanes & ~(root.suspendedLanes & ~root.pingedLanes) & renderLanes2);
        }
        function computeExpirationTime(lane, currentTime) {
          switch (lane) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
              return currentTime + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return currentTime + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              return -1;
            case 67108864:
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
              return -1;
            default:
              return -1;
          }
        }
        function claimNextTransitionLane() {
          var lane = nextTransitionLane;
          nextTransitionLane <<= 1;
          0 === (nextTransitionLane & 4194048) && (nextTransitionLane = 256);
          return lane;
        }
        function claimNextRetryLane() {
          var lane = nextRetryLane;
          nextRetryLane <<= 1;
          0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
          return lane;
        }
        function createLaneMap(initial) {
          for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
          return laneMap;
        }
        function markRootUpdated$1(root, updateLane) {
          root.pendingLanes |= updateLane;
          268435456 !== updateLane && (root.suspendedLanes = 0, root.pingedLanes = 0, root.warmLanes = 0);
        }
        function markRootFinished(root, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
          var previouslyPendingLanes = root.pendingLanes;
          root.pendingLanes = remainingLanes;
          root.suspendedLanes = 0;
          root.pingedLanes = 0;
          root.warmLanes = 0;
          root.expiredLanes &= remainingLanes;
          root.entangledLanes &= remainingLanes;
          root.errorRecoveryDisabledLanes &= remainingLanes;
          root.shellSuspendCounter = 0;
          var entanglements = root.entanglements, expirationTimes = root.expirationTimes, hiddenUpdates = root.hiddenUpdates;
          for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
            var index$5 = 31 - clz32(remainingLanes), lane = 1 << index$5;
            entanglements[index$5] = 0;
            expirationTimes[index$5] = -1;
            var hiddenUpdatesForLane = hiddenUpdates[index$5];
            if (null !== hiddenUpdatesForLane)
              for (hiddenUpdates[index$5] = null, index$5 = 0; index$5 < hiddenUpdatesForLane.length; index$5++) {
                var update = hiddenUpdatesForLane[index$5];
                null !== update && (update.lane &= -536870913);
              }
            remainingLanes &= ~lane;
          }
          0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, 0);
          0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root.tag && (root.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
        }
        function markSpawnedDeferredLane(root, spawnedLane, entangledLanes) {
          root.pendingLanes |= spawnedLane;
          root.suspendedLanes &= ~spawnedLane;
          var spawnedLaneIndex = 31 - clz32(spawnedLane);
          root.entangledLanes |= spawnedLane;
          root.entanglements[spawnedLaneIndex] = root.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 4194090;
        }
        function markRootEntangled(root, entangledLanes) {
          var rootEntangledLanes = root.entangledLanes |= entangledLanes;
          for (root = root.entanglements; rootEntangledLanes; ) {
            var index$6 = 31 - clz32(rootEntangledLanes), lane = 1 << index$6;
            lane & entangledLanes | root[index$6] & entangledLanes && (root[index$6] |= entangledLanes);
            rootEntangledLanes &= ~lane;
          }
        }
        function getBumpedLaneForHydrationByLane(lane) {
          switch (lane) {
            case 2:
              lane = 1;
              break;
            case 8:
              lane = 4;
              break;
            case 32:
              lane = 16;
              break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              lane = 128;
              break;
            case 268435456:
              lane = 134217728;
              break;
            default:
              lane = 0;
          }
          return lane;
        }
        function lanesToEventPriority(lanes) {
          lanes &= -lanes;
          return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
        }
        function setIsStrictModeForDevtools(newIsStrictMode) {
          "function" === typeof log && unstable_setDisableYieldValue(newIsStrictMode);
          if (injectedHook && "function" === typeof injectedHook.setStrictMode)
            try {
              injectedHook.setStrictMode(rendererID, newIsStrictMode);
            } catch (err) {
            }
        }
        function describeBuiltInComponentFrame(name) {
          if (void 0 === prefix)
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
              suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
          return "\n" + prefix + name + suffix;
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) return "";
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            var RunInRootFrame = {
              DetermineComponentFrameRoot: function() {
                try {
                  if (construct) {
                    var Fake = function() {
                      throw Error();
                    };
                    Object.defineProperty(Fake.prototype, "props", {
                      set: function() {
                        throw Error();
                      }
                    });
                    if ("object" === typeof Reflect && Reflect.construct) {
                      try {
                        Reflect.construct(Fake, []);
                      } catch (x) {
                        var control = x;
                      }
                      Reflect.construct(fn, [], Fake);
                    } else {
                      try {
                        Fake.call();
                      } catch (x$8) {
                        control = x$8;
                      }
                      fn.call(Fake.prototype);
                    }
                  } else {
                    try {
                      throw Error();
                    } catch (x$9) {
                      control = x$9;
                    }
                    (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                    });
                  }
                } catch (sample) {
                  if (sample && control && "string" === typeof sample.stack)
                    return [sample.stack, control.stack];
                }
                return [null, null];
              }
            };
            RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var namePropDescriptor = Object.getOwnPropertyDescriptor(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name"
            );
            namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
              RunInRootFrame.DetermineComponentFrameRoot,
              "name",
              { value: "DetermineComponentFrameRoot" }
            );
            var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
            if (sampleStack && controlStack) {
              var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
              for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
                RunInRootFrame++;
              for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
                "DetermineComponentFrameRoot"
              ); )
                namePropDescriptor++;
              if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
                for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
                  namePropDescriptor--;
              for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
                if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                  if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                    do
                      if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                        var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                        fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                        return frame;
                      }
                    while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
                  }
                  break;
                }
            }
          } finally {
            reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
          }
          return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
        }
        function describeFiber(fiber) {
          switch (fiber.tag) {
            case 26:
            case 27:
            case 5:
              return describeBuiltInComponentFrame(fiber.type);
            case 16:
              return describeBuiltInComponentFrame("Lazy");
            case 13:
              return describeBuiltInComponentFrame("Suspense");
            case 19:
              return describeBuiltInComponentFrame("SuspenseList");
            case 0:
            case 15:
              return describeNativeComponentFrame(fiber.type, false);
            case 11:
              return describeNativeComponentFrame(fiber.type.render, false);
            case 1:
              return describeNativeComponentFrame(fiber.type, true);
            case 31:
              return describeBuiltInComponentFrame("Activity");
            default:
              return "";
          }
        }
        function getStackByFiberInDevAndProd(workInProgress2) {
          try {
            var info = "";
            do
              info += describeFiber(workInProgress2), workInProgress2 = workInProgress2.return;
            while (workInProgress2);
            return info;
          } catch (x) {
            return "\nError generating stack: " + x.message + "\n" + x.stack;
          }
        }
        function createCapturedValueAtFiber(value, source) {
          if ("object" === typeof value && null !== value) {
            var existing = CapturedStacks.get(value);
            if (void 0 !== existing) return existing;
            source = {
              value,
              source,
              stack: getStackByFiberInDevAndProd(source)
            };
            CapturedStacks.set(value, source);
            return source;
          }
          return {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
        }
        function pushTreeFork(workInProgress2, totalChildren) {
          forkStack[forkStackIndex++] = treeForkCount;
          forkStack[forkStackIndex++] = treeForkProvider;
          treeForkProvider = workInProgress2;
          treeForkCount = totalChildren;
        }
        function pushTreeId(workInProgress2, totalChildren, index) {
          idStack[idStackIndex++] = treeContextId;
          idStack[idStackIndex++] = treeContextOverflow;
          idStack[idStackIndex++] = treeContextProvider;
          treeContextProvider = workInProgress2;
          var baseIdWithLeadingBit = treeContextId;
          workInProgress2 = treeContextOverflow;
          var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
          baseIdWithLeadingBit &= ~(1 << baseLength);
          index += 1;
          var length = 32 - clz32(totalChildren) + baseLength;
          if (30 < length) {
            var numberOfOverflowBits = baseLength - baseLength % 5;
            length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
            baseIdWithLeadingBit >>= numberOfOverflowBits;
            baseLength -= numberOfOverflowBits;
            treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
            treeContextOverflow = length + workInProgress2;
          } else
            treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
        }
        function pushMaterializedTreeId(workInProgress2) {
          null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
        }
        function popTreeContext(workInProgress2) {
          for (; workInProgress2 === treeForkProvider; )
            treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
          for (; workInProgress2 === treeContextProvider; )
            treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
        }
        function pushHostContainer(fiber, nextRootInstance) {
          push(rootInstanceStackCursor, nextRootInstance);
          push(contextFiberStackCursor, fiber);
          push(contextStackCursor, null);
          fiber = getRootHostContext(nextRootInstance);
          pop(contextStackCursor);
          push(contextStackCursor, fiber);
        }
        function popHostContainer() {
          pop(contextStackCursor);
          pop(contextFiberStackCursor);
          pop(rootInstanceStackCursor);
        }
        function pushHostContext(fiber) {
          null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
          var context = contextStackCursor.current, nextContext = getChildHostContext(context, fiber.type);
          context !== nextContext && (push(contextFiberStackCursor, fiber), push(contextStackCursor, nextContext));
        }
        function popHostContext(fiber) {
          contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
          hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), isPrimaryRenderer ? HostTransitionContext2._currentValue = NotPendingTransition : HostTransitionContext2._currentValue2 = NotPendingTransition);
        }
        function throwOnHydrationMismatch(fiber) {
          var error = Error(formatProdErrorMessage(418, ""));
          queueHydrationError(createCapturedValueAtFiber(error, fiber));
          throw HydrationMismatchException;
        }
        function prepareToHydrateHostInstance(fiber, hostContext2) {
          if (!supportsHydration) throw Error(formatProdErrorMessage(175));
          hydrateInstance(
            fiber.stateNode,
            fiber.type,
            fiber.memoizedProps,
            hostContext2,
            fiber
          ) || throwOnHydrationMismatch(fiber);
        }
        function popToNextHostParent(fiber) {
          for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
            switch (hydrationParentFiber.tag) {
              case 5:
              case 13:
                rootOrSingletonContext = false;
                return;
              case 27:
              case 3:
                rootOrSingletonContext = true;
                return;
              default:
                hydrationParentFiber = hydrationParentFiber.return;
            }
        }
        function popHydrationState(fiber) {
          if (!supportsHydration || fiber !== hydrationParentFiber) return false;
          if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
          var tag = fiber.tag;
          supportsSingletons ? 3 !== tag && 27 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && throwOnHydrationMismatch(fiber) : 3 !== tag && (5 !== tag || shouldDeleteUnhydratedTailInstances(fiber.type) && !shouldSetTextContent(fiber.type, fiber.memoizedProps)) && nextHydratableInstance && throwOnHydrationMismatch(fiber);
          popToNextHostParent(fiber);
          if (13 === tag) {
            if (!supportsHydration) throw Error(formatProdErrorMessage(316));
            fiber = fiber.memoizedState;
            fiber = null !== fiber ? fiber.dehydrated : null;
            if (!fiber) throw Error(formatProdErrorMessage(317));
            nextHydratableInstance = getNextHydratableInstanceAfterSuspenseInstance(fiber);
          } else
            nextHydratableInstance = supportsSingletons && 27 === tag ? getNextHydratableSiblingAfterSingleton(
              fiber.type,
              nextHydratableInstance
            ) : hydrationParentFiber ? getNextHydratableSibling(fiber.stateNode) : null;
          return true;
        }
        function resetHydrationState() {
          supportsHydration && (nextHydratableInstance = hydrationParentFiber = null, isHydrating = false);
        }
        function upgradeHydrationErrorsToRecoverable() {
          var queuedErrors = hydrationErrors;
          null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
            workInProgressRootRecoverableErrors,
            queuedErrors
          ), hydrationErrors = null);
          return queuedErrors;
        }
        function queueHydrationError(error) {
          null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
        }
        function is(x, y) {
          return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
        }
        function pushProvider(providerFiber, context, nextValue) {
          isPrimaryRenderer ? (push(valueCursor, context._currentValue), context._currentValue = nextValue) : (push(valueCursor, context._currentValue2), context._currentValue2 = nextValue);
        }
        function popProvider(context) {
          var currentValue = valueCursor.current;
          isPrimaryRenderer ? context._currentValue = currentValue : context._currentValue2 = currentValue;
          pop(valueCursor);
        }
        function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
          for (; null !== parent; ) {
            var alternate = parent.alternate;
            (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
            if (parent === propagationRoot) break;
            parent = parent.return;
          }
        }
        function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
          var fiber = workInProgress2.child;
          null !== fiber && (fiber.return = workInProgress2);
          for (; null !== fiber; ) {
            var list = fiber.dependencies;
            if (null !== list) {
              var nextFiber = fiber.child;
              list = list.firstContext;
              a: for (; null !== list; ) {
                var dependency = list;
                list = fiber;
                for (var i = 0; i < contexts.length; i++)
                  if (dependency.context === contexts[i]) {
                    list.lanes |= renderLanes2;
                    dependency = list.alternate;
                    null !== dependency && (dependency.lanes |= renderLanes2);
                    scheduleContextWorkOnParentPath(
                      list.return,
                      renderLanes2,
                      workInProgress2
                    );
                    forcePropagateEntireTree || (nextFiber = null);
                    break a;
                  }
                list = dependency.next;
              }
            } else if (18 === fiber.tag) {
              nextFiber = fiber.return;
              if (null === nextFiber) throw Error(formatProdErrorMessage(341));
              nextFiber.lanes |= renderLanes2;
              list = nextFiber.alternate;
              null !== list && (list.lanes |= renderLanes2);
              scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
              nextFiber = null;
            } else nextFiber = fiber.child;
            if (null !== nextFiber) nextFiber.return = fiber;
            else
              for (nextFiber = fiber; null !== nextFiber; ) {
                if (nextFiber === workInProgress2) {
                  nextFiber = null;
                  break;
                }
                fiber = nextFiber.sibling;
                if (null !== fiber) {
                  fiber.return = nextFiber.return;
                  nextFiber = fiber;
                  break;
                }
                nextFiber = nextFiber.return;
              }
            fiber = nextFiber;
          }
        }
        function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
          current = null;
          for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
            if (!isInsidePropagationBailout) {
              if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
              else if (0 !== (parent.flags & 262144)) break;
            }
            if (10 === parent.tag) {
              var currentParent = parent.alternate;
              if (null === currentParent) throw Error(formatProdErrorMessage(387));
              currentParent = currentParent.memoizedProps;
              if (null !== currentParent) {
                var context = parent.type;
                objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
              }
            } else if (parent === hostTransitionProviderCursor.current) {
              currentParent = parent.alternate;
              if (null === currentParent) throw Error(formatProdErrorMessage(387));
              currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext2) : current = [HostTransitionContext2]);
            }
            parent = parent.return;
          }
          null !== current && propagateContextChanges(
            workInProgress2,
            current,
            renderLanes2,
            forcePropagateEntireTree
          );
          workInProgress2.flags |= 262144;
        }
        function checkIfContextChanged(currentDependencies) {
          for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
            var context = currentDependencies.context;
            if (!objectIs(
              isPrimaryRenderer ? context._currentValue : context._currentValue2,
              currentDependencies.memoizedValue
            ))
              return true;
            currentDependencies = currentDependencies.next;
          }
          return false;
        }
        function prepareToReadContext(workInProgress2) {
          currentlyRenderingFiber$1 = workInProgress2;
          lastContextDependency = null;
          workInProgress2 = workInProgress2.dependencies;
          null !== workInProgress2 && (workInProgress2.firstContext = null);
        }
        function readContext(context) {
          return readContextForConsumer(currentlyRenderingFiber$1, context);
        }
        function readContextDuringReconciliation(consumer, context) {
          null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
          return readContextForConsumer(consumer, context);
        }
        function readContextForConsumer(consumer, context) {
          var value = isPrimaryRenderer ? context._currentValue : context._currentValue2;
          context = { context, memoizedValue: value, next: null };
          if (null === lastContextDependency) {
            if (null === consumer) throw Error(formatProdErrorMessage(308));
            lastContextDependency = context;
            consumer.dependencies = { lanes: 0, firstContext: context };
            consumer.flags |= 524288;
          } else lastContextDependency = lastContextDependency.next = context;
          return value;
        }
        function createCache() {
          return {
            controller: new AbortControllerLocal(),
            data: /* @__PURE__ */ new Map(),
            refCount: 0
          };
        }
        function releaseCache(cache) {
          cache.refCount--;
          0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
            cache.controller.abort();
          });
        }
        function ensureRootIsScheduled(root) {
          root !== lastScheduledRoot && null === root.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root : lastScheduledRoot = lastScheduledRoot.next = root);
          mightHavePendingSyncWork = true;
          didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
        }
        function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
          if (!isFlushingWork && mightHavePendingSyncWork) {
            isFlushingWork = true;
            do {
              var didPerformSomeWork = false;
              for (var root = firstScheduledRoot; null !== root; ) {
                if (0 !== syncTransitionLanes) {
                  var pendingLanes = root.pendingLanes;
                  if (0 === pendingLanes) var JSCompiler_inline_result = 0;
                  else {
                    var suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes;
                    JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                    JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                    JSCompiler_inline_result = JSCompiler_inline_result & 201326741 ? JSCompiler_inline_result & 201326741 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
                  }
                  0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root, JSCompiler_inline_result));
                } else
                  JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
                    root,
                    root === workInProgressRoot ? JSCompiler_inline_result : 0,
                    null !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout
                  ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root, JSCompiler_inline_result));
                root = root.next;
              }
            } while (didPerformSomeWork);
            isFlushingWork = false;
          }
        }
        function processRootScheduleInImmediateTask() {
          processRootScheduleInMicrotask();
        }
        function processRootScheduleInMicrotask() {
          mightHavePendingSyncWork = didScheduleMicrotask = false;
          var syncTransitionLanes = 0;
          0 !== currentEventTransitionLane && (shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane), currentEventTransitionLane = 0);
          for (var currentTime = now(), prev = null, root = firstScheduledRoot; null !== root; ) {
            var next = root.next, nextLanes = scheduleTaskForRootDuringMicrotask(root, currentTime);
            if (0 === nextLanes)
              root.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
            else if (prev = root, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
              mightHavePendingSyncWork = true;
            root = next;
          }
          flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
        }
        function scheduleTaskForRootDuringMicrotask(root, currentTime) {
          for (var suspendedLanes = root.suspendedLanes, pingedLanes = root.pingedLanes, expirationTimes = root.expirationTimes, lanes = root.pendingLanes & -62914561; 0 < lanes; ) {
            var index$3 = 31 - clz32(lanes), lane = 1 << index$3, expirationTime = expirationTimes[index$3];
            if (-1 === expirationTime) {
              if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
                expirationTimes[index$3] = computeExpirationTime(lane, currentTime);
            } else expirationTime <= currentTime && (root.expiredLanes |= lane);
            lanes &= ~lane;
          }
          currentTime = workInProgressRoot;
          suspendedLanes = workInProgressRootRenderLanes;
          suspendedLanes = getNextLanes(
            root,
            root === currentTime ? suspendedLanes : 0,
            null !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout
          );
          pingedLanes = root.callbackNode;
          if (0 === suspendedLanes || root === currentTime && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit)
            return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root.callbackNode = null, root.callbackPriority = 0;
          if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root, suspendedLanes)) {
            currentTime = suspendedLanes & -suspendedLanes;
            if (currentTime === root.callbackPriority) return currentTime;
            null !== pingedLanes && cancelCallback$1(pingedLanes);
            switch (lanesToEventPriority(suspendedLanes)) {
              case 2:
              case 8:
                suspendedLanes = UserBlockingPriority;
                break;
              case 32:
                suspendedLanes = NormalPriority$1;
                break;
              case 268435456:
                suspendedLanes = IdlePriority;
                break;
              default:
                suspendedLanes = NormalPriority$1;
            }
            pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root);
            suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
            root.callbackPriority = currentTime;
            root.callbackNode = suspendedLanes;
            return currentTime;
          }
          null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
          root.callbackPriority = 2;
          root.callbackNode = null;
          return 2;
        }
        function performWorkOnRootViaSchedulerTask(root, didTimeout) {
          if (0 !== pendingEffectsStatus && 5 !== pendingEffectsStatus)
            return root.callbackNode = null, root.callbackPriority = 0, null;
          var originalCallbackNode = root.callbackNode;
          if (flushPendingEffects() && root.callbackNode !== originalCallbackNode)
            return null;
          var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
          workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
            root,
            root === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
            null !== root.cancelPendingCommit || root.timeoutHandle !== noTimeout
          );
          if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
          performWorkOnRoot(root, workInProgressRootRenderLanes$jscomp$0, didTimeout);
          scheduleTaskForRootDuringMicrotask(root, now());
          return null != root.callbackNode && root.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root) : null;
        }
        function performSyncWorkOnRoot(root, lanes) {
          if (flushPendingEffects()) return null;
          performWorkOnRoot(root, lanes, true);
        }
        function scheduleImmediateRootScheduleTask() {
          supportsMicrotasks ? scheduleMicrotask(function() {
            0 !== (executionContext & 6) ? scheduleCallback$3(
              ImmediatePriority,
              processRootScheduleInImmediateTask
            ) : processRootScheduleInMicrotask();
          }) : scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          );
        }
        function requestTransitionLane() {
          0 === currentEventTransitionLane && (currentEventTransitionLane = claimNextTransitionLane());
          return currentEventTransitionLane;
        }
        function entangleAsyncAction(transition, thenable) {
          if (null === currentEntangledListeners) {
            var entangledListeners = currentEntangledListeners = [];
            currentEntangledPendingCount = 0;
            currentEntangledLane = requestTransitionLane();
            currentEntangledActionThenable = {
              status: "pending",
              value: void 0,
              then: function(resolve) {
                entangledListeners.push(resolve);
              }
            };
          }
          currentEntangledPendingCount++;
          thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
          return thenable;
        }
        function pingEngtangledActionScope() {
          if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
            null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
            var listeners = currentEntangledListeners;
            currentEntangledListeners = null;
            currentEntangledLane = 0;
            currentEntangledActionThenable = null;
            for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
          }
        }
        function chainThenableValue(thenable, result) {
          var listeners = [], thenableWithOverride = {
            status: "pending",
            value: null,
            reason: null,
            then: function(resolve) {
              listeners.push(resolve);
            }
          };
          thenable.then(
            function() {
              thenableWithOverride.status = "fulfilled";
              thenableWithOverride.value = result;
              for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
            },
            function(error) {
              thenableWithOverride.status = "rejected";
              thenableWithOverride.reason = error;
              for (error = 0; error < listeners.length; error++)
                (0, listeners[error])(void 0);
            }
          );
          return thenableWithOverride;
        }
        function peekCacheFromPool() {
          var cacheResumedFromPreviousRender = resumedCache.current;
          return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
        }
        function pushTransition(offscreenWorkInProgress, prevCachePool) {
          null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
        }
        function getSuspendedCache() {
          var cacheFromPool = peekCacheFromPool();
          return null === cacheFromPool ? null : {
            parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
            pool: cacheFromPool
          };
        }
        function shallowEqual(objA, objB) {
          if (objectIs(objA, objB)) return true;
          if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
            return false;
          var keysA = Object.keys(objA), keysB = Object.keys(objB);
          if (keysA.length !== keysB.length) return false;
          for (keysB = 0; keysB < keysA.length; keysB++) {
            var currentKey = keysA[keysB];
            if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
              return false;
          }
          return true;
        }
        function isThenableResolved(thenable) {
          thenable = thenable.status;
          return "fulfilled" === thenable || "rejected" === thenable;
        }
        function noop$1() {
        }
        function trackUsedThenable(thenableState2, thenable, index) {
          index = thenableState2[index];
          void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop$1, noop$1), thenable = index);
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            default:
              if ("string" === typeof thenable.status) thenable.then(noop$1, noop$1);
              else {
                thenableState2 = workInProgressRoot;
                if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
                  throw Error(formatProdErrorMessage(482));
                thenableState2 = thenable;
                thenableState2.status = "pending";
                thenableState2.then(
                  function(fulfilledValue) {
                    if ("pending" === thenable.status) {
                      var fulfilledThenable = thenable;
                      fulfilledThenable.status = "fulfilled";
                      fulfilledThenable.value = fulfilledValue;
                    }
                  },
                  function(error) {
                    if ("pending" === thenable.status) {
                      var rejectedThenable = thenable;
                      rejectedThenable.status = "rejected";
                      rejectedThenable.reason = error;
                    }
                  }
                );
              }
              switch (thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
              }
              suspendedThenable = thenable;
              throw SuspenseException;
          }
        }
        function getSuspendedThenable() {
          if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
          var thenable = suspendedThenable;
          suspendedThenable = null;
          return thenable;
        }
        function checkIfUseWrappedInAsyncCatch(rejectedReason) {
          if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
            throw Error(formatProdErrorMessage(483));
        }
        function finishQueueingConcurrentUpdates() {
          for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
            var fiber = concurrentQueues[i];
            concurrentQueues[i++] = null;
            var queue = concurrentQueues[i];
            concurrentQueues[i++] = null;
            var update = concurrentQueues[i];
            concurrentQueues[i++] = null;
            var lane = concurrentQueues[i];
            concurrentQueues[i++] = null;
            if (null !== queue && null !== update) {
              var pending = queue.pending;
              null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
              queue.pending = update;
            }
            0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
          }
        }
        function enqueueUpdate$1(fiber, queue, update, lane) {
          concurrentQueues[concurrentQueuesIndex++] = fiber;
          concurrentQueues[concurrentQueuesIndex++] = queue;
          concurrentQueues[concurrentQueuesIndex++] = update;
          concurrentQueues[concurrentQueuesIndex++] = lane;
          concurrentlyUpdatedLanes |= lane;
          fiber.lanes |= lane;
          fiber = fiber.alternate;
          null !== fiber && (fiber.lanes |= lane);
        }
        function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
          enqueueUpdate$1(fiber, queue, update, lane);
          return getRootForUpdatedFiber(fiber);
        }
        function enqueueConcurrentRenderForLane(fiber, lane) {
          enqueueUpdate$1(fiber, null, null, lane);
          return getRootForUpdatedFiber(fiber);
        }
        function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
          sourceFiber.lanes |= lane;
          var alternate = sourceFiber.alternate;
          null !== alternate && (alternate.lanes |= lane);
          for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
            parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
          return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
        }
        function getRootForUpdatedFiber(sourceFiber) {
          if (50 < nestedUpdateCount)
            throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
          for (var parent = sourceFiber.return; null !== parent; )
            sourceFiber = parent, parent = sourceFiber.return;
          return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
        }
        function initializeUpdateQueue(fiber) {
          fiber.updateQueue = {
            baseState: fiber.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, lanes: 0, hiddenCallbacks: null },
            callbacks: null
          };
        }
        function cloneUpdateQueue(current, workInProgress2) {
          current = current.updateQueue;
          workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
            baseState: current.baseState,
            firstBaseUpdate: current.firstBaseUpdate,
            lastBaseUpdate: current.lastBaseUpdate,
            shared: current.shared,
            callbacks: null
          });
        }
        function createUpdate(lane) {
          return { lane, tag: 0, payload: null, callback: null, next: null };
        }
        function enqueueUpdate(fiber, update, lane) {
          var updateQueue = fiber.updateQueue;
          if (null === updateQueue) return null;
          updateQueue = updateQueue.shared;
          if (0 !== (executionContext & 2)) {
            var pending = updateQueue.pending;
            null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
            updateQueue.pending = update;
            update = getRootForUpdatedFiber(fiber);
            markUpdateLaneFromFiberToRoot(fiber, null, lane);
            return update;
          }
          enqueueUpdate$1(fiber, updateQueue, update, lane);
          return getRootForUpdatedFiber(fiber);
        }
        function entangleTransitions(root, fiber, lane) {
          fiber = fiber.updateQueue;
          if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
            var queueLanes = fiber.lanes;
            queueLanes &= root.pendingLanes;
            lane |= queueLanes;
            fiber.lanes = lane;
            markRootEntangled(root, lane);
          }
        }
        function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
          var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
          if (null !== current && (current = current.updateQueue, queue === current)) {
            var newFirst = null, newLast = null;
            queue = queue.firstBaseUpdate;
            if (null !== queue) {
              do {
                var clone = {
                  lane: queue.lane,
                  tag: queue.tag,
                  payload: queue.payload,
                  callback: null,
                  next: null
                };
                null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
                queue = queue.next;
              } while (null !== queue);
              null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
            } else newFirst = newLast = capturedUpdate;
            queue = {
              baseState: current.baseState,
              firstBaseUpdate: newFirst,
              lastBaseUpdate: newLast,
              shared: current.shared,
              callbacks: current.callbacks
            };
            workInProgress2.updateQueue = queue;
            return;
          }
          workInProgress2 = queue.lastBaseUpdate;
          null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
          queue.lastBaseUpdate = capturedUpdate;
        }
        function suspendIfUpdateReadFromEntangledAsyncAction() {
          if (didReadFromEntangledAsyncAction) {
            var entangledActionThenable = currentEntangledActionThenable;
            if (null !== entangledActionThenable) throw entangledActionThenable;
          }
        }
        function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
          didReadFromEntangledAsyncAction = false;
          var queue = workInProgress$jscomp$0.updateQueue;
          hasForceUpdate = false;
          var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
          if (null !== pendingQueue) {
            queue.shared.pending = null;
            var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
            lastPendingUpdate.next = null;
            null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
            lastBaseUpdate = lastPendingUpdate;
            var current = workInProgress$jscomp$0.alternate;
            null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
          }
          if (null !== firstBaseUpdate) {
            var newState = queue.baseState;
            lastBaseUpdate = 0;
            current = firstPendingUpdate = lastPendingUpdate = null;
            pendingQueue = firstBaseUpdate;
            do {
              var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
              if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
                0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
                null !== current && (current = current.next = {
                  lane: 0,
                  tag: pendingQueue.tag,
                  payload: pendingQueue.payload,
                  callback: null,
                  next: null
                });
                a: {
                  var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
                  updateLane = props;
                  var instance = instance$jscomp$0;
                  switch (update.tag) {
                    case 1:
                      workInProgress2 = update.payload;
                      if ("function" === typeof workInProgress2) {
                        newState = workInProgress2.call(
                          instance,
                          newState,
                          updateLane
                        );
                        break a;
                      }
                      newState = workInProgress2;
                      break a;
                    case 3:
                      workInProgress2.flags = workInProgress2.flags & -65537 | 128;
                    case 0:
                      workInProgress2 = update.payload;
                      updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
                      if (null === updateLane || void 0 === updateLane) break a;
                      newState = assign({}, newState, updateLane);
                      break a;
                    case 2:
                      hasForceUpdate = true;
                  }
                }
                updateLane = pendingQueue.callback;
                null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
              } else
                isHiddenUpdate = {
                  lane: updateLane,
                  tag: pendingQueue.tag,
                  payload: pendingQueue.payload,
                  callback: pendingQueue.callback,
                  next: null
                }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
              pendingQueue = pendingQueue.next;
              if (null === pendingQueue)
                if (pendingQueue = queue.shared.pending, null === pendingQueue)
                  break;
                else
                  isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
            } while (1);
            null === current && (lastPendingUpdate = newState);
            queue.baseState = lastPendingUpdate;
            queue.firstBaseUpdate = firstPendingUpdate;
            queue.lastBaseUpdate = current;
            null === firstBaseUpdate && (queue.shared.lanes = 0);
            workInProgressRootSkippedLanes |= lastBaseUpdate;
            workInProgress$jscomp$0.lanes = lastBaseUpdate;
            workInProgress$jscomp$0.memoizedState = newState;
          }
        }
        function callCallback(callback, context) {
          if ("function" !== typeof callback)
            throw Error(formatProdErrorMessage(191, callback));
          callback.call(context);
        }
        function commitCallbacks(updateQueue, context) {
          var callbacks = updateQueue.callbacks;
          if (null !== callbacks)
            for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
              callCallback(callbacks[updateQueue], context);
        }
        function pushHiddenContext(fiber, context) {
          fiber = entangledRenderLanes;
          push(prevEntangledRenderLanesCursor, fiber);
          push(currentTreeHiddenStackCursor, context);
          entangledRenderLanes = fiber | context.baseLanes;
        }
        function reuseHiddenContextOnStack() {
          push(prevEntangledRenderLanesCursor, entangledRenderLanes);
          push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
        }
        function popHiddenContext() {
          entangledRenderLanes = prevEntangledRenderLanesCursor.current;
          pop(currentTreeHiddenStackCursor);
          pop(prevEntangledRenderLanesCursor);
        }
        function throwInvalidHookError() {
          throw Error(formatProdErrorMessage(321));
        }
        function areHookInputsEqual(nextDeps, prevDeps) {
          if (null === prevDeps) return false;
          for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
            if (!objectIs(nextDeps[i], prevDeps[i])) return false;
          return true;
        }
        function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
          renderLanes = nextRenderLanes;
          currentlyRenderingFiber = workInProgress2;
          workInProgress2.memoizedState = null;
          workInProgress2.updateQueue = null;
          workInProgress2.lanes = 0;
          ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
          shouldDoubleInvokeUserFnsInHooksDEV = false;
          nextRenderLanes = Component(props, secondArg);
          shouldDoubleInvokeUserFnsInHooksDEV = false;
          didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
            workInProgress2,
            Component,
            props,
            secondArg
          ));
          finishRenderingHooks(current);
          return nextRenderLanes;
        }
        function finishRenderingHooks(current) {
          ReactSharedInternals.H = ContextOnlyDispatcher;
          var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
          renderLanes = 0;
          workInProgressHook = currentHook = currentlyRenderingFiber = null;
          didScheduleRenderPhaseUpdate = false;
          thenableIndexCounter$1 = 0;
          thenableState$1 = null;
          if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
          null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
        }
        function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
          currentlyRenderingFiber = workInProgress2;
          var numberOfReRenders = 0;
          do {
            didScheduleRenderPhaseUpdateDuringThisPass && (thenableState$1 = null);
            thenableIndexCounter$1 = 0;
            didScheduleRenderPhaseUpdateDuringThisPass = false;
            if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
            numberOfReRenders += 1;
            workInProgressHook = currentHook = null;
            if (null != workInProgress2.updateQueue) {
              var children = workInProgress2.updateQueue;
              children.lastEffect = null;
              children.events = null;
              children.stores = null;
              null != children.memoCache && (children.memoCache.index = 0);
            }
            ReactSharedInternals.H = HooksDispatcherOnRerender;
            children = Component(props, secondArg);
          } while (didScheduleRenderPhaseUpdateDuringThisPass);
          return children;
        }
        function TransitionAwareHostComponent() {
          var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
          maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
          dispatcher = dispatcher.useState()[0];
          (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
          return maybeThenable;
        }
        function checkDidRenderIdHook() {
          var didRenderIdHook = 0 !== localIdCounter;
          localIdCounter = 0;
          return didRenderIdHook;
        }
        function bailoutHooks(current, workInProgress2, lanes) {
          workInProgress2.updateQueue = current.updateQueue;
          workInProgress2.flags &= -2053;
          current.lanes &= ~lanes;
        }
        function resetHooksOnUnwind(workInProgress2) {
          if (didScheduleRenderPhaseUpdate) {
            for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
              var queue = workInProgress2.queue;
              null !== queue && (queue.pending = null);
              workInProgress2 = workInProgress2.next;
            }
            didScheduleRenderPhaseUpdate = false;
          }
          renderLanes = 0;
          workInProgressHook = currentHook = currentlyRenderingFiber = null;
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          thenableIndexCounter$1 = localIdCounter = 0;
          thenableState$1 = null;
        }
        function mountWorkInProgressHook() {
          var hook = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
          };
          null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
          return workInProgressHook;
        }
        function updateWorkInProgressHook() {
          if (null === currentHook) {
            var nextCurrentHook = currentlyRenderingFiber.alternate;
            nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
          } else nextCurrentHook = currentHook.next;
          var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
          if (null !== nextWorkInProgressHook)
            workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
          else {
            if (null === nextCurrentHook) {
              if (null === currentlyRenderingFiber.alternate)
                throw Error(formatProdErrorMessage(467));
              throw Error(formatProdErrorMessage(310));
            }
            currentHook = nextCurrentHook;
            nextCurrentHook = {
              memoizedState: currentHook.memoizedState,
              baseState: currentHook.baseState,
              baseQueue: currentHook.baseQueue,
              queue: currentHook.queue,
              next: null
            };
            null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
          }
          return workInProgressHook;
        }
        function createFunctionComponentUpdateQueue() {
          return { lastEffect: null, events: null, stores: null, memoCache: null };
        }
        function useThenable(thenable) {
          var index = thenableIndexCounter$1;
          thenableIndexCounter$1 += 1;
          null === thenableState$1 && (thenableState$1 = []);
          thenable = trackUsedThenable(thenableState$1, thenable, index);
          index = currentlyRenderingFiber;
          null === (null === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = null === index || null === index.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
          return thenable;
        }
        function use(usable) {
          if (null !== usable && "object" === typeof usable) {
            if ("function" === typeof usable.then) return useThenable(usable);
            if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
          }
          throw Error(formatProdErrorMessage(438, String(usable)));
        }
        function useMemoCache(size) {
          var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
          null !== updateQueue && (memoCache = updateQueue.memoCache);
          if (null == memoCache) {
            var current = currentlyRenderingFiber.alternate;
            null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
              data: current.data.map(function(array) {
                return array.slice();
              }),
              index: 0
            })));
          }
          null == memoCache && (memoCache = { data: [], index: 0 });
          null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
          updateQueue.memoCache = memoCache;
          updateQueue = memoCache.data[memoCache.index];
          if (void 0 === updateQueue)
            for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
              updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
          memoCache.index++;
          return updateQueue;
        }
        function basicStateReducer(state, action) {
          return "function" === typeof action ? action(state) : action;
        }
        function updateReducer(reducer) {
          var hook = updateWorkInProgressHook();
          return updateReducerImpl(hook, currentHook, reducer);
        }
        function updateReducerImpl(hook, current, reducer) {
          var queue = hook.queue;
          if (null === queue) throw Error(formatProdErrorMessage(311));
          queue.lastRenderedReducer = reducer;
          var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
          if (null !== pendingQueue) {
            if (null !== baseQueue) {
              var baseFirst = baseQueue.next;
              baseQueue.next = pendingQueue.next;
              pendingQueue.next = baseFirst;
            }
            current.baseQueue = baseQueue = pendingQueue;
            queue.pending = null;
          }
          pendingQueue = hook.baseState;
          if (null === baseQueue) hook.memoizedState = pendingQueue;
          else {
            current = baseQueue.next;
            var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$23 = false;
            do {
              var updateLane = update.lane & -536870913;
              if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
                var revertLane = update.revertLane;
                if (0 === revertLane)
                  null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                    lane: 0,
                    revertLane: 0,
                    action: update.action,
                    hasEagerState: update.hasEagerState,
                    eagerState: update.eagerState,
                    next: null
                  }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$23 = true);
                else if ((renderLanes & revertLane) === revertLane) {
                  update = update.next;
                  revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$23 = true);
                  continue;
                } else
                  updateLane = {
                    lane: 0,
                    revertLane: update.revertLane,
                    action: update.action,
                    hasEagerState: update.hasEagerState,
                    eagerState: update.eagerState,
                    next: null
                  }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
                updateLane = update.action;
                shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
                pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
              } else
                revertLane = {
                  lane: updateLane,
                  revertLane: update.revertLane,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
              update = update.next;
            } while (null !== update && update !== current);
            null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
            if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$23 && (reducer = currentEntangledActionThenable, null !== reducer)))
              throw reducer;
            hook.memoizedState = pendingQueue;
            hook.baseState = baseFirst;
            hook.baseQueue = newBaseQueueLast;
            queue.lastRenderedState = pendingQueue;
          }
          null === baseQueue && (queue.lanes = 0);
          return [hook.memoizedState, queue.dispatch];
        }
        function rerenderReducer(reducer) {
          var hook = updateWorkInProgressHook(), queue = hook.queue;
          if (null === queue) throw Error(formatProdErrorMessage(311));
          queue.lastRenderedReducer = reducer;
          var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
          if (null !== lastRenderPhaseUpdate) {
            queue.pending = null;
            var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
            do
              newState = reducer(newState, update.action), update = update.next;
            while (update !== lastRenderPhaseUpdate);
            objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
            hook.memoizedState = newState;
            null === hook.baseQueue && (hook.baseState = newState);
            queue.lastRenderedState = newState;
          }
          return [newState, dispatch];
        }
        function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
          if (isHydrating$jscomp$0) {
            if (void 0 === getServerSnapshot)
              throw Error(formatProdErrorMessage(407));
            getServerSnapshot = getServerSnapshot();
          } else getServerSnapshot = getSnapshot();
          var snapshotChanged = !objectIs(
            (currentHook || hook).memoizedState,
            getServerSnapshot
          );
          snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
          hook = hook.queue;
          var create = subscribeToStore.bind(null, fiber, hook, subscribe);
          updateEffectImpl(2048, 8, create, [subscribe]);
          if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
            fiber.flags |= 2048;
            pushSimpleEffect(
              9,
              createEffectInstance(),
              updateStoreInstance.bind(
                null,
                fiber,
                hook,
                getServerSnapshot,
                getSnapshot
              ),
              null
            );
            if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
            isHydrating$jscomp$0 || 0 !== (renderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
          }
          return getServerSnapshot;
        }
        function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
          fiber.flags |= 16384;
          fiber = { getSnapshot, value: renderedSnapshot };
          getSnapshot = currentlyRenderingFiber.updateQueue;
          null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
        }
        function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
          inst.value = nextSnapshot;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        }
        function subscribeToStore(fiber, inst, subscribe) {
          return subscribe(function() {
            checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
          });
        }
        function checkIfSnapshotChanged(inst) {
          var latestGetSnapshot = inst.getSnapshot;
          inst = inst.value;
          try {
            var nextValue = latestGetSnapshot();
            return !objectIs(inst, nextValue);
          } catch (error) {
            return true;
          }
        }
        function forceStoreRerender(fiber) {
          var root = enqueueConcurrentRenderForLane(fiber, 2);
          null !== root && scheduleUpdateOnFiber(root, fiber, 2);
        }
        function mountStateImpl(initialState) {
          var hook = mountWorkInProgressHook();
          if ("function" === typeof initialState) {
            var initialStateInitializer = initialState;
            initialState = initialStateInitializer();
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(true);
              try {
                initialStateInitializer();
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
          }
          hook.memoizedState = hook.baseState = initialState;
          hook.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialState
          };
          return hook;
        }
        function updateOptimisticImpl(hook, current, passthrough, reducer) {
          hook.baseState = passthrough;
          return updateReducerImpl(
            hook,
            currentHook,
            "function" === typeof reducer ? reducer : basicStateReducer
          );
        }
        function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
          if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
          fiber = actionQueue.action;
          if (null !== fiber) {
            var actionNode = {
              payload,
              action: fiber,
              next: null,
              isTransition: true,
              status: "pending",
              value: null,
              reason: null,
              listeners: [],
              then: function(listener) {
                actionNode.listeners.push(listener);
              }
            };
            null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
            setState(actionNode);
            setPendingState = actionQueue.pending;
            null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
          }
        }
        function runActionStateAction(actionQueue, node) {
          var action = node.action, payload = node.payload, prevState = actionQueue.state;
          if (node.isTransition) {
            var prevTransition = ReactSharedInternals.T, currentTransition = {};
            ReactSharedInternals.T = currentTransition;
            try {
              var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
              null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
              handleActionReturnValue(actionQueue, node, returnValue);
            } catch (error) {
              onActionError(actionQueue, node, error);
            } finally {
              ReactSharedInternals.T = prevTransition;
            }
          } else
            try {
              prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
            } catch (error$27) {
              onActionError(actionQueue, node, error$27);
            }
        }
        function handleActionReturnValue(actionQueue, node, returnValue) {
          null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
            function(nextState) {
              onActionSuccess(actionQueue, node, nextState);
            },
            function(error) {
              return onActionError(actionQueue, node, error);
            }
          ) : onActionSuccess(actionQueue, node, returnValue);
        }
        function onActionSuccess(actionQueue, actionNode, nextState) {
          actionNode.status = "fulfilled";
          actionNode.value = nextState;
          notifyActionListeners(actionNode);
          actionQueue.state = nextState;
          actionNode = actionQueue.pending;
          null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
        }
        function onActionError(actionQueue, actionNode, error) {
          var last = actionQueue.pending;
          actionQueue.pending = null;
          if (null !== last) {
            last = last.next;
            do
              actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
            while (actionNode !== last);
          }
          actionQueue.action = null;
        }
        function notifyActionListeners(actionNode) {
          actionNode = actionNode.listeners;
          for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
        }
        function actionStateReducer(oldState, newState) {
          return newState;
        }
        function mountActionState(action, initialStateProp) {
          if (isHydrating) {
            var ssrFormState = workInProgressRoot.formState;
            if (null !== ssrFormState) {
              a: {
                var JSCompiler_inline_result = currentlyRenderingFiber;
                if (isHydrating) {
                  if (nextHydratableInstance) {
                    var markerInstance = canHydrateFormStateMarker(
                      nextHydratableInstance,
                      rootOrSingletonContext
                    );
                    if (markerInstance) {
                      nextHydratableInstance = getNextHydratableSibling(markerInstance);
                      JSCompiler_inline_result = isFormStateMarkerMatching(markerInstance);
                      break a;
                    }
                  }
                  throwOnHydrationMismatch(JSCompiler_inline_result);
                }
                JSCompiler_inline_result = false;
              }
              JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
            }
          }
          ssrFormState = mountWorkInProgressHook();
          ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
          JSCompiler_inline_result = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: actionStateReducer,
            lastRenderedState: initialStateProp
          };
          ssrFormState.queue = JSCompiler_inline_result;
          ssrFormState = dispatchSetState.bind(
            null,
            currentlyRenderingFiber,
            JSCompiler_inline_result
          );
          JSCompiler_inline_result.dispatch = ssrFormState;
          JSCompiler_inline_result = mountStateImpl(false);
          var setPendingState = dispatchOptimisticSetState.bind(
            null,
            currentlyRenderingFiber,
            false,
            JSCompiler_inline_result.queue
          );
          JSCompiler_inline_result = mountWorkInProgressHook();
          markerInstance = {
            state: initialStateProp,
            dispatch: null,
            action,
            pending: null
          };
          JSCompiler_inline_result.queue = markerInstance;
          ssrFormState = dispatchActionState.bind(
            null,
            currentlyRenderingFiber,
            markerInstance,
            setPendingState,
            ssrFormState
          );
          markerInstance.dispatch = ssrFormState;
          JSCompiler_inline_result.memoizedState = action;
          return [initialStateProp, ssrFormState, false];
        }
        function updateActionState(action) {
          var stateHook = updateWorkInProgressHook();
          return updateActionStateImpl(stateHook, currentHook, action);
        }
        function updateActionStateImpl(stateHook, currentStateHook, action) {
          currentStateHook = updateReducerImpl(
            stateHook,
            currentStateHook,
            actionStateReducer
          )[0];
          stateHook = updateReducer(basicStateReducer)[0];
          if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
            try {
              var state = useThenable(currentStateHook);
            } catch (x) {
              if (x === SuspenseException) throw SuspenseActionException;
              throw x;
            }
          else state = currentStateHook;
          currentStateHook = updateWorkInProgressHook();
          var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
          action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
            9,
            createEffectInstance(),
            actionStateActionEffect.bind(null, actionQueue, action),
            null
          ));
          return [state, dispatch, stateHook];
        }
        function actionStateActionEffect(actionQueue, action) {
          actionQueue.action = action;
        }
        function rerenderActionState(action) {
          var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
          if (null !== currentStateHook)
            return updateActionStateImpl(stateHook, currentStateHook, action);
          updateWorkInProgressHook();
          stateHook = stateHook.memoizedState;
          currentStateHook = updateWorkInProgressHook();
          var dispatch = currentStateHook.queue.dispatch;
          currentStateHook.memoizedState = action;
          return [stateHook, dispatch, false];
        }
        function pushSimpleEffect(tag, inst, create, createDeps) {
          tag = {
            tag,
            create,
            deps: createDeps,
            inst,
            next: null
          };
          inst = currentlyRenderingFiber.updateQueue;
          null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
          create = inst.lastEffect;
          null === create ? inst.lastEffect = tag.next = tag : (createDeps = create.next, create.next = tag, tag.next = createDeps, inst.lastEffect = tag);
          return tag;
        }
        function createEffectInstance() {
          return { destroy: void 0, resource: void 0 };
        }
        function updateRef() {
          return updateWorkInProgressHook().memoizedState;
        }
        function mountEffectImpl(fiberFlags, hookFlags, create, createDeps) {
          var hook = mountWorkInProgressHook();
          createDeps = void 0 === createDeps ? null : createDeps;
          currentlyRenderingFiber.flags |= fiberFlags;
          hook.memoizedState = pushSimpleEffect(
            1 | hookFlags,
            createEffectInstance(),
            create,
            createDeps
          );
        }
        function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
          var hook = updateWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var inst = hook.memoizedState.inst;
          null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
            1 | hookFlags,
            inst,
            create,
            deps
          ));
        }
        function mountEffect(create, createDeps) {
          mountEffectImpl(8390656, 8, create, createDeps);
        }
        function updateEffect(create, createDeps) {
          updateEffectImpl(2048, 8, create, createDeps);
        }
        function updateInsertionEffect(create, deps) {
          return updateEffectImpl(4, 2, create, deps);
        }
        function updateLayoutEffect(create, deps) {
          return updateEffectImpl(4, 4, create, deps);
        }
        function imperativeHandleEffect(create, ref) {
          if ("function" === typeof ref) {
            create = create();
            var refCleanup = ref(create);
            return function() {
              "function" === typeof refCleanup ? refCleanup() : ref(null);
            };
          }
          if (null !== ref && void 0 !== ref)
            return create = create(), ref.current = create, function() {
              ref.current = null;
            };
        }
        function updateImperativeHandle(ref, create, deps) {
          deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
          updateEffectImpl(
            4,
            4,
            imperativeHandleEffect.bind(null, create, ref),
            deps
          );
        }
        function mountDebugValue() {
        }
        function updateCallback(callback, deps) {
          var hook = updateWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var prevState = hook.memoizedState;
          if (null !== deps && areHookInputsEqual(deps, prevState[1]))
            return prevState[0];
          hook.memoizedState = [callback, deps];
          return callback;
        }
        function updateMemo(nextCreate, deps) {
          var hook = updateWorkInProgressHook();
          deps = void 0 === deps ? null : deps;
          var prevState = hook.memoizedState;
          if (null !== deps && areHookInputsEqual(deps, prevState[1]))
            return prevState[0];
          prevState = nextCreate();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              nextCreate();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          hook.memoizedState = [prevState, deps];
          return prevState;
        }
        function mountDeferredValueImpl(hook, value, initialValue) {
          if (void 0 === initialValue || 0 !== (renderLanes & 1073741824))
            return hook.memoizedState = value;
          hook.memoizedState = initialValue;
          hook = requestDeferredLane();
          currentlyRenderingFiber.lanes |= hook;
          workInProgressRootSkippedLanes |= hook;
          return initialValue;
        }
        function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
          if (objectIs(value, prevValue)) return value;
          if (null !== currentTreeHiddenStackCursor.current)
            return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
          if (0 === (renderLanes & 42))
            return didReceiveUpdate = true, hook.memoizedState = value;
          hook = requestDeferredLane();
          currentlyRenderingFiber.lanes |= hook;
          workInProgressRootSkippedLanes |= hook;
          return prevValue;
        }
        function startTransition(fiber, queue, pendingState, finishedState, callback) {
          var previousPriority = getCurrentUpdatePriority();
          setCurrentUpdatePriority(
            0 !== previousPriority && 8 > previousPriority ? previousPriority : 8
          );
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          dispatchOptimisticSetState(fiber, false, queue, pendingState);
          try {
            var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
              var thenableForFinishedState = chainThenableValue(
                returnValue,
                finishedState
              );
              dispatchSetStateInternal(
                fiber,
                queue,
                thenableForFinishedState,
                requestUpdateLane(fiber)
              );
            } else
              dispatchSetStateInternal(
                fiber,
                queue,
                finishedState,
                requestUpdateLane(fiber)
              );
          } catch (error) {
            dispatchSetStateInternal(
              fiber,
              queue,
              { then: function() {
              }, status: "rejected", reason: error },
              requestUpdateLane()
            );
          } finally {
            setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition;
          }
        }
        function ensureFormComponentIsStateful(formFiber) {
          var existingStateHook = formFiber.memoizedState;
          if (null !== existingStateHook) return existingStateHook;
          existingStateHook = {
            memoizedState: NotPendingTransition,
            baseState: NotPendingTransition,
            baseQueue: null,
            queue: {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: basicStateReducer,
              lastRenderedState: NotPendingTransition
            },
            next: null
          };
          var initialResetState = {};
          existingStateHook.next = {
            memoizedState: initialResetState,
            baseState: initialResetState,
            baseQueue: null,
            queue: {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: basicStateReducer,
              lastRenderedState: initialResetState
            },
            next: null
          };
          formFiber.memoizedState = existingStateHook;
          formFiber = formFiber.alternate;
          null !== formFiber && (formFiber.memoizedState = existingStateHook);
          return existingStateHook;
        }
        function useHostTransitionStatus() {
          return readContext(HostTransitionContext2);
        }
        function updateId() {
          return updateWorkInProgressHook().memoizedState;
        }
        function updateRefresh() {
          return updateWorkInProgressHook().memoizedState;
        }
        function refreshCache(fiber) {
          for (var provider = fiber.return; null !== provider; ) {
            switch (provider.tag) {
              case 24:
              case 3:
                var lane = requestUpdateLane();
                fiber = createUpdate(lane);
                var root = enqueueUpdate(provider, fiber, lane);
                null !== root && (scheduleUpdateOnFiber(root, provider, lane), entangleTransitions(root, provider, lane));
                provider = { cache: createCache() };
                fiber.payload = provider;
                return;
            }
            provider = provider.return;
          }
        }
        function dispatchReducerAction(fiber, queue, action) {
          var lane = requestUpdateLane();
          action = {
            lane,
            revertLane: 0,
            action,
            hasEagerState: false,
            eagerState: null,
            next: null
          };
          isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
        }
        function dispatchSetState(fiber, queue, action) {
          var lane = requestUpdateLane();
          dispatchSetStateInternal(fiber, queue, action, lane);
        }
        function dispatchSetStateInternal(fiber, queue, action, lane) {
          var update = {
            lane,
            revertLane: 0,
            action,
            hasEagerState: false,
            eagerState: null,
            next: null
          };
          if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
          else {
            var alternate = fiber.alternate;
            if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
              try {
                var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
                update.hasEagerState = true;
                update.eagerState = eagerState;
                if (objectIs(eagerState, currentState))
                  return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
              } catch (error) {
              } finally {
              }
            action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
            if (null !== action)
              return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
          }
          return false;
        }
        function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
          action = {
            lane: 2,
            revertLane: requestTransitionLane(),
            action,
            hasEagerState: false,
            eagerState: null,
            next: null
          };
          if (isRenderPhaseUpdate(fiber)) {
            if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
          } else
            throwIfDuringRender = enqueueConcurrentHookUpdate(
              fiber,
              queue,
              action,
              2
            ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
        }
        function isRenderPhaseUpdate(fiber) {
          var alternate = fiber.alternate;
          return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
        }
        function enqueueRenderPhaseUpdate(queue, update) {
          didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
          var pending = queue.pending;
          null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
          queue.pending = update;
        }
        function entangleTransitionUpdate(root, queue, lane) {
          if (0 !== (lane & 4194048)) {
            var queueLanes = queue.lanes;
            queueLanes &= root.pendingLanes;
            lane |= queueLanes;
            queue.lanes = lane;
            markRootEntangled(root, lane);
          }
        }
        function unwrapThenable(thenable) {
          var index = thenableIndexCounter;
          thenableIndexCounter += 1;
          null === thenableState && (thenableState = []);
          return trackUsedThenable(thenableState, thenable, index);
        }
        function coerceRef(workInProgress2, element) {
          element = element.props.ref;
          workInProgress2.ref = void 0 !== element ? element : null;
        }
        function throwOnInvalidObjectType(returnFiber, newChild) {
          if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
            throw Error(formatProdErrorMessage(525));
          returnFiber = Object.prototype.toString.call(newChild);
          throw Error(
            formatProdErrorMessage(
              31,
              "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
            )
          );
        }
        function resolveLazy(lazyType) {
          var init = lazyType._init;
          return init(lazyType._payload);
        }
        function createChildReconciler(shouldTrackSideEffects) {
          function deleteChild(returnFiber, childToDelete) {
            if (shouldTrackSideEffects) {
              var deletions = returnFiber.deletions;
              null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
            }
          }
          function deleteRemainingChildren(returnFiber, currentFirstChild) {
            if (!shouldTrackSideEffects) return null;
            for (; null !== currentFirstChild; )
              deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
            return null;
          }
          function mapRemainingChildren(currentFirstChild) {
            for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
              null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
            return existingChildren;
          }
          function useFiber(fiber, pendingProps) {
            fiber = createWorkInProgress(fiber, pendingProps);
            fiber.index = 0;
            fiber.sibling = null;
            return fiber;
          }
          function placeChild(newFiber, lastPlacedIndex, newIndex) {
            newFiber.index = newIndex;
            if (!shouldTrackSideEffects)
              return newFiber.flags |= 1048576, lastPlacedIndex;
            newIndex = newFiber.alternate;
            if (null !== newIndex)
              return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
            newFiber.flags |= 67108866;
            return lastPlacedIndex;
          }
          function placeSingleChild(newFiber) {
            shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
            return newFiber;
          }
          function updateTextNode(returnFiber, current, textContent, lanes) {
            if (null === current || 6 !== current.tag)
              return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
            current = useFiber(current, textContent);
            current.return = returnFiber;
            return current;
          }
          function updateElement(returnFiber, current, element, lanes) {
            var elementType = element.type;
            if (elementType === REACT_FRAGMENT_TYPE)
              return updateFragment(
                returnFiber,
                current,
                element.props.children,
                lanes,
                element.key
              );
            if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
              return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
            current = createFiberFromTypeAndProps(
              element.type,
              element.key,
              element.props,
              null,
              returnFiber.mode,
              lanes
            );
            coerceRef(current, element);
            current.return = returnFiber;
            return current;
          }
          function updatePortal(returnFiber, current, portal, lanes) {
            if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
              return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
            current = useFiber(current, portal.children || []);
            current.return = returnFiber;
            return current;
          }
          function updateFragment(returnFiber, current, fragment, lanes, key) {
            if (null === current || 7 !== current.tag)
              return current = createFiberFromFragment(
                fragment,
                returnFiber.mode,
                lanes,
                key
              ), current.return = returnFiber, current;
            current = useFiber(current, fragment);
            current.return = returnFiber;
            return current;
          }
          function createChild(returnFiber, newChild, lanes) {
            if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
              return newChild = createFiberFromText(
                "" + newChild,
                returnFiber.mode,
                lanes
              ), newChild.return = returnFiber, newChild;
            if ("object" === typeof newChild && null !== newChild) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  return lanes = createFiberFromTypeAndProps(
                    newChild.type,
                    newChild.key,
                    newChild.props,
                    null,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
                case REACT_PORTAL_TYPE:
                  return newChild = createFiberFromPortal(
                    newChild,
                    returnFiber.mode,
                    lanes
                  ), newChild.return = returnFiber, newChild;
                case REACT_LAZY_TYPE:
                  var init = newChild._init;
                  newChild = init(newChild._payload);
                  return createChild(returnFiber, newChild, lanes);
              }
              if (isArrayImpl(newChild) || getIteratorFn(newChild))
                return newChild = createFiberFromFragment(
                  newChild,
                  returnFiber.mode,
                  lanes,
                  null
                ), newChild.return = returnFiber, newChild;
              if ("function" === typeof newChild.then)
                return createChild(returnFiber, unwrapThenable(newChild), lanes);
              if (newChild.$$typeof === REACT_CONTEXT_TYPE)
                return createChild(
                  returnFiber,
                  readContextDuringReconciliation(returnFiber, newChild),
                  lanes
                );
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            return null;
          }
          function updateSlot(returnFiber, oldFiber, newChild, lanes) {
            var key = null !== oldFiber ? oldFiber.key : null;
            if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
              return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
            if ("object" === typeof newChild && null !== newChild) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
                case REACT_PORTAL_TYPE:
                  return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
                case REACT_LAZY_TYPE:
                  return key = newChild._init, newChild = key(newChild._payload), updateSlot(returnFiber, oldFiber, newChild, lanes);
              }
              if (isArrayImpl(newChild) || getIteratorFn(newChild))
                return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
              if ("function" === typeof newChild.then)
                return updateSlot(
                  returnFiber,
                  oldFiber,
                  unwrapThenable(newChild),
                  lanes
                );
              if (newChild.$$typeof === REACT_CONTEXT_TYPE)
                return updateSlot(
                  returnFiber,
                  oldFiber,
                  readContextDuringReconciliation(returnFiber, newChild),
                  lanes
                );
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            return null;
          }
          function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
            if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
              return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
            if ("object" === typeof newChild && null !== newChild) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  return existingChildren = existingChildren.get(
                    null === newChild.key ? newIdx : newChild.key
                  ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
                case REACT_PORTAL_TYPE:
                  return existingChildren = existingChildren.get(
                    null === newChild.key ? newIdx : newChild.key
                  ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
                case REACT_LAZY_TYPE:
                  var init = newChild._init;
                  newChild = init(newChild._payload);
                  return updateFromMap(
                    existingChildren,
                    returnFiber,
                    newIdx,
                    newChild,
                    lanes
                  );
              }
              if (isArrayImpl(newChild) || getIteratorFn(newChild))
                return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
              if ("function" === typeof newChild.then)
                return updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  unwrapThenable(newChild),
                  lanes
                );
              if (newChild.$$typeof === REACT_CONTEXT_TYPE)
                return updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  readContextDuringReconciliation(returnFiber, newChild),
                  lanes
                );
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            return null;
          }
          function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
            for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
              oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
              var newFiber = updateSlot(
                returnFiber,
                oldFiber,
                newChildren[newIdx],
                lanes
              );
              if (null === newFiber) {
                null === oldFiber && (oldFiber = nextOldFiber);
                break;
              }
              shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
              currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
              null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (newIdx === newChildren.length)
              return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
            if (null === oldFiber) {
              for (; newIdx < newChildren.length; newIdx++)
                oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
                  oldFiber,
                  currentFirstChild,
                  newIdx
                ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
              isHydrating && pushTreeFork(returnFiber, newIdx);
              return resultingFirstChild;
            }
            for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
              nextOldFiber = updateFromMap(
                oldFiber,
                returnFiber,
                newIdx,
                newChildren[newIdx],
                lanes
              ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
                null === nextOldFiber.key ? newIdx : nextOldFiber.key
              ), currentFirstChild = placeChild(
                nextOldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
            shouldTrackSideEffects && oldFiber.forEach(function(child) {
              return deleteChild(returnFiber, child);
            });
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
            if (null == newChildren) throw Error(formatProdErrorMessage(151));
            for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
              oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
              var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
              if (null === newFiber) {
                null === oldFiber && (oldFiber = nextOldFiber);
                break;
              }
              shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
              currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
              null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
              previousNewFiber = newFiber;
              oldFiber = nextOldFiber;
            }
            if (step.done)
              return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
            if (null === oldFiber) {
              for (; !step.done; newIdx++, step = newChildren.next())
                step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(
                  step,
                  currentFirstChild,
                  newIdx
                ), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
              isHydrating && pushTreeFork(returnFiber, newIdx);
              return resultingFirstChild;
            }
            for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
              step = updateFromMap(
                oldFiber,
                returnFiber,
                newIdx,
                step.value,
                lanes
              ), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
            shouldTrackSideEffects && oldFiber.forEach(function(child) {
              return deleteChild(returnFiber, child);
            });
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
            "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
            if ("object" === typeof newChild && null !== newChild) {
              switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                  a: {
                    for (var key = newChild.key; null !== currentFirstChild; ) {
                      if (currentFirstChild.key === key) {
                        key = newChild.type;
                        if (key === REACT_FRAGMENT_TYPE) {
                          if (7 === currentFirstChild.tag) {
                            deleteRemainingChildren(
                              returnFiber,
                              currentFirstChild.sibling
                            );
                            lanes = useFiber(
                              currentFirstChild,
                              newChild.props.children
                            );
                            lanes.return = returnFiber;
                            returnFiber = lanes;
                            break a;
                          }
                        } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(currentFirstChild, newChild.props);
                          coerceRef(lanes, newChild);
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          break a;
                        }
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      } else deleteChild(returnFiber, currentFirstChild);
                      currentFirstChild = currentFirstChild.sibling;
                    }
                    newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                      newChild.props.children,
                      returnFiber.mode,
                      lanes,
                      newChild.key
                    ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
                      newChild.type,
                      newChild.key,
                      newChild.props,
                      null,
                      returnFiber.mode,
                      lanes
                    ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
                  }
                  return placeSingleChild(returnFiber);
                case REACT_PORTAL_TYPE:
                  a: {
                    for (key = newChild.key; null !== currentFirstChild; ) {
                      if (currentFirstChild.key === key)
                        if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(
                            currentFirstChild,
                            newChild.children || []
                          );
                          lanes.return = returnFiber;
                          returnFiber = lanes;
                          break a;
                        } else {
                          deleteRemainingChildren(returnFiber, currentFirstChild);
                          break;
                        }
                      else deleteChild(returnFiber, currentFirstChild);
                      currentFirstChild = currentFirstChild.sibling;
                    }
                    lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                  }
                  return placeSingleChild(returnFiber);
                case REACT_LAZY_TYPE:
                  return key = newChild._init, newChild = key(newChild._payload), reconcileChildFibersImpl(
                    returnFiber,
                    currentFirstChild,
                    newChild,
                    lanes
                  );
              }
              if (isArrayImpl(newChild))
                return reconcileChildrenArray(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
              if (getIteratorFn(newChild)) {
                key = getIteratorFn(newChild);
                if ("function" !== typeof key)
                  throw Error(formatProdErrorMessage(150));
                newChild = key.call(newChild);
                return reconcileChildrenIterator(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                );
              }
              if ("function" === typeof newChild.then)
                return reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  unwrapThenable(newChild),
                  lanes
                );
              if (newChild.$$typeof === REACT_CONTEXT_TYPE)
                return reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  readContextDuringReconciliation(returnFiber, newChild),
                  lanes
                );
              throwOnInvalidObjectType(returnFiber, newChild);
            }
            return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
          }
          return function(returnFiber, currentFirstChild, newChild, lanes) {
            try {
              thenableIndexCounter = 0;
              var firstChildFiber = reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              );
              thenableState = null;
              return firstChildFiber;
            } catch (x) {
              if (x === SuspenseException || x === SuspenseActionException) throw x;
              var fiber = createFiber(29, x, null, returnFiber.mode);
              fiber.lanes = lanes;
              fiber.return = returnFiber;
              return fiber;
            } finally {
            }
          };
        }
        function pushPrimaryTreeSuspenseHandler(handler) {
          var current = handler.alternate;
          push(suspenseStackCursor, suspenseStackCursor.current & 1);
          push(suspenseHandlerStackCursor, handler);
          null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
        }
        function pushOffscreenSuspenseHandler(fiber) {
          if (22 === fiber.tag) {
            if (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary) {
              var current = fiber.alternate;
              null !== current && null !== current.memoizedState && (shellBoundary = fiber);
            }
          } else reuseSuspenseHandlerOnStack();
        }
        function reuseSuspenseHandlerOnStack() {
          push(suspenseStackCursor, suspenseStackCursor.current);
          push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
        }
        function popSuspenseHandler(fiber) {
          pop(suspenseHandlerStackCursor);
          shellBoundary === fiber && (shellBoundary = null);
          pop(suspenseStackCursor);
        }
        function findFirstSuspended(row) {
          for (var node = row; null !== node; ) {
            if (13 === node.tag) {
              var state = node.memoizedState;
              if (null !== state && (state = state.dehydrated, null === state || isSuspenseInstancePending(state) || isSuspenseInstanceFallback(state)))
                return node;
            } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
              if (0 !== (node.flags & 128)) return node;
            } else if (null !== node.child) {
              node.child.return = node;
              node = node.child;
              continue;
            }
            if (node === row) break;
            for (; null === node.sibling; ) {
              if (null === node.return || node.return === row) return null;
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
          return null;
        }
        function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
          ctor = workInProgress2.memoizedState;
          getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
          getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
          workInProgress2.memoizedState = getDerivedStateFromProps;
          0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
        }
        function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
          workInProgress2 = workInProgress2.stateNode;
          return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
        }
        function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
          workInProgress2 = instance.state;
          "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
          "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
          instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
        }
        function resolveClassComponentProps(Component, baseProps) {
          var newProps = baseProps;
          if ("ref" in baseProps) {
            newProps = {};
            for (var propName in baseProps)
              "ref" !== propName && (newProps[propName] = baseProps[propName]);
          }
          if (Component = Component.defaultProps) {
            newProps === baseProps && (newProps = assign({}, newProps));
            for (var propName$57 in Component)
              void 0 === newProps[propName$57] && (newProps[propName$57] = Component[propName$57]);
          }
          return newProps;
        }
        function logUncaughtError(root, errorInfo) {
          try {
            var onUncaughtError = root.onUncaughtError;
            onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
          } catch (e) {
            setTimeout(function() {
              throw e;
            });
          }
        }
        function logCaughtError(root, boundary, errorInfo) {
          try {
            var onCaughtError = root.onCaughtError;
            onCaughtError(errorInfo.value, {
              componentStack: errorInfo.stack,
              errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
            });
          } catch (e) {
            setTimeout(function() {
              throw e;
            });
          }
        }
        function createRootErrorUpdate(root, errorInfo, lane) {
          lane = createUpdate(lane);
          lane.tag = 3;
          lane.payload = { element: null };
          lane.callback = function() {
            logUncaughtError(root, errorInfo);
          };
          return lane;
        }
        function createClassErrorUpdate(lane) {
          lane = createUpdate(lane);
          lane.tag = 3;
          return lane;
        }
        function initializeClassErrorUpdate(update, root, fiber, errorInfo) {
          var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
          if ("function" === typeof getDerivedStateFromError) {
            var error = errorInfo.value;
            update.payload = function() {
              return getDerivedStateFromError(error);
            };
            update.callback = function() {
              logCaughtError(root, fiber, errorInfo);
            };
          }
          var inst = fiber.stateNode;
          null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
            logCaughtError(root, fiber, errorInfo);
            "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
            var stack = errorInfo.stack;
            this.componentDidCatch(errorInfo.value, {
              componentStack: null !== stack ? stack : ""
            });
          });
        }
        function throwException(root, returnFiber, sourceFiber, value, rootRenderLanes) {
          sourceFiber.flags |= 32768;
          if (null !== value && "object" === typeof value && "function" === typeof value.then) {
            returnFiber = sourceFiber.alternate;
            null !== returnFiber && propagateParentContextChanges(
              returnFiber,
              sourceFiber,
              rootRenderLanes,
              true
            );
            sourceFiber = suspenseHandlerStackCursor.current;
            if (null !== sourceFiber) {
              switch (sourceFiber.tag) {
                case 13:
                  return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root, value, rootRenderLanes)), false;
                case 22:
                  return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                    transitions: null,
                    markerInstances: null,
                    retryQueue: /* @__PURE__ */ new Set([value])
                  }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root, value, rootRenderLanes)), false;
              }
              throw Error(formatProdErrorMessage(435, sourceFiber.tag));
            }
            attachPingListener(root, value, rootRenderLanes);
            renderDidSuspendDelayIfPossible();
            return false;
          }
          if (isHydrating)
            return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(
              createCapturedValueAtFiber(root, sourceFiber)
            ))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
              cause: value
            }), queueHydrationError(
              createCapturedValueAtFiber(returnFiber, sourceFiber)
            )), root = root.current.alternate, root.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
              root.stateNode,
              value,
              rootRenderLanes
            ), enqueueCapturedUpdate(root, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
          var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
          wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
          null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
          4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
          if (null === returnFiber) return true;
          value = createCapturedValueAtFiber(value, sourceFiber);
          sourceFiber = returnFiber;
          do {
            switch (sourceFiber.tag) {
              case 3:
                return sourceFiber.flags |= 65536, root = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root, root = createRootErrorUpdate(sourceFiber.stateNode, value, root), enqueueCapturedUpdate(sourceFiber, root), false;
              case 1:
                if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(
                  wrapperError
                ))))
                  return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                    rootRenderLanes,
                    root,
                    sourceFiber,
                    value
                  ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
            }
            sourceFiber = sourceFiber.return;
          } while (null !== sourceFiber);
          return false;
        }
        function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
          workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
            workInProgress2,
            current.child,
            nextChildren,
            renderLanes2
          );
        }
        function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
          Component = Component.render;
          var ref = workInProgress2.ref;
          if ("ref" in nextProps) {
            var propsWithoutRef = {};
            for (var key in nextProps)
              "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
          } else propsWithoutRef = nextProps;
          prepareToReadContext(workInProgress2);
          nextProps = renderWithHooks(
            current,
            workInProgress2,
            Component,
            propsWithoutRef,
            ref,
            renderLanes2
          );
          key = checkDidRenderIdHook();
          if (null !== current && !didReceiveUpdate)
            return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
          isHydrating && key && pushMaterializedTreeId(workInProgress2);
          workInProgress2.flags |= 1;
          reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
          return workInProgress2.child;
        }
        function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
          if (null === current) {
            var type = Component.type;
            if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
              return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
                current,
                workInProgress2,
                type,
                nextProps,
                renderLanes2
              );
            current = createFiberFromTypeAndProps(
              Component.type,
              null,
              nextProps,
              workInProgress2,
              workInProgress2.mode,
              renderLanes2
            );
            current.ref = workInProgress2.ref;
            current.return = workInProgress2;
            return workInProgress2.child = current;
          }
          type = current.child;
          if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
            var prevProps = type.memoizedProps;
            Component = Component.compare;
            Component = null !== Component ? Component : shallowEqual;
            if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
              return bailoutOnAlreadyFinishedWork(
                current,
                workInProgress2,
                renderLanes2
              );
          }
          workInProgress2.flags |= 1;
          current = createWorkInProgress(type, nextProps);
          current.ref = workInProgress2.ref;
          current.return = workInProgress2;
          return workInProgress2.child = current;
        }
        function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
          if (null !== current) {
            var prevProps = current.memoizedProps;
            if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
              if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
                0 !== (current.flags & 131072) && (didReceiveUpdate = true);
              else
                return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
          }
          return updateFunctionComponent(
            current,
            workInProgress2,
            Component,
            nextProps,
            renderLanes2
          );
        }
        function updateOffscreenComponent(current, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps, nextChildren = nextProps.children, prevState = null !== current ? current.memoizedState : null;
          if ("hidden" === nextProps.mode) {
            if (0 !== (workInProgress2.flags & 128)) {
              nextProps = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
              if (null !== current) {
                nextChildren = workInProgress2.child = current.child;
                for (prevState = 0; null !== nextChildren; )
                  prevState = prevState | nextChildren.lanes | nextChildren.childLanes, nextChildren = nextChildren.sibling;
                workInProgress2.childLanes = prevState & ~nextProps;
              } else workInProgress2.childLanes = 0, workInProgress2.child = null;
              return deferHiddenOffscreenComponent(
                current,
                workInProgress2,
                nextProps,
                renderLanes2
              );
            }
            if (0 !== (renderLanes2 & 536870912))
              workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
                workInProgress2,
                null !== prevState ? prevState.cachePool : null
              ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
            else
              return workInProgress2.lanes = workInProgress2.childLanes = 536870912, deferHiddenOffscreenComponent(
                current,
                workInProgress2,
                null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
                renderLanes2
              );
          } else
            null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
          reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2) {
          var JSCompiler_inline_result = peekCacheFromPool();
          JSCompiler_inline_result = null === JSCompiler_inline_result ? null : {
            parent: isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2,
            pool: JSCompiler_inline_result
          };
          workInProgress2.memoizedState = {
            baseLanes: nextBaseLanes,
            cachePool: JSCompiler_inline_result
          };
          null !== current && pushTransition(workInProgress2, null);
          reuseHiddenContextOnStack();
          pushOffscreenSuspenseHandler(workInProgress2);
          null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
          return null;
        }
        function markRef(current, workInProgress2) {
          var ref = workInProgress2.ref;
          if (null === ref)
            null !== current && null !== current.ref && (workInProgress2.flags |= 4194816);
          else {
            if ("function" !== typeof ref && "object" !== typeof ref)
              throw Error(formatProdErrorMessage(284));
            if (null === current || current.ref !== ref)
              workInProgress2.flags |= 4194816;
          }
        }
        function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
          prepareToReadContext(workInProgress2);
          Component = renderWithHooks(
            current,
            workInProgress2,
            Component,
            nextProps,
            void 0,
            renderLanes2
          );
          nextProps = checkDidRenderIdHook();
          if (null !== current && !didReceiveUpdate)
            return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
          isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
          workInProgress2.flags |= 1;
          reconcileChildren(current, workInProgress2, Component, renderLanes2);
          return workInProgress2.child;
        }
        function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
          prepareToReadContext(workInProgress2);
          workInProgress2.updateQueue = null;
          nextProps = renderWithHooksAgain(
            workInProgress2,
            Component,
            nextProps,
            secondArg
          );
          finishRenderingHooks(current);
          Component = checkDidRenderIdHook();
          if (null !== current && !didReceiveUpdate)
            return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
          isHydrating && Component && pushMaterializedTreeId(workInProgress2);
          workInProgress2.flags |= 1;
          reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
          return workInProgress2.child;
        }
        function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
          prepareToReadContext(workInProgress2);
          if (null === workInProgress2.stateNode) {
            var context = emptyContextObject, contextType = Component.contextType;
            "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
            context = new Component(nextProps, context);
            workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
            context.updater = classComponentUpdater;
            workInProgress2.stateNode = context;
            context._reactInternals = workInProgress2;
            context = workInProgress2.stateNode;
            context.props = nextProps;
            context.state = workInProgress2.memoizedState;
            context.refs = {};
            initializeUpdateQueue(workInProgress2);
            contextType = Component.contextType;
            context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
            context.state = workInProgress2.memoizedState;
            contextType = Component.getDerivedStateFromProps;
            "function" === typeof contextType && (applyDerivedStateFromProps(
              workInProgress2,
              Component,
              contextType,
              nextProps
            ), context.state = workInProgress2.memoizedState);
            "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(
              context,
              context.state,
              null
            ), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
            "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
            nextProps = true;
          } else if (null === current) {
            context = workInProgress2.stateNode;
            var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
            context.props = oldProps;
            var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
            contextType = emptyContextObject;
            "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
            var getDerivedStateFromProps = Component.getDerivedStateFromProps;
            contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
            unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
            contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
              workInProgress2,
              context,
              nextProps,
              contextType
            );
            hasForceUpdate = false;
            var oldState = workInProgress2.memoizedState;
            context.state = oldState;
            processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
            suspendIfUpdateReadFromEntangledAsyncAction();
            oldContext = workInProgress2.memoizedState;
            unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
              workInProgress2,
              Component,
              getDerivedStateFromProps,
              nextProps
            ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
              workInProgress2,
              Component,
              oldProps,
              nextProps,
              oldState,
              oldContext,
              contextType
            )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
          } else {
            context = workInProgress2.stateNode;
            cloneUpdateQueue(current, workInProgress2);
            contextType = workInProgress2.memoizedProps;
            contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
            context.props = contextType$jscomp$0;
            getDerivedStateFromProps = workInProgress2.pendingProps;
            oldState = context.context;
            oldContext = Component.contextType;
            oldProps = emptyContextObject;
            "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
            unresolvedOldProps = Component.getDerivedStateFromProps;
            (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
              workInProgress2,
              context,
              nextProps,
              oldProps
            );
            hasForceUpdate = false;
            oldState = workInProgress2.memoizedState;
            context.state = oldState;
            processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
            suspendIfUpdateReadFromEntangledAsyncAction();
            var newState = workInProgress2.memoizedState;
            contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
              workInProgress2,
              Component,
              unresolvedOldProps,
              nextProps
            ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
              workInProgress2,
              Component,
              contextType$jscomp$0,
              nextProps,
              oldState,
              newState,
              oldProps
            ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
              nextProps,
              newState,
              oldProps
            )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
          }
          context = nextProps;
          markRef(current, workInProgress2);
          nextProps = 0 !== (workInProgress2.flags & 128);
          context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
            workInProgress2,
            current.child,
            null,
            renderLanes2
          ), workInProgress2.child = reconcileChildFibers(
            workInProgress2,
            null,
            Component,
            renderLanes2
          )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
            current,
            workInProgress2,
            renderLanes2
          );
          return current;
        }
        function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
          resetHydrationState();
          workInProgress2.flags |= 256;
          reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
          return workInProgress2.child;
        }
        function mountSuspenseOffscreenState(renderLanes2) {
          return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
        }
        function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
          current = null !== current ? current.childLanes & ~renderLanes2 : 0;
          primaryTreeDidDefer && (current |= workInProgressDeferredLane);
          return current;
        }
        function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
          (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
          JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
          JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
          workInProgress2.flags &= -33;
          if (null === current) {
            if (isHydrating) {
              showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
              if (isHydrating) {
                var nextInstance = nextHydratableInstance, JSCompiler_temp$jscomp$0;
                if (JSCompiler_temp$jscomp$0 = nextInstance)
                  nextInstance = canHydrateSuspenseInstance(
                    nextInstance,
                    rootOrSingletonContext
                  ), null !== nextInstance ? (workInProgress2.memoizedState = {
                    dehydrated: nextInstance,
                    treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
                    retryLane: 536870912,
                    hydrationErrors: null
                  }, JSCompiler_temp$jscomp$0 = createFiber(18, null, null, 0), JSCompiler_temp$jscomp$0.stateNode = nextInstance, JSCompiler_temp$jscomp$0.return = workInProgress2, workInProgress2.child = JSCompiler_temp$jscomp$0, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, JSCompiler_temp$jscomp$0 = true) : JSCompiler_temp$jscomp$0 = false;
                JSCompiler_temp$jscomp$0 || throwOnHydrationMismatch(workInProgress2);
              }
              nextInstance = workInProgress2.memoizedState;
              if (null !== nextInstance && (nextInstance = nextInstance.dehydrated, null !== nextInstance))
                return isSuspenseInstanceFallback(nextInstance) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912, null;
              popSuspenseHandler(workInProgress2);
            }
            nextInstance = nextProps.children;
            nextProps = nextProps.fallback;
            if (showFallback)
              return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, nextInstance = mountWorkInProgressOffscreenFiber(
                { mode: "hidden", children: nextInstance },
                showFallback
              ), nextProps = createFiberFromFragment(
                nextProps,
                showFallback,
                renderLanes2,
                null
              ), nextInstance.return = workInProgress2, nextProps.return = workInProgress2, nextInstance.sibling = nextProps, workInProgress2.child = nextInstance, showFallback = workInProgress2.child, showFallback.memoizedState = mountSuspenseOffscreenState(renderLanes2), showFallback.childLanes = getRemainingWorkInPrimaryTree(
                current,
                JSCompiler_temp,
                renderLanes2
              ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            return mountSuspensePrimaryChildren(workInProgress2, nextInstance);
          }
          JSCompiler_temp$jscomp$0 = current.memoizedState;
          if (null !== JSCompiler_temp$jscomp$0 && (nextInstance = JSCompiler_temp$jscomp$0.dehydrated, null !== nextInstance)) {
            if (didSuspend)
              workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
                { mode: "visible", children: nextProps.children },
                nextInstance
              ), showFallback = createFiberFromFragment(
                showFallback,
                nextInstance,
                renderLanes2,
                null
              ), showFallback.flags |= 2, nextProps.return = workInProgress2, showFallback.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, reconcileChildFibers(
                workInProgress2,
                current.child,
                null,
                renderLanes2
              ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
                current,
                JSCompiler_temp,
                renderLanes2
              ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = showFallback);
            else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isSuspenseInstanceFallback(nextInstance))
              JSCompiler_temp = getSuspenseInstanceFallbackErrorDetails(nextInstance).digest, nextProps = Error(formatProdErrorMessage(419)), nextProps.stack = "", nextProps.digest = JSCompiler_temp, queueHydrationError({ value: nextProps, source: null, stack: null }), workInProgress2 = retrySuspenseComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              );
            else if (didReceiveUpdate || propagateParentContextChanges(
              current,
              workInProgress2,
              renderLanes2,
              false
            ), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
              JSCompiler_temp = workInProgressRoot;
              if (null !== JSCompiler_temp && (nextProps = renderLanes2 & -renderLanes2, nextProps = 0 !== (nextProps & 42) ? 1 : getBumpedLaneForHydrationByLane(nextProps), nextProps = 0 !== (nextProps & (JSCompiler_temp.suspendedLanes | renderLanes2)) ? 0 : nextProps, 0 !== nextProps && nextProps !== JSCompiler_temp$jscomp$0.retryLane))
                throw JSCompiler_temp$jscomp$0.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
              isSuspenseInstancePending(nextInstance) || renderDidSuspendDelayIfPossible();
              workInProgress2 = retrySuspenseComponentWithoutHydrating(
                current,
                workInProgress2,
                renderLanes2
              );
            } else
              isSuspenseInstancePending(nextInstance) ? (workInProgress2.flags |= 192, workInProgress2.child = current.child, workInProgress2 = null) : (current = JSCompiler_temp$jscomp$0.treeContext, supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinSuspenseInstance(nextInstance), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && (idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextId = current.id, treeContextOverflow = current.overflow, treeContextProvider = workInProgress2)), workInProgress2 = mountSuspensePrimaryChildren(
                workInProgress2,
                nextProps.children
              ), workInProgress2.flags |= 4096);
            return workInProgress2;
          }
          if (showFallback)
            return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, JSCompiler_temp$jscomp$0 = current.child, didSuspend = JSCompiler_temp$jscomp$0.sibling, nextProps = createWorkInProgress(JSCompiler_temp$jscomp$0, {
              mode: "hidden",
              children: nextProps.children
            }), nextProps.subtreeFlags = JSCompiler_temp$jscomp$0.subtreeFlags & 65011712, null !== didSuspend ? showFallback = createWorkInProgress(didSuspend, showFallback) : (showFallback = createFiberFromFragment(
              showFallback,
              nextInstance,
              renderLanes2,
              null
            ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, nextProps = showFallback, showFallback = workInProgress2.child, nextInstance = current.child.memoizedState, null === nextInstance ? nextInstance = mountSuspenseOffscreenState(renderLanes2) : (JSCompiler_temp$jscomp$0 = nextInstance.cachePool, null !== JSCompiler_temp$jscomp$0 ? (didSuspend = isPrimaryRenderer ? CacheContext._currentValue : CacheContext._currentValue2, JSCompiler_temp$jscomp$0 = JSCompiler_temp$jscomp$0.parent !== didSuspend ? { parent: didSuspend, pool: didSuspend } : JSCompiler_temp$jscomp$0) : JSCompiler_temp$jscomp$0 = getSuspendedCache(), nextInstance = {
              baseLanes: nextInstance.baseLanes | renderLanes2,
              cachePool: JSCompiler_temp$jscomp$0
            }), showFallback.memoizedState = nextInstance, showFallback.childLanes = getRemainingWorkInPrimaryTree(
              current,
              JSCompiler_temp,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          renderLanes2 = current.child;
          current = renderLanes2.sibling;
          renderLanes2 = createWorkInProgress(renderLanes2, {
            mode: "visible",
            children: nextProps.children
          });
          renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
          null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
          workInProgress2.child = renderLanes2;
          workInProgress2.memoizedState = null;
          return renderLanes2;
        }
        function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
          primaryChildren = mountWorkInProgressOffscreenFiber(
            { mode: "visible", children: primaryChildren },
            workInProgress2.mode
          );
          primaryChildren.return = workInProgress2;
          return workInProgress2.child = primaryChildren;
        }
        function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
          offscreenProps = createFiber(22, offscreenProps, null, mode);
          offscreenProps.lanes = 0;
          offscreenProps.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
          };
          return offscreenProps;
        }
        function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
          reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
          current = mountSuspensePrimaryChildren(
            workInProgress2,
            workInProgress2.pendingProps.children
          );
          current.flags |= 2;
          workInProgress2.memoizedState = null;
          return current;
        }
        function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
          fiber.lanes |= renderLanes2;
          var alternate = fiber.alternate;
          null !== alternate && (alternate.lanes |= renderLanes2);
          scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
        }
        function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode) {
          var renderState = workInProgress2.memoizedState;
          null === renderState ? workInProgress2.memoizedState = {
            isBackwards,
            rendering: null,
            renderingStartTime: 0,
            last: lastContentRow,
            tail,
            tailMode
          } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode);
        }
        function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
          var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
          reconcileChildren(current, workInProgress2, nextProps.children, renderLanes2);
          nextProps = suspenseStackCursor.current;
          if (0 !== (nextProps & 2))
            nextProps = nextProps & 1 | 2, workInProgress2.flags |= 128;
          else {
            if (null !== current && 0 !== (current.flags & 128))
              a: for (current = workInProgress2.child; null !== current; ) {
                if (13 === current.tag)
                  null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
                else if (19 === current.tag)
                  scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
                else if (null !== current.child) {
                  current.child.return = current;
                  current = current.child;
                  continue;
                }
                if (current === workInProgress2) break a;
                for (; null === current.sibling; ) {
                  if (null === current.return || current.return === workInProgress2)
                    break a;
                  current = current.return;
                }
                current.sibling.return = current.return;
                current = current.sibling;
              }
            nextProps &= 1;
          }
          push(suspenseStackCursor, nextProps);
          switch (revealOrder) {
            case "forwards":
              renderLanes2 = workInProgress2.child;
              for (revealOrder = null; null !== renderLanes2; )
                current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
              renderLanes2 = revealOrder;
              null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
              initSuspenseListRenderState(
                workInProgress2,
                false,
                revealOrder,
                renderLanes2,
                tailMode
              );
              break;
            case "backwards":
              renderLanes2 = null;
              revealOrder = workInProgress2.child;
              for (workInProgress2.child = null; null !== revealOrder; ) {
                current = revealOrder.alternate;
                if (null !== current && null === findFirstSuspended(current)) {
                  workInProgress2.child = revealOrder;
                  break;
                }
                current = revealOrder.sibling;
                revealOrder.sibling = renderLanes2;
                renderLanes2 = revealOrder;
                revealOrder = current;
              }
              initSuspenseListRenderState(
                workInProgress2,
                true,
                renderLanes2,
                null,
                tailMode
              );
              break;
            case "together":
              initSuspenseListRenderState(workInProgress2, false, null, null, void 0);
              break;
            default:
              workInProgress2.memoizedState = null;
          }
          return workInProgress2.child;
        }
        function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
          null !== current && (workInProgress2.dependencies = current.dependencies);
          workInProgressRootSkippedLanes |= workInProgress2.lanes;
          if (0 === (renderLanes2 & workInProgress2.childLanes))
            if (null !== current) {
              if (propagateParentContextChanges(
                current,
                workInProgress2,
                renderLanes2,
                false
              ), 0 === (renderLanes2 & workInProgress2.childLanes))
                return null;
            } else return null;
          if (null !== current && workInProgress2.child !== current.child)
            throw Error(formatProdErrorMessage(153));
          if (null !== workInProgress2.child) {
            current = workInProgress2.child;
            renderLanes2 = createWorkInProgress(current, current.pendingProps);
            workInProgress2.child = renderLanes2;
            for (renderLanes2.return = workInProgress2; null !== current.sibling; )
              current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
            renderLanes2.sibling = null;
          }
          return workInProgress2.child;
        }
        function checkScheduledUpdateOrContext(current, renderLanes2) {
          if (0 !== (current.lanes & renderLanes2)) return true;
          current = current.dependencies;
          return null !== current && checkIfContextChanged(current) ? true : false;
        }
        function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
          switch (workInProgress2.tag) {
            case 3:
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
              resetHydrationState();
              break;
            case 27:
            case 5:
              pushHostContext(workInProgress2);
              break;
            case 4:
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              break;
            case 10:
              pushProvider(
                workInProgress2,
                workInProgress2.type,
                workInProgress2.memoizedProps.value
              );
              break;
            case 13:
              var state = workInProgress2.memoizedState;
              if (null !== state) {
                if (null !== state.dehydrated)
                  return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
                if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
                  return updateSuspenseComponent(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                pushPrimaryTreeSuspenseHandler(workInProgress2);
                current = bailoutOnAlreadyFinishedWork(
                  current,
                  workInProgress2,
                  renderLanes2
                );
                return null !== current ? current.sibling : null;
              }
              pushPrimaryTreeSuspenseHandler(workInProgress2);
              break;
            case 19:
              var didSuspendBefore = 0 !== (current.flags & 128);
              state = 0 !== (renderLanes2 & workInProgress2.childLanes);
              state || (propagateParentContextChanges(
                current,
                workInProgress2,
                renderLanes2,
                false
              ), state = 0 !== (renderLanes2 & workInProgress2.childLanes));
              if (didSuspendBefore) {
                if (state)
                  return updateSuspenseListComponent(
                    current,
                    workInProgress2,
                    renderLanes2
                  );
                workInProgress2.flags |= 128;
              }
              didSuspendBefore = workInProgress2.memoizedState;
              null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
              push(suspenseStackCursor, suspenseStackCursor.current);
              if (state) break;
              else return null;
            case 22:
            case 23:
              return workInProgress2.lanes = 0, updateOffscreenComponent(current, workInProgress2, renderLanes2);
            case 24:
              pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
          }
          return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
        }
        function beginWork(current, workInProgress2, renderLanes2) {
          if (null !== current)
            if (current.memoizedProps !== workInProgress2.pendingProps)
              didReceiveUpdate = true;
            else {
              if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
                return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
                  current,
                  workInProgress2,
                  renderLanes2
                );
              didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
            }
          else
            didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
          workInProgress2.lanes = 0;
          switch (workInProgress2.tag) {
            case 16:
              a: {
                current = workInProgress2.pendingProps;
                var lazyComponent = workInProgress2.elementType, init = lazyComponent._init;
                lazyComponent = init(lazyComponent._payload);
                workInProgress2.type = lazyComponent;
                if ("function" === typeof lazyComponent)
                  shouldConstruct(lazyComponent) ? (current = resolveClassComponentProps(lazyComponent, current), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
                    null,
                    workInProgress2,
                    lazyComponent,
                    current,
                    renderLanes2
                  )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
                    null,
                    workInProgress2,
                    lazyComponent,
                    current,
                    renderLanes2
                  ));
                else {
                  if (void 0 !== lazyComponent && null !== lazyComponent) {
                    if (init = lazyComponent.$$typeof, init === REACT_FORWARD_REF_TYPE) {
                      workInProgress2.tag = 11;
                      workInProgress2 = updateForwardRef(
                        null,
                        workInProgress2,
                        lazyComponent,
                        current,
                        renderLanes2
                      );
                      break a;
                    } else if (init === REACT_MEMO_TYPE) {
                      workInProgress2.tag = 14;
                      workInProgress2 = updateMemoComponent(
                        null,
                        workInProgress2,
                        lazyComponent,
                        current,
                        renderLanes2
                      );
                      break a;
                    }
                  }
                  workInProgress2 = getComponentNameFromType(lazyComponent) || lazyComponent;
                  throw Error(formatProdErrorMessage(306, workInProgress2, ""));
                }
              }
              return workInProgress2;
            case 0:
              return updateFunctionComponent(
                current,
                workInProgress2,
                workInProgress2.type,
                workInProgress2.pendingProps,
                renderLanes2
              );
            case 1:
              return lazyComponent = workInProgress2.type, init = resolveClassComponentProps(
                lazyComponent,
                workInProgress2.pendingProps
              ), updateClassComponent(
                current,
                workInProgress2,
                lazyComponent,
                init,
                renderLanes2
              );
            case 3:
              a: {
                pushHostContainer(
                  workInProgress2,
                  workInProgress2.stateNode.containerInfo
                );
                if (null === current) throw Error(formatProdErrorMessage(387));
                var nextProps = workInProgress2.pendingProps;
                init = workInProgress2.memoizedState;
                lazyComponent = init.element;
                cloneUpdateQueue(current, workInProgress2);
                processUpdateQueue(workInProgress2, nextProps, null, renderLanes2);
                var nextState = workInProgress2.memoizedState;
                nextProps = nextState.cache;
                pushProvider(workInProgress2, CacheContext, nextProps);
                nextProps !== init.cache && propagateContextChanges(
                  workInProgress2,
                  [CacheContext],
                  renderLanes2,
                  true
                );
                suspendIfUpdateReadFromEntangledAsyncAction();
                nextProps = nextState.element;
                if (supportsHydration && init.isDehydrated)
                  if (init = {
                    element: nextProps,
                    isDehydrated: false,
                    cache: nextState.cache
                  }, workInProgress2.updateQueue.baseState = init, workInProgress2.memoizedState = init, workInProgress2.flags & 256) {
                    workInProgress2 = mountHostRootWithoutHydrating(
                      current,
                      workInProgress2,
                      nextProps,
                      renderLanes2
                    );
                    break a;
                  } else if (nextProps !== lazyComponent) {
                    lazyComponent = createCapturedValueAtFiber(
                      Error(formatProdErrorMessage(424)),
                      workInProgress2
                    );
                    queueHydrationError(lazyComponent);
                    workInProgress2 = mountHostRootWithoutHydrating(
                      current,
                      workInProgress2,
                      nextProps,
                      renderLanes2
                    );
                    break a;
                  } else
                    for (supportsHydration && (nextHydratableInstance = getFirstHydratableChildWithinContainer(
                      workInProgress2.stateNode.containerInfo
                    ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = true), renderLanes2 = mountChildFibers(
                      workInProgress2,
                      null,
                      nextProps,
                      renderLanes2
                    ), workInProgress2.child = renderLanes2; renderLanes2; )
                      renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
                else {
                  resetHydrationState();
                  if (nextProps === lazyComponent) {
                    workInProgress2 = bailoutOnAlreadyFinishedWork(
                      current,
                      workInProgress2,
                      renderLanes2
                    );
                    break a;
                  }
                  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
                }
                workInProgress2 = workInProgress2.child;
              }
              return workInProgress2;
            case 26:
              if (supportsResources)
                return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
                  workInProgress2.type,
                  null,
                  workInProgress2.pendingProps,
                  null
                )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (workInProgress2.stateNode = createHoistableInstance(
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  rootInstanceStackCursor.current,
                  workInProgress2
                )) : workInProgress2.memoizedState = getResource(
                  workInProgress2.type,
                  current.memoizedProps,
                  workInProgress2.pendingProps,
                  current.memoizedState
                ), null;
            case 27:
              if (supportsSingletons)
                return pushHostContext(workInProgress2), null === current && supportsSingletons && isHydrating && (lazyComponent = workInProgress2.stateNode = resolveSingletonInstance(
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  rootInstanceStackCursor.current,
                  contextStackCursor.current,
                  false
                ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, nextHydratableInstance = getFirstHydratableChildWithinSingleton(
                  workInProgress2.type,
                  lazyComponent,
                  nextHydratableInstance
                )), reconcileChildren(
                  current,
                  workInProgress2,
                  workInProgress2.pendingProps.children,
                  renderLanes2
                ), markRef(current, workInProgress2), null === current && (workInProgress2.flags |= 4194304), workInProgress2.child;
            case 5:
              if (null === current && isHydrating) {
                validateHydratableInstance(
                  workInProgress2.type,
                  workInProgress2.pendingProps,
                  contextStackCursor.current
                );
                if (init = lazyComponent = nextHydratableInstance)
                  lazyComponent = canHydrateInstance(
                    lazyComponent,
                    workInProgress2.type,
                    workInProgress2.pendingProps,
                    rootOrSingletonContext
                  ), null !== lazyComponent ? (workInProgress2.stateNode = lazyComponent, hydrationParentFiber = workInProgress2, nextHydratableInstance = getFirstHydratableChild(lazyComponent), rootOrSingletonContext = false, init = true) : init = false;
                init || throwOnHydrationMismatch(workInProgress2);
              }
              pushHostContext(workInProgress2);
              init = workInProgress2.type;
              nextProps = workInProgress2.pendingProps;
              nextState = null !== current ? current.memoizedProps : null;
              lazyComponent = nextProps.children;
              shouldSetTextContent(init, nextProps) ? lazyComponent = null : null !== nextState && shouldSetTextContent(init, nextState) && (workInProgress2.flags |= 32);
              null !== workInProgress2.memoizedState && (init = renderWithHooks(
                current,
                workInProgress2,
                TransitionAwareHostComponent,
                null,
                null,
                renderLanes2
              ), isPrimaryRenderer ? HostTransitionContext2._currentValue = init : HostTransitionContext2._currentValue2 = init);
              markRef(current, workInProgress2);
              reconcileChildren(current, workInProgress2, lazyComponent, renderLanes2);
              return workInProgress2.child;
            case 6:
              if (null === current && isHydrating) {
                validateHydratableTextInstance(
                  workInProgress2.pendingProps,
                  contextStackCursor.current
                );
                if (current = renderLanes2 = nextHydratableInstance)
                  renderLanes2 = canHydrateTextInstance(
                    renderLanes2,
                    workInProgress2.pendingProps,
                    rootOrSingletonContext
                  ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
                current || throwOnHydrationMismatch(workInProgress2);
              }
              return null;
            case 13:
              return updateSuspenseComponent(current, workInProgress2, renderLanes2);
            case 4:
              return pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              ), lazyComponent = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
                workInProgress2,
                null,
                lazyComponent,
                renderLanes2
              ) : reconcileChildren(
                current,
                workInProgress2,
                lazyComponent,
                renderLanes2
              ), workInProgress2.child;
            case 11:
              return updateForwardRef(
                current,
                workInProgress2,
                workInProgress2.type,
                workInProgress2.pendingProps,
                renderLanes2
              );
            case 7:
              return reconcileChildren(
                current,
                workInProgress2,
                workInProgress2.pendingProps,
                renderLanes2
              ), workInProgress2.child;
            case 8:
              return reconcileChildren(
                current,
                workInProgress2,
                workInProgress2.pendingProps.children,
                renderLanes2
              ), workInProgress2.child;
            case 12:
              return reconcileChildren(
                current,
                workInProgress2,
                workInProgress2.pendingProps.children,
                renderLanes2
              ), workInProgress2.child;
            case 10:
              return lazyComponent = workInProgress2.pendingProps, pushProvider(
                workInProgress2,
                workInProgress2.type,
                lazyComponent.value
              ), reconcileChildren(
                current,
                workInProgress2,
                lazyComponent.children,
                renderLanes2
              ), workInProgress2.child;
            case 9:
              return init = workInProgress2.type._context, lazyComponent = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), init = readContext(init), lazyComponent = lazyComponent(init), workInProgress2.flags |= 1, reconcileChildren(
                current,
                workInProgress2,
                lazyComponent,
                renderLanes2
              ), workInProgress2.child;
            case 14:
              return updateMemoComponent(
                current,
                workInProgress2,
                workInProgress2.type,
                workInProgress2.pendingProps,
                renderLanes2
              );
            case 15:
              return updateSimpleMemoComponent(
                current,
                workInProgress2,
                workInProgress2.type,
                workInProgress2.pendingProps,
                renderLanes2
              );
            case 19:
              return updateSuspenseListComponent(
                current,
                workInProgress2,
                renderLanes2
              );
            case 31:
              return lazyComponent = workInProgress2.pendingProps, renderLanes2 = workInProgress2.mode, lazyComponent = {
                mode: lazyComponent.mode,
                children: lazyComponent.children
              }, null === current ? (renderLanes2 = mountWorkInProgressOffscreenFiber(
                lazyComponent,
                renderLanes2
              ), renderLanes2.ref = workInProgress2.ref, workInProgress2.child = renderLanes2, renderLanes2.return = workInProgress2, workInProgress2 = renderLanes2) : (renderLanes2 = createWorkInProgress(
                current.child,
                lazyComponent
              ), renderLanes2.ref = workInProgress2.ref, workInProgress2.child = renderLanes2, renderLanes2.return = workInProgress2, workInProgress2 = renderLanes2), workInProgress2;
            case 22:
              return updateOffscreenComponent(current, workInProgress2, renderLanes2);
            case 24:
              return prepareToReadContext(workInProgress2), lazyComponent = readContext(CacheContext), null === current ? (init = peekCacheFromPool(), null === init && (init = workInProgressRoot, nextProps = createCache(), init.pooledCache = nextProps, nextProps.refCount++, null !== nextProps && (init.pooledCacheLanes |= renderLanes2), init = nextProps), workInProgress2.memoizedState = {
                parent: lazyComponent,
                cache: init
              }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, init)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), init = current.memoizedState, nextProps = workInProgress2.memoizedState, init.parent !== lazyComponent ? (init = { parent: lazyComponent, cache: lazyComponent }, workInProgress2.memoizedState = init, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = init), pushProvider(workInProgress2, CacheContext, lazyComponent)) : (lazyComponent = nextProps.cache, pushProvider(workInProgress2, CacheContext, lazyComponent), lazyComponent !== init.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                true
              ))), reconcileChildren(
                current,
                workInProgress2,
                workInProgress2.pendingProps.children,
                renderLanes2
              ), workInProgress2.child;
            case 29:
              throw workInProgress2.pendingProps;
          }
          throw Error(formatProdErrorMessage(156, workInProgress2.tag));
        }
        function markUpdate(workInProgress2) {
          workInProgress2.flags |= 4;
        }
        function doesRequireClone(current, completedWork) {
          if (null !== current && current.child === completedWork.child) return false;
          if (0 !== (completedWork.flags & 16)) return true;
          for (current = completedWork.child; null !== current; ) {
            if (0 !== (current.flags & 13878) || 0 !== (current.subtreeFlags & 13878))
              return true;
            current = current.sibling;
          }
          return false;
        }
        function appendAllChildren(parent, workInProgress2, needsVisibilityToggle, isHidden) {
          if (supportsMutation)
            for (needsVisibilityToggle = workInProgress2.child; null !== needsVisibilityToggle; ) {
              if (5 === needsVisibilityToggle.tag || 6 === needsVisibilityToggle.tag)
                appendInitialChild(parent, needsVisibilityToggle.stateNode);
              else if (!(4 === needsVisibilityToggle.tag || supportsSingletons && 27 === needsVisibilityToggle.tag) && null !== needsVisibilityToggle.child) {
                needsVisibilityToggle.child.return = needsVisibilityToggle;
                needsVisibilityToggle = needsVisibilityToggle.child;
                continue;
              }
              if (needsVisibilityToggle === workInProgress2) break;
              for (; null === needsVisibilityToggle.sibling; ) {
                if (null === needsVisibilityToggle.return || needsVisibilityToggle.return === workInProgress2)
                  return;
                needsVisibilityToggle = needsVisibilityToggle.return;
              }
              needsVisibilityToggle.sibling.return = needsVisibilityToggle.return;
              needsVisibilityToggle = needsVisibilityToggle.sibling;
            }
          else if (supportsPersistence)
            for (var node$93 = workInProgress2.child; null !== node$93; ) {
              if (5 === node$93.tag) {
                var instance = node$93.stateNode;
                needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(
                  instance,
                  node$93.type,
                  node$93.memoizedProps
                ));
                appendInitialChild(parent, instance);
              } else if (6 === node$93.tag)
                instance = node$93.stateNode, needsVisibilityToggle && isHidden && (instance = cloneHiddenTextInstance(
                  instance,
                  node$93.memoizedProps
                )), appendInitialChild(parent, instance);
              else if (4 !== node$93.tag) {
                if (22 === node$93.tag && null !== node$93.memoizedState)
                  instance = node$93.child, null !== instance && (instance.return = node$93), appendAllChildren(parent, node$93, true, true);
                else if (null !== node$93.child) {
                  node$93.child.return = node$93;
                  node$93 = node$93.child;
                  continue;
                }
              }
              if (node$93 === workInProgress2) break;
              for (; null === node$93.sibling; ) {
                if (null === node$93.return || node$93.return === workInProgress2)
                  return;
                node$93 = node$93.return;
              }
              node$93.sibling.return = node$93.return;
              node$93 = node$93.sibling;
            }
        }
        function appendAllChildrenToContainer(containerChildSet, workInProgress2, needsVisibilityToggle, isHidden) {
          var hasOffscreenComponentChild = false;
          if (supportsPersistence)
            for (var node = workInProgress2.child; null !== node; ) {
              if (5 === node.tag) {
                var instance = node.stateNode;
                needsVisibilityToggle && isHidden && (instance = cloneHiddenInstance(
                  instance,
                  node.type,
                  node.memoizedProps
                ));
                appendChildToContainerChildSet(containerChildSet, instance);
              } else if (6 === node.tag)
                instance = node.stateNode, needsVisibilityToggle && isHidden && (instance = cloneHiddenTextInstance(
                  instance,
                  node.memoizedProps
                )), appendChildToContainerChildSet(containerChildSet, instance);
              else if (4 !== node.tag) {
                if (22 === node.tag && null !== node.memoizedState)
                  hasOffscreenComponentChild = node.child, null !== hasOffscreenComponentChild && (hasOffscreenComponentChild.return = node), appendAllChildrenToContainer(containerChildSet, node, true, true), hasOffscreenComponentChild = true;
                else if (null !== node.child) {
                  node.child.return = node;
                  node = node.child;
                  continue;
                }
              }
              if (node === workInProgress2) break;
              for (; null === node.sibling; ) {
                if (null === node.return || node.return === workInProgress2)
                  return hasOffscreenComponentChild;
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          return hasOffscreenComponentChild;
        }
        function updateHostContainer(current, workInProgress2) {
          if (supportsPersistence && doesRequireClone(current, workInProgress2)) {
            current = workInProgress2.stateNode;
            var container = current.containerInfo, newChildSet = createContainerChildSet();
            appendAllChildrenToContainer(newChildSet, workInProgress2, false, false);
            current.pendingChildren = newChildSet;
            markUpdate(workInProgress2);
            finalizeContainerChildren(container, newChildSet);
          }
        }
        function updateHostComponent(current, workInProgress2, type, newProps) {
          if (supportsMutation)
            current.memoizedProps !== newProps && markUpdate(workInProgress2);
          else if (supportsPersistence) {
            var currentInstance = current.stateNode, oldProps$96 = current.memoizedProps;
            if ((current = doesRequireClone(current, workInProgress2)) || oldProps$96 !== newProps) {
              var currentHostContext = contextStackCursor.current;
              oldProps$96 = cloneInstance(
                currentInstance,
                type,
                oldProps$96,
                newProps,
                !current,
                null
              );
              oldProps$96 === currentInstance ? workInProgress2.stateNode = currentInstance : (finalizeInitialChildren(
                oldProps$96,
                type,
                newProps,
                currentHostContext
              ) && markUpdate(workInProgress2), workInProgress2.stateNode = oldProps$96, current ? appendAllChildren(oldProps$96, workInProgress2, false, false) : markUpdate(workInProgress2));
            } else workInProgress2.stateNode = currentInstance;
          }
        }
        function preloadInstanceAndSuspendIfNeeded(workInProgress2, type, props) {
          if (maySuspendCommit(type, props)) {
            if (workInProgress2.flags |= 16777216, !preloadInstance(type, props))
              if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
              else
                throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
          } else workInProgress2.flags &= -16777217;
        }
        function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
          if (mayResourceSuspendCommit(resource)) {
            if (workInProgress2.flags |= 16777216, !preloadResource(resource))
              if (shouldRemainOnPreviousScreen()) workInProgress2.flags |= 8192;
              else
                throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
          } else workInProgress2.flags &= -16777217;
        }
        function scheduleRetryEffect(workInProgress2, retryQueue) {
          null !== retryQueue && (workInProgress2.flags |= 4);
          workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
        }
        function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
          if (!isHydrating)
            switch (renderState.tailMode) {
              case "hidden":
                hasRenderedATailFallback = renderState.tail;
                for (var lastTailNode = null; null !== hasRenderedATailFallback; )
                  null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
                null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
                break;
              case "collapsed":
                lastTailNode = renderState.tail;
                for (var lastTailNode$98 = null; null !== lastTailNode; )
                  null !== lastTailNode.alternate && (lastTailNode$98 = lastTailNode), lastTailNode = lastTailNode.sibling;
                null === lastTailNode$98 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$98.sibling = null;
            }
        }
        function bubbleProperties(completedWork) {
          var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
          if (didBailout)
            for (var child$99 = completedWork.child; null !== child$99; )
              newChildLanes |= child$99.lanes | child$99.childLanes, subtreeFlags |= child$99.subtreeFlags & 65011712, subtreeFlags |= child$99.flags & 65011712, child$99.return = completedWork, child$99 = child$99.sibling;
          else
            for (child$99 = completedWork.child; null !== child$99; )
              newChildLanes |= child$99.lanes | child$99.childLanes, subtreeFlags |= child$99.subtreeFlags, subtreeFlags |= child$99.flags, child$99.return = completedWork, child$99 = child$99.sibling;
          completedWork.subtreeFlags |= subtreeFlags;
          completedWork.childLanes = newChildLanes;
          return didBailout;
        }
        function completeWork(current, workInProgress2, renderLanes2) {
          var newProps = workInProgress2.pendingProps;
          popTreeContext(workInProgress2);
          switch (workInProgress2.tag) {
            case 31:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return bubbleProperties(workInProgress2), null;
            case 1:
              return bubbleProperties(workInProgress2), null;
            case 3:
              renderLanes2 = workInProgress2.stateNode;
              newProps = null;
              null !== current && (newProps = current.memoizedState.cache);
              workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
              popProvider(CacheContext);
              popHostContainer();
              renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
              if (null === current || null === current.child)
                popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
              updateHostContainer(current, workInProgress2);
              bubbleProperties(workInProgress2);
              return null;
            case 26:
              if (supportsResources) {
                renderLanes2 = workInProgress2.type;
                var nextResource = workInProgress2.memoizedState;
                null === current ? (markUpdate(workInProgress2), null !== nextResource ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(
                  workInProgress2,
                  nextResource
                )) : (bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
                  workInProgress2,
                  renderLanes2,
                  newProps
                ))) : nextResource ? nextResource !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(
                  workInProgress2,
                  nextResource
                )) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (supportsMutation ? current.memoizedProps !== newProps && markUpdate(workInProgress2) : updateHostComponent(
                  current,
                  workInProgress2,
                  renderLanes2,
                  newProps
                ), bubbleProperties(workInProgress2), preloadInstanceAndSuspendIfNeeded(
                  workInProgress2,
                  renderLanes2,
                  newProps
                ));
                return null;
              }
            case 27:
              if (supportsSingletons) {
                popHostContext(workInProgress2);
                renderLanes2 = rootInstanceStackCursor.current;
                nextResource = workInProgress2.type;
                if (null !== current && null != workInProgress2.stateNode)
                  supportsMutation ? current.memoizedProps !== newProps && markUpdate(workInProgress2) : updateHostComponent(
                    current,
                    workInProgress2,
                    nextResource,
                    newProps
                  );
                else {
                  if (!newProps) {
                    if (null === workInProgress2.stateNode)
                      throw Error(formatProdErrorMessage(166));
                    bubbleProperties(workInProgress2);
                    return null;
                  }
                  current = contextStackCursor.current;
                  popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (current = resolveSingletonInstance(
                    nextResource,
                    newProps,
                    renderLanes2,
                    current,
                    true
                  ), workInProgress2.stateNode = current, markUpdate(workInProgress2));
                }
                bubbleProperties(workInProgress2);
                return null;
              }
            case 5:
              popHostContext(workInProgress2);
              renderLanes2 = workInProgress2.type;
              if (null !== current && null != workInProgress2.stateNode)
                updateHostComponent(current, workInProgress2, renderLanes2, newProps);
              else {
                if (!newProps) {
                  if (null === workInProgress2.stateNode)
                    throw Error(formatProdErrorMessage(166));
                  bubbleProperties(workInProgress2);
                  return null;
                }
                current = contextStackCursor.current;
                popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current) : (nextResource = createInstance(
                  renderLanes2,
                  newProps,
                  rootInstanceStackCursor.current,
                  current,
                  workInProgress2
                ), appendAllChildren(nextResource, workInProgress2, false, false), workInProgress2.stateNode = nextResource, finalizeInitialChildren(
                  nextResource,
                  renderLanes2,
                  newProps,
                  current
                ) && markUpdate(workInProgress2));
              }
              bubbleProperties(workInProgress2);
              preloadInstanceAndSuspendIfNeeded(
                workInProgress2,
                workInProgress2.type,
                workInProgress2.pendingProps
              );
              return null;
            case 6:
              if (current && null != workInProgress2.stateNode)
                renderLanes2 = current.memoizedProps, supportsMutation ? renderLanes2 !== newProps && markUpdate(workInProgress2) : supportsPersistence && (renderLanes2 !== newProps ? (workInProgress2.stateNode = createTextInstance(
                  newProps,
                  rootInstanceStackCursor.current,
                  contextStackCursor.current,
                  workInProgress2
                ), markUpdate(workInProgress2)) : workInProgress2.stateNode = current.stateNode);
              else {
                if ("string" !== typeof newProps && null === workInProgress2.stateNode)
                  throw Error(formatProdErrorMessage(166));
                current = rootInstanceStackCursor.current;
                renderLanes2 = contextStackCursor.current;
                if (popHydrationState(workInProgress2)) {
                  if (!supportsHydration) throw Error(formatProdErrorMessage(176));
                  current = workInProgress2.stateNode;
                  renderLanes2 = workInProgress2.memoizedProps;
                  newProps = null;
                  nextResource = hydrationParentFiber;
                  if (null !== nextResource)
                    switch (nextResource.tag) {
                      case 27:
                      case 5:
                        newProps = nextResource.memoizedProps;
                    }
                  hydrateTextInstance(
                    current,
                    renderLanes2,
                    workInProgress2,
                    newProps
                  ) || throwOnHydrationMismatch(workInProgress2);
                } else
                  workInProgress2.stateNode = createTextInstance(
                    newProps,
                    current,
                    renderLanes2,
                    workInProgress2
                  );
              }
              bubbleProperties(workInProgress2);
              return null;
            case 13:
              newProps = workInProgress2.memoizedState;
              if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
                nextResource = popHydrationState(workInProgress2);
                if (null !== newProps && null !== newProps.dehydrated) {
                  if (null === current) {
                    if (!nextResource) throw Error(formatProdErrorMessage(318));
                    if (!supportsHydration) throw Error(formatProdErrorMessage(344));
                    nextResource = workInProgress2.memoizedState;
                    nextResource = null !== nextResource ? nextResource.dehydrated : null;
                    if (!nextResource) throw Error(formatProdErrorMessage(317));
                    hydrateSuspenseInstance(nextResource, workInProgress2);
                  } else
                    resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
                  bubbleProperties(workInProgress2);
                  nextResource = false;
                } else
                  nextResource = upgradeHydrationErrorsToRecoverable(), null !== current && null !== current.memoizedState && (current.memoizedState.hydrationErrors = nextResource), nextResource = true;
                if (!nextResource) {
                  if (workInProgress2.flags & 256)
                    return popSuspenseHandler(workInProgress2), workInProgress2;
                  popSuspenseHandler(workInProgress2);
                  return null;
                }
              }
              popSuspenseHandler(workInProgress2);
              if (0 !== (workInProgress2.flags & 128))
                return workInProgress2.lanes = renderLanes2, workInProgress2;
              renderLanes2 = null !== newProps;
              current = null !== current && null !== current.memoizedState;
              if (renderLanes2) {
                newProps = workInProgress2.child;
                nextResource = null;
                null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (nextResource = newProps.alternate.memoizedState.cachePool.pool);
                var cache$113 = null;
                null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (cache$113 = newProps.memoizedState.cachePool.pool);
                cache$113 !== nextResource && (newProps.flags |= 2048);
              }
              renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
              scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
              bubbleProperties(workInProgress2);
              return null;
            case 4:
              return popHostContainer(), updateHostContainer(current, workInProgress2), null === current && preparePortalMount(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
            case 10:
              return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
            case 19:
              pop(suspenseStackCursor);
              nextResource = workInProgress2.memoizedState;
              if (null === nextResource)
                return bubbleProperties(workInProgress2), null;
              newProps = 0 !== (workInProgress2.flags & 128);
              cache$113 = nextResource.rendering;
              if (null === cache$113)
                if (newProps) cutOffTailIfNeeded(nextResource, false);
                else {
                  if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
                    for (current = workInProgress2.child; null !== current; ) {
                      cache$113 = findFirstSuspended(current);
                      if (null !== cache$113) {
                        workInProgress2.flags |= 128;
                        cutOffTailIfNeeded(nextResource, false);
                        current = cache$113.updateQueue;
                        workInProgress2.updateQueue = current;
                        scheduleRetryEffect(workInProgress2, current);
                        workInProgress2.subtreeFlags = 0;
                        current = renderLanes2;
                        for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                          resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                        push(
                          suspenseStackCursor,
                          suspenseStackCursor.current & 1 | 2
                        );
                        return workInProgress2.child;
                      }
                      current = current.sibling;
                    }
                  null !== nextResource.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(nextResource, false), workInProgress2.lanes = 4194304);
                }
              else {
                if (!newProps)
                  if (current = findFirstSuspended(cache$113), null !== current) {
                    if (workInProgress2.flags |= 128, newProps = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(nextResource, true), null === nextResource.tail && "hidden" === nextResource.tailMode && !cache$113.alternate && !isHydrating)
                      return bubbleProperties(workInProgress2), null;
                  } else
                    2 * now() - nextResource.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(nextResource, false), workInProgress2.lanes = 4194304);
                nextResource.isBackwards ? (cache$113.sibling = workInProgress2.child, workInProgress2.child = cache$113) : (current = nextResource.last, null !== current ? current.sibling = cache$113 : workInProgress2.child = cache$113, nextResource.last = cache$113);
              }
              if (null !== nextResource.tail)
                return workInProgress2 = nextResource.tail, nextResource.rendering = workInProgress2, nextResource.tail = workInProgress2.sibling, nextResource.renderingStartTime = now(), workInProgress2.sibling = null, current = suspenseStackCursor.current, push(
                  suspenseStackCursor,
                  newProps ? current & 1 | 2 : current & 1
                ), workInProgress2;
              bubbleProperties(workInProgress2);
              return null;
            case 22:
            case 23:
              return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
            case 24:
              return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
            case 25:
              return null;
            case 30:
              return null;
          }
          throw Error(formatProdErrorMessage(156, workInProgress2.tag));
        }
        function unwindWork(current, workInProgress2) {
          popTreeContext(workInProgress2);
          switch (workInProgress2.tag) {
            case 1:
              return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
            case 3:
              return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
            case 26:
            case 27:
            case 5:
              return popHostContext(workInProgress2), null;
            case 13:
              popSuspenseHandler(workInProgress2);
              current = workInProgress2.memoizedState;
              if (null !== current && null !== current.dehydrated) {
                if (null === workInProgress2.alternate)
                  throw Error(formatProdErrorMessage(340));
                resetHydrationState();
              }
              current = workInProgress2.flags;
              return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
            case 19:
              return pop(suspenseStackCursor), null;
            case 4:
              return popHostContainer(), null;
            case 10:
              return popProvider(workInProgress2.type), null;
            case 22:
            case 23:
              return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
            case 24:
              return popProvider(CacheContext), null;
            case 25:
              return null;
            default:
              return null;
          }
        }
        function unwindInterruptedWork(current, interruptedWork) {
          popTreeContext(interruptedWork);
          switch (interruptedWork.tag) {
            case 3:
              popProvider(CacheContext);
              popHostContainer();
              break;
            case 26:
            case 27:
            case 5:
              popHostContext(interruptedWork);
              break;
            case 4:
              popHostContainer();
              break;
            case 13:
              popSuspenseHandler(interruptedWork);
              break;
            case 19:
              pop(suspenseStackCursor);
              break;
            case 10:
              popProvider(interruptedWork.type);
              break;
            case 22:
            case 23:
              popSuspenseHandler(interruptedWork);
              popHiddenContext();
              null !== current && pop(resumedCache);
              break;
            case 24:
              popProvider(CacheContext);
          }
        }
        function commitHookEffectListMount(flags, finishedWork) {
          try {
            var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
            if (null !== lastEffect) {
              var firstEffect = lastEffect.next;
              updateQueue = firstEffect;
              do {
                if ((updateQueue.tag & flags) === flags) {
                  lastEffect = void 0;
                  var create = updateQueue.create, inst = updateQueue.inst;
                  lastEffect = create();
                  inst.destroy = lastEffect;
                }
                updateQueue = updateQueue.next;
              } while (updateQueue !== firstEffect);
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
          try {
            var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
            if (null !== lastEffect) {
              var firstEffect = lastEffect.next;
              updateQueue = firstEffect;
              do {
                if ((updateQueue.tag & flags) === flags) {
                  var inst = updateQueue.inst, destroy = inst.destroy;
                  if (void 0 !== destroy) {
                    inst.destroy = void 0;
                    lastEffect = finishedWork;
                    var nearestMountedAncestor = nearestMountedAncestor$jscomp$0, destroy_ = destroy;
                    try {
                      destroy_();
                    } catch (error) {
                      captureCommitPhaseError(
                        lastEffect,
                        nearestMountedAncestor,
                        error
                      );
                    }
                  }
                }
                updateQueue = updateQueue.next;
              } while (updateQueue !== firstEffect);
            }
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function commitClassCallbacks(finishedWork) {
          var updateQueue = finishedWork.updateQueue;
          if (null !== updateQueue) {
            var instance = finishedWork.stateNode;
            try {
              commitCallbacks(updateQueue, instance);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
          }
        }
        function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
          instance.props = resolveClassComponentProps(
            current.type,
            current.memoizedProps
          );
          instance.state = current.memoizedState;
          try {
            instance.componentWillUnmount();
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          }
        }
        function safelyAttachRef(current, nearestMountedAncestor) {
          try {
            var ref = current.ref;
            if (null !== ref) {
              switch (current.tag) {
                case 26:
                case 27:
                case 5:
                  var instanceToUse = getPublicInstance(current.stateNode);
                  break;
                case 30:
                  instanceToUse = current.stateNode;
                  break;
                default:
                  instanceToUse = current.stateNode;
              }
              "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
            }
          } catch (error) {
            captureCommitPhaseError(current, nearestMountedAncestor, error);
          }
        }
        function safelyDetachRef(current, nearestMountedAncestor) {
          var ref = current.ref, refCleanup = current.refCleanup;
          if (null !== ref)
            if ("function" === typeof refCleanup)
              try {
                refCleanup();
              } catch (error) {
                captureCommitPhaseError(current, nearestMountedAncestor, error);
              } finally {
                current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
              }
            else if ("function" === typeof ref)
              try {
                ref(null);
              } catch (error$129) {
                captureCommitPhaseError(current, nearestMountedAncestor, error$129);
              }
            else ref.current = null;
        }
        function commitHostMount(finishedWork) {
          var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
          try {
            commitMount(instance, type, props, finishedWork);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function commitHostUpdate(finishedWork, newProps, oldProps) {
          try {
            commitUpdate(
              finishedWork.stateNode,
              finishedWork.type,
              oldProps,
              newProps,
              finishedWork
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function isHostParent(fiber) {
          return 5 === fiber.tag || 3 === fiber.tag || (supportsResources ? 26 === fiber.tag : false) || (supportsSingletons ? 27 === fiber.tag && isSingletonScope(fiber.type) : false) || 4 === fiber.tag;
        }
        function getHostSibling(fiber) {
          a: for (; ; ) {
            for (; null === fiber.sibling; ) {
              if (null === fiber.return || isHostParent(fiber.return)) return null;
              fiber = fiber.return;
            }
            fiber.sibling.return = fiber.return;
            for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
              if (supportsSingletons && 27 === fiber.tag && isSingletonScope(fiber.type))
                continue a;
              if (fiber.flags & 2) continue a;
              if (null === fiber.child || 4 === fiber.tag) continue a;
              else fiber.child.return = fiber, fiber = fiber.child;
            }
            if (!(fiber.flags & 2)) return fiber.stateNode;
          }
        }
        function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
          var tag = node.tag;
          if (5 === tag || 6 === tag)
            node = node.stateNode, before ? insertInContainerBefore(parent, node, before) : appendChildToContainer(parent, node);
          else if (4 !== tag && (supportsSingletons && 27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
            for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
              insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
        }
        function insertOrAppendPlacementNode(node, before, parent) {
          var tag = node.tag;
          if (5 === tag || 6 === tag)
            node = node.stateNode, before ? insertBefore(parent, node, before) : appendChild(parent, node);
          else if (4 !== tag && (supportsSingletons && 27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
            for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
              insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
        }
        function commitHostPortalContainerChildren(portal, finishedWork, pendingChildren) {
          portal = portal.containerInfo;
          try {
            replaceContainerChildren(portal, pendingChildren);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function commitHostSingletonAcquisition(finishedWork) {
          var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
          try {
            acquireSingletonInstance(
              finishedWork.type,
              props,
              singleton,
              finishedWork
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
        function commitBeforeMutationEffects(root, firstChild) {
          prepareForCommit(root.containerInfo);
          for (nextEffect = firstChild; null !== nextEffect; )
            if (root = nextEffect, firstChild = root.child, 0 !== (root.subtreeFlags & 1024) && null !== firstChild)
              firstChild.return = root, nextEffect = firstChild;
            else
              for (; null !== nextEffect; ) {
                root = nextEffect;
                var current = root.alternate;
                firstChild = root.flags;
                switch (root.tag) {
                  case 0:
                    break;
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (0 !== (firstChild & 1024) && null !== current) {
                      firstChild = void 0;
                      var finishedWork = root, prevProps = current.memoizedProps;
                      current = current.memoizedState;
                      var instance = finishedWork.stateNode;
                      try {
                        var resolvedPrevProps = resolveClassComponentProps(
                          finishedWork.type,
                          prevProps,
                          finishedWork.elementType === finishedWork.type
                        );
                        firstChild = instance.getSnapshotBeforeUpdate(
                          resolvedPrevProps,
                          current
                        );
                        instance.__reactInternalSnapshotBeforeUpdate = firstChild;
                      } catch (error) {
                        captureCommitPhaseError(
                          finishedWork,
                          finishedWork.return,
                          error
                        );
                      }
                    }
                    break;
                  case 3:
                    0 !== (firstChild & 1024) && supportsMutation && clearContainer(root.stateNode.containerInfo);
                    break;
                  case 5:
                  case 26:
                  case 27:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    if (0 !== (firstChild & 1024))
                      throw Error(formatProdErrorMessage(163));
                }
                firstChild = root.sibling;
                if (null !== firstChild) {
                  firstChild.return = root.return;
                  nextEffect = firstChild;
                  break;
                }
                nextEffect = root.return;
              }
        }
        function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
          var flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              flags & 4 && commitHookEffectListMount(5, finishedWork);
              break;
            case 1:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              if (flags & 4)
                if (finishedRoot = finishedWork.stateNode, null === current)
                  try {
                    finishedRoot.componentDidMount();
                  } catch (error) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error);
                  }
                else {
                  var prevProps = resolveClassComponentProps(
                    finishedWork.type,
                    current.memoizedProps
                  );
                  current = current.memoizedState;
                  try {
                    finishedRoot.componentDidUpdate(
                      prevProps,
                      current,
                      finishedRoot.__reactInternalSnapshotBeforeUpdate
                    );
                  } catch (error$128) {
                    captureCommitPhaseError(
                      finishedWork,
                      finishedWork.return,
                      error$128
                    );
                  }
                }
              flags & 64 && commitClassCallbacks(finishedWork);
              flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 3:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              if (flags & 64 && (finishedRoot = finishedWork.updateQueue, null !== finishedRoot)) {
                current = null;
                if (null !== finishedWork.child)
                  switch (finishedWork.child.tag) {
                    case 27:
                    case 5:
                      current = getPublicInstance(finishedWork.child.stateNode);
                      break;
                    case 1:
                      current = finishedWork.child.stateNode;
                  }
                try {
                  commitCallbacks(finishedRoot, current);
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              }
              break;
            case 27:
              supportsSingletons && null === current && flags & 4 && commitHostSingletonAcquisition(finishedWork);
            case 26:
            case 5:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              null === current && flags & 4 && commitHostMount(finishedWork);
              flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
              break;
            case 12:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              break;
            case 13:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
              flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
                null,
                finishedWork
              ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
              break;
            case 22:
              flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
              if (!flags) {
                current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
                prevProps = offscreenSubtreeIsHidden;
                var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
                offscreenSubtreeIsHidden = flags;
                (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  0 !== (finishedWork.subtreeFlags & 8772)
                ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
                offscreenSubtreeIsHidden = prevProps;
                offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
              }
              break;
            case 30:
              break;
            default:
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
          }
        }
        function detachFiberAfterEffects(fiber) {
          var alternate = fiber.alternate;
          null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
          fiber.child = null;
          fiber.deletions = null;
          fiber.sibling = null;
          5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
          fiber.stateNode = null;
          fiber.return = null;
          fiber.dependencies = null;
          fiber.memoizedProps = null;
          fiber.memoizedState = null;
          fiber.pendingProps = null;
          fiber.stateNode = null;
          fiber.updateQueue = null;
        }
        function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
          for (parent = parent.child; null !== parent; )
            commitDeletionEffectsOnFiber(
              finishedRoot,
              nearestMountedAncestor,
              parent
            ), parent = parent.sibling;
        }
        function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
          if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
            try {
              injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
            } catch (err) {
            }
          switch (deletedFiber.tag) {
            case 26:
              if (supportsResources) {
                offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
                recursivelyTraverseDeletionEffects(
                  finishedRoot,
                  nearestMountedAncestor,
                  deletedFiber
                );
                deletedFiber.memoizedState ? releaseResource(deletedFiber.memoizedState) : deletedFiber.stateNode && unmountHoistable(deletedFiber.stateNode);
                break;
              }
            case 27:
              if (supportsSingletons) {
                offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
                var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
                isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
                recursivelyTraverseDeletionEffects(
                  finishedRoot,
                  nearestMountedAncestor,
                  deletedFiber
                );
                releaseSingletonInstance(deletedFiber.stateNode);
                hostParent = prevHostParent;
                hostParentIsContainer = prevHostParentIsContainer;
                break;
              }
            case 5:
              offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            case 6:
              if (supportsMutation) {
                if (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = null, recursivelyTraverseDeletionEffects(
                  finishedRoot,
                  nearestMountedAncestor,
                  deletedFiber
                ), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer, null !== hostParent)
                  if (hostParentIsContainer)
                    try {
                      removeChildFromContainer(hostParent, deletedFiber.stateNode);
                    } catch (error) {
                      captureCommitPhaseError(
                        deletedFiber,
                        nearestMountedAncestor,
                        error
                      );
                    }
                  else
                    try {
                      removeChild(hostParent, deletedFiber.stateNode);
                    } catch (error) {
                      captureCommitPhaseError(
                        deletedFiber,
                        nearestMountedAncestor,
                        error
                      );
                    }
              } else
                recursivelyTraverseDeletionEffects(
                  finishedRoot,
                  nearestMountedAncestor,
                  deletedFiber
                );
              break;
            case 18:
              supportsMutation && null !== hostParent && (hostParentIsContainer ? clearSuspenseBoundaryFromContainer(
                hostParent,
                deletedFiber.stateNode
              ) : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
              break;
            case 4:
              supportsMutation ? (prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer, hostParent = deletedFiber.stateNode.containerInfo, hostParentIsContainer = true, recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              ), hostParent = prevHostParent, hostParentIsContainer = prevHostParentIsContainer) : (supportsPersistence && commitHostPortalContainerChildren(
                deletedFiber.stateNode,
                deletedFiber,
                createContainerChildSet()
              ), recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              ));
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              offscreenSubtreeWasHidden || commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
              offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
              recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              );
              break;
            case 1:
              offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
                deletedFiber,
                nearestMountedAncestor,
                prevHostParent
              ));
              recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              );
              break;
            case 21:
              recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              );
              break;
            case 22:
              offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
              recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              );
              offscreenSubtreeWasHidden = prevHostParent;
              break;
            default:
              recursivelyTraverseDeletionEffects(
                finishedRoot,
                nearestMountedAncestor,
                deletedFiber
              );
          }
        }
        function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
          if (supportsHydration && null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
            try {
              commitHydratedSuspenseInstance(finishedRoot);
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
        }
        function getRetryCache(finishedWork) {
          switch (finishedWork.tag) {
            case 13:
            case 19:
              var retryCache = finishedWork.stateNode;
              null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
              return retryCache;
            case 22:
              return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
            default:
              throw Error(formatProdErrorMessage(435, finishedWork.tag));
          }
        }
        function attachSuspenseRetryListeners(finishedWork, wakeables) {
          var retryCache = getRetryCache(finishedWork);
          wakeables.forEach(function(wakeable) {
            var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
            retryCache.has(wakeable) || (retryCache.add(wakeable), wakeable.then(retry, retry));
          });
        }
        function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
          var deletions = parentFiber.deletions;
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i], root = root$jscomp$0, returnFiber = parentFiber;
              if (supportsMutation) {
                var parent = returnFiber;
                a: for (; null !== parent; ) {
                  switch (parent.tag) {
                    case 27:
                      if (supportsSingletons) {
                        if (isSingletonScope(parent.type)) {
                          hostParent = parent.stateNode;
                          hostParentIsContainer = false;
                          break a;
                        }
                        break;
                      }
                    case 5:
                      hostParent = parent.stateNode;
                      hostParentIsContainer = false;
                      break a;
                    case 3:
                    case 4:
                      hostParent = parent.stateNode.containerInfo;
                      hostParentIsContainer = true;
                      break a;
                  }
                  parent = parent.return;
                }
                if (null === hostParent) throw Error(formatProdErrorMessage(160));
                commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
                hostParent = null;
                hostParentIsContainer = false;
              } else commitDeletionEffectsOnFiber(root, returnFiber, childToDelete);
              root = childToDelete.alternate;
              null !== root && (root.return = null);
              childToDelete.return = null;
            }
          if (parentFiber.subtreeFlags & 13878)
            for (parentFiber = parentFiber.child; null !== parentFiber; )
              commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
        }
        function commitMutationEffectsOnFiber(finishedWork, root) {
          var current = finishedWork.alternate, flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
              break;
            case 1:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
              flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
              break;
            case 26:
              if (supportsResources) {
                var hoistableRoot = currentHoistableRoot;
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
                if (flags & 4) {
                  flags = null !== current ? current.memoizedState : null;
                  var newResource = finishedWork.memoizedState;
                  null === current ? null === newResource ? null === finishedWork.stateNode ? finishedWork.stateNode = hydrateHoistable(
                    hoistableRoot,
                    finishedWork.type,
                    finishedWork.memoizedProps,
                    finishedWork
                  ) : mountHoistable(
                    hoistableRoot,
                    finishedWork.type,
                    finishedWork.stateNode
                  ) : finishedWork.stateNode = acquireResource(
                    hoistableRoot,
                    newResource,
                    finishedWork.memoizedProps
                  ) : flags !== newResource ? (null === flags ? null !== current.stateNode && unmountHoistable(current.stateNode) : releaseResource(flags), null === newResource ? mountHoistable(
                    hoistableRoot,
                    finishedWork.type,
                    finishedWork.stateNode
                  ) : acquireResource(
                    hoistableRoot,
                    newResource,
                    finishedWork.memoizedProps
                  )) : null === newResource && null !== finishedWork.stateNode && commitHostUpdate(
                    finishedWork,
                    finishedWork.memoizedProps,
                    current.memoizedProps
                  );
                }
                break;
              }
            case 27:
              if (supportsSingletons) {
                recursivelyTraverseMutationEffects(root, finishedWork);
                commitReconciliationEffects(finishedWork);
                flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
                null !== current && flags & 4 && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current.memoizedProps
                );
                break;
              }
            case 5:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
              if (supportsMutation) {
                if (finishedWork.flags & 32) {
                  hoistableRoot = finishedWork.stateNode;
                  try {
                    resetTextContent(hoistableRoot);
                  } catch (error) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error);
                  }
                }
                flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
                  finishedWork,
                  hoistableRoot,
                  null !== current ? current.memoizedProps : hoistableRoot
                ));
                flags & 1024 && (needsFormReset = true);
              }
              break;
            case 6:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              if (flags & 4 && supportsMutation) {
                if (null === finishedWork.stateNode)
                  throw Error(formatProdErrorMessage(162));
                flags = finishedWork.memoizedProps;
                current = null !== current ? current.memoizedProps : flags;
                hoistableRoot = finishedWork.stateNode;
                try {
                  commitTextUpdate(hoistableRoot, current, flags);
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              }
              break;
            case 3:
              supportsResources ? (prepareToCommitHoistables(), hoistableRoot = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(root.containerInfo), recursivelyTraverseMutationEffects(root, finishedWork), currentHoistableRoot = hoistableRoot) : recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              if (flags & 4) {
                if (supportsMutation && supportsHydration && null !== current && current.memoizedState.isDehydrated)
                  try {
                    commitHydratedContainer(root.containerInfo);
                  } catch (error) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error);
                  }
                if (supportsPersistence) {
                  flags = root.containerInfo;
                  current = root.pendingChildren;
                  try {
                    replaceContainerChildren(flags, current);
                  } catch (error) {
                    captureCommitPhaseError(finishedWork, finishedWork.return, error);
                  }
                }
              }
              needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
              break;
            case 4:
              supportsResources ? (current = currentHoistableRoot, currentHoistableRoot = getHoistableRoot(
                finishedWork.stateNode.containerInfo
              ), recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork), currentHoistableRoot = current) : (recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork));
              flags & 4 && supportsPersistence && commitHostPortalContainerChildren(
                finishedWork.stateNode,
                finishedWork,
                finishedWork.stateNode.pendingChildren
              );
              break;
            case 12:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              break;
            case 13:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
              flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
              break;
            case 22:
              hoistableRoot = null !== finishedWork.memoizedState;
              var wasHidden = null !== current && null !== current.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
              offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
              recursivelyTraverseMutationEffects(root, finishedWork);
              offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
              commitReconciliationEffects(finishedWork);
              if (flags & 8192 && (root = finishedWork.stateNode, root._visibility = hoistableRoot ? root._visibility & -2 : root._visibility | 1, hoistableRoot && (null === current || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), supportsMutation)) {
                a: if (current = null, supportsMutation)
                  for (root = finishedWork; ; ) {
                    if (5 === root.tag || supportsResources && 26 === root.tag) {
                      if (null === current) {
                        wasHidden = current = root;
                        try {
                          newResource = wasHidden.stateNode, hoistableRoot ? hideInstance(newResource) : unhideInstance(
                            wasHidden.stateNode,
                            wasHidden.memoizedProps
                          );
                        } catch (error) {
                          captureCommitPhaseError(wasHidden, wasHidden.return, error);
                        }
                      }
                    } else if (6 === root.tag) {
                      if (null === current) {
                        wasHidden = root;
                        try {
                          var instance = wasHidden.stateNode;
                          hoistableRoot ? hideTextInstance(instance) : unhideTextInstance(instance, wasHidden.memoizedProps);
                        } catch (error) {
                          captureCommitPhaseError(wasHidden, wasHidden.return, error);
                        }
                      }
                    } else if ((22 !== root.tag && 23 !== root.tag || null === root.memoizedState || root === finishedWork) && null !== root.child) {
                      root.child.return = root;
                      root = root.child;
                      continue;
                    }
                    if (root === finishedWork) break a;
                    for (; null === root.sibling; ) {
                      if (null === root.return || root.return === finishedWork)
                        break a;
                      current === root && (current = null);
                      root = root.return;
                    }
                    current === root && (current = null);
                    root.sibling.return = root.return;
                    root = root.sibling;
                  }
              }
              flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
              break;
            case 19:
              recursivelyTraverseMutationEffects(root, finishedWork);
              commitReconciliationEffects(finishedWork);
              flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
              break;
            case 30:
              break;
            case 21:
              break;
            default:
              recursivelyTraverseMutationEffects(root, finishedWork), commitReconciliationEffects(finishedWork);
          }
        }
        function commitReconciliationEffects(finishedWork) {
          var flags = finishedWork.flags;
          if (flags & 2) {
            try {
              if (supportsMutation) {
                for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
                  if (isHostParent(parentFiber)) {
                    hostParentFiber = parentFiber;
                    break;
                  }
                  parentFiber = parentFiber.return;
                }
                if (null == hostParentFiber) throw Error(formatProdErrorMessage(160));
                switch (hostParentFiber.tag) {
                  case 27:
                    if (supportsSingletons) {
                      var parent = hostParentFiber.stateNode, before = getHostSibling(finishedWork);
                      insertOrAppendPlacementNode(finishedWork, before, parent);
                      break;
                    }
                  case 5:
                    var parent$130 = hostParentFiber.stateNode;
                    hostParentFiber.flags & 32 && (resetTextContent(parent$130), hostParentFiber.flags &= -33);
                    var before$131 = getHostSibling(finishedWork);
                    insertOrAppendPlacementNode(finishedWork, before$131, parent$130);
                    break;
                  case 3:
                  case 4:
                    var parent$132 = hostParentFiber.stateNode.containerInfo, before$133 = getHostSibling(finishedWork);
                    insertOrAppendPlacementNodeIntoContainer(
                      finishedWork,
                      before$133,
                      parent$132
                    );
                    break;
                  default:
                    throw Error(formatProdErrorMessage(161));
                }
              }
            } catch (error) {
              captureCommitPhaseError(finishedWork, finishedWork.return, error);
            }
            finishedWork.flags &= -3;
          }
          flags & 4096 && (finishedWork.flags &= -4097);
        }
        function recursivelyResetForms(parentFiber) {
          if (parentFiber.subtreeFlags & 1024)
            for (parentFiber = parentFiber.child; null !== parentFiber; ) {
              var fiber = parentFiber;
              recursivelyResetForms(fiber);
              5 === fiber.tag && fiber.flags & 1024 && resetFormInstance(fiber.stateNode);
              parentFiber = parentFiber.sibling;
            }
        }
        function recursivelyTraverseLayoutEffects(root, parentFiber) {
          if (parentFiber.subtreeFlags & 8772)
            for (parentFiber = parentFiber.child; null !== parentFiber; )
              commitLayoutEffectOnFiber(root, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
        }
        function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedWork = parentFiber;
            switch (finishedWork.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
                break;
              case 1:
                safelyDetachRef(finishedWork, finishedWork.return);
                var instance = finishedWork.stateNode;
                "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
                  finishedWork,
                  finishedWork.return,
                  instance
                );
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
                break;
              case 27:
                supportsSingletons && releaseSingletonInstance(finishedWork.stateNode);
              case 26:
              case 5:
                safelyDetachRef(finishedWork, finishedWork.return);
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
                break;
              case 22:
                null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
                break;
              case 30:
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
                break;
              default:
                recursivelyTraverseDisappearLayoutEffects(finishedWork);
            }
            parentFiber = parentFiber.sibling;
          }
        }
        function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
          includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 0:
              case 11:
              case 15:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                commitHookEffectListMount(4, finishedWork);
                break;
              case 1:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                current = finishedWork;
                finishedRoot = current.stateNode;
                if ("function" === typeof finishedRoot.componentDidMount)
                  try {
                    finishedRoot.componentDidMount();
                  } catch (error) {
                    captureCommitPhaseError(current, current.return, error);
                  }
                current = finishedWork;
                finishedRoot = current.updateQueue;
                if (null !== finishedRoot) {
                  var instance = current.stateNode;
                  try {
                    var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
                    if (null !== hiddenCallbacks)
                      for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                        callCallback(hiddenCallbacks[finishedRoot], instance);
                  } catch (error) {
                    captureCommitPhaseError(current, current.return, error);
                  }
                }
                includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
                safelyAttachRef(finishedWork, finishedWork.return);
                break;
              case 27:
                supportsSingletons && commitHostSingletonAcquisition(finishedWork);
              case 26:
              case 5:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
                safelyAttachRef(finishedWork, finishedWork.return);
                break;
              case 12:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                break;
              case 13:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
                break;
              case 22:
                null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
                safelyAttachRef(finishedWork, finishedWork.return);
                break;
              case 30:
                break;
              default:
                recursivelyTraverseReappearLayoutEffects(
                  finishedRoot,
                  finishedWork,
                  includeWorkInProgressEffects
                );
            }
            parentFiber = parentFiber.sibling;
          }
        }
        function commitOffscreenPassiveMountEffects(current, finishedWork) {
          var previousCache = null;
          null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
          current = null;
          null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
          current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
        }
        function commitCachePassiveMountEffect(current, finishedWork) {
          current = null;
          null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
          finishedWork = finishedWork.memoizedState.cache;
          finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
        }
        function recursivelyTraversePassiveMountEffects(root, parentFiber, committedLanes, committedTransitions) {
          if (parentFiber.subtreeFlags & 10256)
            for (parentFiber = parentFiber.child; null !== parentFiber; )
              commitPassiveMountOnFiber(
                root,
                parentFiber,
                committedLanes,
                committedTransitions
              ), parentFiber = parentFiber.sibling;
        }
        function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
          var flags = finishedWork.flags;
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              flags & 2048 && commitHookEffectListMount(9, finishedWork);
              break;
            case 1:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              break;
            case 3:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
              break;
            case 12:
              if (flags & 2048) {
                recursivelyTraversePassiveMountEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions
                );
                finishedRoot = finishedWork.stateNode;
                try {
                  var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
                  "function" === typeof onPostCommit && onPostCommit(
                    id,
                    null === finishedWork.alternate ? "mount" : "update",
                    finishedRoot.passiveEffectDuration,
                    -0
                  );
                } catch (error) {
                  captureCommitPhaseError(finishedWork, finishedWork.return, error);
                }
              } else
                recursivelyTraversePassiveMountEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions
                );
              break;
            case 13:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              break;
            case 23:
              break;
            case 22:
              _finishedWork$memoize2 = finishedWork.stateNode;
              id = finishedWork.alternate;
              null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              ) : recursivelyTraverseAtomicPassiveEffects(
                finishedRoot,
                finishedWork
              ) : _finishedWork$memoize2._visibility & 2 ? recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              ) : (_finishedWork$memoize2._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions,
                0 !== (finishedWork.subtreeFlags & 10256)
              ));
              flags & 2048 && commitOffscreenPassiveMountEffects(id, finishedWork);
              break;
            case 24:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
              break;
            default:
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
          }
        }
        function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
          includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 10256);
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 0:
              case 11:
              case 15:
                recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                );
                commitHookEffectListMount(8, finishedWork);
                break;
              case 23:
                break;
              case 22:
                var instance = finishedWork.stateNode;
                null !== finishedWork.memoizedState ? instance._visibility & 2 ? recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                ) : recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                ) : (instance._visibility |= 2, recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                ));
                includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                );
                includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
                break;
              default:
                recursivelyTraverseReconnectPassiveEffects(
                  finishedRoot,
                  finishedWork,
                  committedLanes,
                  committedTransitions,
                  includeWorkInProgressEffects
                );
            }
            parentFiber = parentFiber.sibling;
          }
        }
        function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
          if (parentFiber.subtreeFlags & 10256)
            for (parentFiber = parentFiber.child; null !== parentFiber; ) {
              var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
              switch (finishedWork.tag) {
                case 22:
                  recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                  flags & 2048 && commitOffscreenPassiveMountEffects(
                    finishedWork.alternate,
                    finishedWork
                  );
                  break;
                case 24:
                  recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
                  flags & 2048 && commitCachePassiveMountEffect(
                    finishedWork.alternate,
                    finishedWork
                  );
                  break;
                default:
                  recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
              }
              parentFiber = parentFiber.sibling;
            }
        }
        function recursivelyAccumulateSuspenseyCommit(parentFiber) {
          if (parentFiber.subtreeFlags & suspenseyCommitFlag)
            for (parentFiber = parentFiber.child; null !== parentFiber; )
              accumulateSuspenseyCommitOnFiber(parentFiber), parentFiber = parentFiber.sibling;
        }
        function accumulateSuspenseyCommitOnFiber(fiber) {
          switch (fiber.tag) {
            case 26:
              recursivelyAccumulateSuspenseyCommit(fiber);
              fiber.flags & suspenseyCommitFlag && (null !== fiber.memoizedState ? suspendResource(
                currentHoistableRoot,
                fiber.memoizedState,
                fiber.memoizedProps
              ) : suspendInstance(fiber.type, fiber.memoizedProps));
              break;
            case 5:
              recursivelyAccumulateSuspenseyCommit(fiber);
              fiber.flags & suspenseyCommitFlag && suspendInstance(fiber.type, fiber.memoizedProps);
              break;
            case 3:
            case 4:
              if (supportsResources) {
                var previousHoistableRoot = currentHoistableRoot;
                currentHoistableRoot = getHoistableRoot(
                  fiber.stateNode.containerInfo
                );
                recursivelyAccumulateSuspenseyCommit(fiber);
                currentHoistableRoot = previousHoistableRoot;
              } else recursivelyAccumulateSuspenseyCommit(fiber);
              break;
            case 22:
              null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber));
              break;
            default:
              recursivelyAccumulateSuspenseyCommit(fiber);
          }
        }
        function detachAlternateSiblings(parentFiber) {
          var previousFiber = parentFiber.alternate;
          if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
            previousFiber.child = null;
            do
              previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
            while (null !== parentFiber);
          }
        }
        function recursivelyTraversePassiveUnmountEffects(parentFiber) {
          var deletions = parentFiber.deletions;
          if (0 !== (parentFiber.flags & 16)) {
            if (null !== deletions)
              for (var i = 0; i < deletions.length; i++) {
                var childToDelete = deletions[i];
                nextEffect = childToDelete;
                commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                  childToDelete,
                  parentFiber
                );
              }
            detachAlternateSiblings(parentFiber);
          }
          if (parentFiber.subtreeFlags & 10256)
            for (parentFiber = parentFiber.child; null !== parentFiber; )
              commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
        }
        function commitPassiveUnmountOnFiber(finishedWork) {
          switch (finishedWork.tag) {
            case 0:
            case 11:
            case 15:
              recursivelyTraversePassiveUnmountEffects(finishedWork);
              finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
              break;
            case 3:
              recursivelyTraversePassiveUnmountEffects(finishedWork);
              break;
            case 12:
              recursivelyTraversePassiveUnmountEffects(finishedWork);
              break;
            case 22:
              var instance = finishedWork.stateNode;
              null !== finishedWork.memoizedState && instance._visibility & 2 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
              break;
            default:
              recursivelyTraversePassiveUnmountEffects(finishedWork);
          }
        }
        function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
          var deletions = parentFiber.deletions;
          if (0 !== (parentFiber.flags & 16)) {
            if (null !== deletions)
              for (var i = 0; i < deletions.length; i++) {
                var childToDelete = deletions[i];
                nextEffect = childToDelete;
                commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                  childToDelete,
                  parentFiber
                );
              }
            detachAlternateSiblings(parentFiber);
          }
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            deletions = parentFiber;
            switch (deletions.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectListUnmount(8, deletions, deletions.return);
                recursivelyTraverseDisconnectPassiveEffects(deletions);
                break;
              case 22:
                i = deletions.stateNode;
                i._visibility & 2 && (i._visibility &= -3, recursivelyTraverseDisconnectPassiveEffects(deletions));
                break;
              default:
                recursivelyTraverseDisconnectPassiveEffects(deletions);
            }
            parentFiber = parentFiber.sibling;
          }
        }
        function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
          for (; null !== nextEffect; ) {
            var fiber = nextEffect;
            switch (fiber.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
                break;
              case 23:
              case 22:
                if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
                  var cache = fiber.memoizedState.cachePool.pool;
                  null != cache && cache.refCount++;
                }
                break;
              case 24:
                releaseCache(fiber.memoizedState.cache);
            }
            cache = fiber.child;
            if (null !== cache) cache.return = fiber, nextEffect = cache;
            else
              a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
                cache = nextEffect;
                var sibling = cache.sibling, returnFiber = cache.return;
                detachFiberAfterEffects(cache);
                if (cache === fiber) {
                  nextEffect = null;
                  break a;
                }
                if (null !== sibling) {
                  sibling.return = returnFiber;
                  nextEffect = sibling;
                  break a;
                }
                nextEffect = returnFiber;
              }
          }
        }
        function findFiberRootForHostRoot(hostRoot) {
          var maybeFiber = getInstanceFromNode(hostRoot);
          if (null != maybeFiber) {
            if ("string" !== typeof maybeFiber.memoizedProps["data-testname"])
              throw Error(formatProdErrorMessage(364));
            return maybeFiber;
          }
          hostRoot = findFiberRoot(hostRoot);
          if (null === hostRoot) throw Error(formatProdErrorMessage(362));
          return hostRoot.stateNode.current;
        }
        function matchSelector(fiber$jscomp$0, selector) {
          var tag = fiber$jscomp$0.tag;
          switch (selector.$$typeof) {
            case COMPONENT_TYPE:
              if (fiber$jscomp$0.type === selector.value) return true;
              break;
            case HAS_PSEUDO_CLASS_TYPE:
              a: {
                selector = selector.value;
                fiber$jscomp$0 = [fiber$jscomp$0, 0];
                for (tag = 0; tag < fiber$jscomp$0.length; ) {
                  var fiber = fiber$jscomp$0[tag++], tag$jscomp$0 = fiber.tag, selectorIndex = fiber$jscomp$0[tag++], selector$jscomp$0 = selector[selectorIndex];
                  if (5 !== tag$jscomp$0 && 26 !== tag$jscomp$0 && 27 !== tag$jscomp$0 || !isHiddenSubtree(fiber)) {
                    for (; null != selector$jscomp$0 && matchSelector(fiber, selector$jscomp$0); )
                      selectorIndex++, selector$jscomp$0 = selector[selectorIndex];
                    if (selectorIndex === selector.length) {
                      selector = true;
                      break a;
                    } else
                      for (fiber = fiber.child; null !== fiber; )
                        fiber$jscomp$0.push(fiber, selectorIndex), fiber = fiber.sibling;
                  }
                }
                selector = false;
              }
              return selector;
            case ROLE_TYPE:
              if ((5 === tag || 26 === tag || 27 === tag) && matchAccessibilityRole(fiber$jscomp$0.stateNode, selector.value))
                return true;
              break;
            case TEXT_TYPE:
              if (5 === tag || 6 === tag || 26 === tag || 27 === tag) {
                if (fiber$jscomp$0 = getTextContent(fiber$jscomp$0), null !== fiber$jscomp$0 && 0 <= fiber$jscomp$0.indexOf(selector.value))
                  return true;
              }
              break;
            case TEST_NAME_TYPE:
              if (5 === tag || 26 === tag || 27 === tag) {
                if (fiber$jscomp$0 = fiber$jscomp$0.memoizedProps["data-testname"], "string" === typeof fiber$jscomp$0 && fiber$jscomp$0.toLowerCase() === selector.value.toLowerCase())
                  return true;
              }
              break;
            default:
              throw Error(formatProdErrorMessage(365));
          }
          return false;
        }
        function selectorToString(selector) {
          switch (selector.$$typeof) {
            case COMPONENT_TYPE:
              return "<" + (getComponentNameFromType(selector.value) || "Unknown") + ">";
            case HAS_PSEUDO_CLASS_TYPE:
              return ":has(" + (selectorToString(selector) || "") + ")";
            case ROLE_TYPE:
              return '[role="' + selector.value + '"]';
            case TEXT_TYPE:
              return '"' + selector.value + '"';
            case TEST_NAME_TYPE:
              return '[data-testname="' + selector.value + '"]';
            default:
              throw Error(formatProdErrorMessage(365));
          }
        }
        function findPaths(root, selectors) {
          var matchingFibers = [];
          root = [root, 0];
          for (var index = 0; index < root.length; ) {
            var fiber = root[index++], tag = fiber.tag, selectorIndex = root[index++], selector = selectors[selectorIndex];
            if (5 !== tag && 26 !== tag && 27 !== tag || !isHiddenSubtree(fiber)) {
              for (; null != selector && matchSelector(fiber, selector); )
                selectorIndex++, selector = selectors[selectorIndex];
              if (selectorIndex === selectors.length) matchingFibers.push(fiber);
              else
                for (fiber = fiber.child; null !== fiber; )
                  root.push(fiber, selectorIndex), fiber = fiber.sibling;
            }
          }
          return matchingFibers;
        }
        function findAllNodes(hostRoot, selectors) {
          if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
          hostRoot = findFiberRootForHostRoot(hostRoot);
          hostRoot = findPaths(hostRoot, selectors);
          selectors = [];
          hostRoot = Array.from(hostRoot);
          for (var index = 0; index < hostRoot.length; ) {
            var node = hostRoot[index++], tag = node.tag;
            if (5 === tag || 26 === tag || 27 === tag)
              isHiddenSubtree(node) || selectors.push(node.stateNode);
            else
              for (node = node.child; null !== node; )
                hostRoot.push(node), node = node.sibling;
          }
          return selectors;
        }
        function requestUpdateLane() {
          if (0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes)
            return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
          if (null !== ReactSharedInternals.T) {
            var actionScopeLane = currentEntangledLane;
            return 0 !== actionScopeLane ? actionScopeLane : requestTransitionLane();
          }
          return resolveUpdatePriority();
        }
        function requestDeferredLane() {
          0 === workInProgressDeferredLane && (workInProgressDeferredLane = 0 === (workInProgressRootRenderLanes & 536870912) || isHydrating ? claimNextTransitionLane() : 536870912);
          var suspenseHandler = suspenseHandlerStackCursor.current;
          null !== suspenseHandler && (suspenseHandler.flags |= 32);
          return workInProgressDeferredLane;
        }
        function scheduleUpdateOnFiber(root, fiber, lane) {
          if (root === workInProgressRoot && (2 === workInProgressSuspendedReason || 9 === workInProgressSuspendedReason) || null !== root.cancelPendingCommit)
            prepareFreshStack(root, 0), markRootSuspended(
              root,
              workInProgressRootRenderLanes,
              workInProgressDeferredLane,
              false
            );
          markRootUpdated$1(root, lane);
          if (0 === (executionContext & 2) || root !== workInProgressRoot)
            root === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
              root,
              workInProgressRootRenderLanes,
              workInProgressDeferredLane,
              false
            )), ensureRootIsScheduled(root);
        }
        function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
          if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
          var shouldTimeSlice = !forceSync && 0 === (lanes & 124) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
          do {
            if (0 === exitStatus) {
              workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
              break;
            } else {
              forceSync = root$jscomp$0.current.alternate;
              if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
                exitStatus = renderRootSync(root$jscomp$0, lanes, false);
                renderWasConcurrent = false;
                continue;
              }
              if (2 === exitStatus) {
                renderWasConcurrent = lanes;
                if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
                  var JSCompiler_inline_result = 0;
                else
                  JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
                if (0 !== JSCompiler_inline_result) {
                  lanes = JSCompiler_inline_result;
                  a: {
                    var root = root$jscomp$0;
                    exitStatus = workInProgressRootConcurrentErrors;
                    var wasRootDehydrated = supportsHydration && root.current.memoizedState.isDehydrated;
                    wasRootDehydrated && (prepareFreshStack(root, JSCompiler_inline_result).flags |= 256);
                    JSCompiler_inline_result = renderRootSync(
                      root,
                      JSCompiler_inline_result,
                      false
                    );
                    if (2 !== JSCompiler_inline_result) {
                      if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                        root.errorRecoveryDisabledLanes |= renderWasConcurrent;
                        workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                        exitStatus = 4;
                        break a;
                      }
                      renderWasConcurrent = workInProgressRootRecoverableErrors;
                      workInProgressRootRecoverableErrors = exitStatus;
                      null !== renderWasConcurrent && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = renderWasConcurrent : workInProgressRootRecoverableErrors.push.apply(
                        workInProgressRootRecoverableErrors,
                        renderWasConcurrent
                      ));
                    }
                    exitStatus = JSCompiler_inline_result;
                  }
                  renderWasConcurrent = false;
                  if (2 !== exitStatus) continue;
                }
              }
              if (1 === exitStatus) {
                prepareFreshStack(root$jscomp$0, 0);
                markRootSuspended(root$jscomp$0, lanes, 0, true);
                break;
              }
              a: {
                shouldTimeSlice = root$jscomp$0;
                renderWasConcurrent = exitStatus;
                switch (renderWasConcurrent) {
                  case 0:
                  case 1:
                    throw Error(formatProdErrorMessage(345));
                  case 4:
                    if ((lanes & 4194048) !== lanes) break;
                  case 6:
                    markRootSuspended(
                      shouldTimeSlice,
                      lanes,
                      workInProgressDeferredLane,
                      !workInProgressRootDidSkipSuspendedSiblings
                    );
                    break a;
                  case 2:
                    workInProgressRootRecoverableErrors = null;
                    break;
                  case 3:
                  case 5:
                    break;
                  default:
                    throw Error(formatProdErrorMessage(329));
                }
                if ((lanes & 62914560) === lanes && (exitStatus = globalMostRecentFallbackTime + 300 - now(), 10 < exitStatus)) {
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  if (0 !== getNextLanes(shouldTimeSlice, 0, true)) break a;
                  shouldTimeSlice.timeoutHandle = scheduleTimeout(
                    commitRootWhenReady.bind(
                      null,
                      shouldTimeSlice,
                      forceSync,
                      workInProgressRootRecoverableErrors,
                      workInProgressTransitions,
                      workInProgressRootDidIncludeRecursiveRenderUpdate,
                      lanes,
                      workInProgressDeferredLane,
                      workInProgressRootInterleavedUpdatedLanes,
                      workInProgressSuspendedRetryLanes,
                      workInProgressRootDidSkipSuspendedSiblings,
                      renderWasConcurrent,
                      2,
                      -0,
                      0
                    ),
                    exitStatus
                  );
                  break a;
                }
                commitRootWhenReady(
                  shouldTimeSlice,
                  forceSync,
                  workInProgressRootRecoverableErrors,
                  workInProgressTransitions,
                  workInProgressRootDidIncludeRecursiveRenderUpdate,
                  lanes,
                  workInProgressDeferredLane,
                  workInProgressRootInterleavedUpdatedLanes,
                  workInProgressSuspendedRetryLanes,
                  workInProgressRootDidSkipSuspendedSiblings,
                  renderWasConcurrent,
                  0,
                  -0,
                  0
                );
              }
            }
            break;
          } while (1);
          ensureRootIsScheduled(root$jscomp$0);
        }
        function commitRootWhenReady(root, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
          root.timeoutHandle = noTimeout;
          suspendedCommitReason = finishedWork.subtreeFlags;
          if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
            if (startSuspendingCommit(), accumulateSuspenseyCommitOnFiber(finishedWork), suspendedCommitReason = waitForCommitToBeReady(), null !== suspendedCommitReason) {
              root.cancelPendingCommit = suspendedCommitReason(
                commitRoot.bind(
                  null,
                  root,
                  finishedWork,
                  lanes,
                  recoverableErrors,
                  transitions,
                  didIncludeRenderPhaseUpdate,
                  spawnedLane,
                  updatedLanes,
                  suspendedRetryLanes,
                  exitStatus,
                  1,
                  completedRenderStartTime,
                  completedRenderEndTime
                )
              );
              markRootSuspended(root, lanes, spawnedLane, !didSkipSuspendedSiblings);
              return;
            }
          }
          commitRoot(
            root,
            finishedWork,
            lanes,
            recoverableErrors,
            transitions,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes
          );
        }
        function isRenderConsistentWithExternalStores(finishedWork) {
          for (var node = finishedWork; ; ) {
            var tag = node.tag;
            if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
              for (var i = 0; i < tag.length; i++) {
                var check = tag[i], getSnapshot = check.getSnapshot;
                check = check.value;
                try {
                  if (!objectIs(getSnapshot(), check)) return false;
                } catch (error) {
                  return false;
                }
              }
            tag = node.child;
            if (node.subtreeFlags & 16384 && null !== tag)
              tag.return = node, node = tag;
            else {
              if (node === finishedWork) break;
              for (; null === node.sibling; ) {
                if (null === node.return || node.return === finishedWork) return true;
                node = node.return;
              }
              node.sibling.return = node.return;
              node = node.sibling;
            }
          }
          return true;
        }
        function markRootSuspended(root, suspendedLanes, spawnedLane, didAttemptEntireTree) {
          suspendedLanes &= ~workInProgressRootPingedLanes;
          suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
          root.suspendedLanes |= suspendedLanes;
          root.pingedLanes &= ~suspendedLanes;
          didAttemptEntireTree && (root.warmLanes |= suspendedLanes);
          didAttemptEntireTree = root.expirationTimes;
          for (var lanes = suspendedLanes; 0 < lanes; ) {
            var index$4 = 31 - clz32(lanes), lane = 1 << index$4;
            didAttemptEntireTree[index$4] = -1;
            lanes &= ~lane;
          }
          0 !== spawnedLane && markSpawnedDeferredLane(root, spawnedLane, suspendedLanes);
        }
        function flushSyncWork() {
          return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
        }
        function resetWorkInProgressStack() {
          if (null !== workInProgress) {
            if (0 === workInProgressSuspendedReason)
              var interruptedWork = workInProgress.return;
            else
              interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber$1 = null, resetHooksOnUnwind(interruptedWork), thenableState = null, thenableIndexCounter = 0, interruptedWork = workInProgress;
            for (; null !== interruptedWork; )
              unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
            workInProgress = null;
          }
        }
        function prepareFreshStack(root, lanes) {
          var timeoutHandle = root.timeoutHandle;
          timeoutHandle !== noTimeout && (root.timeoutHandle = noTimeout, cancelTimeout(timeoutHandle));
          timeoutHandle = root.cancelPendingCommit;
          null !== timeoutHandle && (root.cancelPendingCommit = null, timeoutHandle());
          resetWorkInProgressStack();
          workInProgressRoot = root;
          workInProgress = timeoutHandle = createWorkInProgress(root.current, null);
          workInProgressRootRenderLanes = lanes;
          workInProgressSuspendedReason = 0;
          workInProgressThrownValue = null;
          workInProgressRootDidSkipSuspendedSiblings = false;
          workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root, lanes);
          workInProgressRootDidAttachPingListener = false;
          workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
          workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
          workInProgressRootDidIncludeRecursiveRenderUpdate = false;
          0 !== (lanes & 8) && (lanes |= lanes & 32);
          var allEntangledLanes = root.entangledLanes;
          if (0 !== allEntangledLanes)
            for (root = root.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
              var index$2 = 31 - clz32(allEntangledLanes), lane = 1 << index$2;
              lanes |= root[index$2];
              allEntangledLanes &= ~lane;
            }
          entangledRenderLanes = lanes;
          finishQueueingConcurrentUpdates();
          return timeoutHandle;
        }
        function handleThrow(root, thrownValue) {
          currentlyRenderingFiber = null;
          ReactSharedInternals.H = ContextOnlyDispatcher;
          thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
          workInProgressThrownValue = thrownValue;
          null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
            root,
            createCapturedValueAtFiber(thrownValue, root.current)
          ));
        }
        function shouldRemainOnPreviousScreen() {
          var handler = suspenseHandlerStackCursor.current;
          return null === handler ? true : (workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null === shellBoundary ? true : false : (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes || 0 !== (workInProgressRootRenderLanes & 536870912) ? handler === shellBoundary : false;
        }
        function pushDispatcher() {
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = ContextOnlyDispatcher;
          return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
        }
        function pushAsyncDispatcher() {
          var prevAsyncDispatcher = ReactSharedInternals.A;
          ReactSharedInternals.A = DefaultAsyncDispatcher;
          return prevAsyncDispatcher;
        }
        function renderDidSuspendDelayIfPossible() {
          workInProgressRootExitStatus = 4;
          workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
          0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
            workInProgressRoot,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          );
        }
        function renderRootSync(root, lanes, shouldYieldForPrerendering) {
          var prevExecutionContext = executionContext;
          executionContext |= 2;
          var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
          if (workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes)
            workInProgressTransitions = null, prepareFreshStack(root, lanes);
          lanes = false;
          var exitStatus = workInProgressRootExitStatus;
          a: do
            try {
              if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
                var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
                switch (workInProgressSuspendedReason) {
                  case 8:
                    resetWorkInProgressStack();
                    exitStatus = 6;
                    break a;
                  case 3:
                  case 2:
                  case 9:
                  case 6:
                    null === suspenseHandlerStackCursor.current && (lanes = true);
                    var reason = workInProgressSuspendedReason;
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                    if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                      exitStatus = 0;
                      break a;
                    }
                    break;
                  default:
                    reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, reason);
                }
              }
              workLoopSync();
              exitStatus = workInProgressRootExitStatus;
              break;
            } catch (thrownValue$155) {
              handleThrow(root, thrownValue$155);
            }
          while (1);
          lanes && root.shellSuspendCounter++;
          lastContextDependency = currentlyRenderingFiber$1 = null;
          executionContext = prevExecutionContext;
          ReactSharedInternals.H = prevDispatcher;
          ReactSharedInternals.A = prevAsyncDispatcher;
          null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
          return exitStatus;
        }
        function workLoopSync() {
          for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
        }
        function renderRootConcurrent(root, lanes) {
          var prevExecutionContext = executionContext;
          executionContext |= 2;
          var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
          workInProgressRoot !== root || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
            root,
            lanes
          );
          a: do
            try {
              if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
                lanes = workInProgress;
                var thrownValue = workInProgressThrownValue;
                b: switch (workInProgressSuspendedReason) {
                  case 1:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 1);
                    break;
                  case 2:
                  case 9:
                    if (isThenableResolved(thrownValue)) {
                      workInProgressSuspendedReason = 0;
                      workInProgressThrownValue = null;
                      replaySuspendedUnitOfWork(lanes);
                      break;
                    }
                    lanes = function() {
                      2 !== workInProgressSuspendedReason && 9 !== workInProgressSuspendedReason || workInProgressRoot !== root || (workInProgressSuspendedReason = 7);
                      ensureRootIsScheduled(root);
                    };
                    thrownValue.then(lanes, lanes);
                    break a;
                  case 3:
                    workInProgressSuspendedReason = 7;
                    break a;
                  case 4:
                    workInProgressSuspendedReason = 5;
                    break a;
                  case 7:
                    isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root, lanes, thrownValue, 7));
                    break;
                  case 5:
                    var resource = null;
                    switch (workInProgress.tag) {
                      case 26:
                        resource = workInProgress.memoizedState;
                      case 5:
                      case 27:
                        var hostFiber = workInProgress, type = hostFiber.type, props = hostFiber.pendingProps;
                        if (resource ? preloadResource(resource) : preloadInstance(type, props)) {
                          workInProgressSuspendedReason = 0;
                          workInProgressThrownValue = null;
                          var sibling = hostFiber.sibling;
                          if (null !== sibling) workInProgress = sibling;
                          else {
                            var returnFiber = hostFiber.return;
                            null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                          }
                          break b;
                        }
                    }
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 5);
                    break;
                  case 6:
                    workInProgressSuspendedReason = 0;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root, lanes, thrownValue, 6);
                    break;
                  case 8:
                    resetWorkInProgressStack();
                    workInProgressRootExitStatus = 6;
                    break a;
                  default:
                    throw Error(formatProdErrorMessage(462));
                }
              }
              workLoopConcurrentByScheduler();
              break;
            } catch (thrownValue$157) {
              handleThrow(root, thrownValue$157);
            }
          while (1);
          lastContextDependency = currentlyRenderingFiber$1 = null;
          ReactSharedInternals.H = prevDispatcher;
          ReactSharedInternals.A = prevAsyncDispatcher;
          executionContext = prevExecutionContext;
          if (null !== workInProgress) return 0;
          workInProgressRoot = null;
          workInProgressRootRenderLanes = 0;
          finishQueueingConcurrentUpdates();
          return workInProgressRootExitStatus;
        }
        function workLoopConcurrentByScheduler() {
          for (; null !== workInProgress && !shouldYield(); )
            performUnitOfWork(workInProgress);
        }
        function performUnitOfWork(unitOfWork) {
          var next = beginWork(
            unitOfWork.alternate,
            unitOfWork,
            entangledRenderLanes
          );
          unitOfWork.memoizedProps = unitOfWork.pendingProps;
          null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
        }
        function replaySuspendedUnitOfWork(unitOfWork) {
          var next = unitOfWork;
          var current = next.alternate;
          switch (next.tag) {
            case 15:
            case 0:
              next = replayFunctionComponent(
                current,
                next,
                next.pendingProps,
                next.type,
                void 0,
                workInProgressRootRenderLanes
              );
              break;
            case 11:
              next = replayFunctionComponent(
                current,
                next,
                next.pendingProps,
                next.type.render,
                next.ref,
                workInProgressRootRenderLanes
              );
              break;
            case 5:
              resetHooksOnUnwind(next);
            default:
              unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
          }
          unitOfWork.memoizedProps = unitOfWork.pendingProps;
          null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
        }
        function throwAndUnwindWorkLoop(root, unitOfWork, thrownValue, suspendedReason) {
          lastContextDependency = currentlyRenderingFiber$1 = null;
          resetHooksOnUnwind(unitOfWork);
          thenableState = null;
          thenableIndexCounter = 0;
          var returnFiber = unitOfWork.return;
          try {
            if (throwException(
              root,
              returnFiber,
              unitOfWork,
              thrownValue,
              workInProgressRootRenderLanes
            )) {
              workInProgressRootExitStatus = 1;
              logUncaughtError(
                root,
                createCapturedValueAtFiber(thrownValue, root.current)
              );
              workInProgress = null;
              return;
            }
          } catch (error) {
            if (null !== returnFiber) throw workInProgress = returnFiber, error;
            workInProgressRootExitStatus = 1;
            logUncaughtError(
              root,
              createCapturedValueAtFiber(thrownValue, root.current)
            );
            workInProgress = null;
            return;
          }
          if (unitOfWork.flags & 32768) {
            if (isHydrating || 1 === suspendedReason) root = true;
            else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
              root = false;
            else if (workInProgressRootDidSkipSuspendedSiblings = root = true, 2 === suspendedReason || 9 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
              suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
            unwindUnitOfWork(unitOfWork, root);
          } else completeUnitOfWork(unitOfWork);
        }
        function completeUnitOfWork(unitOfWork) {
          var completedWork = unitOfWork;
          do {
            if (0 !== (completedWork.flags & 32768)) {
              unwindUnitOfWork(
                completedWork,
                workInProgressRootDidSkipSuspendedSiblings
              );
              return;
            }
            unitOfWork = completedWork.return;
            var next = completeWork(
              completedWork.alternate,
              completedWork,
              entangledRenderLanes
            );
            if (null !== next) {
              workInProgress = next;
              return;
            }
            completedWork = completedWork.sibling;
            if (null !== completedWork) {
              workInProgress = completedWork;
              return;
            }
            workInProgress = completedWork = unitOfWork;
          } while (null !== completedWork);
          0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
        }
        function unwindUnitOfWork(unitOfWork, skipSiblings) {
          do {
            var next = unwindWork(unitOfWork.alternate, unitOfWork);
            if (null !== next) {
              next.flags &= 32767;
              workInProgress = next;
              return;
            }
            next = unitOfWork.return;
            null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
            if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
              workInProgress = unitOfWork;
              return;
            }
            workInProgress = unitOfWork = next;
          } while (null !== unitOfWork);
          workInProgressRootExitStatus = 6;
          workInProgress = null;
        }
        function commitRoot(root, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
          root.cancelPendingCommit = null;
          do
            flushPendingEffects();
          while (0 !== pendingEffectsStatus);
          if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
          if (null !== finishedWork) {
            if (finishedWork === root.current)
              throw Error(formatProdErrorMessage(177));
            didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
            didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
            markRootFinished(
              root,
              lanes,
              didIncludeRenderPhaseUpdate,
              spawnedLane,
              updatedLanes,
              suspendedRetryLanes
            );
            root === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
            pendingFinishedWork = finishedWork;
            pendingEffectsRoot = root;
            pendingEffectsLanes = lanes;
            pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
            pendingPassiveTransitions = transitions;
            pendingRecoverableErrors = recoverableErrors;
            0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root.callbackNode = null, root.callbackPriority = 0, scheduleCallback(NormalPriority$1, function() {
              flushPassiveEffects();
              return null;
            })) : (root.callbackNode = null, root.callbackPriority = 0);
            recoverableErrors = 0 !== (finishedWork.flags & 13878);
            if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
              recoverableErrors = ReactSharedInternals.T;
              ReactSharedInternals.T = null;
              transitions = getCurrentUpdatePriority();
              setCurrentUpdatePriority(2);
              spawnedLane = executionContext;
              executionContext |= 4;
              try {
                commitBeforeMutationEffects(root, finishedWork, lanes);
              } finally {
                executionContext = spawnedLane, setCurrentUpdatePriority(transitions), ReactSharedInternals.T = recoverableErrors;
              }
            }
            pendingEffectsStatus = 1;
            flushMutationEffects();
            flushLayoutEffects();
            flushSpawnedWork();
          }
        }
        function flushMutationEffects() {
          if (1 === pendingEffectsStatus) {
            pendingEffectsStatus = 0;
            var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
            if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
              rootMutationHasEffect = ReactSharedInternals.T;
              ReactSharedInternals.T = null;
              var previousPriority = getCurrentUpdatePriority();
              setCurrentUpdatePriority(2);
              var prevExecutionContext = executionContext;
              executionContext |= 4;
              try {
                commitMutationEffectsOnFiber(finishedWork, root), resetAfterCommit(root.containerInfo);
              } finally {
                executionContext = prevExecutionContext, setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = rootMutationHasEffect;
              }
            }
            root.current = finishedWork;
            pendingEffectsStatus = 2;
          }
        }
        function flushLayoutEffects() {
          if (2 === pendingEffectsStatus) {
            pendingEffectsStatus = 0;
            var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
            if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
              rootHasLayoutEffect = ReactSharedInternals.T;
              ReactSharedInternals.T = null;
              var previousPriority = getCurrentUpdatePriority();
              setCurrentUpdatePriority(2);
              var prevExecutionContext = executionContext;
              executionContext |= 4;
              try {
                commitLayoutEffectOnFiber(root, finishedWork.alternate, finishedWork);
              } finally {
                executionContext = prevExecutionContext, setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = rootHasLayoutEffect;
              }
            }
            pendingEffectsStatus = 3;
          }
        }
        function flushSpawnedWork() {
          if (4 === pendingEffectsStatus || 3 === pendingEffectsStatus) {
            pendingEffectsStatus = 0;
            requestPaint();
            var root = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors;
            0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? pendingEffectsStatus = 5 : (pendingEffectsStatus = 0, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root, root.pendingLanes));
            var remainingLanes = root.pendingLanes;
            0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
            lanesToEventPriority(lanes);
            finishedWork = finishedWork.stateNode;
            if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
              try {
                injectedHook.onCommitFiberRoot(
                  rendererID,
                  finishedWork,
                  void 0,
                  128 === (finishedWork.current.flags & 128)
                );
              } catch (err) {
              }
            if (null !== recoverableErrors) {
              finishedWork = ReactSharedInternals.T;
              remainingLanes = getCurrentUpdatePriority();
              setCurrentUpdatePriority(2);
              ReactSharedInternals.T = null;
              try {
                for (var onRecoverableError = root.onRecoverableError, i = 0; i < recoverableErrors.length; i++) {
                  var recoverableError = recoverableErrors[i];
                  onRecoverableError(recoverableError.value, {
                    componentStack: recoverableError.stack
                  });
                }
              } finally {
                ReactSharedInternals.T = finishedWork, setCurrentUpdatePriority(remainingLanes);
              }
            }
            0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
            ensureRootIsScheduled(root);
            remainingLanes = root.pendingLanes;
            0 !== (lanes & 4194090) && 0 !== (remainingLanes & 42) ? root === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root) : nestedUpdateCount = 0;
            flushSyncWorkAcrossRoots_impl(0);
          }
        }
        function releaseRootPooledCache(root, remainingLanes) {
          0 === (root.pooledCacheLanes &= remainingLanes) && (remainingLanes = root.pooledCache, null != remainingLanes && (root.pooledCache = null, releaseCache(remainingLanes)));
        }
        function flushPendingEffects(wasDelayedCommit) {
          flushMutationEffects();
          flushLayoutEffects();
          flushSpawnedWork();
          return flushPassiveEffects();
        }
        function flushPassiveEffects() {
          if (5 !== pendingEffectsStatus) return false;
          var root = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
          pendingEffectsRemainingLanes = 0;
          var renderPriority = lanesToEventPriority(pendingEffectsLanes), priority = 32 > renderPriority ? 32 : renderPriority;
          renderPriority = ReactSharedInternals.T;
          var previousPriority = getCurrentUpdatePriority();
          try {
            setCurrentUpdatePriority(priority);
            ReactSharedInternals.T = null;
            priority = pendingPassiveTransitions;
            pendingPassiveTransitions = null;
            var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
            pendingEffectsStatus = 0;
            pendingFinishedWork = pendingEffectsRoot = null;
            pendingEffectsLanes = 0;
            if (0 !== (executionContext & 6))
              throw Error(formatProdErrorMessage(331));
            var prevExecutionContext = executionContext;
            executionContext |= 4;
            commitPassiveUnmountOnFiber(root$jscomp$0.current);
            commitPassiveMountOnFiber(
              root$jscomp$0,
              root$jscomp$0.current,
              lanes,
              priority
            );
            executionContext = prevExecutionContext;
            flushSyncWorkAcrossRoots_impl(0, false);
            if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
              try {
                injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
              } catch (err) {
              }
            return true;
          } finally {
            setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = renderPriority, releaseRootPooledCache(root, remainingLanes);
          }
        }
        function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
          sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
          sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
          rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
          null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
        }
        function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
          if (3 === sourceFiber.tag)
            captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
          else
            for (; null !== nearestMountedAncestor; ) {
              if (3 === nearestMountedAncestor.tag) {
                captureCommitPhaseErrorOnRoot(
                  nearestMountedAncestor,
                  sourceFiber,
                  error
                );
                break;
              } else if (1 === nearestMountedAncestor.tag) {
                var instance = nearestMountedAncestor.stateNode;
                if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                  sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
                  error = createClassErrorUpdate(2);
                  instance = enqueueUpdate(nearestMountedAncestor, error, 2);
                  null !== instance && (initializeClassErrorUpdate(
                    error,
                    instance,
                    nearestMountedAncestor,
                    sourceFiber
                  ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                  break;
                }
              }
              nearestMountedAncestor = nearestMountedAncestor.return;
            }
        }
        function attachPingListener(root, wakeable, lanes) {
          var pingCache = root.pingCache;
          if (null === pingCache) {
            pingCache = root.pingCache = new PossiblyWeakMap();
            var threadIDs = /* @__PURE__ */ new Set();
            pingCache.set(wakeable, threadIDs);
          } else
            threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
          threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root = pingSuspendedRoot.bind(null, root, wakeable, lanes), wakeable.then(root, root));
        }
        function pingSuspendedRoot(root, wakeable, pingedLanes) {
          var pingCache = root.pingCache;
          null !== pingCache && pingCache.delete(wakeable);
          root.pingedLanes |= root.suspendedLanes & pingedLanes;
          root.warmLanes &= ~pingedLanes;
          workInProgressRoot === root && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
          ensureRootIsScheduled(root);
        }
        function retryTimedOutBoundary(boundaryFiber, retryLane) {
          0 === retryLane && (retryLane = claimNextRetryLane());
          boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
          null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
        }
        function retryDehydratedSuspenseBoundary(boundaryFiber) {
          var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
          null !== suspenseState && (retryLane = suspenseState.retryLane);
          retryTimedOutBoundary(boundaryFiber, retryLane);
        }
        function resolveRetryWakeable(boundaryFiber, wakeable) {
          var retryLane = 0;
          switch (boundaryFiber.tag) {
            case 13:
              var retryCache = boundaryFiber.stateNode;
              var suspenseState = boundaryFiber.memoizedState;
              null !== suspenseState && (retryLane = suspenseState.retryLane);
              break;
            case 19:
              retryCache = boundaryFiber.stateNode;
              break;
            case 22:
              retryCache = boundaryFiber.stateNode._retryCache;
              break;
            default:
              throw Error(formatProdErrorMessage(314));
          }
          null !== retryCache && retryCache.delete(wakeable);
          retryTimedOutBoundary(boundaryFiber, retryLane);
        }
        function scheduleCallback(priorityLevel, callback) {
          return scheduleCallback$3(priorityLevel, callback);
        }
        function FiberNode(tag, pendingProps, key, mode) {
          this.tag = tag;
          this.key = key;
          this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
          this.index = 0;
          this.refCleanup = this.ref = null;
          this.pendingProps = pendingProps;
          this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
          this.mode = mode;
          this.subtreeFlags = this.flags = 0;
          this.deletions = null;
          this.childLanes = this.lanes = 0;
          this.alternate = null;
        }
        function shouldConstruct(Component) {
          Component = Component.prototype;
          return !(!Component || !Component.isReactComponent);
        }
        function createWorkInProgress(current, pendingProps) {
          var workInProgress2 = current.alternate;
          null === workInProgress2 ? (workInProgress2 = createFiber(
            current.tag,
            pendingProps,
            current.key,
            current.mode
          ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
          workInProgress2.flags = current.flags & 65011712;
          workInProgress2.childLanes = current.childLanes;
          workInProgress2.lanes = current.lanes;
          workInProgress2.child = current.child;
          workInProgress2.memoizedProps = current.memoizedProps;
          workInProgress2.memoizedState = current.memoizedState;
          workInProgress2.updateQueue = current.updateQueue;
          pendingProps = current.dependencies;
          workInProgress2.dependencies = null === pendingProps ? null : {
            lanes: pendingProps.lanes,
            firstContext: pendingProps.firstContext
          };
          workInProgress2.sibling = current.sibling;
          workInProgress2.index = current.index;
          workInProgress2.ref = current.ref;
          workInProgress2.refCleanup = current.refCleanup;
          return workInProgress2;
        }
        function resetWorkInProgress(workInProgress2, renderLanes2) {
          workInProgress2.flags &= 65011714;
          var current = workInProgress2.alternate;
          null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
            lanes: renderLanes2.lanes,
            firstContext: renderLanes2.firstContext
          });
          return workInProgress2;
        }
        function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
          var fiberTag = 0;
          owner = type;
          if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
          else if ("string" === typeof type)
            fiberTag = supportsResources && supportsSingletons ? isHostHoistableType(type, pendingProps, contextStackCursor.current) ? 26 : isHostSingletonType(type) ? 27 : 5 : supportsResources ? isHostHoistableType(
              type,
              pendingProps,
              contextStackCursor.current
            ) ? 26 : 5 : supportsSingletons ? isHostSingletonType(type) ? 27 : 5 : 5;
          else
            a: switch (type) {
              case REACT_ACTIVITY_TYPE:
                return type = createFiber(31, pendingProps, key, mode), type.elementType = REACT_ACTIVITY_TYPE, type.lanes = lanes, type;
              case REACT_FRAGMENT_TYPE:
                return createFiberFromFragment(
                  pendingProps.children,
                  mode,
                  lanes,
                  key
                );
              case REACT_STRICT_MODE_TYPE:
                fiberTag = 8;
                mode |= 24;
                break;
              case REACT_PROFILER_TYPE:
                return type = createFiber(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
              case REACT_SUSPENSE_TYPE:
                return type = createFiber(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
              case REACT_SUSPENSE_LIST_TYPE:
                return type = createFiber(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
              default:
                if ("object" === typeof type && null !== type)
                  switch (type.$$typeof) {
                    case REACT_PROVIDER_TYPE:
                    case REACT_CONTEXT_TYPE:
                      fiberTag = 10;
                      break a;
                    case REACT_CONSUMER_TYPE:
                      fiberTag = 9;
                      break a;
                    case REACT_FORWARD_REF_TYPE:
                      fiberTag = 11;
                      break a;
                    case REACT_MEMO_TYPE:
                      fiberTag = 14;
                      break a;
                    case REACT_LAZY_TYPE:
                      fiberTag = 16;
                      owner = null;
                      break a;
                  }
                fiberTag = 29;
                pendingProps = Error(
                  formatProdErrorMessage(
                    130,
                    null === type ? "null" : typeof type,
                    ""
                  )
                );
                owner = null;
            }
          key = createFiber(fiberTag, pendingProps, key, mode);
          key.elementType = type;
          key.type = owner;
          key.lanes = lanes;
          return key;
        }
        function createFiberFromFragment(elements, mode, lanes, key) {
          elements = createFiber(7, elements, key, mode);
          elements.lanes = lanes;
          return elements;
        }
        function createFiberFromText(content, mode, lanes) {
          content = createFiber(6, content, null, mode);
          content.lanes = lanes;
          return content;
        }
        function createFiberFromPortal(portal, mode, lanes) {
          mode = createFiber(
            4,
            null !== portal.children ? portal.children : [],
            portal.key,
            mode
          );
          mode.lanes = lanes;
          mode.stateNode = {
            containerInfo: portal.containerInfo,
            pendingChildren: null,
            implementation: portal.implementation
          };
          return mode;
        }
        function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, formState) {
          this.tag = 1;
          this.containerInfo = containerInfo;
          this.pingCache = this.current = this.pendingChildren = null;
          this.timeoutHandle = noTimeout;
          this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
          this.callbackPriority = 0;
          this.expirationTimes = createLaneMap(-1);
          this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
          this.entanglements = createLaneMap(0);
          this.hiddenUpdates = createLaneMap(null);
          this.identifierPrefix = identifierPrefix;
          this.onUncaughtError = onUncaughtError;
          this.onCaughtError = onCaughtError;
          this.onRecoverableError = onRecoverableError;
          this.pooledCache = null;
          this.pooledCacheLanes = 0;
          this.formState = formState;
          this.incompleteTransitions = /* @__PURE__ */ new Map();
        }
        function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks, formState) {
          containerInfo = new FiberRootNode(
            containerInfo,
            tag,
            hydrate,
            identifierPrefix,
            onUncaughtError,
            onCaughtError,
            onRecoverableError,
            formState
          );
          tag = 1;
          true === isStrictMode && (tag |= 24);
          isStrictMode = createFiber(3, null, null, tag);
          containerInfo.current = isStrictMode;
          isStrictMode.stateNode = containerInfo;
          tag = createCache();
          tag.refCount++;
          containerInfo.pooledCache = tag;
          tag.refCount++;
          isStrictMode.memoizedState = {
            element: initialChildren,
            isDehydrated: hydrate,
            cache: tag
          };
          initializeUpdateQueue(isStrictMode);
          return containerInfo;
        }
        function getContextForSubtree(parentComponent) {
          if (!parentComponent) return emptyContextObject;
          parentComponent = emptyContextObject;
          return parentComponent;
        }
        function findHostInstance(component) {
          var fiber = component._reactInternals;
          if (void 0 === fiber) {
            if ("function" === typeof component.render)
              throw Error(formatProdErrorMessage(188));
            component = Object.keys(component).join(",");
            throw Error(formatProdErrorMessage(268, component));
          }
          component = findCurrentFiberUsingSlowPath(fiber);
          component = null !== component ? findCurrentHostFiberImpl(component) : null;
          return null === component ? null : getPublicInstance(component.stateNode);
        }
        function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
          parentComponent = getContextForSubtree(parentComponent);
          null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
          container = createUpdate(lane);
          container.payload = { element };
          callback = void 0 === callback ? null : callback;
          null !== callback && (container.callback = callback);
          element = enqueueUpdate(rootFiber, container, lane);
          null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
        }
        function markRetryLaneImpl(fiber, retryLane) {
          fiber = fiber.memoizedState;
          if (null !== fiber && null !== fiber.dehydrated) {
            var a = fiber.retryLane;
            fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
          }
        }
        function markRetryLaneIfNotHydrated(fiber, retryLane) {
          markRetryLaneImpl(fiber, retryLane);
          (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
        }
        var exports$1 = {};
        var React = requireReact(), Scheduler = requireScheduler(), assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.element"), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = /* @__PURE__ */ Symbol.for("react.provider"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
        var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
        var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), isArrayImpl = Array.isArray, ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, rendererVersion = $$$config.rendererVersion, rendererPackageName = $$$config.rendererPackageName, extraDevToolsConfig = $$$config.extraDevToolsConfig, getPublicInstance = $$$config.getPublicInstance, getRootHostContext = $$$config.getRootHostContext, getChildHostContext = $$$config.getChildHostContext, prepareForCommit = $$$config.prepareForCommit, resetAfterCommit = $$$config.resetAfterCommit, createInstance = $$$config.createInstance;
        $$$config.cloneMutableInstance;
        var appendInitialChild = $$$config.appendInitialChild, finalizeInitialChildren = $$$config.finalizeInitialChildren, shouldSetTextContent = $$$config.shouldSetTextContent, createTextInstance = $$$config.createTextInstance;
        $$$config.cloneMutableTextInstance;
        var scheduleTimeout = $$$config.scheduleTimeout, cancelTimeout = $$$config.cancelTimeout, noTimeout = $$$config.noTimeout, isPrimaryRenderer = $$$config.isPrimaryRenderer;
        $$$config.warnsIfNotActing;
        var supportsMutation = $$$config.supportsMutation, supportsPersistence = $$$config.supportsPersistence, supportsHydration = $$$config.supportsHydration, getInstanceFromNode = $$$config.getInstanceFromNode;
        $$$config.beforeActiveInstanceBlur;
        var preparePortalMount = $$$config.preparePortalMount;
        $$$config.prepareScopeUpdate;
        $$$config.getInstanceFromScope;
        var setCurrentUpdatePriority = $$$config.setCurrentUpdatePriority, getCurrentUpdatePriority = $$$config.getCurrentUpdatePriority, resolveUpdatePriority = $$$config.resolveUpdatePriority;
        $$$config.trackSchedulerEvent;
        $$$config.resolveEventType;
        $$$config.resolveEventTimeStamp;
        var shouldAttemptEagerTransition = $$$config.shouldAttemptEagerTransition, detachDeletedInstance = $$$config.detachDeletedInstance;
        $$$config.requestPostPaintCallback;
        var maySuspendCommit = $$$config.maySuspendCommit, preloadInstance = $$$config.preloadInstance, startSuspendingCommit = $$$config.startSuspendingCommit, suspendInstance = $$$config.suspendInstance;
        $$$config.suspendOnActiveViewTransition;
        var waitForCommitToBeReady = $$$config.waitForCommitToBeReady, NotPendingTransition = $$$config.NotPendingTransition, HostTransitionContext2 = $$$config.HostTransitionContext, resetFormInstance = $$$config.resetFormInstance;
        $$$config.bindToConsole;
        var supportsMicrotasks = $$$config.supportsMicrotasks, scheduleMicrotask = $$$config.scheduleMicrotask, supportsTestSelectors = $$$config.supportsTestSelectors, findFiberRoot = $$$config.findFiberRoot, getBoundingRect = $$$config.getBoundingRect, getTextContent = $$$config.getTextContent, isHiddenSubtree = $$$config.isHiddenSubtree, matchAccessibilityRole = $$$config.matchAccessibilityRole, setFocusIfFocusable = $$$config.setFocusIfFocusable, setupIntersectionObserver = $$$config.setupIntersectionObserver, appendChild = $$$config.appendChild, appendChildToContainer = $$$config.appendChildToContainer, commitTextUpdate = $$$config.commitTextUpdate, commitMount = $$$config.commitMount, commitUpdate = $$$config.commitUpdate, insertBefore = $$$config.insertBefore, insertInContainerBefore = $$$config.insertInContainerBefore, removeChild = $$$config.removeChild, removeChildFromContainer = $$$config.removeChildFromContainer, resetTextContent = $$$config.resetTextContent, hideInstance = $$$config.hideInstance, hideTextInstance = $$$config.hideTextInstance, unhideInstance = $$$config.unhideInstance, unhideTextInstance = $$$config.unhideTextInstance;
        $$$config.cancelViewTransitionName;
        $$$config.cancelRootViewTransitionName;
        $$$config.restoreRootViewTransitionName;
        $$$config.cloneRootViewTransitionContainer;
        $$$config.removeRootViewTransitionClone;
        $$$config.measureClonedInstance;
        $$$config.hasInstanceChanged;
        $$$config.hasInstanceAffectedParent;
        $$$config.startViewTransition;
        $$$config.startGestureTransition;
        $$$config.stopGestureTransition;
        $$$config.getCurrentGestureOffset;
        $$$config.subscribeToGestureDirection;
        $$$config.createViewTransitionInstance;
        var clearContainer = $$$config.clearContainer;
        $$$config.createFragmentInstance;
        $$$config.updateFragmentInstanceFiber;
        $$$config.commitNewChildToFragmentInstance;
        $$$config.deleteChildFromFragmentInstance;
        var cloneInstance = $$$config.cloneInstance, createContainerChildSet = $$$config.createContainerChildSet, appendChildToContainerChildSet = $$$config.appendChildToContainerChildSet, finalizeContainerChildren = $$$config.finalizeContainerChildren, replaceContainerChildren = $$$config.replaceContainerChildren, cloneHiddenInstance = $$$config.cloneHiddenInstance, cloneHiddenTextInstance = $$$config.cloneHiddenTextInstance, isSuspenseInstancePending = $$$config.isSuspenseInstancePending, isSuspenseInstanceFallback = $$$config.isSuspenseInstanceFallback, getSuspenseInstanceFallbackErrorDetails = $$$config.getSuspenseInstanceFallbackErrorDetails, registerSuspenseInstanceRetry = $$$config.registerSuspenseInstanceRetry, canHydrateFormStateMarker = $$$config.canHydrateFormStateMarker, isFormStateMarkerMatching = $$$config.isFormStateMarkerMatching, getNextHydratableSibling = $$$config.getNextHydratableSibling, getNextHydratableSiblingAfterSingleton = $$$config.getNextHydratableSiblingAfterSingleton, getFirstHydratableChild = $$$config.getFirstHydratableChild, getFirstHydratableChildWithinContainer = $$$config.getFirstHydratableChildWithinContainer, getFirstHydratableChildWithinSuspenseInstance = $$$config.getFirstHydratableChildWithinSuspenseInstance, getFirstHydratableChildWithinSingleton = $$$config.getFirstHydratableChildWithinSingleton, canHydrateInstance = $$$config.canHydrateInstance, canHydrateTextInstance = $$$config.canHydrateTextInstance, canHydrateSuspenseInstance = $$$config.canHydrateSuspenseInstance, hydrateInstance = $$$config.hydrateInstance, hydrateTextInstance = $$$config.hydrateTextInstance, hydrateSuspenseInstance = $$$config.hydrateSuspenseInstance, getNextHydratableInstanceAfterSuspenseInstance = $$$config.getNextHydratableInstanceAfterSuspenseInstance, commitHydratedContainer = $$$config.commitHydratedContainer, commitHydratedSuspenseInstance = $$$config.commitHydratedSuspenseInstance, clearSuspenseBoundary = $$$config.clearSuspenseBoundary, clearSuspenseBoundaryFromContainer = $$$config.clearSuspenseBoundaryFromContainer, shouldDeleteUnhydratedTailInstances = $$$config.shouldDeleteUnhydratedTailInstances;
        $$$config.diffHydratedPropsForDevWarnings;
        $$$config.diffHydratedTextForDevWarnings;
        $$$config.describeHydratableInstanceForDevWarnings;
        var validateHydratableInstance = $$$config.validateHydratableInstance, validateHydratableTextInstance = $$$config.validateHydratableTextInstance, supportsResources = $$$config.supportsResources, isHostHoistableType = $$$config.isHostHoistableType, getHoistableRoot = $$$config.getHoistableRoot, getResource = $$$config.getResource, acquireResource = $$$config.acquireResource, releaseResource = $$$config.releaseResource, hydrateHoistable = $$$config.hydrateHoistable, mountHoistable = $$$config.mountHoistable, unmountHoistable = $$$config.unmountHoistable, createHoistableInstance = $$$config.createHoistableInstance, prepareToCommitHoistables = $$$config.prepareToCommitHoistables, mayResourceSuspendCommit = $$$config.mayResourceSuspendCommit, preloadResource = $$$config.preloadResource, suspendResource = $$$config.suspendResource, supportsSingletons = $$$config.supportsSingletons, resolveSingletonInstance = $$$config.resolveSingletonInstance, acquireSingletonInstance = $$$config.acquireSingletonInstance, releaseSingletonInstance = $$$config.releaseSingletonInstance, isHostSingletonType = $$$config.isHostSingletonType, isSingletonScope = $$$config.isSingletonScope, valueStack = [], index$jscomp$0 = -1, emptyContextObject = {}, clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log$1 = Math.log, LN2 = Math.LN2, nextTransitionLane = 256, nextRetryLane = 4194304, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, IdlePriority = Scheduler.unstable_IdlePriority, log = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null, prefix, suffix, reentry = false, CapturedStacks = /* @__PURE__ */ new WeakMap(), forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "", contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null), hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519)), objectIs = "function" === typeof Object.is ? Object.is : is, valueCursor = createCursor(null), currentlyRenderingFiber$1 = null, lastContextDependency = null, AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
          var listeners = [], signal = this.signal = {
            aborted: false,
            addEventListener: function(type, listener) {
              listeners.push(listener);
            }
          };
          this.abort = function() {
            signal.aborted = true;
            listeners.forEach(function(listener) {
              return listener();
            });
          };
        }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
          $$typeof: REACT_CONTEXT_TYPE,
          Consumer: null,
          Provider: null,
          _currentValue: null,
          _currentValue2: null,
          _threadCount: 0
        }, firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0, currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null, prevOnStartTransitionFinish = ReactSharedInternals.S;
        ReactSharedInternals.S = function(transition, returnValue) {
          "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
          null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
        };
        var resumedCache = createCursor(null), hasOwnProperty = Object.prototype.hasOwnProperty, SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), SuspenseActionException = Error(formatProdErrorMessage(542)), noopSuspenseyCommitThenable = { then: function() {
        } }, suspendedThenable = null, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0, hasForceUpdate = false, didReadFromEntangledAsyncAction = false, currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0), renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter$1 = 0, thenableState$1 = null, globalClientIdCounter = 0, ContextOnlyDispatcher = {
          readContext,
          use,
          useCallback: throwInvalidHookError,
          useContext: throwInvalidHookError,
          useEffect: throwInvalidHookError,
          useImperativeHandle: throwInvalidHookError,
          useLayoutEffect: throwInvalidHookError,
          useInsertionEffect: throwInvalidHookError,
          useMemo: throwInvalidHookError,
          useReducer: throwInvalidHookError,
          useRef: throwInvalidHookError,
          useState: throwInvalidHookError,
          useDebugValue: throwInvalidHookError,
          useDeferredValue: throwInvalidHookError,
          useTransition: throwInvalidHookError,
          useSyncExternalStore: throwInvalidHookError,
          useId: throwInvalidHookError,
          useHostTransitionStatus: throwInvalidHookError,
          useFormState: throwInvalidHookError,
          useActionState: throwInvalidHookError,
          useOptimistic: throwInvalidHookError,
          useMemoCache: throwInvalidHookError,
          useCacheRefresh: throwInvalidHookError
        }, HooksDispatcherOnMount = {
          readContext,
          use,
          useCallback: function(callback, deps) {
            mountWorkInProgressHook().memoizedState = [
              callback,
              void 0 === deps ? null : deps
            ];
            return callback;
          },
          useContext: readContext,
          useEffect: mountEffect,
          useImperativeHandle: function(ref, create, deps) {
            deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
            mountEffectImpl(
              4194308,
              4,
              imperativeHandleEffect.bind(null, create, ref),
              deps
            );
          },
          useLayoutEffect: function(create, deps) {
            return mountEffectImpl(4194308, 4, create, deps);
          },
          useInsertionEffect: function(create, deps) {
            mountEffectImpl(4, 2, create, deps);
          },
          useMemo: function(nextCreate, deps) {
            var hook = mountWorkInProgressHook();
            deps = void 0 === deps ? null : deps;
            var nextValue = nextCreate();
            if (shouldDoubleInvokeUserFnsInHooksDEV) {
              setIsStrictModeForDevtools(true);
              try {
                nextCreate();
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
            hook.memoizedState = [nextValue, deps];
            return nextValue;
          },
          useReducer: function(reducer, initialArg, init) {
            var hook = mountWorkInProgressHook();
            if (void 0 !== init) {
              var initialState = init(initialArg);
              if (shouldDoubleInvokeUserFnsInHooksDEV) {
                setIsStrictModeForDevtools(true);
                try {
                  init(initialArg);
                } finally {
                  setIsStrictModeForDevtools(false);
                }
              }
            } else initialState = initialArg;
            hook.memoizedState = hook.baseState = initialState;
            reducer = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: reducer,
              lastRenderedState: initialState
            };
            hook.queue = reducer;
            reducer = reducer.dispatch = dispatchReducerAction.bind(
              null,
              currentlyRenderingFiber,
              reducer
            );
            return [hook.memoizedState, reducer];
          },
          useRef: function(initialValue) {
            var hook = mountWorkInProgressHook();
            initialValue = { current: initialValue };
            return hook.memoizedState = initialValue;
          },
          useState: function(initialState) {
            initialState = mountStateImpl(initialState);
            var queue = initialState.queue, dispatch = dispatchSetState.bind(
              null,
              currentlyRenderingFiber,
              queue
            );
            queue.dispatch = dispatch;
            return [initialState.memoizedState, dispatch];
          },
          useDebugValue: mountDebugValue,
          useDeferredValue: function(value, initialValue) {
            var hook = mountWorkInProgressHook();
            return mountDeferredValueImpl(hook, value, initialValue);
          },
          useTransition: function() {
            var stateHook = mountStateImpl(false);
            stateHook = startTransition.bind(
              null,
              currentlyRenderingFiber,
              stateHook.queue,
              true,
              false
            );
            mountWorkInProgressHook().memoizedState = stateHook;
            return [false, stateHook];
          },
          useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
            var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
            if (isHydrating) {
              if (void 0 === getServerSnapshot)
                throw Error(formatProdErrorMessage(407));
              getServerSnapshot = getServerSnapshot();
            } else {
              getServerSnapshot = getSnapshot();
              if (null === workInProgressRoot)
                throw Error(formatProdErrorMessage(349));
              0 !== (workInProgressRootRenderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
            }
            hook.memoizedState = getServerSnapshot;
            var inst = { value: getServerSnapshot, getSnapshot };
            hook.queue = inst;
            mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
              subscribe
            ]);
            fiber.flags |= 2048;
            pushSimpleEffect(
              9,
              createEffectInstance(),
              updateStoreInstance.bind(
                null,
                fiber,
                inst,
                getServerSnapshot,
                getSnapshot
              ),
              null
            );
            return getServerSnapshot;
          },
          useId: function() {
            var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
            if (isHydrating) {
              var JSCompiler_inline_result = treeContextOverflow;
              var idWithLeadingBit = treeContextId;
              JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
              identifierPrefix = "«" + identifierPrefix + "R" + JSCompiler_inline_result;
              JSCompiler_inline_result = localIdCounter++;
              0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
              identifierPrefix += "»";
            } else
              JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = "«" + identifierPrefix + "r" + JSCompiler_inline_result.toString(32) + "»";
            return hook.memoizedState = identifierPrefix;
          },
          useHostTransitionStatus,
          useFormState: mountActionState,
          useActionState: mountActionState,
          useOptimistic: function(passthrough) {
            var hook = mountWorkInProgressHook();
            hook.memoizedState = hook.baseState = passthrough;
            var queue = {
              pending: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: null,
              lastRenderedState: null
            };
            hook.queue = queue;
            hook = dispatchOptimisticSetState.bind(
              null,
              currentlyRenderingFiber,
              true,
              queue
            );
            queue.dispatch = hook;
            return [passthrough, hook];
          },
          useMemoCache,
          useCacheRefresh: function() {
            return mountWorkInProgressHook().memoizedState = refreshCache.bind(
              null,
              currentlyRenderingFiber
            );
          }
        }, HooksDispatcherOnUpdate = {
          readContext,
          use,
          useCallback: updateCallback,
          useContext: readContext,
          useEffect: updateEffect,
          useImperativeHandle: updateImperativeHandle,
          useInsertionEffect: updateInsertionEffect,
          useLayoutEffect: updateLayoutEffect,
          useMemo: updateMemo,
          useReducer: updateReducer,
          useRef: updateRef,
          useState: function() {
            return updateReducer(basicStateReducer);
          },
          useDebugValue: mountDebugValue,
          useDeferredValue: function(value, initialValue) {
            var hook = updateWorkInProgressHook();
            return updateDeferredValueImpl(
              hook,
              currentHook.memoizedState,
              value,
              initialValue
            );
          },
          useTransition: function() {
            var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
            return [
              "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
              start
            ];
          },
          useSyncExternalStore: updateSyncExternalStore,
          useId: updateId,
          useHostTransitionStatus,
          useFormState: updateActionState,
          useActionState: updateActionState,
          useOptimistic: function(passthrough, reducer) {
            var hook = updateWorkInProgressHook();
            return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
          },
          useMemoCache,
          useCacheRefresh: updateRefresh
        }, HooksDispatcherOnRerender = {
          readContext,
          use,
          useCallback: updateCallback,
          useContext: readContext,
          useEffect: updateEffect,
          useImperativeHandle: updateImperativeHandle,
          useInsertionEffect: updateInsertionEffect,
          useLayoutEffect: updateLayoutEffect,
          useMemo: updateMemo,
          useReducer: rerenderReducer,
          useRef: updateRef,
          useState: function() {
            return rerenderReducer(basicStateReducer);
          },
          useDebugValue: mountDebugValue,
          useDeferredValue: function(value, initialValue) {
            var hook = updateWorkInProgressHook();
            return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
              hook,
              currentHook.memoizedState,
              value,
              initialValue
            );
          },
          useTransition: function() {
            var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
            return [
              "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
              start
            ];
          },
          useSyncExternalStore: updateSyncExternalStore,
          useId: updateId,
          useHostTransitionStatus,
          useFormState: rerenderActionState,
          useActionState: rerenderActionState,
          useOptimistic: function(passthrough, reducer) {
            var hook = updateWorkInProgressHook();
            if (null !== currentHook)
              return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
            hook.baseState = passthrough;
            return [passthrough, hook.queue.dispatch];
          },
          useMemoCache,
          useCacheRefresh: updateRefresh
        }, thenableState = null, thenableIndexCounter = 0, reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), suspenseHandlerStackCursor = createCursor(null), shellBoundary = null, suspenseStackCursor = createCursor(0), classComponentUpdater = {
          enqueueSetState: function(inst, payload, callback) {
            inst = inst._reactInternals;
            var lane = requestUpdateLane(), update = createUpdate(lane);
            update.payload = payload;
            void 0 !== callback && null !== callback && (update.callback = callback);
            payload = enqueueUpdate(inst, update, lane);
            null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
          },
          enqueueReplaceState: function(inst, payload, callback) {
            inst = inst._reactInternals;
            var lane = requestUpdateLane(), update = createUpdate(lane);
            update.tag = 1;
            update.payload = payload;
            void 0 !== callback && null !== callback && (update.callback = callback);
            payload = enqueueUpdate(inst, update, lane);
            null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
          },
          enqueueForceUpdate: function(inst, callback) {
            inst = inst._reactInternals;
            var lane = requestUpdateLane(), update = createUpdate(lane);
            update.tag = 2;
            void 0 !== callback && null !== callback && (update.callback = callback);
            callback = enqueueUpdate(inst, update, lane);
            null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
          }
        }, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false, SUSPENDED_MARKER = {
          dehydrated: null,
          treeContext: null,
          retryLane: 0,
          hydrationErrors: null
        }, offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, hostParent = null, hostParentIsContainer = false, currentHoistableRoot = null, suspenseyCommitFlag = 8192, DefaultAsyncDispatcher = {
          getCacheForType: function(resourceType) {
            var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
            void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
            return cacheForType;
          }
        }, COMPONENT_TYPE = 0, HAS_PSEUDO_CLASS_TYPE = 1, ROLE_TYPE = 2, TEST_NAME_TYPE = 3, TEXT_TYPE = 4;
        if ("function" === typeof Symbol && Symbol.for) {
          var symbolFor = Symbol.for;
          COMPONENT_TYPE = symbolFor("selector.component");
          HAS_PSEUDO_CLASS_TYPE = symbolFor("selector.has_pseudo_class");
          ROLE_TYPE = symbolFor("selector.role");
          TEST_NAME_TYPE = symbolFor("selector.test_id");
          TEXT_TYPE = symbolFor("selector.text");
        }
        var PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
        exports$1.attemptContinuousHydration = function(fiber) {
          if (13 === fiber.tag) {
            var root = enqueueConcurrentRenderForLane(fiber, 67108864);
            null !== root && scheduleUpdateOnFiber(root, fiber, 67108864);
            markRetryLaneIfNotHydrated(fiber, 67108864);
          }
        };
        exports$1.attemptHydrationAtCurrentPriority = function(fiber) {
          if (13 === fiber.tag) {
            var lane = requestUpdateLane();
            lane = getBumpedLaneForHydrationByLane(lane);
            var root = enqueueConcurrentRenderForLane(fiber, lane);
            null !== root && scheduleUpdateOnFiber(root, fiber, lane);
            markRetryLaneIfNotHydrated(fiber, lane);
          }
        };
        exports$1.attemptSynchronousHydration = function(fiber) {
          switch (fiber.tag) {
            case 3:
              fiber = fiber.stateNode;
              if (fiber.current.memoizedState.isDehydrated) {
                var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                if (0 !== lanes) {
                  fiber.pendingLanes |= 2;
                  for (fiber.entangledLanes |= 2; lanes; ) {
                    var lane = 1 << 31 - clz32(lanes);
                    fiber.entanglements[1] |= lane;
                    lanes &= ~lane;
                  }
                  ensureRootIsScheduled(fiber);
                  0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                }
              }
              break;
            case 13:
              lanes = enqueueConcurrentRenderForLane(fiber, 2), null !== lanes && scheduleUpdateOnFiber(lanes, fiber, 2), flushSyncWork(), markRetryLaneIfNotHydrated(fiber, 2);
          }
        };
        exports$1.batchedUpdates = function(fn, a) {
          return fn(a);
        };
        exports$1.createComponentSelector = function(component) {
          return { $$typeof: COMPONENT_TYPE, value: component };
        };
        exports$1.createContainer = function(containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks) {
          return createFiberRoot(
            containerInfo,
            tag,
            false,
            null,
            hydrationCallbacks,
            isStrictMode,
            identifierPrefix,
            onUncaughtError,
            onCaughtError,
            onRecoverableError,
            transitionCallbacks,
            null
          );
        };
        exports$1.createHasPseudoClassSelector = function(selectors) {
          return { $$typeof: HAS_PSEUDO_CLASS_TYPE, value: selectors };
        };
        exports$1.createHydrationContainer = function(initialChildren, callback, containerInfo, tag, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks, formState) {
          initialChildren = createFiberRoot(
            containerInfo,
            tag,
            true,
            initialChildren,
            hydrationCallbacks,
            isStrictMode,
            identifierPrefix,
            onUncaughtError,
            onCaughtError,
            onRecoverableError,
            transitionCallbacks,
            formState
          );
          initialChildren.context = getContextForSubtree(null);
          containerInfo = initialChildren.current;
          tag = requestUpdateLane();
          tag = getBumpedLaneForHydrationByLane(tag);
          hydrationCallbacks = createUpdate(tag);
          hydrationCallbacks.callback = void 0 !== callback && null !== callback ? callback : null;
          enqueueUpdate(containerInfo, hydrationCallbacks, tag);
          callback = tag;
          initialChildren.current.lanes = callback;
          markRootUpdated$1(initialChildren, callback);
          ensureRootIsScheduled(initialChildren);
          return initialChildren;
        };
        exports$1.createPortal = function(children, containerInfo, implementation) {
          var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
          return {
            $$typeof: REACT_PORTAL_TYPE,
            key: null == key ? null : "" + key,
            children,
            containerInfo,
            implementation
          };
        };
        exports$1.createRoleSelector = function(role) {
          return { $$typeof: ROLE_TYPE, value: role };
        };
        exports$1.createTestNameSelector = function(id) {
          return { $$typeof: TEST_NAME_TYPE, value: id };
        };
        exports$1.createTextSelector = function(text) {
          return { $$typeof: TEXT_TYPE, value: text };
        };
        exports$1.defaultOnCaughtError = function(error) {
          console.error(error);
        };
        exports$1.defaultOnRecoverableError = function(error) {
          reportGlobalError(error);
        };
        exports$1.defaultOnUncaughtError = function(error) {
          reportGlobalError(error);
        };
        exports$1.deferredUpdates = function(fn) {
          var prevTransition = ReactSharedInternals.T, previousPriority = getCurrentUpdatePriority();
          try {
            return setCurrentUpdatePriority(32), ReactSharedInternals.T = null, fn();
          } finally {
            setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition;
          }
        };
        exports$1.discreteUpdates = function(fn, a, b, c, d) {
          var prevTransition = ReactSharedInternals.T, previousPriority = getCurrentUpdatePriority();
          try {
            return setCurrentUpdatePriority(2), ReactSharedInternals.T = null, fn(a, b, c, d);
          } finally {
            setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, 0 === executionContext && (workInProgressRootRenderTargetTime = now() + 500);
          }
        };
        exports$1.findAllNodes = findAllNodes;
        exports$1.findBoundingRects = function(hostRoot, selectors) {
          if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
          selectors = findAllNodes(hostRoot, selectors);
          hostRoot = [];
          for (var i = 0; i < selectors.length; i++)
            hostRoot.push(getBoundingRect(selectors[i]));
          for (selectors = hostRoot.length - 1; 0 < selectors; selectors--) {
            i = hostRoot[selectors];
            for (var targetLeft = i.x, targetRight = targetLeft + i.width, targetTop = i.y, targetBottom = targetTop + i.height, j = selectors - 1; 0 <= j; j--)
              if (selectors !== j) {
                var otherRect = hostRoot[j], otherLeft = otherRect.x, otherRight = otherLeft + otherRect.width, otherTop = otherRect.y, otherBottom = otherTop + otherRect.height;
                if (targetLeft >= otherLeft && targetTop >= otherTop && targetRight <= otherRight && targetBottom <= otherBottom) {
                  hostRoot.splice(selectors, 1);
                  break;
                } else if (!(targetLeft !== otherLeft || i.width !== otherRect.width || otherBottom < targetTop || otherTop > targetBottom)) {
                  otherTop > targetTop && (otherRect.height += otherTop - targetTop, otherRect.y = targetTop);
                  otherBottom < targetBottom && (otherRect.height = targetBottom - otherTop);
                  hostRoot.splice(selectors, 1);
                  break;
                } else if (!(targetTop !== otherTop || i.height !== otherRect.height || otherRight < targetLeft || otherLeft > targetRight)) {
                  otherLeft > targetLeft && (otherRect.width += otherLeft - targetLeft, otherRect.x = targetLeft);
                  otherRight < targetRight && (otherRect.width = targetRight - otherLeft);
                  hostRoot.splice(selectors, 1);
                  break;
                }
              }
          }
          return hostRoot;
        };
        exports$1.findHostInstance = findHostInstance;
        exports$1.findHostInstanceWithNoPortals = function(fiber) {
          fiber = findCurrentFiberUsingSlowPath(fiber);
          fiber = null !== fiber ? findCurrentHostFiberWithNoPortalsImpl(fiber) : null;
          return null === fiber ? null : getPublicInstance(fiber.stateNode);
        };
        exports$1.findHostInstanceWithWarning = function(component) {
          return findHostInstance(component);
        };
        exports$1.flushPassiveEffects = flushPendingEffects;
        exports$1.flushSyncFromReconciler = function(fn) {
          var prevExecutionContext = executionContext;
          executionContext |= 1;
          var prevTransition = ReactSharedInternals.T, previousPriority = getCurrentUpdatePriority();
          try {
            if (setCurrentUpdatePriority(2), ReactSharedInternals.T = null, fn)
              return fn();
          } finally {
            setCurrentUpdatePriority(previousPriority), ReactSharedInternals.T = prevTransition, executionContext = prevExecutionContext, 0 === (executionContext & 6) && flushSyncWorkAcrossRoots_impl(0);
          }
        };
        exports$1.flushSyncWork = flushSyncWork;
        exports$1.focusWithin = function(hostRoot, selectors) {
          if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
          hostRoot = findFiberRootForHostRoot(hostRoot);
          selectors = findPaths(hostRoot, selectors);
          selectors = Array.from(selectors);
          for (hostRoot = 0; hostRoot < selectors.length; ) {
            var fiber = selectors[hostRoot++], tag = fiber.tag;
            if (!isHiddenSubtree(fiber)) {
              if ((5 === tag || 26 === tag || 27 === tag) && setFocusIfFocusable(fiber.stateNode))
                return true;
              for (fiber = fiber.child; null !== fiber; )
                selectors.push(fiber), fiber = fiber.sibling;
            }
          }
          return false;
        };
        exports$1.getFindAllNodesFailureDescription = function(hostRoot, selectors) {
          if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
          var maxSelectorIndex = 0, matchedNames = [];
          hostRoot = [findFiberRootForHostRoot(hostRoot), 0];
          for (var index = 0; index < hostRoot.length; ) {
            var fiber = hostRoot[index++], tag = fiber.tag, selectorIndex = hostRoot[index++], selector = selectors[selectorIndex];
            if (5 !== tag && 26 !== tag && 27 !== tag || !isHiddenSubtree(fiber)) {
              if (matchSelector(fiber, selector) && (matchedNames.push(selectorToString(selector)), selectorIndex++, selectorIndex > maxSelectorIndex && (maxSelectorIndex = selectorIndex)), selectorIndex < selectors.length)
                for (fiber = fiber.child; null !== fiber; )
                  hostRoot.push(fiber, selectorIndex), fiber = fiber.sibling;
            }
          }
          if (maxSelectorIndex < selectors.length) {
            for (hostRoot = []; maxSelectorIndex < selectors.length; maxSelectorIndex++)
              hostRoot.push(selectorToString(selectors[maxSelectorIndex]));
            return "findAllNodes was able to match part of the selector:\n  " + (matchedNames.join(" > ") + "\n\nNo matching component was found for:\n  ") + hostRoot.join(" > ");
          }
          return null;
        };
        exports$1.getPublicRootInstance = function(container) {
          container = container.current;
          if (!container.child) return null;
          switch (container.child.tag) {
            case 27:
            case 5:
              return getPublicInstance(container.child.stateNode);
            default:
              return container.child.stateNode;
          }
        };
        exports$1.injectIntoDevTools = function() {
          var internals = {
            bundleType: 0,
            version: rendererVersion,
            rendererPackageName,
            currentDispatcherRef: ReactSharedInternals,
            reconcilerVersion: "19.1.0"
          };
          null !== extraDevToolsConfig && (internals.rendererConfig = extraDevToolsConfig);
          if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) internals = false;
          else {
            var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (hook.isDisabled || !hook.supportsFiber) internals = true;
            else {
              try {
                rendererID = hook.inject(internals), injectedHook = hook;
              } catch (err) {
              }
              internals = hook.checkDCE ? true : false;
            }
          }
          return internals;
        };
        exports$1.isAlreadyRendering = function() {
          return 0 !== (executionContext & 6);
        };
        exports$1.observeVisibleRects = function(hostRoot, selectors, callback, options) {
          if (!supportsTestSelectors) throw Error(formatProdErrorMessage(363));
          hostRoot = findAllNodes(hostRoot, selectors);
          var disconnect = setupIntersectionObserver(
            hostRoot,
            callback,
            options
          ).disconnect;
          return {
            disconnect: function() {
              disconnect();
            }
          };
        };
        exports$1.shouldError = function() {
          return null;
        };
        exports$1.shouldSuspend = function() {
          return false;
        };
        exports$1.startHostTransition = function(formFiber, pendingState, action, formData) {
          if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
          var queue = ensureFormComponentIsStateful(formFiber).queue;
          startTransition(
            formFiber,
            queue,
            pendingState,
            NotPendingTransition,
            null === action ? noop : function() {
              var resetStateQueue = ensureFormComponentIsStateful(formFiber).next.queue;
              dispatchSetStateInternal(
                formFiber,
                resetStateQueue,
                {},
                requestUpdateLane()
              );
              return action(formData);
            }
          );
        };
        exports$1.updateContainer = function(element, container, parentComponent, callback) {
          var current = container.current, lane = requestUpdateLane();
          updateContainerImpl(
            current,
            lane,
            element,
            container,
            parentComponent,
            callback
          );
          return lane;
        };
        exports$1.updateContainerSync = function(element, container, parentComponent, callback) {
          updateContainerImpl(
            container.current,
            2,
            element,
            container,
            parentComponent,
            callback
          );
          return 2;
        };
        return exports$1;
      };
      module.exports.default = module.exports;
      Object.defineProperty(module.exports, "__esModule", { value: true });
    })(reactReconciler_production);
    return reactReconciler_production.exports;
  }
  var hasRequiredReactReconciler;
  function requireReactReconciler() {
    if (hasRequiredReactReconciler) return reactReconciler.exports;
    hasRequiredReactReconciler = 1;
    {
      reactReconciler.exports = requireReactReconciler_production();
    }
    return reactReconciler.exports;
  }
  var reactReconcilerExports = requireReactReconciler();
  const Reconciler = /* @__PURE__ */ getDefaultExportFromCjs(reactReconcilerExports);
  var styleStringSymbol = "__style_as_string__";
  var propDepths = {
    style: 1,
    data: 1,
    custom: 1
  };
  function diffProperties(lastProps, nextProps, deepDiffing) {
    if (deepDiffing === void 0) {
      deepDiffing = 0;
    }
    if (lastProps === nextProps)
      return null;
    var updatePayload = null;
    var propKey;
    for (propKey in lastProps) {
      if (Object.prototype.hasOwnProperty.call(nextProps, propKey) || !Object.prototype.hasOwnProperty.call(lastProps, propKey) || lastProps[propKey] == null) {
        continue;
      }
      var prop = null;
      if (propKey === "style" && typeof lastProps.style === "string") {
        (updatePayload = updatePayload || {})[styleStringSymbol] = null;
      } else {
        var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
        if (depth > 0) {
          prop = diffProperties(lastProps[propKey], {}, depth - 1);
          if (!prop)
            continue;
        }
        (updatePayload = updatePayload || {})[propKey] = prop;
      }
    }
    for (propKey in nextProps) {
      var nextProp = nextProps[propKey];
      var lastProp = lastProps != null ? lastProps[propKey] : void 0;
      if (!Object.prototype.hasOwnProperty.call(nextProps, propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      var prop = nextProp;
      if (propKey === "style") {
        var prevWasString = typeof lastProp === "string";
        var curIsString = typeof prop === "string";
        if (prevWasString !== curIsString) {
          (updatePayload = updatePayload || {})[styleStringSymbol] = typeof prop === "string" ? prop : null;
          if (curIsString) {
            prop = diffProperties(lastProp, {}, 0);
            if (!prop)
              continue;
          }
        } else {
          if (curIsString)
            continue;
          prop = diffProperties(lastProp, nextProp, 0);
          if (!prop)
            continue;
        }
      } else {
        var depth = deepDiffing > 0 ? deepDiffing : propDepths[propKey] || 0;
        if (depth > 0) {
          prop = diffProperties(lastProp, nextProp, depth - 1);
          if (!prop)
            continue;
        }
      }
      (updatePayload = updatePayload || {})[propKey] = prop;
    }
    return updatePayload;
  }
  var __assign$2 = function() {
    __assign$2 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$2.apply(this, arguments);
  };
  var __rest = function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  var hideClass = "react-unity__renderer__hidden";
  var eventPriorities = {
    default: constantsExports.DefaultEventPriority
  };
  var textTypes = {
    text: true,
    icon: true,
    style: true,
    script: true
  };
  function stringizePoolKey(key) {
    switch (typeof key) {
      case "string":
        return key;
      case "boolean":
        return key ? "default" : "";
      case "number":
        return key.toString();
      case "undefined":
        return null;
      default:
        return "";
    }
  }
  function getAllowedProps(props, type) {
    var children = props.children;
    props.tag;
    props.pool;
    props.ref;
    var rest = __rest(props, ["children", "tag", "pool", "ref"]);
    if (textTypes[type] && "children" in props) {
      rest.children = !children || typeof children === "boolean" ? null : Array.isArray(children) ? children.join("") : String(children);
    }
    if (typeof props.style === "string")
      rest[styleStringSymbol] = props.style;
    return rest;
  }
  var HostTransitionContext = reactExports.createContext(null);
  var NoEventPriority = 0;
  var currentUpdatePriority = NoEventPriority;
  var commonReconciler = __assign$2({
    // -------------------
    //     Scheduling
    // -------------------
    noTimeout: -1,
    scheduleTimeout: function(callback, delay) {
      return setTimeout(callback, delay);
    },
    scheduleMicrotask: typeof queueMicrotask === "function" ? queueMicrotask : function(callback) {
      return Promise.resolve(null).then(callback).catch(function(error) {
        return setTimeout(function() {
          throw error;
        }, 0);
      });
    },
    cancelTimeout: function(handle) {
      return clearTimeout(handle);
    },
    beforeActiveInstanceBlur: function() {
    },
    afterActiveInstanceBlur: function() {
    },
    prepareScopeUpdate: function() {
    },
    getInstanceFromScope: function() {
      return void 0;
    },
    getInstanceFromNode: function() {
      return void 0;
    },
    // React 19
    setCurrentUpdatePriority: function(newPriority) {
      return currentUpdatePriority = newPriority;
    },
    getCurrentUpdatePriority: function() {
      return currentUpdatePriority;
    },
    resolveUpdatePriority: function() {
      return currentUpdatePriority || UnityBridge.CurrentEventPriority || eventPriorities.default;
    },
    maySuspendCommit: function() {
      return false;
    },
    requestPostPaintCallback: function() {
    },
    preloadInstance: function() {
      return true;
    },
    resetFormInstance: function() {
    },
    resolveEventTimeStamp: function() {
      return -1.1;
    },
    resolveEventType: function() {
      return null;
    },
    shouldAttemptEagerTransition: function() {
      return false;
    },
    startSuspendingCommit: function() {
    },
    suspendInstance: function() {
    },
    trackSchedulerEvent: function() {
    },
    waitForCommitToBeReady: function() {
      return null;
    },
    NotPendingTransition: null,
    HostTransitionContext
  }, {
    now: typeof performance !== "undefined" && typeof performance.now === "function" ? function() {
      return performance.now();
    } : typeof Date !== "undefined" && typeof Date.now === "function" ? function() {
      return Date.now();
    } : function() {
      return 0;
    },
    getCurrentEventPriority: function() {
      return UnityBridge.CurrentEventPriority || eventPriorities.default;
    }
  });
  function parametrizeValue(value) {
    if (typeof value === "number")
      return String(value);
    value = String(value);
    if (value.includes(" ") || value.includes("-"))
      return '"'.concat(value, '"');
    return value;
  }
  function stringifyRichText(node) {
    var _a, _b, _c;
    if (node.hidden)
      return "";
    if ("text" in node)
      return node.text;
    var acc = [];
    var tag = node.tag;
    if (tag) {
      acc.push("<");
      acc.push(tag);
      if (((_a = node.attributes) === null || _a === void 0 ? void 0 : _a.value) != null) {
        var value = (_b = node.attributes) === null || _b === void 0 ? void 0 : _b.value;
        acc.push("=");
        acc.push(parametrizeValue(value));
      }
      for (var key in node.attributes) {
        if (key === "value")
          continue;
        if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
          var value = node.attributes[key];
          if (value != null) {
            acc.push(" ");
            acc.push(key);
            acc.push("=");
            acc.push(parametrizeValue(value));
          }
        }
      }
      acc.push(">");
    }
    if (((_c = node.children) === null || _c === void 0 ? void 0 : _c.length) > 0) {
      for (var _i = 0, _d = node.children; _i < _d.length; _i++) {
        var child = _d[_i];
        acc.push(stringifyRichText(child));
      }
      if (tag) {
        acc.push("</");
        acc.push(tag);
        acc.push(">");
      }
    }
    return acc.join("");
  }
  function kebabize(str) {
    return str.split("").map(function(letter, idx) {
      return letter.toUpperCase() === letter ? "".concat(idx !== 0 ? "-" : "").concat(letter.toLowerCase()) : letter;
    }).join("");
  }
  function stringifyStyle(style) {
    if (typeof style === "string")
      return style;
    var acc = [];
    for (var key in style) {
      if (Object.prototype.hasOwnProperty.call(style, key)) {
        var element = style[key];
        if (element != null) {
          acc.push(kebabize(key));
          acc.push(":");
          acc.push(element);
          acc.push(";");
        }
      }
    }
    return acc.join("");
  }
  function stringifySVG(node) {
    var _a;
    if (node.hidden)
      return "";
    if ("text" in node)
      return node.text;
    var acc = [];
    var tag = node.tag;
    if (tag) {
      acc.push("<");
      acc.push(tag);
      for (var key in node.attributes) {
        if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
          var element = node.attributes[key];
          if (key === "style")
            element = stringifyStyle(element);
          if (element != null) {
            acc.push(" ");
            acc.push(kebabize(key));
            acc.push('="');
            acc.push(element);
            acc.push('"');
          }
        }
      }
    }
    if (((_a = node.children) === null || _a === void 0 ? void 0 : _a.length) > 0) {
      if (tag)
        acc.push(">");
      for (var _i = 0, _b = node.children; _i < _b.length; _i++) {
        var child = _b[_i];
        acc.push(stringifySVG(child));
      }
      if (tag) {
        acc.push("</");
        acc.push(tag);
        acc.push(">");
      }
    } else {
      if (tag)
        acc.push(" />");
    }
    return acc.join("");
  }
  var subContextRenderers = {
    richtext: stringifyRichText,
    svg: stringifySVG
  };
  var __extends = /* @__PURE__ */ (function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  })();
  var CallbacksRepo = (
    /** @class */
    (function(_super) {
      __extends(CallbacksRepo2, _super);
      function CallbacksRepo2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.call = function(ind, args) {
          var cb = _this.getObject(ind);
          var argsAsList = args;
          var argsAsArray = args;
          if (typeof argsAsArray.Length === "number") {
            args = [];
            var length = argsAsArray.Length;
            for (var index = 0; index < length; index++)
              args.push(argsAsArray.GetValue(index));
          } else if (typeof argsAsList.Count === "number") {
            args = [];
            var length = argsAsList.Count;
            for (var index = 0; index < length; index++)
              args.push(argsAsList[index]);
          } else if (typeof argsAsList.Count === "function") {
            args = [];
            var length = argsAsList.Count();
            for (var index = 0; index < length; index++)
              args.push(argsAsArray.GetValue(index));
          }
          return cb.apply(null, args);
        };
        return _this;
      }
      return CallbacksRepo2;
    })(ObjectsRepo)
  );
  var callbacksRepo = new CallbacksRepo();
  var objectsRepo = new ObjectsRepo();
  function convertPropsToSerializable(props) {
    var res = {};
    for (var key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        var value = props[key];
        if (value == null) {
          (res.p || (res.p = {}))[key] = null;
        } else if (key === "style") {
          (res.p || (res.p = {}))[key] = convertPropsToSerializable(value);
        } else if (key[0] === "o" && key[1] === "n" && typeof value === "function") {
          var ind = callbacksRepo.addObject(value);
          (res.e || (res.e = {}))[key] = ind;
        } else if (typeof value === "object" || typeof value === "function") {
          var ind = objectsRepo.addObject(value);
          (res.o || (res.o = {}))[key] = ind;
        } else {
          (res.p || (res.p = {}))[key] = value;
        }
      }
    }
    return res;
  }
  var __assign$1 = function() {
    __assign$1 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign$1.apply(this, arguments);
  };
  var refId = 0;
  var ctxMap = /* @__PURE__ */ new Map();
  var updateSubContext = function(instance) {
    var rend = subContextRenderers[instance.type];
    var root = instance === null || instance === void 0 ? void 0 : instance.root;
    var cur = instance;
    while (cur && !root) {
      root = cur.root;
      cur = cur.parent;
    }
    if (!root)
      return;
    var content = rend(root.subContext.node);
    if (instance.type === "richtext") {
      instance.hostContext.commands.push([6, root.refId, content]);
    } else if (instance.type === "svg") {
      instance.hostContext.commands.push([5, root.refId, "svg", convertPropsToSerializable({ innerContent: content })]);
    }
  };
  var hostConfig$1 = __assign$1(__assign$1(__assign$1({}, commonReconciler), {
    getRootHostContext: function(rootContainer) {
      var context = rootContainer.context;
      if (rootContainer.refId < 0) {
        refId++;
        rootContainer.context.SetRef(refId, rootContainer.component);
        rootContainer.refId = refId;
      }
      var existing = ctxMap.get(context);
      if (existing)
        return existing;
      var commands = rootContainer.commands;
      var flushCommands = function() {
        var serialized = JSON.stringify(commands);
        commands.length = 0;
        return serialized;
      };
      var fireEventByRef = function(ind, args) {
        return callbacksRepo.call(ind, args);
      };
      var getObjectRef = function(ind) {
        return objectsRepo.getObject(ind);
      };
      var getEventAsObjectRef = function(ind) {
        return callbacksRepo.getObject(ind);
      };
      context.BindCommands(flushCommands, fireEventByRef, getObjectRef, getEventAsObjectRef);
      var ctx = {
        context,
        commands,
        refId: rootContainer.refId,
        type: "native"
      };
      ctxMap.set(context, ctx);
      return ctx;
    },
    getChildHostContext: function(parentCtx, type) {
      if (type === "richtext" && parentCtx.type === "native")
        return {
          type: "richtext",
          hostContext: parentCtx,
          node: null,
          parent: null,
          root: null
        };
      if (type === "svg" && parentCtx.type === "native")
        return {
          type: "svg",
          hostContext: parentCtx,
          node: null,
          parent: null,
          root: null
        };
      return parentCtx;
    },
    getPublicInstance: function(instance) {
      if (instance.type === "native")
        return instance.context.GetRef(instance.refId, instance.commands.length > 0);
      return null;
    },
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,
    supportsMicrotasks: true,
    isPrimaryRenderer: true,
    warnsIfNotActing: true,
    prepareForCommit: function() {
      return null;
    },
    resetAfterCommit: function() {
    },
    clearContainer: function(container) {
      UnityBridge.clearContainer(container);
    },
    createInstance: function(type, props, rootContainer, ctx, internalHandle) {
      var aProps = getAllowedProps(props, type);
      if (ctx.type === "native") {
        refId++;
        ctx.commands.push([0, refId, type, convertPropsToSerializable(aProps), stringizePoolKey(props.pool)]);
        if (rootContainer.fiberCache)
          rootContainer.fiberCache.setObject(refId, internalHandle);
        var res = __assign$1(__assign$1({}, ctx), { refId });
        if (type === "richtext") {
          res.subContext = {
            type: "richtext",
            node: {
              tag: "",
              children: [],
              attributes: aProps
            },
            root: res,
            hostContext: res,
            parent: null
          };
        }
        if (type === "svg") {
          res.subContext = {
            type: "svg",
            node: {
              tag: "",
              children: [],
              attributes: aProps
            },
            root: res,
            hostContext: res,
            parent: null
          };
        }
        return res;
      }
      if (ctx.type === "richtext" || ctx.type === "svg") {
        return __assign$1(__assign$1({}, ctx), { node: {
          tag: type,
          children: [],
          attributes: aProps
        } });
      }
    },
    createTextInstance: function(text, rootContainer, ctx, internalHandle) {
      if (ctx.type === "native") {
        refId++;
        ctx.commands.push([1, refId, text]);
        if (rootContainer.fiberCache)
          rootContainer.fiberCache.setObject(refId, internalHandle);
        return __assign$1(__assign$1({}, ctx), { refId });
      }
      if (ctx.type === "richtext" || ctx.type === "svg") {
        return __assign$1(__assign$1({}, ctx), { node: { text } });
      }
    },
    appendInitialChild: function(parent, child) {
      if (!child)
        return;
      if (parent.type === "native" && parent.subContext)
        parent = parent.subContext;
      if (parent.type === "native" && child.type === "native") {
        parent.commands.push([2, parent.refId, child.refId]);
      } else if (parent.type === "richtext" && child.type === "richtext" || parent.type === "svg" && child.type === "svg") {
        if ("children" in parent.node)
          parent.node.children.push(child.node);
        child.root = parent.root;
        child.parent = parent;
        updateSubContext(child);
      }
    },
    finalizeInitialChildren: function() {
      return false;
    },
    commitMount: function(instance) {
    },
    shouldSetTextContent: function(type) {
      return textTypes[type];
    },
    // -------------------
    //     Mutation
    // -------------------
    commitUpdate: function(instance, type, prevProps, nextProps) {
      var updatePayload = null;
      if (typeof prevProps === "string") {
        updatePayload = type;
        type = prevProps;
      } else {
        updatePayload = diffProperties(prevProps, nextProps);
        if (!updatePayload)
          return;
      }
      var props = getAllowedProps(updatePayload, type);
      if (instance.type === "native") {
        instance.commands.push([5, instance.refId, type, convertPropsToSerializable(props)]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        if ("attributes" in instance.node)
          instance.node.attributes = __assign$1(__assign$1({}, instance.node.attributes), props);
        updateSubContext(instance);
      }
    },
    commitTextUpdate: function(instance, oldText, newText) {
      if (instance.type === "native") {
        instance.commands.push([6, instance.refId, newText]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        instance.node.text = newText;
        updateSubContext(instance);
      }
    },
    appendChild: function(parent, child) {
      if (!child)
        return;
      if (parent.type === "native" && parent.subContext)
        parent = parent.subContext;
      if (parent.type === "native" && child.type === "native") {
        child.commands.push([2, parent.refId, child.refId]);
      } else if (parent.type === "richtext" && child.type === "richtext" || parent.type === "svg" && child.type === "svg") {
        if ("children" in parent.node)
          parent.node.children.push(child.node);
        child.root = parent.root;
        child.parent = parent;
        updateSubContext(child);
      }
    },
    appendChildToContainer: function(parent, child) {
      if (child.type === "native")
        child.commands.push([2, parent.refId, child.refId]);
    },
    insertBefore: function(parent, child, beforeChild) {
      if (!child)
        return;
      if (parent.type === "native" && parent.subContext)
        parent = parent.subContext;
      if (parent.type === "native" && child.type === "native" && beforeChild.type === "native") {
        child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
      } else if (parent.type === "richtext" && child.type === "richtext" && beforeChild.type === "richtext" || parent.type === "svg" && child.type === "svg" && beforeChild.type === "svg") {
        if ("children" in parent.node) {
          var index = parent.node.children.indexOf(beforeChild.node);
          if (index >= 0)
            parent.node.children.splice(index, 0, child.node);
          else
            parent.node.children.push(child.node);
        }
        child.root = parent.root;
        child.parent = parent;
        updateSubContext(child);
      }
    },
    insertInContainerBefore: function(parent, child, beforeChild) {
      if (child.type === "native" && beforeChild.type === "native")
        child.commands.push([4, parent.refId, child.refId, beforeChild.refId]);
    },
    removeChild: function(parent, child) {
      if (!child)
        return;
      if (parent.type === "native" && parent.subContext)
        parent = parent.subContext;
      if (parent.type === "native" && child.type === "native") {
        child.commands.push([3, parent.refId, child.refId]);
      } else if (parent.type === "richtext" && child.type === "richtext" || parent.type === "svg" && child.type === "svg") {
        if ("children" in parent.node) {
          var index = parent.node.children.indexOf(child.node);
          if (index >= 0)
            parent.node.children.splice(index, 1);
        }
        updateSubContext(parent);
      }
    },
    removeChildFromContainer: function(parent, child) {
      if (child.type === "native")
        child.commands.push([3, parent.refId, child.refId]);
    },
    resetTextContent: function() {
    },
    preparePortalMount: function() {
    },
    detachDeletedInstance: function() {
    },
    // Required for Suspense
    hideInstance: function(instance) {
      if (instance.type === "native") {
        instance.commands.push([7, instance.refId, true]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        instance.node.hidden = true;
        updateSubContext(instance);
      }
    },
    hideTextInstance: function(instance) {
      if (instance.type === "native") {
        instance.commands.push([7, instance.refId, true]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        instance.node.hidden = true;
        updateSubContext(instance);
      }
    },
    unhideInstance: function(instance) {
      if (instance.type === "native") {
        instance.commands.push([7, instance.refId, false]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        instance.node.hidden = false;
        updateSubContext(instance);
      }
    },
    unhideTextInstance: function(instance) {
      if (instance.type === "native") {
        instance.commands.push([7, instance.refId, false]);
      } else if (instance.type === "richtext" || instance.type === "svg") {
        instance.node.hidden = false;
        updateSubContext(instance);
      }
    }
  }), {
    supportsTestSelectors: false,
    shouldDeprioritizeSubtree: function() {
      return false;
    },
    prepareUpdate: function(instance, type, oldProps, newProps) {
      return diffProperties(oldProps, newProps);
    }
  });
  var asyncReconciler = null;
  var getAsyncReconciler = function() {
    return asyncReconciler !== null && asyncReconciler !== void 0 ? asyncReconciler : asyncReconciler = Reconciler(hostConfig$1);
  };
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var hostContext = {};
  var childContext = {};
  var hostConfig = __assign(__assign(__assign({}, commonReconciler), {
    getRootHostContext: function() {
      return hostContext;
    },
    getChildHostContext: function() {
      return childContext;
    },
    getPublicInstance: function(instance) {
      return instance;
    },
    supportsMutation: true,
    supportsHydration: false,
    supportsPersistence: false,
    supportsMicrotasks: true,
    isPrimaryRenderer: true,
    warnsIfNotActing: true,
    prepareForCommit: function() {
      return null;
    },
    resetAfterCommit: function() {
    },
    clearContainer: function(container) {
      return UnityBridge.clearContainer(container);
    },
    createInstance: function(type, props, rootContainerInstance) {
      var aProps = getAllowedProps(props, type);
      var children = aProps.children || null;
      delete aProps.children;
      return UnityBridge.createElement(props.tag || type, children, rootContainerInstance, aProps, stringizePoolKey(props.pool));
    },
    createTextInstance: function(text, rootContainerInstance) {
      return UnityBridge.createText(text, rootContainerInstance);
    },
    appendInitialChild: function(parent, child) {
      UnityBridge.appendChild(parent, child);
    },
    finalizeInitialChildren: function() {
      return false;
    },
    commitMount: function() {
    },
    shouldSetTextContent: function(type) {
      return textTypes[type];
    },
    // -------------------
    //     Mutation
    // -------------------
    commitUpdate: function(instance, type, prevProps, nextProps) {
      var updatePayload = null;
      if (typeof prevProps === "string") {
        updatePayload = type;
        type = prevProps;
      } else {
        updatePayload = diffProperties(prevProps, nextProps);
        if (!updatePayload)
          return;
      }
      UnityBridge.applyUpdate(instance, getAllowedProps(updatePayload, type), type);
    },
    commitTextUpdate: function(textInstance, oldText, newText) {
      UnityBridge.setText(textInstance, newText);
    },
    appendChild: function(parent, child) {
      return UnityBridge.appendChild(parent, child);
    },
    appendChildToContainer: function(parent, child) {
      return UnityBridge.appendChildToContainer(parent, child);
    },
    insertBefore: function(parent, child, beforeChild) {
      return UnityBridge.insertBefore(parent, child, beforeChild);
    },
    insertInContainerBefore: function(parent, child, beforeChild) {
      return UnityBridge.insertBefore(parent, child, beforeChild);
    },
    removeChild: function(parent, child) {
      return UnityBridge.removeChild(parent, child);
    },
    removeChildFromContainer: function(parent, child) {
      return UnityBridge.removeChild(parent, child);
    },
    resetTextContent: function() {
    },
    preparePortalMount: function() {
    },
    detachDeletedInstance: function() {
    },
    // Required for Suspense
    hideInstance: function(instance) {
      instance.ClassList.Add(hideClass);
    },
    hideTextInstance: function(instance) {
      instance.ClassList.Add(hideClass);
    },
    unhideInstance: function(instance) {
      instance.ClassList.Remove(hideClass);
    },
    unhideTextInstance: function(instance) {
      instance.ClassList.Remove(hideClass);
    }
  }), {
    supportsTestSelectors: false,
    shouldDeprioritizeSubtree: function() {
      return false;
    },
    prepareUpdate: function(instance, type, oldProps, newProps) {
      return diffProperties(oldProps, newProps);
    }
  });
  var syncReconciler = null;
  var getSyncReconciler = function() {
    return syncReconciler !== null && syncReconciler !== void 0 ? syncReconciler : syncReconciler = Reconciler(hostConfig);
  };
  var containerMap = /* @__PURE__ */ new Map();
  var renderCount = 0;
  function render(element, options) {
    if (options === void 0) {
      options = {};
    }
    renderCount++;
    var hostContainer = (options === null || options === void 0 ? void 0 : options.hostContainer) || HostContainer;
    var cacheKey = hostContainer.InstanceId >= 0 ? hostContainer.InstanceId : hostContainer;
    var isAsync = !(options === null || options === void 0 ? void 0 : options.disableBatchRendering);
    var _a = containerMap.get(cacheKey) || {}, hostRoot = _a.hostRoot, asyncJobCallback = _a.asyncJobCallback;
    var findFiberByHostInstance = function() {
      return null;
    };
    if (!hostRoot) {
      var mode = (options === null || options === void 0 ? void 0 : options.mode) === "legacy" ? constantsExports.LegacyRoot : constantsExports.ConcurrentRoot;
      if (isAsync) {
        var asyncReconciler2 = getAsyncReconciler();
        var fiberCache_1 = null;
        var scheduled_1 = false;
        var commands_1 = [];
        commands_1.push = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          if (!scheduled_1) {
            scheduled_1 = true;
            Promise.resolve().then(function() {
              asyncJobCallback();
              scheduled_1 = false;
            });
          }
          return Array.prototype.push.apply(commands_1, args);
        };
        var hostContainerInstance_1 = {
          type: "native",
          commands: commands_1,
          component: hostContainer,
          context: hostContainer.Context,
          refId: hostContainer.RefId,
          fiberCache: fiberCache_1
        };
        asyncJobCallback = function() {
          if (!commands_1.length)
            return;
          var serialized = JSON.stringify(commands_1);
          commands_1.length = 0;
          hostContainerInstance_1.context.FlushCommands(serialized);
        };
        hostRoot = asyncReconciler2.createContainer(
          hostContainerInstance_1,
          mode,
          null,
          false,
          void 0,
          "",
          function(error) {
            return console.error(error);
          },
          function() {
          },
          // @ts-expect-error the types for `react-reconciler` are not up to date with the library.
          // See https://github.com/facebook/react/blob/c0464aedb16b1c970d717651bba8d1c66c578729/packages/react-reconciler/src/ReactFiberReconciler.js#L236-L259
          function() {
          },
          function() {
          },
          null
        );
      } else {
        hostRoot = getSyncReconciler().createContainer(
          hostContainer,
          mode,
          null,
          false,
          void 0,
          "",
          function(error) {
            return console.error(error);
          },
          function() {
          },
          // @ts-expect-error the types for `react-reconciler` are not up to date with the library.
          // See https://github.com/facebook/react/blob/c0464aedb16b1c970d717651bba8d1c66c578729/packages/react-reconciler/src/ReactFiberReconciler.js#L236-L259
          function() {
          },
          function() {
          },
          null
        );
      }
      containerMap.set(cacheKey, { hostRoot, asyncJobCallback });
    }
    var shouldWrapWithHelpers = !(options === null || options === void 0 ? void 0 : options.disableHelpers);
    if (shouldWrapWithHelpers) {
      var viewWrapperProps = {
        withHelpers: !(options === null || options === void 0 ? void 0 : options.disableHelpers),
        renderCount
      };
      element = reactExports.createElement(DefaultView, viewWrapperProps, element);
    }
    var rc = isAsync ? getAsyncReconciler() : getSyncReconciler();
    if ("updateContainerSync" in rc && typeof rc.updateContainerSync === "function" && "flushSyncWork" in rc && typeof rc.flushSyncWork === "function") {
      rc.updateContainerSync(element, hostRoot, null, function() {
      });
      rc.flushSyncWork();
    } else {
      rc.updateContainer(element, hostRoot, null, function() {
      });
    }
    rc.injectIntoDevTools({
      bundleType: 0,
      version,
      rendererPackageName: "@reactunity/renderer",
      rendererConfig: { isAsync },
      findFiberByHostInstance
    });
    return rc;
  }
  const MenuButton = ({ label, isSelected, isPressed, onClick, style, className, barClass, disabled }) => {
    const barWidth = barClass || "w-80";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "view",
      {
        className: `relative w-full transition-opacity duration-300 ${className || "h-24 mb-4"} ${disabled ? "opacity-30" : ""}`,
        style: style || {},
        onClick: disabled ? void 0 : onClick,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "view",
            {
              className: `border transition-all absolute left-0 top-0 bottom-0 ${isPressed ? "bg-white border-white duration-75 bg-opacity-100" : "bg-[#ff3333] border-[#ff3333] duration-300 bg-opacity-10"} ${isSelected ? barWidth : "w-0"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "absolute left-0 top-0 bottom-0 right-0 flex-row items-center pl-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                className: `text-3xl mr-4 transition-colors duration-300 ${isPressed ? "text-black" : "text-white"} ${isSelected ? "opacity-100" : "opacity-0"}`,
                style: { top: -1 },
                children: "▶"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-1 h-full justify-center overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                className: `text-3xl transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis w-full ${isPressed ? "text-black font-bold" : isSelected ? "text-white" : "text-[#e2e8f0]"}`,
                style: { opacity: isSelected ? 1 : 0.6, letterSpacing: 10 },
                children: label
              }
            ) })
          ] })
        ]
      }
    );
  };
  const Menu = ({ onNavigate, onPlay, onBack, onExit, isExiting, initialIndex = 0, onIndexChange }) => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [selectedIndex, setSelectedIndex] = reactExports.useState(initialIndex);
    const [opacity, setOpacity] = reactExports.useState(0);
    const [isNavigating, setIsNavigating] = reactExports.useState(false);
    const menuItems = reactExports.useMemo(() => [
      { label: "Stage Select", action: () => onNavigate("stage_select") },
      { label: "Ranking", action: () => onNavigate("ranking") },
      { label: "Settings", action: () => onNavigate("settings") },
      { label: "Exit Game", action: onExit }
    ], [onPlay, onNavigate, onExit]);
    reactExports.useEffect(() => {
      if (isExiting || isNavigating) {
        setOpacity(0);
      } else {
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
      }
    }, [isExiting, isNavigating]);
    reactExports.useEffect(() => {
      if (onIndexChange) {
        onIndexChange(selectedIndex);
      }
    }, [selectedIndex, onIndexChange]);
    reactExports.useEffect(() => {
      window.onMenuInput = (event) => {
        if (isNavigating || isExiting) return;
        if (event === "up") {
          interop == null ? void 0 : interop.PlaySound("move");
          setSelectedIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
        } else if (event === "down") {
          interop == null ? void 0 : interop.PlaySound("move");
          setSelectedIndex((prev) => (prev + 1) % menuItems.length);
        } else if (event === "submit") {
          interop == null ? void 0 : interop.PlaySound("submit");
          setIsNavigating(true);
          setTimeout(() => {
            menuItems[selectedIndex].action();
          }, 300);
        } else if (event === "cancel") {
          interop == null ? void 0 : interop.PlaySound("cancel");
          onBack();
        }
      };
      return () => {
        window.onMenuInput = () => {
        };
      };
    }, [selectedIndex, menuItems, onBack, isNavigating, isExiting, interop]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "view",
      {
        className: "flex-col items-start w-full mb-10 pl-32 tracking-widest",
        style: { fontFamily: "SourceHanCodeJP" },
        children: menuItems.map((item, index) => {
          const isSelected = index === selectedIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuButton,
            {
              label: item.label,
              isSelected,
              isPressed: isNavigating && isSelected,
              barClass: "w-[600px]",
              style: { opacity, transitionDelay: `${isExiting || isNavigating ? 0 : index * 120}ms` }
            },
            index
          );
        })
      }
    );
  };
  const useGlitch = (options = { auto: true }) => {
    const [offset, setOffset] = reactExports.useState({ x: 0, y: 0 });
    const [isGlitching, setIsGlitching] = reactExports.useState(false);
    const isMountedRef = reactExports.useRef(true);
    const intervalHandleRef = reactExports.useRef(null);
    const timeoutHandleRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
        if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
        if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);
      };
    }, []);
    const trigger = reactExports.useCallback((duration = 200, intensity = 10) => {
      if (!isMountedRef.current) return;
      if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
      if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);
      setIsGlitching(true);
      intervalHandleRef.current = setInterval(() => {
        if (!isMountedRef.current) return;
        setOffset({
          x: (Math.random() - 0.5) * intensity,
          y: (Math.random() - 0.5) * (intensity * 0.4)
        });
      }, 50);
      timeoutHandleRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
        setIsGlitching(false);
        setOffset({ x: 0, y: 0 });
      }, duration);
    }, []);
    reactExports.useEffect(() => {
      if (!options.auto) return;
      let loopTimeout;
      const loop = () => {
        const nextDelay = Math.random() * 3e3 + 2e3;
        loopTimeout = setTimeout(() => {
          if (!isMountedRef.current) return;
          if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
          setIsGlitching(true);
          const duration = Math.random() * 200 + 100;
          intervalHandleRef.current = setInterval(() => {
            if (!isMountedRef.current) return;
            setOffset({
              x: (Math.random() - 0.5) * 10,
              // -5px 〜 +5px の範囲でランダム
              y: (Math.random() - 0.5) * 4
              // -2px 〜 +2px の範囲でランダム
            });
          }, 50);
          timeoutHandleRef.current = setTimeout(() => {
            if (!isMountedRef.current) return;
            if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
            setIsGlitching(false);
            setOffset({ x: 0, y: 0 });
            loop();
          }, duration);
        }, nextDelay);
      };
      loop();
      return () => {
        clearTimeout(loopTimeout);
        if (timeoutHandleRef.current) clearTimeout(timeoutHandleRef.current);
        if (intervalHandleRef.current) clearInterval(intervalHandleRef.current);
      };
    }, [options.auto]);
    return { offset, isGlitching, trigger };
  };
  const GlitchText = ({ text, isAlert, className, style }) => {
    const { offset, isGlitching } = useGlitch();
    const safeStyle = style || {};
    const ghost1Color = isAlert ? "#ff0000" : "#ff0000";
    const ghost2Color = isAlert ? "#ffff00" : "#00ffff";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: `relative ${className || ""}`, style: safeStyle, children: [
      isGlitching && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `absolute ${className || ""}`, style: __spreadProps(__spreadValues({}, safeStyle), { transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, opacity: 0.7, color: ghost1Color }), children: text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `absolute ${className || ""}`, style: __spreadProps(__spreadValues({}, safeStyle), { transform: `translate(${-offset.x}px, ${-offset.y}px)`, opacity: 0.7, color: ghost2Color }), children: text })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className, style: __spreadProps(__spreadValues({}, safeStyle), { transform: `translate(${offset.x}px, ${offset.y}px)` }), children: text })
    ] });
  };
  const STAGES$1 = [
    { label: "Stage 1", sceneName: "Stage1", disabled: true },
    // まだシーンがないため無効化
    { label: "Score Attack", sceneName: "ScoreAttack" }
  ];
  const StageSelect = ({ onBack, onGameStart }) => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
    const [opacity, setOpacity] = reactExports.useState(0);
    const [isExiting, setIsExiting] = reactExports.useState(false);
    const [isStarting, setIsStarting] = reactExports.useState(false);
    reactExports.useEffect(() => {
      if (isExiting) {
        setOpacity(0);
        const timer = setTimeout(onBack, 300);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
      }
    }, [isExiting, onBack]);
    reactExports.useEffect(() => {
      window.onMenuInput = (event) => {
        if (isExiting || isStarting) return;
        if (event === "up") {
          interop == null ? void 0 : interop.PlaySound("move");
          setSelectedIndex((prev) => (prev - 1 + STAGES$1.length) % STAGES$1.length);
        } else if (event === "down") {
          interop == null ? void 0 : interop.PlaySound("move");
          setSelectedIndex((prev) => (prev + 1) % STAGES$1.length);
        } else if (event === "submit") {
          if (STAGES$1[selectedIndex].disabled) {
            interop == null ? void 0 : interop.PlaySound("cancel");
            return;
          }
          interop == null ? void 0 : interop.PlaySound("submit");
          onGameStart();
          setIsStarting(true);
          setTimeout(() => {
            const stage = STAGES$1[selectedIndex];
            if (interop && typeof interop.StartGame === "function") {
              interop.StartGame(stage.sceneName);
            } else {
              console.log(`Start Game: ${stage.sceneName}`);
              setIsStarting(false);
              setIsExiting(true);
            }
          }, 100);
        } else if (event === "cancel") {
          interop == null ? void 0 : interop.PlaySound("cancel");
          setIsExiting(true);
        }
      };
      return () => {
        window.onMenuInput = () => {
        };
      };
    }, [selectedIndex, isExiting, isStarting, interop, onBack, onGameStart]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col w-full h-full p-12 text-white transition-opacity duration-300", style: { opacity, fontFamily: "SourceHanCodeJP" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "STAGE SELECT", className: "text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600", children: "MISSION: INFILTRATION" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-col w-1/3", children: STAGES$1.map((stage, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuButton,
        {
          label: stage.label,
          isSelected: idx === selectedIndex,
          isPressed: isStarting && idx === selectedIndex,
          barClass: "w-full",
          className: "h-24 mb-6",
          disabled: stage.disabled
        },
        idx
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "absolute right-12 top-64 w-1/2 p-6 border border-cyan-900 bg-black bg-opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 mb-4 text-4xl", children: ">> MISSION BRIEFING" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-4xl leading-normal", children: selectedIndex === 0 ? ">> AREA LOCKED. This mission is currently under development." : ">> ENDLESS SURVIVAL MODE. Test your limits against infinite waves." })
      ] })
    ] });
  };
  const STAGES = ["Stage 1", "Score Attack"];
  const FILTER_KEYS = ["hp", "sp", "auto"];
  const Ranking = ({ onBack }) => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [opacity, setOpacity] = reactExports.useState(0);
    const [isExiting, setIsExiting] = reactExports.useState(false);
    const [selectedStageIndex, setSelectedStageIndex] = reactExports.useState(0);
    const [focusArea, setFocusArea] = reactExports.useState("stage");
    const [isStagePressed, setIsStagePressed] = reactExports.useState(false);
    const [filterRowIndex, setFilterRowIndex] = reactExports.useState(0);
    const [filters, setFilters] = reactExports.useState({
      hp: "ANY",
      sp: "ANY",
      auto: "ANY"
    });
    const [scoresData, setScoresData] = reactExports.useState({
      "Stage 1": [],
      "Score Attack": []
    });
    reactExports.useEffect(() => {
      if (isExiting) {
        setOpacity(0);
        const timer = setTimeout(onBack, 300);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
      }
    }, [isExiting, onBack]);
    reactExports.useEffect(() => {
      const fetchData = () => {
        try {
          if (interop && typeof interop.GetGameData === "function") {
            const json = interop.GetGameData();
            const data = typeof json === "string" ? JSON.parse(json) : json;
            setScoresData({
              "Stage 1": data.stage1Scores || [],
              "Score Attack": data.scoreAttackScores || []
            });
          }
        } catch (e) {
          console.error("Failed to fetch ranking data:", e);
        }
      };
      fetchData();
    }, [interop]);
    const filteredScores = reactExports.useMemo(() => {
      const stageName = STAGES[selectedStageIndex];
      const scores = scoresData[stageName] || [];
      return scores.filter((s) => {
        if (filters.hp !== "ANY" && s.hp !== filters.hp) return false;
        if (filters.sp !== "ANY" && s.sp !== filters.sp) return false;
        if (filters.auto !== "ANY" && s.autoFire !== filters.auto) return false;
        return true;
      }).sort((a, b) => b.score - a.score);
    }, [selectedStageIndex, filters, scoresData]);
    const changeFilterValue = reactExports.useCallback((rowIndex, direction) => {
      setFilters((prev) => {
        const next = __spreadValues({}, prev);
        if (rowIndex === 0) {
          let current = next.hp === "ANY" ? 0 : next.hp;
          let newVal = current + direction;
          if (newVal < 0) newVal = 10;
          if (newVal > 10) newVal = 0;
          next.hp = newVal === 0 ? "ANY" : newVal;
        } else if (rowIndex === 1) {
          let current = next.sp === "ANY" ? -1 : next.sp;
          let newVal = current + direction;
          if (newVal < -1) newVal = 10;
          if (newVal > 10) newVal = -1;
          next.sp = newVal === -1 ? "ANY" : newVal;
        } else if (rowIndex === 2) {
          const states = ["ANY", false, true];
          let currentIdx = states.indexOf(next.auto);
          let newIdx = (currentIdx + direction + states.length) % states.length;
          next.auto = states[newIdx];
        }
        return next;
      });
    }, []);
    reactExports.useEffect(() => {
      window.onMenuInput = (event) => {
        if (isExiting) return;
        if (event === "cancel") {
          interop == null ? void 0 : interop.PlaySound("cancel");
          if (focusArea === "filter") {
            setFocusArea("stage");
          } else {
            setIsExiting(true);
          }
          return;
        }
        if (focusArea === "stage") {
          if (event === "up") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedStageIndex((prev) => (prev - 1 + STAGES.length) % STAGES.length);
          }
          if (event === "down") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedStageIndex((prev) => (prev + 1) % STAGES.length);
          }
          if (event === "right" || event === "submit") {
            interop == null ? void 0 : interop.PlaySound("submit");
            setIsStagePressed(true);
            setTimeout(() => setIsStagePressed(false), 100);
            setFocusArea("filter");
          }
        } else {
          if (event === "up") {
            interop == null ? void 0 : interop.PlaySound("move");
            setFilterRowIndex((prev) => (prev - 1 + FILTER_KEYS.length) % FILTER_KEYS.length);
          }
          if (event === "down") {
            interop == null ? void 0 : interop.PlaySound("move");
            setFilterRowIndex((prev) => (prev + 1) % FILTER_KEYS.length);
          }
          if (event === "left") {
            interop == null ? void 0 : interop.PlaySound("move");
            changeFilterValue(filterRowIndex, -1);
          }
          if (event === "right") {
            interop == null ? void 0 : interop.PlaySound("move");
            changeFilterValue(filterRowIndex, 1);
          }
        }
      };
      return () => {
        window.onMenuInput = () => {
        };
      };
    }, [focusArea, filterRowIndex, filters, onBack, isExiting, interop, changeFilterValue]);
    const renderGauge = (value, max) => {
      const totalLen = 10;
      const filledLen = Math.round(value / max * totalLen);
      const bar = "=".repeat(filledLen) + "-".repeat(totalLen - filledLen);
      return `[${bar}]`;
    };
    const formatValue = (val) => {
      const str = val.toString();
      const width = 3;
      const padding = width - str.length;
      const padLeft = Math.floor(padding / 2);
      const padRight = padding - padLeft;
      return " ".repeat(padLeft) + str + " ".repeat(padRight);
    };
    const getFilterDisplay = (type) => {
      const val = filters[type];
      const anyGauge = "[   ANY    ]";
      if (type === "hp") {
        if (val === "ANY") return { label: "HP", text: `< ${formatValue("ANY")} >`, gauge: anyGauge };
        return { label: "HP", text: `< ${formatValue(val)} >`, gauge: renderGauge(val, 10) };
      }
      if (type === "sp") {
        if (val === "ANY") return { label: "SP", text: `< ${formatValue("ANY")} >`, gauge: anyGauge };
        return { label: "SP", text: `< ${formatValue(val)} >`, gauge: renderGauge(val, 10) };
      }
      if (type === "auto") {
        if (val === "ANY") return { label: "AUTO FIRE", text: `< ${formatValue("ANY")} >`, gauge: anyGauge };
        return { label: "AUTO FIRE", text: val ? `< ${formatValue("ON")} >` : `< ${formatValue("OFF")} >`, gauge: val ? "[==========]" : "[----------]" };
      }
      return { label: "", text: "", gauge: "" };
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col w-full h-full p-12 text-white transition-opacity duration-300", style: { opacity, fontFamily: "SourceHanCodeJP" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "RANKING", className: "text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600", children: "DATABASE: LOCAL_STORAGE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row w-full flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-1/4 border-r-2 border-cyan-900 pr-4 h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl mb-2 text-cyan-400 font-bold tracking-widest", children: "SELECT STAGE" }),
          STAGES.map((stage, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuButton,
            {
              label: stage,
              isSelected: idx === selectedStageIndex,
              isPressed: isStagePressed && idx === selectedStageIndex,
              barClass: "w-full",
              className: "h-24 mb-6",
              style: { opacity: focusArea === "stage" ? 1 : 0.4 }
            },
            stage
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-3/4 pl-8 flex-col h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: `mb-8 p-2 bg-black border border-cyan-900 flex-shrink-0 ${focusArea === "filter" ? "shadow-[0_0_15px_rgba(0,255,255,0.3)]" : "opacity-70"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-center mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-4xl text-cyan-600", children: ">> FILTER CONFIG" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-4xl text-cyan-600 tracking-widest", style: { fontFamily: "SourceHanCodeJP" }, children: "[ READY  ]" })
            ] }),
            FILTER_KEYS.map((key, idx) => {
              const display = getFilterDisplay(key);
              const isFocused = focusArea === "filter" && filterRowIndex === idx;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between mb-0 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row text-3xl", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { className: `w-60 ${isFocused ? "text-cyan-400" : "text-gray-500"}`, children: [
                    display.label,
                    " :"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `${isFocused ? "text-white bg-cyan-900" : "text-gray-400"}`, children: display.text })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-600 text-3xl tracking-widest", style: { fontFamily: "SourceHanCodeJP" }, children: display.gauge })
              ] }, key);
            })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col gap-1 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between px-2 mb-1 border-b border-gray-800 pb-1 items-end flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600 w-24", children: "RANK" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600 w-96", children: "SCORE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row gap-4 items-end flex-1 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600 flex-1 text-right", style: { whiteSpace: "nowrap" }, children: "SETTINGS" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600 w-72 text-right", children: "DATE" })
              ] })
            ] }),
            filteredScores.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-row justify-center items-center bg-gray-900 p-8 border-l-2 border-gray-700 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-400 text-4xl tracking-widest", style: { fontFamily: "SourceHanCodeJP" }, children: "NO RECORDS FOUND" }) }) : (
              // FHD環境での表示崩れを防ぐため、最大5件までに制限して表示する
              // 本来はスクロール機能を実装すべきですが、レイアウトの簡素化と
              // 「トップランカーのみを表示する」というアーケードライクな仕様のため、
              // あえて上位5件のみに絞っています。
              filteredScores.slice(0, 5).map((score, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-center bg-gray-900 p-2 border-l-2 border-gray-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl font-bold text-cyan-500 w-24", children: `${idx + 1}.` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl text-white w-96", children: score.score.toLocaleString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-center gap-4 flex-1 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-gray-500 flex-1 text-right", children: `HP:${score.hp} SP:${score.sp} Auto:${score.autoFire ? "ON" : "OFF"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-gray-500 w-72 text-right", children: score.date })
                ] })
              ] }, idx))
            )
          ] })
        ] })
      ] })
    ] });
  };
  const unityLicenses = /* @__PURE__ */ JSON.parse(`[{"name":"React Unity","version":"0.21.2","licenses":"MIT","repository":"https://github.com/ReactUnity/core.git","publisher":"Gokhan Kurt","licenseText":"MIT License\\r\\n\\r\\nCopyright (c) 2020 Gökhan Kurt\\r\\n\\r\\nPermission is hereby granted, free of charge, to any person obtaining a copy\\r\\nof this software and associated documentation files (the \\"Software\\"), to deal\\r\\nin the Software without restriction, including without limitation the rights\\r\\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\\r\\ncopies of the Software, and to permit persons to whom the Software is\\r\\nfurnished to do so, subject to the following conditions:\\r\\n\\r\\nThe above copyright notice and this permission notice shall be included in all\\r\\ncopies or substantial portions of the Software.\\r\\n\\r\\nTHE SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\\r\\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\\r\\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\\r\\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\\r\\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\\r\\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\\r\\nSOFTWARE.\\r\\n"},{"name":"2D Animation","version":"12.0.3","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"com.unity.2d.animation copyright © 2023 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"2D Aseprite Importer","version":"2.0.2","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"com.unity.2d.aseprite copyright © 2025 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"2D Common","version":"11.0.1","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"com.unity.2d.common copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"2D PSD Importer","version":"11.0.2","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"com.unity.2d.psdimporter copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"2D Sprite","version":"1.0.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.2d.sprite copyright © 2019 Unity Technologies\\n\\nLicensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"2D SpriteShape","version":"12.0.2","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"com.unity.2d.spriteshape copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"2D Tilemap Extras","version":"5.0.2","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/2d.git","publisher":"Unity Technologies","licenseText":"2D Tilemap Extras copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent\\nprojects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS\\nWITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and\\nconditions.\\n"},{"name":"2D Tilemap Editor","version":"1.0.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.2d.tilemap copyright © 2019 Unity Technologies ApS\\n\\nLicensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Burst","version":"1.8.25","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/burst.git","publisher":"Unity Technologies","licenseText":"Burst copyright © 2022 Unity Technologies\\nSource code of the package is licensed under the Unity Companion License (see https://unity3d.com/legal/licenses/unity_companion_license); otherwise licensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Unity Version Control","version":"2.9.3","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.cloud.collaborate.git","publisher":"Unity Technologies","licenseText":"Unity Version Control copyright © 2025 Unity Technologies\\n\\nLicensed under the Unity Package Distribution License (see https://unity.com/legal/licenses/unity-package-distribution-license).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"Collections","version":"2.5.7","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/dots.git","publisher":"Unity Technologies","licenseText":"com.unity.collections copyright © 2024 Unity Technologies\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Editor Coroutines","version":"1.0.1","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.editorcoroutines.git","publisher":"Unity Technologies","licenseText":"com.unity.core.editorcoroutines copyright © 2018 Unity Technologies ApS\\r\\n\\r\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License). \\r\\n\\r\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\r\\n"},{"name":"Custom NUnit","version":"2.0.5","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"Custom Nunit copyright © 2019 Unity Technologies\\n\\nLicensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"JetBrains Rider Editor","version":"3.0.39","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.ide.rider.git","publisher":"Unity Technologies","licenseText":"JetBrains Rider Editor copyright © 2025 Unity Technologies\\n\\nMIT License\\n\\nCopyright (c) 2019 Unity Technologies Copyright (c) 2019 JetBrains s.r.o. All rights reserved.\\n\\nPermission is hereby granted, free of charge, to any person obtaining a copy\\nof this software and associated documentation files (the \\"Software\\"), to deal\\nin the Software without restriction, including without limitation the rights\\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\\ncopies of the Software, and to permit persons to whom the Software is\\nfurnished to do so, subject to the following conditions:\\n\\nThe above copyright notice and this permission notice shall be included in all\\ncopies or substantial portions of the Software.\\n\\nTHE SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\\nSOFTWARE.\\n"},{"name":"Visual Studio Editor","version":"2.0.27","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.ide.visualstudio.git","publisher":"Unity Technologies","licenseText":"Visual Studio Editor copyright © 2019 Unity Technologies\\nVisual Studio Editor copyright © 2019 Microsoft Corporation. All rights reserved.\\n\\nMIT License\\n\\nPermission is hereby granted, free of charge, to any person obtaining a copy\\nof this software and associated documentation files (the \\"Software\\"), to deal\\nin the Software without restriction, including without limitation the rights\\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\\ncopies of the Software, and to permit persons to whom the Software is\\nfurnished to do so, subject to the following conditions:\\n\\nThe above copyright notice and this permission notice shall be included in all\\ncopies or substantial portions of the Software.\\n\\nTHE SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\\nSOFTWARE.\\n"},{"name":"Input System","version":"1.14.2","licenses":"Unknown","repository":"https://github.com/Unity-Technologies/InputSystem.git","publisher":"Unity Technologies","licenseText":"com.unity.inputsystem copyright © 2024 Unity Technologies\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see [https://unity3d.com/legal/licenses/unity_companion_license](https://unity3d.com/legal/licenses/unity_companion_license)).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Mathematics","version":"1.3.2","licenses":"Unknown","repository":"https://github.com/Unity-Technologies/Unity.Mathematics.git","publisher":"Unity Technologies","licenseText":"com.unity.mathematics copyright © 2023 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"Multiplayer Center","version":"1.0.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.multiplayer.center copyright © 2023 Unity Technologies\\n\\nLicensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.”\\n\\n"},{"name":"Mono Cecil","version":"1.11.5","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.nuget.mono-cecil.git","publisher":"Unity Technologies","licenseText":"com.unity.nuget.mono-cecil copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Newtonsoft Json","version":"3.2.1","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.nuget.newtonsoft-json.git","publisher":"Unity Technologies","licenseText":"Nuget.Newtonsoft.Json copyright © 2022 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Scriptable Render Pipeline Core","version":"17.2.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.render-pipelines.core copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Universal Render Pipeline Config","version":"17.0.3","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.render-pipelines.universal-config copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Universal Render Pipeline","version":"17.2.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.render-pipelines.universal copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Unity Light Transport Library","version":"1.0.1","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.rendering.light-transport copyright © 2023 Unity Technologies\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Searcher","version":"4.9.3","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.searcher.git","publisher":"Unity Technologies","licenseText":"**Unity Companion Package License v1.0 (\\"_License_\\")**\\n\\ncom.unity.searcher copyright © 2019 Unity Technologies ApS\\n\\nUnity hereby grants to you a worldwide, non-exclusive, no-charge, and royalty-free copyright license to reproduce, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute the software that is made available with this License (\\"**_Software_**\\"), subject to the following terms and conditions:\\n\\n1. *Unity Companion Use Only*. Exercise of the license granted herein is limited to exercise for the creation, use, and/or distribution of applications, software, or other content pursuant to a valid Unity development engine software license (\\"**_Engine License_**\\"). That means while use of the Software is not limited to use in the software licensed under the Engine License, the Software may not be used for any purpose other than the creation, use, and/or distribution of Engine License-dependent applications, software, or other content. No other exercise of the license granted herein is permitted.\\n\\n1. *No Modification of Engine License*. Neither this License nor any exercise of the license granted herein modifies the Engine License in any way.\\n\\n1. *Ownership & Grant Back to You*. \\n\\n    3.1. You own your content. In this License, \\"derivative works\\" means derivatives of the Software itself--works derived only from the Software by you under this License (for example, modifying the code of the Software itself to improve its efficacy); “derivative works” of the Software do not include, for example, games, apps, or content that you create using the Software. You keep all right, title, and interest to your own content.\\n\\n    3.2. Unity owns its content. While you keep all right, title, and interest to your own content per the above, as between Unity and you, Unity will own all right, title, and interest to all intellectual property rights (including patent, trademark, and copyright) in the Software and derivative works of the Software, and you hereby assign and agree to assign all such rights in those derivative works to Unity. \\n\\n    3.3. You have a license to those derivative works. Subject to this License, Unity grants to you the same worldwide, non-exclusive, no-charge, and royalty-free copyright license to derivative works of the Software you create as is granted to you for the Software under this License.\\n\\n1. *Trademarks*. You are not granted any right or license under this License to use any trademarks, service marks, trade names, products names, or branding of Unity or its affiliates (\\"**_Trademarks_**\\"). Descriptive uses of Trademarks are permitted; see, for example, Unity’s Branding Usage Guidelines at [https://unity3d.com/public-relations/brand](https://unity3d.com/public-relations/brand).\\n\\n1. *Notices & Third-Party Rights*. This License, including the copyright notice above, must be provided in all substantial portions of the Software and derivative works thereof (or, if that is impracticable, in any other location where such notices are customarily placed). Further, if the Software is accompanied by a Unity \\"third-party notices\\" or similar file, you acknowledge and agree that software identified in that file is governed by those separate license terms.\\n\\n1. *DISCLAIMER, LIMITATION OF LIABILITY*. THE SOFTWARE AND ANY DERIVATIVE WORKS THEREOF IS PROVIDED ON AN \\"AS IS\\" BASIS, AND IS PROVIDED WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND/OR NONINFRINGEMENT. IN NO EVENT SHALL ANY COPYRIGHT HOLDER OR AUTHOR BE LIABLE FOR ANY CLAIM, DAMAGES (WHETHER DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL, INCLUDING PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, LOSS OF USE, DATA, OR PROFITS, AND BUSINESS INTERRUPTION), OR OTHER LIABILITY WHATSOEVER, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM OR OUT OF, OR IN CONNECTION WITH, THE SOFTWARE OR ANY DERIVATIVE WORKS THEREOF OR THE USE OF OR OTHER DEALINGS IN SAME, EVEN WHERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\\n\\n1. *USE IS ACCEPTANCE and License Versions*. Your receipt and use of the Software constitutes your acceptance of this License and its terms and conditions. Software released by Unity under this License may be modified or updated and the License with it; upon any such modification or update, you will comply with the terms of the updated License for any use of any of the Software under the updated License. \\n\\n1. *Use in Compliance with Law and Termination*. Your exercise of the license granted herein will at all times be in compliance with applicable law and will not infringe any proprietary rights (including intellectual property rights); this License will terminate immediately on any breach by you of this License.\\n\\n1. *Severability*. If any provision of this License is held to be unenforceable or invalid, that provision will be enforced to the maximum extent possible and the other provisions will remain in full force and effect.\\n\\n1. *Governing Law and Venue*. This License is governed by and construed in accordance with the laws of Denmark, except for its conflict of laws rules; the United Nations Convention on Contracts for the International Sale of Goods will not apply. If you reside (or your principal place of business is) within the United States, you and Unity agree to submit to the personal and exclusive jurisdiction of and venue in the state and federal courts located in San Francisco County, California concerning any dispute arising out of this License (\\"**_Dispute_**\\"). If you reside (or your principal place of business is) outside the United States, you and Unity agree to submit to the personal and exclusive jurisdiction of and venue in the courts located in Copenhagen, Denmark concerning any Dispute."},{"name":"Shader Graph","version":"17.2.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"com.unity.shadergraph copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Performance testing API","version":"3.2.0","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.test-framework.performance.git","publisher":"Unity Technologies","licenseText":"com.unity.test-framework.performance copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Test Framework","version":"1.6.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"Test Framework copyright © 2024 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License). \\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Timeline","version":"1.8.10","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.timeline.git","publisher":"Unity Technologies","licenseText":"Timeline copyright © 2023 Unity Technologies\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Unity UI","version":"2.0.0","licenses":"Unknown","repository":"","publisher":"Unity Technologies","licenseText":"Unity UI Copyright © 2015-2020 Unity Technologies ApS (\\"**_Unity_**\\")\\n\\nLicensed under the Unity Companion License for Unity-dependent projects (see https://unity3d.com/legal/licenses/unity_companion_license).\\n\\n_Unless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Vector Graphics","version":"2.0.0-preview.25","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.vectorgraphics.git","publisher":"Unity Technologies","licenseText":"com.unity.vectorgraphics copyright © 2020 Unity Technologies ApS\\n\\nLicensed under the Unity Companion License for Unity-dependent projects--see [Unity Companion License](http://www.unity3d.com/legal/licenses/Unity_Companion_License).\\n\\nUnless expressly provided otherwise, the Software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions."},{"name":"Visual Scripting","version":"1.9.9","licenses":"Unknown","repository":"https://github.cds.internal.unity3d.com/unity/com.unity.visualscripting.git","publisher":"Unity Technologies","licenseText":"com.unity.visualscripting copyright © 2020 Unity Technologies\\n\\nLicensed under the Unity Package Distribution License (see https://unity3d.com/legal/licenses/Unity_Package_Distribution_License ).\\n\\nUnless expressly provided otherwise, the software under this license is made available strictly on an “AS IS” BASIS WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Please review the license for details on these and other terms and conditions.\\n"},{"name":"Melete","version":"0.200","licenses":"OFL-1.1","repository":"https://dotcolon.net/font/melete/","publisher":"DotColon","licenseText":"This Font Software is licensed under the SIL Open Font License, Version 1.1.\\r\\nThis license is copied below, and is also available with a FAQ at:\\r\\nhttp://scripts.sil.org/OFL\\r\\n\\r\\n\\r\\n-----------------------------------------------------------\\r\\nSIL OPEN FONT LICENSE Version 1.1 - 26 February 2007\\r\\n-----------------------------------------------------------\\r\\n\\r\\nPREAMBLE\\r\\nThe goals of the Open Font License (OFL) are to stimulate worldwide\\r\\ndevelopment of collaborative font projects, to support the font creation\\r\\nefforts of academic and linguistic communities, and to provide a free and\\r\\nopen framework in which fonts may be shared and improved in partnership\\r\\nwith others.\\r\\n\\r\\nThe OFL allows the licensed fonts to be used, studied, modified and\\r\\nredistributed freely as long as they are not sold by themselves. The\\r\\nfonts, including any derivative works, can be bundled, embedded, \\r\\nredistributed and/or sold with any software provided that any reserved\\r\\nnames are not used by derivative works. The fonts and derivatives,\\r\\nhowever, cannot be released under any other type of license. The\\r\\nrequirement for fonts to remain under this license does not apply\\r\\nto any document created using the fonts or their derivatives.\\r\\n\\r\\nDEFINITIONS\\r\\n\\"Font Software\\" refers to the set of files released by the Copyright\\r\\nHolder(s) under this license and clearly marked as such. This may\\r\\ninclude source files, build scripts and documentation.\\r\\n\\r\\n\\"Reserved Font Name\\" refers to any names specified as such after the\\r\\ncopyright statement(s).\\r\\n\\r\\n\\"Original Version\\" refers to the collection of Font Software components as\\r\\ndistributed by the Copyright Holder(s).\\r\\n\\r\\n\\"Modified Version\\" refers to any derivative made by adding to, deleting,\\r\\nor substituting -- in part or in whole -- any of the components of the\\r\\nOriginal Version, by changing formats or by porting the Font Software to a\\r\\nnew environment.\\r\\n\\r\\n\\"Author\\" refers to any designer, engineer, programmer, technical\\r\\nwriter or other person who contributed to the Font Software.\\r\\n\\r\\nPERMISSION & CONDITIONS\\r\\nPermission is hereby granted, free of charge, to any person obtaining\\r\\na copy of the Font Software, to use, study, copy, merge, embed, modify,\\r\\nredistribute, and sell modified and unmodified copies of the Font\\r\\nSoftware, subject to the following conditions:\\r\\n\\r\\n1) Neither the Font Software nor any of its individual components,\\r\\nin Original or Modified Versions, may be sold by itself.\\r\\n\\r\\n2) Original or Modified Versions of the Font Software may be bundled,\\r\\nredistributed and/or sold with any software, provided that each copy\\r\\ncontains the above copyright notice and this license. These can be\\r\\nincluded either as stand-alone text files, human-readable headers or\\r\\nin the appropriate machine-readable metadata fields within text or\\r\\nbinary files as long as those fields can be easily viewed by the user.\\r\\n\\r\\n3) No Modified Version of the Font Software may use the Reserved Font\\r\\nName(s) unless explicit written permission is granted by the corresponding\\r\\nCopyright Holder. This restriction only applies to the primary font name as\\r\\npresented to the users.\\r\\n\\r\\n4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font\\r\\nSoftware shall not be used to promote, endorse or advertise any\\r\\nModified Version, except to acknowledge the contribution(s) of the\\r\\nCopyright Holder(s) and the Author(s) or with their explicit written\\r\\npermission.\\r\\n\\r\\n5) The Font Software, modified or unmodified, in part or in whole,\\r\\nmust be distributed entirely under this license, and must not be\\r\\ndistributed under any other license. The requirement for fonts to\\r\\nremain under this license does not apply to any document created\\r\\nusing the Font Software.\\r\\n\\r\\nTERMINATION\\r\\nThis license becomes null and void if any of the above conditions are\\r\\nnot met.\\r\\n\\r\\nDISCLAIMER\\r\\nTHE FONT SOFTWARE IS PROVIDED \\"AS IS\\", WITHOUT WARRANTY OF ANY KIND,\\r\\nEXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF\\r\\nMERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT\\r\\nOF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE\\r\\nCOPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\\r\\nINCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL\\r\\nDAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\\r\\nFROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM\\r\\nOTHER DEALINGS IN THE FONT SOFTWARE.\\r\\n"},{"name":"Input Prompts","version":"1.4.1","licenses":"CC0 1.0 Universal","repository":"https://kenney.nl/assets/input-prompts","publisher":"Kenney","licenseText":"\\t\\r\\n\\r\\n\\tInput Prompts (1.4.1)\\r\\n\\r\\n\\tCreated/distributed by Kenney (www.kenney.nl)\\r\\n\\tCreation date: 22-11-2025\\r\\n\\r\\n\\t\\t\\t------------------------------\\r\\n\\r\\n\\tLicense: (Creative Commons Zero, CC0)\\r\\n\\thttp://creativecommons.org/publicdomain/zero/1.0/\\r\\n\\r\\n\\tYou can use this content for personal, educational, and commercial purposes.\\r\\n\\r\\n\\tSupport by crediting 'Kenney' or 'www.kenney.nl' (this is not a requirement)\\r\\n\\r\\n\\t\\t\\t------------------------------\\r\\n\\r\\n\\t• Website : www.kenney.nl\\r\\n\\t• Donate  : www.kenney.nl/donate\\r\\n\\r\\n\\t• Patreon : patreon.com/kenney\\r\\n\\t\\r\\n\\tFollow on social media for updates:\\r\\n\\r\\n\\t• Twitter:\\ttwitter.com/KenneyNL\\r\\n\\t• Instagram: \\tinstagram.com/kenney_nl\\r\\n\\t• Mastodon:\\tmastodon.gamedev.place/@kenney"},{"name":"Jint","version":"4.2.2","licenses":"BSD-2-Clause","repository":"https://github.com/sebastienros/jint","publisher":"Sebastien Ros","licenseText":"BSD 2-Clause License\\n\\nCopyright (c) 2013, Sebastien Ros\\nAll rights reserved..."}]`);
  const webLicensesData = [
    {
      name: "@reactunity/renderer",
      version: "0.21.0",
      licenses: "MIT",
      repository: "https://github.com/ReactUnity/renderer",
      publisher: "Gokhan Kurt",
      licenseText: 'MIT License\n\nCopyright (c) 2020 Gökhan Kurt\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n'
    },
    {
      name: "react",
      version: "19.2.3",
      licenses: "MIT",
      repository: "https://github.com/facebook/react",
      publisher: "",
      licenseText: 'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n'
    },
    {
      name: "react-dom",
      version: "19.2.3",
      licenses: "MIT",
      repository: "https://github.com/facebook/react",
      publisher: "",
      licenseText: 'MIT License\n\nCopyright (c) Meta Platforms, Inc. and affiliates.\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the "Software"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.\n'
    }
  ];
  const webLicenses = Array.isArray(webLicensesData) ? webLicensesData : Object.entries(webLicensesData).map(([key, value]) => __spreadValues({
    name: key
  }, value));
  const LicenseMenu = ({ onBack }) => {
    var _a;
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const allLicenses = reactExports.useMemo(() => {
      return [...unityLicenses, ...webLicenses].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }, []);
    const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
    const [focusArea, setFocusArea] = reactExports.useState("list");
    const [scrollPos, setScrollPos] = reactExports.useState(0);
    const [opacity, setOpacity] = reactExports.useState(0);
    const [isExiting, setIsExiting] = reactExports.useState(false);
    const [isLoading, setIsLoading] = reactExports.useState(true);
    const [contentHeight, setContentHeight] = reactExports.useState(0);
    const [containerHeight, setContainerHeight] = reactExports.useState(0);
    const [leftListHeight, setLeftListHeight] = reactExports.useState(0);
    const containerRef = reactExports.useRef(null);
    const textContentRef = reactExports.useRef(null);
    const leftListRef = reactExports.useRef(null);
    const currentLicense = allLicenses[selectedIndex];
    const getHeight = (ref) => {
      var _a2, _b, _c, _d, _e, _f;
      if (!ref) return 0;
      try {
        if (((_a2 = ref.Layout) == null ? void 0 : _a2.height) > 0) return ref.Layout.height;
        if (((_b = ref.layout) == null ? void 0 : _b.height) > 0) return ref.layout.height;
        if (ref.scrollHeight > 0) return ref.scrollHeight;
        if (ref.clientHeight > 0) return ref.clientHeight;
        if (((_d = (_c = ref.Element) == null ? void 0 : _c.layout) == null ? void 0 : _d.height) > 0) return ref.Element.layout.height;
        if (((_f = (_e = ref.RectTransform) == null ? void 0 : _e.rect) == null ? void 0 : _f.height) > 0) return ref.RectTransform.rect.height;
      } catch (e) {
      }
      return 0;
    };
    reactExports.useEffect(() => {
      setScrollPos(0);
      setIsLoading(true);
      setContentHeight(0);
      setContainerHeight(0);
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        let cHeight = 0;
        let vHeight = 0;
        let lHeight = 0;
        if (containerRef.current) {
          vHeight = getHeight(containerRef.current);
        }
        if (textContentRef.current) {
          cHeight = getHeight(textContentRef.current);
        }
        if (leftListRef.current) {
          lHeight = getHeight(leftListRef.current);
        }
        if (cHeight > 0) setContentHeight(cHeight);
        if (vHeight > 0) setContainerHeight(vHeight);
        if (lHeight > 0) setLeftListHeight(lHeight);
        if (cHeight > 0 && vHeight > 0) {
          setIsLoading(false);
          clearInterval(intervalId);
        }
        if (Date.now() - startTime > 2e3) {
          clearInterval(intervalId);
          setIsLoading(false);
        }
      }, 50);
      return () => clearInterval(intervalId);
    }, [currentLicense]);
    reactExports.useEffect(() => {
      if (isExiting) {
        setOpacity(0);
        const timer = setTimeout(onBack, 300);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
      }
    }, [isExiting, onBack]);
    reactExports.useEffect(() => {
      window.onMenuInput = (event) => {
        if (isExiting) return;
        if (event === "cancel") {
          interop == null ? void 0 : interop.PlaySound("cancel");
          if (focusArea === "content") {
            setFocusArea("list");
          } else {
            setIsExiting(true);
          }
          return;
        }
        if (focusArea === "list") {
          if (event === "up") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedIndex((prev) => (prev - 1 + allLicenses.length) % allLicenses.length);
          }
          if (event === "down") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedIndex((prev) => (prev + 1) % allLicenses.length);
          }
          if (event === "right" || event === "submit") {
            interop == null ? void 0 : interop.PlaySound("submit");
            setFocusArea("content");
          }
        } else {
          if (isLoading) return;
          if (event === "up") {
            setScrollPos((prev) => Math.max(0, prev - 50));
          }
          if (event === "down") {
            setScrollPos((prev) => {
              let cHeight = contentHeight || getHeight(textContentRef.current);
              let vHeight = containerHeight || getHeight(containerRef.current);
              if (cHeight <= 0) {
                const text = (currentLicense == null ? void 0 : currentLicense.licenseText) || "";
                const newLines = text.split("\n").length;
                cHeight = newLines * 36 * 1.1;
              }
              if (vHeight <= 0) vHeight = 600;
              const visibleHeight = vHeight;
              if (cHeight <= visibleHeight) return 0;
              const maxScroll = cHeight - visibleHeight;
              return Math.min(maxScroll, prev + 50);
            });
          }
          if (event === "left") {
            interop == null ? void 0 : interop.PlaySound("cancel");
            setFocusArea("list");
          }
        }
      };
      return () => {
        window.onMenuInput = () => {
        };
      };
    }, [focusArea, selectedIndex, allLicenses.length, isExiting, interop, contentHeight, containerHeight, isLoading]);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col w-full h-full p-12 text-white transition-opacity duration-300", style: { opacity, fontFamily: "SourceHanCodeJP" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "LICENSES", className: "text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600", children: "OPEN SOURCE SOFTWARE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row w-full flex-1 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-[450px] border-r-2 border-cyan-900 pr-4 h-full flex-col flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-4xl mb-6 text-cyan-400 font-bold tracking-widest", children: "LIBRARIES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { ref: leftListRef, className: "flex-col flex-1 overflow-hidden relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-col", style: {
            // アイテム高さ: h-24(96px) + mb-6(24px) = 120px
            // スクロール位置の計算ロジック:
            // 1. 基本位置: (selectedIndex - 2) * 120
            //    選択中の項目がリストの「上から3番目」に来るようにスクロールさせます。
            // 2. 上限設定: (allLicenses.length * 120) - (leftListHeight || 600)
            //    リストの末尾が画面の下端より上にいかない（下に空白ができない）ように制限します。
            // 3. 下限設定: Math.max(0, ...) でマイナス（上方向への行き過ぎ）を防ぎます。
            transform: `translateY(${Math.max(0, Math.min((selectedIndex - 2) * 120, allLicenses.length * 120 - (leftListHeight || 600)))}px)`,
            transition: "transform 0.2s ease-out"
          }, children: allLicenses.map((l, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            MenuButton,
            {
              label: l.name,
              isSelected: idx === selectedIndex,
              isPressed: false,
              barClass: "w-full",
              className: "h-24 mb-6 w-full flex-shrink-0",
              style: { opacity: focusArea === "list" ? 1 : 0.5 }
            },
            idx
          )) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: `flex-1 pl-8 flex-col h-full ${focusArea === "content" ? "opacity-100" : "opacity-70"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl mb-2 text-cyan-400 font-bold tracking-widest", children: currentLicense == null ? void 0 : currentLicense.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row mb-6 text-gray-400 text-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { className: "mr-4", children: [
              "VER: ",
              (currentLicense == null ? void 0 : currentLicense.version) || "N/A"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { children: [
              "LICENSE: ",
              currentLicense == null ? void 0 : currentLicense.licenses
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "view",
            {
              ref: containerRef,
              className: "flex-1 bg-gray-900 border border-gray-700 overflow-hidden relative flex-col",
              children: [
                isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute inset-0 bg-gray-900 items-center justify-center", style: { zIndex: 50 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-2xl animate-pulse tracking-widest", children: "CALCULATING_LAYOUT..." }) }),
                !isLoading && contentHeight > containerHeight && /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute right-1 top-1 bottom-1 w-1 bg-gray-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "view",
                  {
                    className: "w-full bg-cyan-600",
                    style: {
                      // バーの高さ: (表示領域 / 全体の高さ) * 100%。
                      // コンテンツが長いほどバーは短くなります。ただし、視認性を保つため最小10%を確保します。
                      height: `${Math.max(10, containerHeight / contentHeight * 100)}%`,
                      // バーの位置: (現在のスクロール量 / 全体の高さ) * 100%。
                      // コンテンツのスクロール位置（割合）に合わせてバーを移動させます。
                      top: `${scrollPos / contentHeight * 100}%`
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "view",
                  {
                    ref: textContentRef,
                    style: {
                      transform: `translateY(${scrollPos}px)`,
                      transition: "transform 0.1s linear",
                      flexDirection: "column",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      padding: 16,
                      // p-4相当のパディング
                      opacity: isLoading ? 0 : 1
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "text",
                      {
                        className: "text-white text-2xl leading-normal whitespace-pre-wrap",
                        style: { flexShrink: 0, alignSelf: "flex-start" },
                        children: ((_a = currentLicense == null ? void 0 : currentLicense.licenseText) == null ? void 0 : _a.trim()) || "No license text available."
                      }
                    ) })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "mt-2 flex-row justify-end", children: focusArea === "content" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-2xl animate-pulse mr-8", children: "[UP/DOWN] SCROLL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-2xl animate-pulse", children: "[LEFT/ESC] BACK" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-500 text-2xl", children: "[RIGHT/ENTER] VIEW DETAILS" }) })
        ] })
      ] })
    ] });
  };
  const CATEGORIES = ["GAMEPLAY", "AUDIO", "SYSTEM", "STATS", "ABOUT", "RESET"];
  const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._!?&@";
  const SETTINGS_MAP = {
    "GAMEPLAY": [
      { id: "hp", label: "INITIAL HP", type: "slider", min: 1, max: 10, description: "Set the initial Hit Points (1-10)." },
      { id: "sp", label: "INITIAL SP", type: "slider", min: 0, max: 10, description: "Set the initial Special Points (0-10)." },
      { id: "auto_fire", label: "AUTO FIRE", type: "toggle", description: "Toggle automatic firing." }
    ],
    "AUDIO": [
      { id: "bgm_vol", label: "BGM VOLUME", type: "slider", min: 0, max: 100, description: "Adjust the volume level of background music." },
      { id: "se_vol", label: "SE VOLUME", type: "slider", min: 0, max: 100, description: "Adjust the volume level of sound effects." }
    ],
    "SYSTEM": [
      // Player Name: 決定キーで編集モードに入り、上下で文字変更、左右でカーソル移動
      { id: "player_name", label: "PLAYER NAME", type: "text", description: "Set your pilot name." },
      { id: "vibration", label: "VIBRATION", type: "toggle", description: "Enable or disable controller vibration feedback." }
    ],
    "STATS": [
      { id: "total_games_played", label: "GAMES PLAYED", type: "stat", description: "Total number of games played." },
      { id: "total_play_time", label: "PLAY TIME", type: "stat", description: "Total time spent in game." },
      { id: "total_score", label: "TOTAL SCORE", type: "stat", description: "Total score earned across all games." },
      { id: "total_sp_used", label: "SP USED", type: "stat", description: "Total number of Spin Attacks activated." },
      { id: "total_chain_kills", label: "CHAIN KILLS", type: "stat", description: "Total enemies defeated by chain explosions." },
      { id: "items_collected", label: "ITEMS COLLECTED", type: "stat", description: "Total power-up items collected." },
      { id: "total_enemies_defeated", label: "ENEMIES DEFEATED", type: "stat", description: "Total number of enemies destroyed." },
      { id: "total_shots_fired", label: "SHOTS FIRED", type: "stat", description: "Total number of bullets fired." },
      { id: "total_damage_dealt", label: "DAMAGE DEALT", type: "stat", description: "Total damage dealt to enemies." },
      { id: "total_damage_taken", label: "DAMAGE TAKEN", type: "stat", description: "Total damage received from enemies." }
    ],
    "ABOUT": [
      { id: "app_version", label: "VERSION", type: "stat", description: "Current application version." },
      { id: "developer", label: "DEVELOPER", type: "stat", description: "Developed by potatonecst." },
      { id: "show_licenses", label: "LICENSES", type: "license", description: "View third-party software licenses." }
    ],
    "RESET": [
      { id: "reset_defaults", label: "RESET SETTINGS", type: "button", description: "Restore settings to default values." },
      { id: "delete_save", label: "DELETE SAVE DATA", type: "button", description: "Delete all save data including stats and rankings." }
    ]
  };
  const Settings = ({ onBack, onSettingChange }) => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [opacity, setOpacity] = reactExports.useState(0);
    const [isExiting, setIsExiting] = reactExports.useState(false);
    const [isDeleting, setIsDeleting] = reactExports.useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = reactExports.useState(0);
    const [selectedItemIndex, setSelectedItemIndex] = reactExports.useState(0);
    const [focusArea, setFocusArea] = reactExports.useState("category");
    const [isCategoryPressed, setIsCategoryPressed] = reactExports.useState(false);
    const [isEditingName, setIsEditingName] = reactExports.useState(false);
    const [editCursor, setEditCursor] = reactExports.useState(0);
    const [showLicenseMenu, setShowLicenseMenu] = reactExports.useState(false);
    const [showDialog, setShowDialog] = reactExports.useState(false);
    const [dialogAction, setDialogAction] = reactExports.useState(null);
    const [dialogSelection, setDialogSelection] = reactExports.useState(0);
    const [values, setValues] = reactExports.useState({
      "hp": 3,
      "sp": 3,
      "auto_fire": false,
      "bgm_vol": 80,
      "se_vol": 100,
      "player_name": "PLAYER",
      "vibration": true,
      "total_games_played": 0,
      "total_play_time": 0,
      "total_score": 0,
      "total_sp_used": 0,
      "total_chain_kills": 0,
      "items_collected": 0,
      "total_enemies_defeated": 0,
      "total_shots_fired": 0,
      "total_damage_dealt": 0,
      "total_damage_taken": 0,
      "app_version": "0.0.0",
      "developer": "potatonecst"
    });
    const [listHeight, setListHeight] = reactExports.useState(0);
    const listRef = reactExports.useRef(null);
    reactExports.useEffect(() => {
      if (interop && typeof interop.GetSettings === "function") {
        try {
          const json = interop.GetSettings();
          const data = JSON.parse(json);
          setValues((prev) => __spreadValues(__spreadValues({}, prev), data));
        } catch (e) {
          console.error("Failed to parse settings:", e);
          setValues({
            "hp": 3,
            "sp": 3,
            "auto_fire": false,
            "player_name": "PLAYER",
            "bgm_vol": 80,
            "se_vol": 100,
            "vibration": true,
            "total_score": 0,
            "total_sp_used": 0,
            "total_chain_kills": 0,
            "items_collected": 0,
            "total_damage_dealt": 0,
            "total_games_played": 0,
            "total_play_time": 0,
            "total_enemies_defeated": 0,
            "total_shots_fired": 0,
            "total_damage_taken": 0
          });
        }
      } else {
        setValues({
          "hp": 3,
          "sp": 3,
          "auto_fire": false,
          "player_name": "PLAYER",
          "bgm_vol": 80,
          "se_vol": 100,
          "vibration": true
        });
      }
      if (interop && typeof interop.GetAppVersion === "function") {
        const ver = interop.GetAppVersion();
        setValues((prev) => __spreadProps(__spreadValues({}, prev), { "app_version": ver }));
      }
    }, [interop]);
    reactExports.useEffect(() => {
      var _a;
      if (listRef.current) {
        const h = listRef.current.clientHeight || ((_a = listRef.current.layout) == null ? void 0 : _a.height) || 0;
        if (h > 0) setListHeight(h);
      }
    });
    reactExports.useEffect(() => {
      if (isExiting) {
        setOpacity(0);
        const timer = setTimeout(() => {
          interop == null ? void 0 : interop.SaveSettings();
          onBack();
        }, 300);
        return () => clearTimeout(timer);
      } else if (!showLicenseMenu) {
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
      }
    }, [isExiting, onBack, showLicenseMenu]);
    const currentCategory = CATEGORIES[selectedCategoryIndex];
    const currentItems = SETTINGS_MAP[currentCategory];
    const updateUnity = reactExports.useCallback((key, val) => {
      if (interop && typeof interop.UpdateSetting === "function") {
        interop.UpdateSetting(key, val.toString());
        onSettingChange == null ? void 0 : onSettingChange(key, val);
      }
    }, [interop, onSettingChange]);
    const handleReset = reactExports.useCallback(() => {
      const defaults = {
        "hp": 3,
        "sp": 3,
        "auto_fire": false,
        "bgm_vol": 80,
        "se_vol": 100,
        "player_name": "PLAYER",
        "vibration": true
        // 統計情報はリセット対象外とする
      };
      setValues((prev) => __spreadValues(__spreadValues({}, prev), defaults));
      Object.entries(defaults).forEach(([key, val]) => {
        updateUnity(key, val);
      });
      interop == null ? void 0 : interop.PlaySound("submit");
    }, [updateUnity, interop]);
    const handleDeleteSave = reactExports.useCallback(() => {
      if (interop && typeof interop.DeleteSaveData === "function") {
        setIsDeleting(true);
        interop.DeleteSaveData();
        interop == null ? void 0 : interop.PlaySound("submit");
        setOpacity(0);
      }
    }, [interop]);
    const handleOpenLicenseMenu = reactExports.useCallback(() => {
      interop == null ? void 0 : interop.PlaySound("submit");
      setOpacity(0);
      setTimeout(() => {
        setShowLicenseMenu(true);
      }, 300);
    }, [interop]);
    const changeValue = reactExports.useCallback((itemId, delta) => {
      setValues((prev) => {
        var _a, _b;
        const currentVal = prev[itemId];
        const itemDef = currentItems.find((i) => i.id === itemId);
        if (!itemDef) return prev;
        let nextVal = currentVal;
        if (itemDef.type === "slider") {
          const min = (_a = itemDef.min) != null ? _a : 0;
          const max = (_b = itemDef.max) != null ? _b : 100;
          const step = max - min <= 20 ? 1 : 10;
          const numVal = currentVal;
          nextVal = Math.max(min, Math.min(max, numVal + delta * step));
        } else if (itemDef.type === "toggle") {
          nextVal = !currentVal;
        } else if (itemDef.type === "text") {
          return prev;
        } else if (itemDef.type === "button") {
          return prev;
        } else if (itemDef.type === "stat") {
          return prev;
        } else if (itemDef.type === "license") {
          return prev;
        }
        if (nextVal === currentVal) return prev;
        interop == null ? void 0 : interop.PlaySound("move");
        updateUnity(itemId, nextVal);
        return __spreadProps(__spreadValues({}, prev), { [itemId]: nextVal });
      });
    }, [currentItems, updateUnity, interop]);
    reactExports.useEffect(() => {
      if (showLicenseMenu) return;
      window.onTextInput = (char) => {
        if (!isEditingName) return;
        const upperChar = char.toUpperCase();
        if (!CHAR_SET.includes(upperChar)) return;
        setValues((prev) => {
          const currentName = prev["player_name"];
          const chars = currentName.split("");
          chars.splice(editCursor, 0, upperChar);
          const newName = chars.join("").slice(0, 8);
          return __spreadProps(__spreadValues({}, prev), { "player_name": newName });
        });
        setEditCursor((prev) => Math.min(7, prev + 1));
        interop == null ? void 0 : interop.PlaySound("move");
      };
      window.onMenuInput = (event) => {
        if (isExiting || isDeleting) return;
        if (showDialog) {
          if (event === "left" || event === "right") {
            interop == null ? void 0 : interop.PlaySound("move");
            setDialogSelection((prev) => prev === 0 ? 1 : 0);
          } else if (event === "submit") {
            if (dialogSelection === 1) {
              if (dialogAction === "reset_defaults") {
                handleReset();
                setShowDialog(false);
              } else if (dialogAction === "delete_save") {
                handleDeleteSave();
              }
            } else {
              interop == null ? void 0 : interop.PlaySound("cancel");
              setShowDialog(false);
            }
          } else if (event === "cancel") {
            interop == null ? void 0 : interop.PlaySound("cancel");
            setShowDialog(false);
          }
          return;
        }
        const playerName = values["player_name"] || "PLAYER";
        if (isEditingName) {
          if (event === "backspace") {
            if (editCursor >= playerName.length && playerName.length < 8) {
              if (editCursor > 0) {
                setValues((prev) => {
                  const chars = prev["player_name"].split("");
                  chars.splice(editCursor - 1, 1);
                  return __spreadProps(__spreadValues({}, prev), { "player_name": chars.join("") });
                });
                setEditCursor((prev) => Math.max(0, prev - 1));
                interop == null ? void 0 : interop.PlaySound("cancel");
              }
            } else {
              setValues((prev) => {
                const chars = prev["player_name"].split("");
                chars.splice(editCursor, 1);
                return __spreadProps(__spreadValues({}, prev), { "player_name": chars.join("") });
              });
              interop == null ? void 0 : interop.PlaySound("cancel");
            }
            return;
          }
          if (event === "submit" || event === "cancel") {
            setIsEditingName(false);
            interop == null ? void 0 : interop.PlaySound("submit");
            updateUnity("player_name", values["player_name"]);
            return;
          }
          if (event === "left") {
            setEditCursor((prev) => Math.max(0, prev - 1));
            interop == null ? void 0 : interop.PlaySound("move");
          }
          if (event === "right") {
            setEditCursor((prev) => Math.min(playerName.length, 7, prev + 1));
            interop == null ? void 0 : interop.PlaySound("move");
          }
          if (event === "up" || event === "down") {
            setValues((prev) => {
              const currentName = prev["player_name"];
              const chars = currentName.split("");
              const currentChar = chars[editCursor];
              let charIndex = -1;
              if (currentChar) {
                charIndex = CHAR_SET.indexOf(currentChar);
              }
              const baseIndex = charIndex === -1 ? -1 : charIndex;
              const direction = event === "down" ? 1 : -1;
              let nextIndex;
              if (baseIndex === -1) {
                nextIndex = direction === 1 ? 0 : CHAR_SET.length - 1;
              } else {
                nextIndex = (baseIndex + direction + CHAR_SET.length) % CHAR_SET.length;
              }
              chars[editCursor] = CHAR_SET[nextIndex];
              const newName = chars.join("").slice(0, 8);
              return __spreadProps(__spreadValues({}, prev), { "player_name": newName });
            });
            interop == null ? void 0 : interop.PlaySound("move");
          }
          return;
        }
        if (event === "cancel") {
          interop == null ? void 0 : interop.PlaySound("cancel");
          if (focusArea === "item") {
            setFocusArea("category");
          } else {
            setIsExiting(true);
          }
          return;
        }
        if (focusArea === "category") {
          if (event === "up") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedCategoryIndex((prev) => (prev - 1 + CATEGORIES.length) % CATEGORIES.length);
            setSelectedItemIndex(0);
          }
          if (event === "down") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedCategoryIndex((prev) => (prev + 1) % CATEGORIES.length);
            setSelectedItemIndex(0);
          }
          if (event === "right" || event === "submit") {
            interop == null ? void 0 : interop.PlaySound("submit");
            setIsCategoryPressed(true);
            setTimeout(() => setIsCategoryPressed(false), 100);
            setFocusArea("item");
          }
        } else {
          if (event === "up") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedItemIndex((prev) => (prev - 1 + currentItems.length) % currentItems.length);
          }
          if (event === "down") {
            interop == null ? void 0 : interop.PlaySound("move");
            setSelectedItemIndex((prev) => (prev + 1) % currentItems.length);
          }
          if (event === "left") {
            const item = currentItems[selectedItemIndex];
            if (item.type !== "text" && item.type !== "stat" && item.type !== "button") {
              changeValue(item.id, -1);
            }
          }
          if (event === "right") {
            const item = currentItems[selectedItemIndex];
            if (item.type !== "text" && item.type !== "stat" && item.type !== "button") {
              changeValue(item.id, 1);
            }
          }
          if (event === "submit") {
            const item = currentItems[selectedItemIndex];
            if (item.type === "text") {
              interop == null ? void 0 : interop.PlaySound("submit");
              setIsEditingName(true);
              setEditCursor(0);
            } else if (item.type === "button" || item.type === "license") {
              if (item.id === "reset_defaults") {
                interop == null ? void 0 : interop.PlaySound("submit");
                setDialogAction("reset_defaults");
                setDialogSelection(0);
                setShowDialog(true);
              } else if (item.id === "delete_save") {
                interop == null ? void 0 : interop.PlaySound("submit");
                setDialogAction("delete_save");
                setDialogSelection(0);
                setShowDialog(true);
              }
              if (item.id === "show_licenses") {
                handleOpenLicenseMenu();
              }
            }
          }
        }
      };
      return () => {
        window.onMenuInput = () => {
        };
        window.onTextInput = () => {
        };
      };
    }, [focusArea, selectedCategoryIndex, selectedItemIndex, currentItems, isExiting, isDeleting, interop, changeValue, isEditingName, editCursor, values, handleReset, handleDeleteSave, showLicenseMenu, showDialog, dialogAction, dialogSelection]);
    const renderGauge = (value, max) => {
      const total = 10;
      const filled = Math.max(0, Math.min(total, Math.round(value / max * total)));
      const bar = "=".repeat(filled) + "-".repeat(total - filled);
      return { bar: `[${bar}]`, value: (value != null ? value : 0).toString() };
    };
    const formatTime = (seconds) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor(seconds % 3600 / 60);
      const s = Math.floor(seconds % 60);
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };
    let currentDescription = "";
    if (focusArea === "item") {
      currentDescription = currentItems[selectedItemIndex].description;
    } else {
      currentDescription = currentCategory === "STATS" ? "View play statistics." : `Configure ${currentCategory.toLowerCase()} settings.`;
    }
    const ITEM_HEIGHT = 112;
    const visibleHeight = listHeight || 600;
    const bottomPadding = 40;
    const maxScroll = Math.max(0, currentItems.length * ITEM_HEIGHT + bottomPadding - visibleHeight);
    const targetScroll = Math.max(0, Math.min((selectedItemIndex - 1) * ITEM_HEIGHT, maxScroll));
    if (showLicenseMenu) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(LicenseMenu, { onBack: () => setShowLicenseMenu(false) });
    }
    return (
      // ルート要素: p-12を削除し、relativeを追加してダイアログの基準点にする
      // relative: 子要素が 'absolute' で配置される際の「基準点（原点）」となります。
      // これを指定しないと、absoluteな要素は画面全体ではなく、さらに外側の基準点を探して配置されてしまいます。
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col w-full h-full text-white transition-opacity duration-300 relative", style: { opacity, fontFamily: "SourceHanCodeJP" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col w-full h-full p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between items-end mb-4 border-b-2 border-cyan-900 pb-2 w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "SETTINGS", className: "text-8xl font-bold text-white tracking-tighter leading-none whitespace-nowrap" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-3xl text-cyan-600", children: "SYSTEM CONFIGURATION" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row w-full flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-1/4 border-r-2 border-cyan-900 pr-4 h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-4xl mb-6 text-cyan-400 font-bold tracking-widest", children: "CATEGORY" }),
              CATEGORIES.map((cat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                MenuButton,
                {
                  label: cat,
                  isSelected: idx === selectedCategoryIndex,
                  isPressed: isCategoryPressed && idx === selectedCategoryIndex,
                  barClass: "w-full",
                  className: "h-24 mb-6",
                  style: { opacity: focusArea === "category" ? 1 : 0.4 }
                },
                cat
              ))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-3/4 pl-8 flex-col h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl mb-6 text-cyan-400 font-bold tracking-widest", children: currentCategory === "STATS" ? "STATISTICS" : currentCategory === "ABOUT" ? "SYSTEM INFORMATION" : "CONFIGURATION" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "view",
                {
                  ref: listRef,
                  className: `flex-col flex-1 overflow-hidden relative ${focusArea === "item" ? "opacity-100" : "opacity-60"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-col w-full transition-transform duration-200 ease-out", style: { transform: `translateY(${targetScroll}px)` }, children: currentItems.map((item, idx) => {
                    var _a;
                    const isSelected = idx === selectedItemIndex;
                    const val = values[item.id];
                    let displayValue = "";
                    let displayBar = "";
                    if (item.type === "slider") {
                      const gauge = renderGauge(val, (_a = item.max) != null ? _a : 100);
                      displayBar = gauge.bar;
                      displayValue = gauge.value;
                    } else if (item.type === "toggle") {
                      displayValue = val ? "ON" : "OFF";
                    } else if (item.type === "button") {
                      displayValue = "EXECUTE";
                    } else if (item.type === "license") {
                      displayValue = "VIEW >";
                    } else if (item.type === "stat") {
                      if (typeof val === "string") {
                        displayValue = val;
                      } else if (item.id === "total_play_time") {
                        displayValue = formatTime(val || 0);
                      } else {
                        displayValue = (val || 0).toLocaleString();
                      }
                    } else {
                      displayValue = val;
                    }
                    const renderNameInput = () => {
                      const strVal = val || "";
                      return /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-row", children: Array.from({ length: 8 }).map((_, i) => {
                        const char = strVal[i] || "_";
                        const isPlaceholder = i >= strVal.length;
                        const isCursor = isEditingName && isSelected && i === editCursor;
                        return /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "text",
                          {
                            className: `font-mono w-12 text-center text-4xl ${isCursor ? "text-black bg-cyan-400" : isPlaceholder ? "text-gray-600" : "text-yellow-400"}`,
                            style: { fontFamily: "SourceHanCodeJP" },
                            children: char
                          },
                          i
                        );
                      }) });
                    };
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "view",
                      {
                        className: `flex-row justify-between items-center pl-5 pr-3 mb-4 h-24 flex-shrink-0 border-l-4 transition-all duration-200 ${isSelected && focusArea === "item" ? "bg-gray-800 border-cyan-400" : "border-transparent"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `text-4xl ${isSelected && focusArea === "item" ? "text-white" : "text-gray-400"}`, children: item.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `mr-4 text-cyan-400 text-4xl ${isSelected && focusArea === "item" && item.type !== "text" && item.type !== "button" && item.type !== "stat" && item.type !== "license" ? "opacity-100" : "opacity-0"}`, children: "◀" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: `flex-row items-center ${item.type === "slider" ? "w-[36rem] justify-end" : item.type === "stat" || item.type === "license" ? "w-80 justify-end" : "w-80 justify-center"}`, children: item.type === "text" ? renderNameInput() : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              displayBar && /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-yellow-400 text-4xl", style: { fontFamily: "SourceHanCodeJP" }, children: displayBar }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `${item.type === "button" || item.type === "stat" || item.type === "license" ? "w-auto" : "w-24 text-right"} text-yellow-400 text-4xl`, style: { fontFamily: "SourceHanCodeJP" }, children: displayValue })
                            ] }) }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: `ml-4 text-cyan-400 text-4xl ${isSelected && focusArea === "item" && item.type !== "text" && item.type !== "button" && item.type !== "stat" && item.type !== "license" ? "opacity-100" : "opacity-0"}`, children: "▶" })
                          ] })
                        ]
                      },
                      item.id
                    );
                  }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "mt-8 p-4 border border-cyan-900 bg-black bg-opacity-80", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-600 text-3xl mb-2", children: ">> INFO_PANEL" }),
                isEditingName ? /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-3xl", children: "[UP/DOWN]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-3xl mr-8", children: ":CHANGE CHAR" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-3xl", children: "[LEFT/RIGHT]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-3xl", children: ":MOVE CURSOR" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-3xl", children: "[SOUTH]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-3xl mr-8", children: ":OK" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-3xl", children: "[EAST]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-3xl mr-8", children: ":CANCEL" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-400 text-3xl", children: "[WEST]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-300 text-3xl", children: ":DELETE" })
                  ] })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { className: "text-gray-300 text-3xl", children: [
                  ">> ",
                  currentDescription
                ] })
              ] })
            ] })
          ] })
        ] }),
        showDialog && // absolute: 親要素(relative)を基準に、絶対的な位置に配置します。
        // inset-0: top:0, right:0, bottom:0, left:0 と同じ意味。親要素の四隅いっぱいに広げます。
        // zIndex: 100: 重なり順を指定します。数値が大きいほど手前に表示されます。
        // これにより、ヘッダーやパディングに関係なく、画面全体を覆う「暗幕」を作っています。
        // bg-opacity-95: 背景をほぼ真っ黒にして、後ろの画面を隠蔽し、ダイアログに注目させます。
        /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute inset-0 items-center justify-center bg-black bg-opacity-95", style: { zIndex: 100 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "bg-black border-2 border-red-500 p-8 w-[600px] items-center shadow-[0_0_30px_rgba(255,0,0,0.3)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GlitchText,
            {
              text: "WARNING",
              isAlert: true,
              className: "text-6xl text-red-500 mb-4 font-bold tracking-widest",
              style: { fontFamily: "SourceHanCodeJP" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-white text-3xl mb-8 text-center", children: dialogAction === "delete_save" ? "ALL SAVE DATA WILL BE DELETED.\nARE YOU SURE?" : "RESET ALL SETTINGS TO DEFAULT.\nARE YOU SURE?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row w-full justify-around", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: `w-40 items-center py-2 ${dialogSelection === 0 ? "bg-cyan-600" : "border border-gray-600"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                className: "text-3xl",
                style: { color: dialogSelection === 0 ? "#ffffff" : "#9ca3af", fontFamily: "SourceHanCodeJP" },
                children: "NO"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: `w-40 items-center py-2 ${dialogSelection === 1 ? "bg-red-600" : "border border-gray-600"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                className: "text-3xl",
                style: { color: dialogSelection === 1 ? "#ffffff" : "#9ca3af", fontFamily: "SourceHanCodeJP" },
                children: "YES"
              }
            ) })
          ] })
        ] }) })
      ] })
    );
  };
  const TARGET_WIDTH = 1920;
  const TARGET_HEIGHT = 1080;
  const AspectRatioWrapper = ({ children, onReady }) => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [scale, setScale] = reactExports.useState(1);
    const [isVisible, setIsVisible] = reactExports.useState(false);
    reactExports.useEffect(() => {
      const updateLayout = () => {
        let w = 1920;
        let h = 1080;
        if (interop && typeof interop.GetScreenSize === "function") {
          try {
            const jsonStr = interop.GetScreenSize();
            if (jsonStr === "{}") return;
            const size = JSON.parse(jsonStr);
            w = size.x;
            h = size.y;
          } catch (e) {
            console.error("Failed to parse screen size", e);
          }
        } else {
          return;
        }
        const r = Math.min(w / TARGET_WIDTH, h / TARGET_HEIGHT);
        setScale(r);
        setIsVisible(true);
      };
      window.addEventListener("resize", updateLayout);
      const intervalId = setInterval(updateLayout, 500);
      updateLayout();
      return () => {
        window.removeEventListener("resize", updateLayout);
        clearInterval(intervalId);
      };
    }, [interop]);
    const onReadyCalled = reactExports.useRef(false);
    reactExports.useEffect(() => {
      if (isVisible && onReady && !onReadyCalled.current) {
        onReady();
        onReadyCalled.current = true;
      }
    }, [isVisible, onReady]);
    return (
      // 外側コンテナ: 画面全体を覆うコンテナ
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "view",
        {
          id: "aspect-ratio-wrapper",
          className: "w-full h-full relative",
          style: { backgroundColor: isVisible ? "transparent" : "black", overflow: "hidden" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "view",
            {
              style: {
                width: TARGET_WIDTH,
                height: TARGET_HEIGHT,
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -TARGET_WIDTH / 2,
                marginTop: -TARGET_HEIGHT / 2,
                transform: `scale(${scale})`,
                transformOrigin: "center",
                opacity: isVisible ? 1 : 0
                // 準備ができるまで透明にして隠す
              },
              children: isVisible && children
            }
          )
        }
      )
    );
  };
  const GridBackground = () => {
    const [offset, setOffset] = reactExports.useState(0);
    const gridSize = 320;
    reactExports.useEffect(() => {
      let handle;
      const startTime = Date.now();
      const speed = 10;
      const loop = () => {
        const elapsed = (Date.now() - startTime) / 1e3;
        setOffset(elapsed * speed % gridSize);
        handle = requestAnimationFrame(loop);
      };
      handle = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(handle);
    }, []);
    const width = 4e3;
    const height = 4e3;
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute top-0 left-0 w-full h-full overflow-hidden", style: { opacity: 0.05 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "view",
      {
        style: {
          position: "absolute",
          left: -1e3 + offset,
          // 初期位置をずらしておく
          top: -1e3 + offset,
          width,
          height
        },
        children: [
          Array.from({ length: cols }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "view",
            {
              className: "absolute",
              style: {
                left: i * gridSize,
                top: 0,
                bottom: 0,
                width: 1,
                backgroundColor: "#00ffff",
                // シアン色に変更
                opacity: 0.3
              }
            },
            `col-${i}`
          )),
          Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "view",
            {
              className: "absolute",
              style: {
                top: i * gridSize,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "#00ffff",
                // シアン色に変更
                opacity: 0.3
              }
            },
            `row-${i}`
          ))
        ]
      }
    ) });
  };
  const GeometricDebris = () => {
    const [particles, setParticles] = reactExports.useState([]);
    reactExports.useEffect(() => {
      const count = 15;
      const initialParticles = Array.from({ length: count }).map((_, i) => {
        const isEnemy = i % 2 === 0;
        return {
          id: i,
          x: Math.random() * 100,
          // %
          y: Math.random() * 100,
          // %
          size: Math.random() * 60 + 40,
          // 40px ~ 100px
          speed: Math.random() * 0.02 + 0.01,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.15 + 0.05,
          shape: isEnemy ? "square" : "triangle",
          color: isEnemy ? "#ff3333" : "white"
        };
      });
      setParticles(initialParticles);
      let handle;
      const loop = () => {
        setParticles((prev) => prev.map((p) => {
          let newY = p.y - p.speed;
          if (newY < -5) newY = 105;
          let newRotation = p.rotation + p.rotationSpeed;
          return __spreadProps(__spreadValues({}, p), { y: newY, rotation: newRotation });
        }));
        handle = requestAnimationFrame(loop);
      };
      handle = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(handle);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none", children: particles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "view",
      {
        className: "absolute items-center justify-center",
        style: {
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: p.size,
          height: p.size,
          opacity: p.opacity,
          transform: `rotate(${p.rotation}deg)`
        },
        children: p.shape === "square" ? (
          // 四角形（敵のモチーフ）
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "view",
            {
              style: {
                width: "100%",
                height: "100%",
                borderWidth: 1,
                borderColor: p.color
              }
            }
          )
        ) : (
          // 三角形（自機を模したパーティクル）
          // SVGがAmbiguousMatchExceptionを起こすため、画像で代用
          // Assets/Resources/Sprites/Triangle.png を用意してください
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "image",
            {
              source: "res:Sprites/Triangle",
              style: {
                width: "100%",
                height: "100%",
                objectFit: "contain",
                // アスペクト比を維持して枠内に収める
                unityImageTintColor: p.color
              }
            }
          )
        )
      },
      p.id
    )) });
  };
  const ConnectionSequence = ({ onComplete, appVersion }) => {
    const [visibleLines, setVisibleLines] = reactExports.useState([]);
    const [windowStyle, setWindowStyle] = reactExports.useState({ height: 0, opacity: 0 });
    const sequence = [
      { text: "CONNECTION ESTABLISHED...", delay: 100 },
      { text: "HANDSHAKE ACCEPTED...", delay: 300 },
      { text: "FIREWALL BYPASSED...", delay: 500 },
      { text: "CREDENTIALS VERIFIED...", delay: 800 },
      { text: "ACCESS GRANTED.", delay: 1100 },
      { text: "SYSTEM ALERT: INTRUDER DETECTED.", delay: 1400, isAlert: true }
    ];
    const targetHeight = 70 + sequence.length * 40;
    reactExports.useEffect(() => {
      const animTimer = setTimeout(() => {
        setWindowStyle({ height: targetHeight, opacity: 1 });
      }, 50);
      setVisibleLines(new Array(sequence.length).fill(false));
      let timeouts = [];
      sequence.forEach(({ delay }, index) => {
        const timeout = setTimeout(() => {
          setVisibleLines((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
          if (index === sequence.length - 1) {
            setTimeout(onComplete, 200);
          }
        }, delay);
        timeouts.push(timeout);
      });
      return () => {
        clearTimeout(animTimer);
        timeouts.forEach(clearTimeout);
      };
    }, [onComplete]);
    const isLastLineVisible = visibleLines[sequence.length - 1];
    const isAlert = isLastLineVisible && sequence[sequence.length - 1].isAlert;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "view",
      {
        className: "flex-col bg-black border-2 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(0,255,255,0.3)]",
        style: {
          width: 1e3,
          height: windowStyle.height,
          // アニメーション
          opacity: windowStyle.opacity,
          // アニメーション
          borderColor: isAlert ? "#ff3333" : "#00ffff",
          overflow: "hidden",
          // アニメーション中の中身のはみ出し防止
          padding: 4
          // StageStartCutinに合わせる
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row justify-between bg-cyan-900 px-2 py-1 mb-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-100 text-xl font-mono", style: { fontFamily: "SourceHanCodeJP" }, children: "CONNECTION_SEQUENCE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-cyan-100 text-xl font-mono", style: { fontFamily: "SourceHanCodeJP" }, children: appVersion })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-col items-start px-4 py-2", children: sequence.map((item, i) => {
            const isVisible = visibleLines[i];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                className: `text-2xl font-mono mb-1 transition-opacity duration-100 ${item.isAlert ? "text-red-500" : "text-cyan-400"} ${isVisible ? "opacity-100" : "opacity-0"}`,
                style: {
                  fontFamily: "SourceHanCodeJP",
                  textShadow: "0 0 5px currentColor",
                  whiteSpace: "nowrap",
                  // 配列追加方式ではないので、flexShrinkは不要だが念のため
                  flexShrink: 0
                },
                children: `> ${item.text}`
              },
              i
            );
          }) })
        ]
      }
    );
  };
  const GlitchLogo = ({ isAlert }) => {
    const { offset, isGlitching } = useGlitch();
    const baseColor = "#e2e8f0";
    const triColor = isAlert ? "#ff3333" : "#00ffff";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "relative items-center justify-center", children: [
      isGlitching && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-baseline absolute", style: { transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`, opacity: 0.7 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: "#ff0000" }, children: "GEOME" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl mx-1", style: { fontFamily: "Melete-Bold", color: "#ff0000" }, children: "TRI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: "#ff0000" }, children: "O" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-baseline absolute", style: { transform: `translate(${-offset.x}px, ${-offset.y}px)`, opacity: 0.7 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: "#00ffff" }, children: "GEOME" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl mx-1", style: { fontFamily: "Melete-Bold", color: "#00ffff" }, children: "TRI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: "#00ffff" }, children: "O" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-baseline", style: { transform: `translate(${offset.x}px, ${offset.y}px)` }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: baseColor }, children: "GEOME" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl mx-1 animate-pulse transition-colors duration-300", style: { fontFamily: "Melete-Bold", color: triColor }, children: "TRI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-9xl", style: { fontFamily: "Melete-Light", color: baseColor }, children: "O" })
      ] })
    ] });
  };
  const TitleApp = () => {
    const globals = useGlobals();
    const interop = globals.GameInterop;
    const [currentScreen, setCurrentScreen] = reactExports.useState("title");
    const [lastMenuIndex, setLastMenuIndex] = reactExports.useState(0);
    const [connectionState, setConnectionState] = reactExports.useState("initializing");
    const [isGameStarting, setIsGameStarting] = reactExports.useState(false);
    const [isBlackout, setIsBlackout] = reactExports.useState(false);
    const [showRedFlash, setShowRedFlash] = reactExports.useState(false);
    const [shutdownOpacity, setShutdownOpacity] = reactExports.useState(0);
    const [appVersion, setAppVersion] = reactExports.useState("ver. 0.3.0");
    const initializedRef = reactExports.useRef(false);
    const handleUIReady = reactExports.useCallback(() => {
      interop == null ? void 0 : interop.NotifyUIReady();
    }, [interop]);
    reactExports.useEffect(() => {
      if (interop && typeof interop.GetAppVersion === "function") {
        setAppVersion(`ver. ${interop.GetAppVersion()}`);
      }
      if (initializedRef.current) return;
      if (!interop || typeof interop.ShouldSkipTitleSequence !== "function") {
        return;
      }
      initializedRef.current = true;
      if (interop.ShouldSkipTitleSequence()) {
        setConnectionState("connected");
      } else {
        setConnectionState("idle");
      }
    }, [interop]);
    reactExports.useEffect(() => {
      if (currentScreen === "title" && connectionState === "idle") {
        window.onAnyKeyPress = () => {
          interop == null ? void 0 : interop.PlaySound("submit");
          setConnectionState("connecting");
        };
      } else {
        window.onAnyKeyPress = () => {
        };
      }
      window.onFadeOutRequest = () => {
        setIsBlackout(true);
      };
      if (!window.onMenuInput) {
        window.onMenuInput = () => {
        };
      }
      return () => {
        window.onAnyKeyPress = () => {
        };
        window.onFadeOutRequest = () => {
        };
      };
    }, [currentScreen, connectionState, interop]);
    reactExports.useEffect(() => {
      if (connectionState === "exiting") {
        const timer = setTimeout(() => setShutdownOpacity(1), 50);
        return () => clearTimeout(timer);
      } else {
        setShutdownOpacity(0);
      }
    }, [connectionState]);
    const handleConnectionComplete = reactExports.useCallback(() => {
      setConnectionState("connected");
      setShowRedFlash(true);
      setTimeout(() => setShowRedFlash(false), 200);
    }, []);
    const handleMenuBack = reactExports.useCallback(() => {
      setConnectionState("disconnecting");
      setTimeout(() => {
        setConnectionState("idle");
      }, 300);
    }, []);
    const handleExit = reactExports.useCallback(() => {
      setConnectionState("exiting");
      setTimeout(() => {
        if (interop && typeof interop.QuitGame === "function") {
          interop.QuitGame();
        } else {
          console.log("Quit Game (Mock)");
          setConnectionState("idle");
        }
      }, 500);
    }, [interop]);
    const handleGameStart = reactExports.useCallback(() => {
      setIsGameStarting(true);
    }, []);
    const handleNavigate = reactExports.useCallback((screen) => {
      setCurrentScreen(screen);
    }, []);
    const isMenuOpen = connectionState === "connected" || connectionState === "disconnecting" || connectionState === "exiting" || isGameStarting;
    return (
      // 背景色を「真っ黒」から「深いネイビー（ダークスレート）」に変更して、ビネット（黒い影）を目立たせる
      /* @__PURE__ */ jsxRuntimeExports.jsx(AspectRatioWrapper, { onReady: handleUIReady, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "absolute inset-0 flex-col justify-center items-center", style: { backgroundColor: "#0f172a", width: "100%", height: "100%" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GridBackground, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GeometricDebris, {}),
        currentScreen === "title" && /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "w-full h-full flex-col p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "flex-1 w-full items-center justify-end pb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchLogo, { isAlert: isMenuOpen }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-1 w-full items-center justify-start", children: [
            connectionState === "initializing" && null,
            connectionState === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "transition-opacity duration-300 opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "relative flex-row items-center justify-center px-16 py-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute left-0 top-0 bottom-0 right-0 border border-[#00ffff] bg-[#00ffff] bg-opacity-10 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl text-white mr-6", children: "▶" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-5xl text-[#00ffff] tracking-widest", style: { textShadow: "0 0 8px #00ffff", fontFamily: "SourceHanCodeJP" }, children: "PRESS ANY BUTTON" })
            ] }) }),
            connectionState === "connecting" && /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectionSequence, { onComplete: handleConnectionComplete, appVersion }),
            (connectionState === "connected" || connectionState === "disconnecting" || connectionState === "exiting") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Menu,
              {
                onNavigate: handleNavigate,
                onPlay: () => console.log("Game Start!"),
                onBack: handleMenuBack,
                onExit: handleExit,
                isExiting: connectionState === "disconnecting" || connectionState === "exiting",
                initialIndex: lastMenuIndex,
                onIndexChange: setLastMenuIndex
              }
            ),
            connectionState === "exiting" && /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute transition-opacity duration-300", style: { opacity: shutdownOpacity, top: "25%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "SHUTTING DOWN...", isAlert: true, className: "text-6xl text-red-500 whitespace-nowrap tracking-widest", style: { fontFamily: "SourceHanCodeJP" } }) })
          ] })
        ] }),
        currentScreen === "stage_select" && /* @__PURE__ */ jsxRuntimeExports.jsx(StageSelect, { onBack: () => setCurrentScreen("title"), onGameStart: handleGameStart }),
        currentScreen === "ranking" && /* @__PURE__ */ jsxRuntimeExports.jsx(Ranking, { onBack: () => setCurrentScreen("title") }),
        currentScreen === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Settings,
          {
            onBack: () => setCurrentScreen("title")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "view",
          {
            className: "absolute inset-0 items-center justify-center bg-black pointer-events-none transition-opacity duration-500",
            style: { opacity: isGameStarting ? 1 : 0, zIndex: 9998 },
            children: isGameStarting && /* @__PURE__ */ jsxRuntimeExports.jsxs("view", { className: "flex-row items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GlitchText, { text: "LOADING", isAlert: false, className: "text-6xl text-cyan-400 whitespace-nowrap tracking-widest", style: { fontFamily: "SourceHanCodeJP" } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "custom-spin w-12 h-12 border-8 border-cyan-900 border-t-cyan-400 rounded-full ml-6" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "view",
          {
            className: "absolute top-0 left-0 w-full h-full bg-black pointer-events-none transition-opacity duration-500",
            style: { opacity: isBlackout ? 1 : 0, zIndex: 9999 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "view",
          {
            className: "absolute top-0 left-0 w-full h-full pointer-events-none",
            style: {
              // 内側に影を落とすことでビネットを表現
              boxShadow: "inset 0 0 200px 100px rgba(0,0,0,0.9)"
            }
          }
        ),
        showRedFlash && /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute top-0 left-0 w-full h-full bg-[#ff3333] opacity-30 pointer-events-none" }),
        currentScreen === "title" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute bottom-4 w-full items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-500 text-2xl font-sans", children: "© 2026 potatonecst" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("view", { className: "absolute bottom-4 right-4 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-gray-500 text-2xl font-mono", children: appVersion }) })
        ] })
      ] }) })
    );
  };
  render(/* @__PURE__ */ jsxRuntimeExports.jsx(TitleApp, {}));
})();
