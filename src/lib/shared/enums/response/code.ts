/**
 * @enum Codes state for respoonse in the application, based in the http
*/
export enum Code{
    OK=200,
    CREATED=201,
    REDIRECT=300,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    ERROR_INTERNAL=500,
    ERROR_BAD_GATEWAY=502,
    ERROR_SERVICE_UNAVAILABLE=503
}