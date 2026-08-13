// @ts-check

/**
 * @param {string} path
 */
export default function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
