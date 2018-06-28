const { observable, autorun } = require("../");

test("Basic mobx", () => {
  const o = observable({
    name: "clinyong"
  });

  let count = 0;
  autorun(() => {
    count++;
  });

  o.name = "leo1";
  o.name = "leo2";

  expect(count).toBe(2);
});
