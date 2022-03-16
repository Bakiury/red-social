## Description

Esta es un desarrollo web de una red social básica usando las siguientes tecnologías:

**Backend:** NodeJs con el framework NestJs
**Frontend:** JavaScript y TypeScript con el framework VueJs

**Observaciones:**
Se crearon dos ramas una para el desarrollo del API Rest en el Backend llamada "backend" y la otra para el desarrollo del Frontend llamada "Frontend".

Debidido a que este desarrollo implementa JavaScript como lenguaje de programación base.

**La instalación local de este proyecto consiste:**
**Para la parte del Backend:** Bajar el repositorio de la rama "backend" descargar las dependencias necesarias que ya estan en el archivo "package.json" y correr el servidor de NestJs con "npm run start:dev"

**Para la parte del Frontend:** Bajar el repositorio de la rama "frontend" descargar las dependencias necesarias que ya estan en el archivo "package.json" y correr el servidor de VueJs con "npm run serve"

## EndPoints del API Rest creados

```bash
**UsersController**
/users/login                       - (POST)
/users/auth_user                   - (GET)
/users/logout                      - (POST)
/users/all                         - (GET)
/users/:id                         - (GET)
/users                             - (POST)
/users/:id                         - (PATCH)
/users/change_password/:id         - (PATCH)
/users/:id                         - (DELETE)

**PostsController**
/posts/all                         - (GET)
/posts/:id                         - (GET)
/posts                             - (POST)
/posts/:id                         - (PATCH)
/posts/:id                         - (DELETE)

**CommentsController**
/comments/all                      - (GET)
/comments/:id                      - (GET)
/comments                          - (POST)
/comments/:id                      - (PATCH)
/comments/:id                      - (DELETE)
```
