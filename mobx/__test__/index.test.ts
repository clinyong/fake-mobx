import { observable, autorun } from "../";

test("Basic mobx", () => {
  const o = observable({
    name: "clinyong"
  });

  let count = 0;
  let name;
  autorun(() => {
    count++;
    name = o.name;
  });

  o.name = "leo1";
  o.name = "leo2";

  expect(count).toBe(3);
});
