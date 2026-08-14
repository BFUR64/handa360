// @ts-check

/**
 * @param {string} path
 */
export default function navigate(path) {
    const base = import.meta.env.BASE_URL;

    const url = `${base}${path.replace(/^\/+/, "")}`;

    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
}
