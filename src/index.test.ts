import { describe, it, expect, beforeEach, vi } from "vitest";
import tiza from ".";

describe("tiza", function () {
  it("initial value", function () {
    expect(tiza.currentStyles).toEqual([]);
    expect(tiza.styles).toEqual([]);
    expect(tiza.texts).toEqual([]);
  });

  describe("style methods", function () {
    // it("always return an instance", function () {
    //   expect(tiza.style("color:red")).toEqual(jasmine.any(Tiza));
    //   expect(tiza.color("red")).toEqual(jasmine.any(Tiza));
    //   expect(tiza.bgColor("red")).toEqual(jasmine.any(Tiza));
    //   expect(tiza.bold()).toEqual(jasmine.any(Tiza));
    //   expect(tiza.italic()).toEqual(jasmine.any(Tiza));
    //   expect(tiza.size(20)).toEqual(jasmine.any(Tiza));
    //   expect(tiza.reset()).toEqual(jasmine.any(Tiza));
    // });

    it("always return an new instance", function () {
      expect(tiza.style("color:red")).not.toBe(tiza);
      expect(tiza.color("red")).not.toBe(tiza);
      expect(tiza.bgColor("red")).not.toBe(tiza);
      expect(tiza.bold()).not.toBe(tiza);
      expect(tiza.italic()).not.toBe(tiza);
      expect(tiza.size(20)).not.toBe(tiza);
      expect(tiza.reset()).not.toBe(tiza);
    });

    it("save style", function () {
      expect(tiza.style("color:red").currentStyles).toEqual(["color:red"]);
      expect(tiza.color("red").currentStyles).toEqual(["color:red"]);
      expect(tiza.bgColor("red").currentStyles).toEqual([
        "background-color:red",
      ]);
      expect(tiza.bold().currentStyles).toEqual(["font-weight:bold"]);
      expect(tiza.italic().currentStyles).toEqual(["font-style:italic"]);
      expect(tiza.size("120%").currentStyles).toEqual(["font-size:120%"]);
      expect(tiza.size(20).currentStyles).toEqual(["font-size:20px"]);
    });

    it("method chaining", function () {
      expect(tiza.style("color:red").bold().italic().currentStyles).toEqual([
        "color:red",
        "font-weight:bold",
        "font-style:italic",
      ]);
    });

    it("reset", function () {
      expect(
        tiza.style("color:red").bgColor("black").reset().currentStyles
      ).toEqual([]);
    });
  });

  describe("text methods", function () {
    // it("always return an instance", function () {
    //   expect(tiza.text("abc")).toEqual(jasmine.any(Tiza));
    //   expect(tiza.space()).toEqual(jasmine.any(Tiza));
    //   expect(tiza.newline()).toEqual(jasmine.any(Tiza));
    // });

    it("always return a new instance", function () {
      expect(tiza.text("abc")).not.toBe(tiza);
      expect(tiza.space()).not.toBe(tiza);
      expect(tiza.newline()).not.toBe(tiza);
    });

    it("save text", function () {
      expect(tiza.text("abc").texts).toEqual(["abc"]);
      expect(tiza.space().texts).toEqual([" "]);
      expect(tiza.space(10).texts).toEqual(Array(10).fill(" "));
      expect(tiza.newline().texts).toEqual(["\n"]);
      expect(tiza.newline(10).texts).toEqual(Array(10).fill("\n"));
    });

    it("save current style", function () {
      expect(tiza.color("red").text("abc").styles).toEqual(["color:red"]);
      expect(tiza.color("red").space().styles).toEqual(["color:red"]);
      expect(tiza.color("red").newline().styles).toEqual(["color:red"]);
    });

    it("keep previous styles", function () {
      const i = tiza.color("red").text("a").bold().text("b");
      expect(i.texts).toEqual(["a", "b"]);
      expect(i.styles).toEqual(["color:red", "color:red;font-weight:bold"]);
    });

    it("ignore no argument", function () {
      expect(tiza.text().texts).toEqual([]);
    });

    describe("multiple arguments", function () {
      it("save all arguments", function () {
        expect(tiza.text("a", "b", "c").texts).toEqual(["a", "b", "c"]);
      });

      it("save current style for all arguments", function () {
        const i = tiza.color("red").text("a", "b", "c");
        expect(i.texts).toEqual(["a", "b", "c"]);
        expect(i.styles).toEqual(["color:red", "color:red", "color:red"]);
      });

      it("support nesting", function () {
        const a = tiza.color("red").text("a");
        const b = tiza.bold().text(a, "b");
        const c = tiza.italic().text(b, "c");
        expect(b.texts).toEqual(["a", "b"]);
        expect(b.styles).toEqual(["color:red", "font-weight:bold"]);
        expect(c.texts).toEqual(["a", "b", "c"]);
        expect(c.styles).toEqual([
          "color:red",
          "font-weight:bold",
          "font-style:italic",
        ]);
      });
    });
  });

  const types = ["log", "info", "warn", "error"] as const;
  types.forEach((type) => {
    describe(type, function () {
      beforeEach(function () {
        vi.spyOn(console, type);
      });

      it(`should call console.${type}`, function () {
        tiza.color("red").text("abc")[type]();
        expect(console[type]).toHaveBeenCalledTimes(1);
        expect(console[type]).toHaveBeenCalledWith("%cabc", "color:red");
      });

      it("equal to text when argument passed", function () {
        tiza.color("red")[type]("abc");
        expect(console[type]).toHaveBeenCalledTimes(1);
        expect(console[type]).toHaveBeenCalledWith("%cabc", "color:red");
      });

      it("handle nesting", function () {
        const a = tiza.color("red").text("red");
        const b = tiza.bold().text(a, "bold");
        const c = tiza.italic().text(b, "italic");
        c[type]();
        expect(console[type]).toHaveBeenCalledTimes(1);
        expect(console[type]).toHaveBeenCalledWith(
          "%cred%cbold%citalic",
          "color:red",
          "font-weight:bold",
          "font-style:italic"
        );
      });
    });
  });
});
