import { Exception } from "../main/Exception";

export class DatabaseException extends Exception{}
export class DuplicateException extends DatabaseException{}