export const CLASS_VALIDATOR = {
    forbidNonWhitelisted: true,
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
};
export interface IPagination{
  skip:number,
  take:number
}
export const PAGINATION:IPagination = {
  skip:0,
  take:100
};