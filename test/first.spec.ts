import * as expect from "expect"
import * as jsc from "jsverify"

type ValidNewStatusForRole = {
  role: string,
  newStatus: string[],
}

type IsValidNewStatusForUser = (user: IUserWithRoles, newStatus: string) => boolean

type IUserWithRoles = {
    username?: string,
    roles: string[],
}

function buildNewStatusValidator(newStatusForRole: ValidNewStatusForRole[]): IsValidNewStatusForUser {
  return (user, newStatus) =>
    newStatusForRole.some(sr => (user.roles.includes(sr.role) && sr.newStatus.includes(newStatus)))
}


describe("something", () => {
    it("some test", () => {
        expect(true).toBeTruthy()
    }) 


    jsc.property("test property", jsc.nearray(jsc.nestring), jsc.nestring,
            (roles, newStatus) => {  
              const r = jsc.generator.nearray(jsc.nestring.generator)(20)
              console.log("ROLES", r)
              return true  === buildNewStatusValidator([])({ roles }, newStatus)
            }
    )
})