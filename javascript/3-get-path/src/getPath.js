function getClasses(element) {
    const classes = [];
    element.classList.forEach((cls) => {
        if (cls.search(/[~!@$%^&*()+=,.\/';:"?><\[\]\\{}|`#]/) === -1) {
            classes.push(cls);
        }
    });
    return classes.length > 0 ? `.${classes.join('.')}` : '';
}

function findSameNestedNode(element, selector) {
    return Array.from(element.children).filter(e => e.matches(selector))
}

function getPath(element, document) {

    let path = '';
    let currentElement = element;

    do {
        const parent = currentElement.parentElement;
        const id = currentElement.getAttribute('id');
        let itemPath;
        if (id) {
            itemPath = findSameNestedNode(parent, `#${id}`).length === 1 ? `#${id}` : undefined;
        }
        if (!itemPath && currentElement.classList.length > 0) {
            const classes = getClasses(currentElement);
            const sameChilds = findSameNestedNode(parent, `${currentElement.tagName}${classes}`);
            itemPath = sameChilds.length === 1 ? currentElement.tagName + classes : undefined;
        }
        if (!itemPath) {
            const index = (parent && findSameNestedNode(parent, `${currentElement.tagName}`).length > 1) ? Array.from(parent.children).indexOf(currentElement) + 1 : null;
            itemPath = `${currentElement.tagName}${index ? `:nth-child(${index})` : ''}`;
        }

        path = itemPath + (path === '' ? '' : '>' + path);
        //res = // (currentElement ? `${currentElement.tagName}>` : '') + path;
        currentElement = currentElement.parentElement;
    } while (currentElement && document.querySelectorAll(path).length > 1);
    return path;
}

module.exports = getPath;

