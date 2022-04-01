const renderer_edit = require('../src/edit/renderer_edit.js');

test('Get hex colour from string', () => {
    expect(
        renderer_edit.getHexColour("Hello World")
    ).toBe(false);

    expect(
        renderer_edit.getHexColour("Hello World ff2")
    ).toBe(false);

    expect(
        renderer_edit.getHexColour("Hello FF8CC2 World")
    ).toBe(false);

    expect(
        renderer_edit.getHexColour("Hello #ff9a00 World")
    ).toBe("#ff9a00");

    expect(
        renderer_edit.getHexColour("Hello World #FFF")
    ).toBe("#FFF");

    expect(
        renderer_edit.getHexColour("#FF2000 #abcdef")
    ).toBe("#FF2000");



});