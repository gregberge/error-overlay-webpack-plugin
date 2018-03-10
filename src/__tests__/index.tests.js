import {tapEntry} from "../index"

test("tapEntry should throw when receiving a string", () => {
  expect(() => tapEntry("/tmp", "main")).toThrowErrorMatchingSnapshot()
})

test("tapEntry should add entry to array", () => {
  const entry = ["main"]

  tapEntry("/tmp", entry)

  expect(entry[0]).toContain("entry.js")
  expect(entry[1]).toEqual("main")
})

test("tapEntry should add entry to arrays in object", () => {
  const entry = {main: ["main"], login: ["login"]}

  tapEntry("/tmp", entry)

  expect(entry.main[0]).toContain("entry.js")
  expect(entry.main[1]).toEqual("main")
  expect(entry.login[0]).toContain("entry.js")
  expect(entry.login[1]).toEqual("login")
})
