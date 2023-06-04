const renderer = require("../src/renderer");

test("Text truncation", () => {
  expect(renderer.t("Hello World", 10)).toBe(
    "<span class='boxed'>Hello Wor&hellip;</span>"
  );

  expect(renderer.t("Hello World", 60)).toBe(
    "<span class='boxed'>Hello World</span>"
  );

  expect(
    renderer.t(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin porta lacus, sed vehicula arcu tempor in. Nulla sollicitudin venenatis quam eget maximus. Vivamus leo odio, tincidunt eu ex non, molestie lacinia mi. Aliquam quis ligula eu diam condimentum bibendum. Nunc sit amet odio quis urna eleifend faucibus vitae eu metus. Quisque non dolor at magna egestas viverra ut et purus. Proin dignissim maximus scelerisque. In vel velit rutrum magna semper malesuada venenatis in massa. Fusce eu tristique quam. Donec accumsan tempor lacus, sed maximus nibh vulputate sed. In congue facilisis molestie. Sed nec sodales dolor, et dignissim leo. Vivamus.",
      60
    )
  ).toBe(
    "<span class='boxed'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ae&hellip;</span>"
  );

  expect(renderer.t("", 60)).toBe("<span class='boxed'></span>");
});

var jest_versions_div = document.createElement("div");
jest_versions_div.id = "versions";
document.body.appendChild(jest_versions_div);

var jest_information_div = document.createElement("div");
jest_information_div.id = "information";
document.body.appendChild(jest_information_div);

var jest_performance_div = document.createElement("div");
jest_performance_div.id = "performance";
document.body.appendChild(jest_performance_div);

test("List element creation (type)", () => {
  expect(renderer.create_li("Hello World", "versions").nodeName).toBe("LI");

  expect(renderer.create_li("Hello World", "information").nodeName).toBe("LI");

  expect(renderer.create_li("Hello World", "performance").nodeName).toBe("LI");
});

test("List element creation (innerHTML)", () => {
  expect(renderer.create_li("Hello World", "versions").innerHTML).toBe(
    "Hello World"
  );

  expect(renderer.create_li("Hello World", "information").innerHTML).toBe(
    "Hello World"
  );

  expect(renderer.create_li("Hello World", "performance").innerHTML).toBe(
    "Hello World"
  );
});

test("List pair element creation (type)", () => {
  expect(renderer.create_li_pair("Hello", "World", "versions").nodeName).toBe(
    "LI"
  );

  expect(
    renderer.create_li_pair("Hello", "World", "information").nodeName
  ).toBe("LI");

  expect(
    renderer.create_li_pair("Hello", "World", "performance").nodeName
  ).toBe("LI");
});

test("List pair element creation (class) (blink=default, id=default)", () => {
  expect(renderer.create_li_pair("Hello", "World", "versions").className).toBe(
    ""
  );

  expect(
    renderer.create_li_pair("Hello", "World", "information").className
  ).toBe("");

  expect(
    renderer.create_li_pair("Hello", "World", "performance").className
  ).toBe("");
});

test("List pair element creation (class) (blink=true, id=default)", () => {
  expect(
    renderer.create_li_pair("Hello", "World", "versions", true).className
  ).toBe("blink");

  expect(
    renderer.create_li_pair("Hello", "World", "information", true).className
  ).toBe("blink");

  expect(
    renderer.create_li_pair("Hello", "World", "performance", true).className
  ).toBe("blink");
});

test("List pair element creation (id) (blink=true, id=default)", () => {
  expect(renderer.create_li_pair("Hello", "World", "versions", true).id).toBe(
    "null"
  );

  expect(
    renderer.create_li_pair("Hello", "World", "information", true).id
  ).toBe("null");

  expect(
    renderer.create_li_pair("Hello", "World", "performance", true).id
  ).toBe("null");
});

test('List pair element creation (class) (blink=true, id="test")', () => {
  expect(
    renderer.create_li_pair("Hello", "World", "versions", true, "test")
      .className
  ).toBe("blink");

  expect(
    renderer.create_li_pair("Hello", "World", "information", true, "test")
      .className
  ).toBe("blink");

  expect(
    renderer.create_li_pair("Hello", "World", "performance", true, "test")
      .className
  ).toBe("blink");
});

test('List pair element creation (id) (blink=true, id="test")', () => {
  expect(
    renderer.create_li_pair("Hello", "World", "versions", true, "test").id
  ).toBe("test");

  expect(
    renderer.create_li_pair("Hello", "World", "information", true, "test").id
  ).toBe("test");

  expect(
    renderer.create_li_pair("Hello", "World", "performance", true, "test").id
  ).toBe("test");
});
