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

function toggleAbilities() {
    GameOption.ShowAbilitiesMenu = !GameOption.ShowAbilitiesMenu;
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
