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


preload.clipboardListener.stopListening();