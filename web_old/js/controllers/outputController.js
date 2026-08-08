// @ts-check

import * as uiHelper from "../ui/uiHelper.js";

import * as cachedData from "../data/cachedData.js";

import * as checklistRenderer from "../ui/checklistRenderer.js";

import * as informationRenderer from "../ui/contactlistRenderer.js";

import * as backButtonRenderer from "../ui/backButtonRenderer.js";

import * as backButtonController from "./backButtonController.js";

/** @typedef {import("../controllers/formController.js").UserInput} UserInput */

/**
 * @param {CustomEvent<UserInput>} customEvent
 * @param {function} onBackClicked
 */
export function initOutput(customEvent, onBackClicked) {
    let data = customEvent.detail;

    uiHelper.clearContainer();

    const specialNeedsQuestion = cachedData.getQuestions().find(q => q.id === "special_needs");
    const idToTextMap = Object.fromEntries(specialNeedsQuestion?.options.map(opt => [opt.id, opt.text]) ?? []);

    backButtonController.addBackListener(
        backButtonRenderer.constructBackButton(),
        onBackClicked
    );

    data.specialNeedsSelected.forEach(specialNeed => {
        const title = idToTextMap[specialNeed];

        checklistRenderer.render(cachedData.getSpecialNeedsInstructions(), specialNeed, title);
    });

    let ids = /** @type {string[]} */ ([]);
    data.specialNeedsSelected.forEach(specialNeed => ids.push(specialNeed));
    ids.push(data.hazardSelected);

    checklistRenderer.render(cachedData.getHazardInstructions(), data.hazardSelected, "Hazard Instructions");

    checklistRenderer.RenderGobag(cachedData.getGobagItemRegistry(), cachedData.getGobagItems(), ids, "Gobag");

    informationRenderer.render(data.locationSelected, cachedData.getContacts());

    window.scrollTo(0, 0);
}