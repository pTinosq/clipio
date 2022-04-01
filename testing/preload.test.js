const preload = require('../src/preload');

test('HTTP URL Checking', () => {
    expect(
        preload.isValidHttpUrl("Hello World")
    ).toBeFalsy();

    expect(
        preload.isValidHttpUrl("123")
    ).toBeFalsy();

    expect(
        preload.isValidHttpUrl("//?!0.2.2")
    ).toBeFalsy();

    expect(
        preload.isValidHttpUrl("https://google.com")
    ).toBeTruthy();

    expect(
        preload.isValidHttpUrl("http://google.co")
    ).toBeTruthy();

    expect(
        preload.isValidHttpUrl("http://www3.example.net")
    ).toBeTruthy();

    expect(
        preload.isValidHttpUrl("https://www.rat.io")
    ).toBeTruthy();

    expect(
        preload.isValidHttpUrl("https://www.bbc.co.uk/news")
    ).toBeTruthy();

    expect(
        preload.isValidHttpUrl("https://github.com/pTinosq/clipdit")
    ).toBeTruthy();
});

test('Hex colour validity checker', () => {
    expect(
        preload.isValidHexColour("Hello World")
    ).toBeFalsy();

    expect(
        preload.isValidHexColour("123")
    ).toBeFalsy();

    expect(
        preload.isValidHexColour("//?!0.2.2")
    ).toBeFalsy();

    expect(
        preload.isValidHexColour("#ff2")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("#ff212c")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("#FF9C22")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("#012345")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("#6789ab")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("test #ff0")
    ).toBeTruthy();

    expect(
        preload.isValidHexColour("Hello FF2999 fa2999 world")
    ).toBeFalsy();
});


preload.clipboardListener.stopListening();