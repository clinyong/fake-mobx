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

test("Reactive array", () => {
  const l = observable([1, 2, 3]);

  let count = 0;
  let list: any[] = [];
  autorun(() => {
    count++;
    list = l.slice();
  });

  l.push(4);
  expect(count).toBe(3);
  expect(list.length).toBe(4);
  expect(list[3]).toBe(4);

  l.pop();
  l.splice(0, 1);
  expect(list).toEqual([2, 3]);
});
