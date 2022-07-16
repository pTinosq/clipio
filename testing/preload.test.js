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

test('Is Base64 checker', () => {
    expect(
        preload.isBase64("Hello World")
    ).toBeFalsy();

    expect(
        preload.isBase64("123")
    ).toBeFalsy();

    expect(
        preload.isBase64("//?!0.2.~$1/42mo")
    ).toBeFalsy();

    expect(
        preload.isBase64("SGVsbG8gV29ybGQ=")
    ).toBeTruthy();

    expect(
        preload.isBase64("SGVsbG8gV29ybGQ")
    ).toBeFalsy();

    expect(
        preload.isBase64("ABCDEFG")
    ).toBeFalsy();

    expect(
        preload.isBase64("!}~asdfsa~/!?£,52ps.2/1")
    ).toBeFalsy();

    expect(
        preload.isBase64("https://regex101.com/")
    ).toBeFalsy();

    expect(
        preload.isBase64("aHR0cHM6Ly9ZWe#EwMS5jb20v")
    ).toBeFalsy();

    expect(
        preload.isBase64("SGVsbG8gRkYyOTk5IGZhMjk5OSB3b3JsZA==")
    ).toBeTruthy();
    
    expect(
        preload.isBase64("SGVsbG8gV29ybGQ= SGVsbG8gRkYyOTk5IGZhMjk5OSB3b3JsZA==")
    ).toBeFalsy();
});

test('Is Filepath checker', () => {
    expect(
        preload.isFilePath("Hello World")
    ).toBeFalsy();

    expect(
        preload.isFilePath("123")
    ).toBeFalsy();

    expect(
        preload.isFilePath("C:\\Documents\\Newsletters\\Summer2018.pdf")
    ).toBeTruthy();
    
    expect(
        preload.isFilePath("\\Program Files\\Custom Utilities\\StringFinder.exe")
    ).toBeFalsy();
    
    expect(
        preload.isFilePath("Z:\\Projects\\apilibrary\\apilibrary")
    ).toBeTruthy();
    
    expect(
        preload.isFilePath("G:\\Projects\\apilibrary\\apilibrary\\")
    ).toBeTruthy();
    
    expect(
        preload.isFilePath("T:/Projects/apilibrary/apilibrary")
    ).toBeTruthy();
    
    expect(
        preload.isFilePath("G:/Projects/apilibrary/apilibrary/")
    ).toBeTruthy();

    expect(
        preload.isFilePath("C:/Documents/Newsletters/Summer2018.pdf")
    ).toBeTruthy();

    expect(
        preload.isFilePath("C:\\Users\\me\\OneDrive\\Desktop\\Example\\Test\\Q\\BN\\Clipdit\\src")
    ).toBeTruthy();

    expect(
        preload.isFilePath("src/hello/")
    ).toBeFalsy();
    
    expect(
        preload.isFilePath("src/hello")
    ).toBeFalsy();
    
    expect(
        preload.isFilePath("/src/hello/")
    ).toBeFalsy();

});


preload.clipboardListener.stopListening();