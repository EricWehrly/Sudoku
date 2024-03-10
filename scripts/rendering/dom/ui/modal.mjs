import { createElement, detachChildrenFromElement } from "../../../util/javascript-extensions.mjs";

export default class Modal {

    static #checkbox;
    static #container;
    static #title;
    static #background;

    static {

        Modal.#checkbox = createElement({
            'tag': 'input',
            'type': 'checkbox',
            'id': 'modal-checkbox',
            'className': 'modal'
        });

        Modal.#background = createElement({
            'tag': 'label',
            'for': 'modal-checkbox',
            'className': 'modal-background'
        });

        Modal.#container = createElement({
            'className': 'modal'
        });

        const modalHeader = createElement({
            'parent': Modal.#container,
            'className': 'modal-header'
        });

        Modal.#title = createElement({
            'parent': modalHeader,
            'tag': 'h3'
        });

        const closeHeader = createElement({
            'parent': modalHeader,
            'tag': 'label',
            'for': Modal.#checkbox.id,
            'innerText': 'X'
        });
        closeHeader.setAttribute('for', Modal.#checkbox.id);
        closeHeader.addEventListener('click', Modal.hide);
    }

    static setTitle(title) {

        Modal.#title.innerText = title;
    }

    static addContents(element) {

        if(element) Modal.#container.appendChild(element);
    }

    static show() {

        Modal.#checkbox.setAttribute('checked', 'true');
        if(Modal.#container.className.indexOf('show') < 0) Modal.#container.className += ' show';
        if(Modal.#background.className.indexOf('show') < 0) Modal.#background.className += ' show';
    }

    static hide() {
        Modal.#checkbox.setAttribute('checked', 'false');
        Modal.#container.className = Modal.#container.className.replaceAll('show', '');
        Modal.#background.className = Modal.#background.className.replaceAll('show', '');
    }

    static #detachChildren() {
        
        while (Modal.#container.lastChild && Modal.#container.lastChild.className.indexOf('modal-header') == -1) {
            Modal.#container.removeChild(Modal.#container.lastChild);
        }
    }
}