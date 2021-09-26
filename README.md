- Endpoints
- prefix: /api/v1

-- ########################### Auth ###########################

- POST /login // register req.user = {data user}
- POST /register //Deseable: /register/:token
- POST /refresh-token
- POST /auth/tokenRegister
- POST /auth/recoveryPassword

-- ########################### Users ###########################

- POST /users : INTERNO | USER #JWT
- GET /users/profile:id | USER #JWT
- PUT /users/profile:id | USER #JWT
- DELETE /users/profile/:id | USER #JWT //is disable
- DELETE /users/delete/:id | ADMIN #JWT //is disable

-Rol

- GET /rols // all
- POST /rols |ADMIN
  -Document Type

- GET /documenttypes // all
- POST /documenttypes |ADMIN
  -- ########################### Outflows ###########################

- Categories
- GET /categories #JWT //by user
- GET /categories/:id #JWT //by user
- POST /categories #JWT //by user
- PATCH /categories/enable/:id #JWT //by user
- PATCH /categories/disable/:id #JWT //by user

- OutflowTypes (INFLOW|OUTFLOW)
- GET /movements/:type #JWT //by user
- GET /movements/:type/:id #JWT //by user
- POST /movements/:type #JWT //by user
- PATCH /movements/:type/:id #JWT //by user
- PATCH /movements/:type/:id #JWT //by user

- Outflows
- GET /outflows #JWT //by user
- POST /outflows #JWT //by user [Transaction]

-- ########################### Inflows ###########################

- Porcent
- GET /porcents #JWT //by user
- PATCH /porcents/enable/:id #JWT //by user
- PATCH /porcents/disable/:id #JWT //by user

- Inflows
- GET /inflows #JWT //by user
- POST /inflows #JWT //by user [Transaction]

-- ########################### admin ###########################

- GET /users | ADMIN #JWT
- GET /tokens | ADMIN #JWT
- GET /loggins | ADMIN #JWT
- GET /visits | ADMIN #JWT

-- ########################### reports ###########################
TYPES = [
MONEY_SPENDED_BY_DEPOSIT,
MONEY_DISPONIBLE_BY_DEPOSIT,
MONEY_RESUME(TotalIngresos,totalEgresos,Disponible,numero de inresos/egresos)
]

- GET /reports/egress?name=[TYPES] #JWT //by user

############################### COMANDS AND QUERIES ##############################

## MYSQL QUERIES

INSERT INTO rols(name) values("USER"); INSERT INTO documenttypes(name) values("CC");

## COMANDS

- Para poder reiniciar base de dator y tomar nuevos cambios en modelos
  rm -rf ./src/migrations/* && npm run typeorm schema:drop && npm run typeorm:migration:generate Database && npm run typeorm:migration:run


############ TEMAS VISTOS #######
- Typescript - Javascritp Node Js - TypeOrm -   JWT - Mysql
- Control de acceso de usuarios a recursos
- Manejo de logs

# Finanazas app
- Manejar el flujo de dinero de una persona de man
