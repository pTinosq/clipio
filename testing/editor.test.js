const editor = require('../src/edit/editor');

test('Replace module', () => {
    localStorage.setItem("clipboard", "Hello World");
    var to_replace = document.createElement("input");
    to_replace.id = "to_replace";
    var replace_with = document.createElement("input");
    replace_with.id = "replace_with";

    replace_with.value = "Goodbye";
    to_replace.value = "Hello";
    document.body.appendChild(to_replace);
    document.body.appendChild(replace_with);

    localStorage.setItem("clipboard", "Hello World");

    expect(
        editor.replace_module()
    ).toBe("Goodbye World");
    localStorage.setItem("clipboard", "Hello World");


    replace_with.value = "123";
    expect(
        editor.replace_module()
    ).toBe("123 World");
    localStorage.setItem("clipboard", "Hello World");

    replace_with.value = "   ";
    expect(
        editor.replace_module()
    ).toBe("    World");
});

test('Space to underscore module', () => {
    // "test_case" : "expected_result"
    const test_words = {
        "!?\"      £?!\"  \" !% £^": "!?\"______£?!\"__\"_!%_£^",
        "      ": "______",
        "hi": "hi",
        "": "",
        "Good afternoon to all of my friends.": "Good_afternoon_to_all_of_my_friends.",
        "123  456  789     ": "123__456__789_____",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz": "abcdefghijklmnopqrstuvwxyz",
        "1234567890": "1234567890",
        "!@#$%^&*()_+-=[]{}|;':,./<>?~": "!@#$%^&*()_+-=[]{}|;':,./<>?~",
        "   ?>DSA>          nFXsa": "___?>DSA>__________nFXsa",
    }

    for (var key in test_words) {
        localStorage.setItem("clipboard", key);
        expect(
            editor.space_to_underscore_module()
        ).toBe(test_words[key]);

    }


});


test('Trailing spaces module', () => {
    // "test_case" : "expected_result"
    const test_words = {
        "     Hello": "Hello",
        "   H   ello   worl   d     ": "H   ello   worl   d",
        "hello world   ": "hello world",
        "123  456  789     ": "123  456  789",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz": "abcdefghijklmnopqrstuvwxyz",
        "1234567890": "1234567890",
        "!@#$%^&*()_+-=[]{}|;':,./<>?~": "!@#$%^&*()_+-=[]{}|;':,./<>?~",
        "   ?>DSA>          nFXsa": "?>DSA>          nFXsa",
    }


    for (var key in test_words) {
        localStorage.setItem("clipboard", key);
        expect(
            editor.trailing_spaces_module()
        ).toBe(test_words[key]);

    }


});

test('Lowercase module', () => {
    // "test_case" : "expected_result"
    const test_words = [
        "Hello",
        "Hello World",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "1234567890",
        "!@#$%^&*()_+-=[]{}|;':,./<>?~",
        "HeLlO WorLD",
        "??hELLo??",
        "   ?>DSA>          nFXsa"
    ]

    for (var i = 0; i < test_words.length; i++) {
        localStorage.setItem("clipboard", test_words[i]);
        expect(
            editor.lowercase_module()
        ).toMatch(/^[a-z\d\W_]+$/);

    }
});

test('Uppercase module', () => {
    const test_words = [
        "Hello",
        "Hello World",
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        "abcdefghijklmnopqrstuvwxyz",
        "1234567890",
        "!@#$%^&*()_+-=[]{}|;':,./<>?~",
        "HeLlO WorLD",
        "??hELLo??",
        "   ?>DSA>          nFXsa"
    ]

    for (var i = 0; i < test_words.length; i++) {
        localStorage.setItem("clipboard", test_words[i]);
        expect(
            editor.uppercase_module()
        ).toMatch(/^[A-Z\d\W_]+$/);

    }
});