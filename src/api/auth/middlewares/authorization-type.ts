import { Main } from "../../../lib/core/main/Main"
import { Rol } from "../../../lib/shared/enums/auth/rol"
import { authorization } from "./authorization"

export const UserAutorization =  (main:Main) => authorization([Rol.USER], main)
export const AdminAutorization = (main:Main) =>  authorization([Rol.ADMIN, Rol.USER], main)