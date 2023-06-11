import { isFilePath, isValidHttpUrl } from "../src/scripts/preload.js";

describe("isFilePath", () => {
  it("should return true for valid Windows-style file paths", () => {
    expect(isFilePath("C:\\Program Files")).toBe(true);
  });

  it("should return false for non-file paths", () => {
    expect(isFilePath("Not a file path")).toBe(false);
  });

  it("should ignore leading and trailing whitespace", () => {
    expect(isFilePath("  C:\\Program Files  ")).toBe(true);
  });

  it("should return false for empty strings", () => {
    expect(isFilePath("")).toBe(false);
  });
});

describe("isValidHttpUrl", () => {
  it("should return true for valid http URLs", () => {
    expect(isValidHttpUrl("http://example.com")).toBe(true);
  });

  it("should return true for valid https URLs", () => {
    expect(isValidHttpUrl("https://example.com")).toBe(true);
  });

  it("should return false for non-URL strings", () => {
    expect(isValidHttpUrl("Not a URL")).toBe(false);
  });

  it("should ignore leading and trailing whitespace", () => {
    expect(isValidHttpUrl("  https://example.com  ")).toBe(true);
  });

  it("should return false for empty strings", () => {
    expect(isValidHttpUrl("")).toBe(false);
  });

  it("should return false for non-http/https URLs", () => {
    expect(isValidHttpUrl("ftp://example.com")).toBe(false);
  });
});
