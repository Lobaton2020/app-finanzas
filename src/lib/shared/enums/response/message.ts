/**
 * @enum Messages generics for response from the service
*/
export enum Message{
    OK="Operation executed succesfully",
    CREATED="Register created succesfully",
    REDIRECT="Opp now we are going to redirect the other service",
    BAD_REQUEST="Please send a correct request",
    UNAUTHORIZED="You are unauthorized to access",
    FORBIDDEN="You don't have access - Forbidden",
    NOT_FOUND="Typical error 404 - Not found resource",
    ERROR_INTERNAL="Opps!! Internal Server Error",
    ERROR_BAD_GATEWAY="Error bad gateway - Working in that!",
    ERROR_SERVICE_UNAVAILABLE="The service isn't available now - Working in that!"
}