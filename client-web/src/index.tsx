import {createRoot} from "react-dom/client";

const appElement = document.getElementById("app");

if (appElement) {
    const root = createRoot(appElement);

    root.render(<h3>Hello</h3>);
}
