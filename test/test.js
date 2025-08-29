import {
  helloWorld,
  add,
  fetchRandomJoke,
  fetch5RandomJokes,
} from "../js/main.js";
// Import the sinon library to allow us to create a spy on the console.log function
import sinon from "sinon";

QUnit.module("main.js tests", function () {
  QUnit.test(
    "helloWorld should print Hello World to the console",
    function (assert) {
      //Arrange
      const consoleSpy = sinon.spy(console, "log");
      //Act
      helloWorld(true);
      //Assert
      assert.ok(
        consoleSpy.calledWith("Hello World"),
        "console.log should be called with Hello World"
      );
      consoleSpy.restore();
    }
  );

  QUnit.test("add should return the sum of two numbers", function (assert) {
    //Arrange
    const num1 = 2;
    const num2 = 3;
    const expected = 5;
    //Act
    const result = add(num1, num2);
    //Assert
    assert.equal(result, expected, "add(2, 3) should return 5");
  });

  QUnit.test(
    "add should return the sum of negative numbers",
    function (assert) {
      //Arrange
      const num1 = -2;
      const num2 = -3;
      const expected = -5;
      //Act
      const result = add(num1, num2);
      //Assert
      assert.equal(result, expected, "add(-2, -3) should return -5");
    }
  );

  QUnit.test(
    "add should return the sum of a positive and a negative number",
    function (assert) {
      //Arrange
      const num1 = 2;
      const num2 = -3;
      const expected = -1;
      //Act
      const result = add(num1, num2);
      //Assert
      assert.equal(result, expected, "add(2, -3) should return -1");
    }
  );

  QUnit.test(
    "add should return undefined since no numbers were added",
    function (assert) {
      // Assert
      assert.throws(function () {
        add(undefined, undefined);
      }, "You must provide two numbers to add");
    }
  );

  QUnit.test("fetch and return a random joke", async function (assert) {
    // Arrange
    const mockSetup = {
      setup: "When does a dad become a dad joke?",
      punchline: "When the punchline becomes apparent",
    };

    // Set up stub
    const fetchSpyStub = sinon.stub(globalThis, "fetch").resolves({
      ok: true,
      json: async () => mockSetup,
    });

    // Act
    const result = await fetchRandomJoke();

    // Assert
    assert.equal(
      result,
      "When does a dad become a dad joke? - When the punchline becomes apparent"
    );

    // Restore
    fetchSpyStub.restore();
  });

  QUnit.test("fetch and return 5 random jokes", async function (assert) {
    // Arrange
    const mockSetup = [
      { setup: "setup1", punchline: "punchline1" },
      { setup: "setup2", punchline: "punchline2" },
      { setup: "setup3", punchline: "punchline3" },
      { setup: "setup4", punchline: "punchline4" },
      { setup: "setup5", punchline: "punchline5" },
      { setup: "setup6", punchline: "punchline6" },
      { setup: "setup7", punchline: "punchline7" },
      { setup: "setup8", punchline: "punchline8" },
      { setup: "setup9", punchline: "punchline9" },
      { setup: "setup10", punchline: "punchline10" },
    ];

    const mockResponse = [
      "setup1 - punchline1",
      "setup2 - punchline2",
      "setup3 - punchline3",
      "setup4 - punchline4",
      "setup5 - punchline5",
    ];

    // Set up stub
    const fetchSpyStub = sinon.stub(globalThis, "fetch").resolves({
      ok: true,
      json: async () => mockSetup,
    });

    // Act
    const result = await fetch5RandomJokes();

    // Assert
    assert.deepEqual(result, mockResponse);

    // Restore
    fetchSpyStub.restore();
  });
});
