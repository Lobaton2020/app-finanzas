import { getPagination } from "./pagination"

describe("Test in pagination",()=>{
    it("Should return a exception with more the allowed limit",async ()=>{
        try{
            await getPagination({limit:500})
        }catch(error){
            expect(error.type).toEqual("error")
        }
    })

    it("Should return a exception with a # character in limit and/or offset", ()=>{
        expect(getPagination( { limit:"#",offset:"#" } ))
        .rejects
        .toEqual("error")
    })

    it("Should return a object with the values", ()=>{
        const data = { limit:"3",offset:"3" };
        expect(getPagination(data)).resolves.toEqual({ skip:3,take:3 })
    })
})