"use strict";

function isColorStr(color: any): boolean {
    if (typeof color !== "string") {
        return false;
    }

    if (color.length !== 4 && color.length !== 7) {
        return false;
    }

    const testStyle = new Option().style;
    testStyle.color = color;
    if (testStyle.color === "") {
        return false;
    }

    return /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(color);
}

function changeThemeColor(color: string): boolean {
    if (!isColorStr(color)) {
        return false;
    }

    const root = document.documentElement;
    // TODO: FINISH THIS + set up tslint + build + minimizer!
}
