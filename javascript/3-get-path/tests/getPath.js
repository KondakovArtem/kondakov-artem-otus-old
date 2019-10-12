// tests/part1/cart-summary-tests.js
const chai = require('chai');
const assert = chai.assert; // we are using the "assert" style of Chai
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const getPath = require('../src/getPath');

function itNode(node, index, document){
    it(`testNode${index}`, () => {
        const path =  getPath(node, document);
        assert.isNotEmpty(path, `path is empty`);
        const findNode = document.querySelector(path);
        //console.log(path);
        assert.equal(findNode, node, `Wrong element found, path - ${path}`);
    });
}


describe('getPath', () => {

    const testHtml = fs.readFileSync(__dirname+'/test.html', 'UTF-8');
    const { document } = (new JSDOM(testHtml)).window;
    const items = document.querySelectorAll('*');

    items.forEach((node, index) => itNode(node, index, document));
});


describe('getPath2', () => {

    const testHtml = fs.readFileSync(__dirname+'/test2.html', 'UTF-8');
    const { document } = (new JSDOM(testHtml)).window;
    const items = document.querySelectorAll('*');

    //itNode(items[211],211, document);
    items.forEach((node, index) => itNode(node, index, document));
});