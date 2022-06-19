import request from "supertest"
import server from "./index"
import { User } from "./types/user.types"

const user: User = {
  username: "Rasul",
  age: 20,
  hobbies: [],
}

const newUser: User = {
  username: "username",
  age: 30,
  hobbies: ["coding", "basketball"],
}

describe("first", () => {
  afterAll(() => server.close())
  let id: string
  it("get empty array", async () => {
    const res = await request(server).get("/api/users")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)
  })
  it("POST new User", async () => {
    const res = await request(server).post("/api/users").send(user)
    id = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.username).toBe("Rasul")
    expect(res.body.age).toBe(20)
    expect(res.body.hobbies).toStrictEqual([])
  })
  it("GET User by ID", async () => {
    const res = await request(server).get(`/api/users/${id}`)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe("Rasul")
    expect(res.body.age).toBe(20)
    expect(res.body.hobbies).toStrictEqual([])
  })
  it("PUT User", async () => {
    const res = await request(server).put(`/api/users/${id}`).send(newUser)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe("username")
    expect(res.body.age).toBe(30)
    expect(res.body.hobbies).toStrictEqual(["coding", "basketball"])
  })
  it("DELETE User", async () => {
    const res = await request(server).delete(`/api/users/${id}`)
    expect(res.status).toBe(204)
  })
  it("GET deleted User by ID", async () => {
    const res = await request(server).delete(`/api/users/${id}`)
    expect(res.status).toBe(404)
  })
})
