import Button from './button.mjs';
import GameOption from '../core/gameOptions.mjs';

const uiContainerParent = document.createElement("div");
uiContainerParent.id = "ui-container-parent";
document.body.appendChild(uiContainerParent);

const uiContainer = document.createElement("div");
uiContainer.id = "ui-container";
uiContainerParent.appendChild(uiContainer);

import './abilities.mjs';
import './equipment.mjs';
import UIElement from '../rendering/dom/ui/uiElement.mjs';
import Events from '../core/events.mjs';
import Modal from '../rendering/dom/ui/modal.mjs';
import AbilityRenderer from './abilities.mjs';
import EquipmentRenderer from './equipment.mjs';
import PlayerInfoRenderer from './playerInfo.mjs';
import HintRenderer from './hint.mjs';

function toggleAbilities() {
    // GameOption.ShowAbilitiesMenu = !GameOption.ShowAbilitiesMenu;

    AbilityRenderer.container.style.display = 'block';
    EquipmentRenderer.container.style.display = 'block';
    Modal.addContents(AbilityRenderer.container);
    Modal.addContents(EquipmentRenderer.container);
    Modal.setTitle('Abilities');
    Modal.show();
}

function toggleNotes() {
    GameOption.NotesMode = !GameOption.NotesMode;
    // console.log(`NotesMode is now ${GameOption.NotesMode}`);
    notesButton.icon = GameOption.NotesMode ? '✍️' : '🖊️';
}

const buttonPanel = new UIElement({
    name: 'buttonPanel',
    classes: 'bottom'
});

const abilitiesButton = new Button({
    name: 'Abilities',
    icon: '📖',
    action: toggleAbilities,
    parent: buttonPanel.element
});

const notesButton = new Button({
    name: 'Notes',
    icon: GameOption.NotesMode ? '✍️' : '🖊️',
    action: toggleNotes,
    parent: buttonPanel.element
});

Events.Subscribe(Events.List.GameOptionChanged, () => {
    notesButton.icon = GameOption.NotesMode ? '✍️' : '🖊️';
});
