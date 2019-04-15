window.CONFIG = false;
window.DEBUG = Boolean(localStorage.getItem('DEBUG')) || false;
document.addEventListener('keydown', (event) => {
    const {ctrlKey, shiftKey, key} = event;
    if (ctrlKey && shiftKey) {
        // console.log('key', key);
        if (key === 'L') {
            window.DEBUG = !window.DEBUG;
            (window.DEBUG ? localStorage.setItem('DEBUG', String(window.DEBUG)) : localStorage.removeItem('DEBUG'));
            console.clear();
        }
        if (key === '!') window.location.pathname = '/config';
        if (key === 'C') console.clear();
        if (key === '?' || key === '/') {
            const body = document.getElementsByTagName("BODY")[0];
            if (body.classList.contains('debug')) body.classList.remove("debug");
            else body.classList.add("debug");
            debugStyles(body);
        }
    }
    return true;
});

Element.prototype.setAttributes = (el, props) => {
    // console.log('setAttributes', props, el);
    Object.keys(props).map((prop) => {
        // console.log(prop, props[prop]);
        if (prop === 'innerHTML') el.innerHTML = props[prop];
        else el.setAttribute(prop, props[prop]);
    });
    return el;
};
document.generateElement = ({ type = 'div', attrs = false, children = [], append = false, appendTo = false }) => {
    const el = document.createElement(type);
    if (attrs) el.setAttributes(el, attrs);
    (children || []).map(child => el.appendChild(child));
    if (append) el.append(append);
    if (appendTo) appendTo.appendChild(el);
    return el;
};

const debugStyles = (body) => {
    if (body.classList.contains('debug')) {
        const style = document.generateElement({type:'style',attrs:{type:'text/css',rel:'stylesheet'},append:debugCss});
        document.generateElement({type:'div',attrs:{id:'DEBUG_STYLES'},append:style,appendTo:body});
    } else body.removeChild(document.getElementById('DEBUG_STYLES'));
    
    
};
const debugCss = document.createTextNode('.debug{-webkit-transition:.5s;-moz-transition:.5s;-o-transition:.5s;transition:.5s}div{box-shadow:0 0 0 1px red!important}span{box-shadow:0 0 0 1px green!important}img{box-shadow:0 0 0 1px #00f!important}ul{box-shadow:0 0 0 1px orange!important}li{box-shadow:0 0 0 1px #000!important}a{box-shadow:0 0 0 1px purple!important}.fa{box-shadow:0 0 0 1px #489fdf!important}.row{border-bottom:2px dashed #000!important}.wrapper{box-shadow:0 0 0 1px #d3d3d3!important}canvas{box-shadow:0 0 0 1px #c7854b!important}.jumbotron{margin:100px auto}');
