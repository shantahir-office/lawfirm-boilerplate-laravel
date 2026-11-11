import "../css/app.css";
import "tw-elements"; // mandatory for CSS & JS

import {
    Collapse,
    Dropdown,
    Modal,
    Tab,
    Offcanvas,
    initTWE,
} from "tw-elements";

// Initialize only the components you need
initTWE({ Collapse, Dropdown, Modal, Tab, Offcanvas });
window.TWE = { Modal };