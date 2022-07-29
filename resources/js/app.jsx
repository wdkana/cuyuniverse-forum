import "./bootstrap";
import "../css/app.css";
import "./smooth-scroll.js";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

import React from "react";
import {render} from "react-dom";
import {createInertiaApp} from "@inertiajs/inertia-react";
import {InertiaProgress} from "@inertiajs/progress";
import {resolvePageComponent} from "laravel-vite-plugin/inertia-helpers";

const appName = window.document.getElementsByTagName("title")[0]?.innerText;

AOS.init();

createInertiaApp({
  title: title => `${appName} - ${title}`,
  resolve: name => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob("./Pages/**/*.jsx")),
  setup({el, App, props}) {
    return render(<App {...props} />, el);
  },
});

InertiaProgress.init({color: "#DC2626"});
