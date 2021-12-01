"use strict";
import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

let canDraw = false;
let size = 10;
let hue = 0;
let sat = 100;
let lig = 50;
let prevX;
let prevY;

window.onmousemove = move;
window.onmousedown = down;
window.onmouseup = up;
window.onwheel = wheel;
document.getElementById("hueSlider").oninput = slideHue;
document.getElementById("hueValue").oninput = inputHue;
document.getElementById("satSlider").oninput = slideSat;
document.getElementById("satValue").oninput = inputSat;
document.getElementById("ligSlider").oninput = slideLig;
document.getElementById("ligValue").oninput = inputLig;
document.getElementById("brushSlider").oninput = slideBrush;
document.getElementById("brushValue").oninput = inputBrush;
document.getElementById("clear").onclick = clear;

setup();

function setup() {
    context.lineCap = "round";
    clear();
}

function drawColorCircle() {
    context.fillStyle = "black";
    context.fillRect(width - 220, 0, 220, 220);
    context.fillStyle = Utils.hsl(hue, sat, lig);
    Utils.fillCircle(width - 110, 110, size);
    let step = 360 / 195;
    for (let i = 0; i < 195; i++) {
        context.fillStyle = Utils.hsl(step * i, sat, lig);
        context.fillRect(width - 210 + i, 220, 1, 50);
    }

}

function clear() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    drawColorCircle();
}

/**
 * @param {MouseEvent} eventData 
 */
function move(eventData) {
    if (canDraw && eventData.pageX < width - 400) {
        context.lineWidth = size * 2;
        context.strokeStyle = Utils.hsl(hue, sat, lig);
        Utils.drawLine(prevX, prevY, eventData.pageX, eventData.pageY);

    }
    prevX = eventData.pageX;
    prevY = eventData.pageY;
}
/**
 * @param {MouseEvent} eventData 
 */
function down(eventData) {
    if (eventData.button == 0) {
        canDraw = true;
    }
}
/**
 * @param {MouseEvent} eventData 
 */
function up(eventData) {
    if (eventData.button == 0) {
        canDraw = false;
    }
}

/**
 * @param {WheelEvent} eventData 
 */
function wheel(eventData) {
    let newSize = size + eventData.deltaY / -50;
    if (newSize >= 2 && newSize <= 100) {
        size = newSize;
        document.getElementById("brushSlider").value = size;
        document.getElementById("brushValue").value = size;
    }
    drawColorCircle();
}

function slideHue() {
    hue = Number(document.getElementById("hueSlider").value);
    document.getElementById("hueValue").value = hue;
    drawColorCircle();
}

function inputHue() {
    hue = Number(document.getElementById("hueValue").value);
    document.getElementById("hueSlider").value = hue;
    drawColorCircle();
}

function slideSat() {
    sat = Number(document.getElementById("satSlider").value);
    document.getElementById("satValue").value = sat;
    drawColorCircle();
}

function inputSat() {
    sat = Number(document.getElementById("satValue").value);
    document.getElementById("satSlider").value = sat;
    drawColorCircle();
}


function slideLig() {
    lig = Number(document.getElementById("ligSlider").value);
    document.getElementById("ligValue").value = lig;
    drawColorCircle();
}

function inputLig() {
    lig = Number(document.getElementById("ligValue").value);
    document.getElementById("ligSlider").value = lig;
    drawColorCircle();
}

function slideBrush() {
    size = Number(document.getElementById("brushSlider").value);
    document.getElementById("brushValue").value = size;
    drawColorCircle();
}

function inputBrush() {
    size = Number(document.getElementById("brushValue").value);
    document.getElementById("brushSlider").value = size;
    drawColorCircle();
}