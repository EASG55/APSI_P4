# APSI_P4

# DENO DEPLOY 

https://apsi-p4-esotog.deno.dev

# Configuración

Crea un archivo .env en el directorio raíz del proyecto y especifica la URL de conexión de tu base de datos MongoDB de la siguiente manera:

```env
MONGO_URL=tu_url_de_conexion_mongodb
```

## Endpoints

## QUERY

### GET

#### -Obtener todas las TARDIS
  
Este endpoint devuelve los detalles de todas las TARDIS existentes

#### -Obtener una TARDIS por su ID
  
Este endpoint devuelve los detalles de una TARDIS específica basado en su ID.

#### Obtener una dimensión por su ID

Este endpoint devuelve los detalles de una dimensión específica basado en su ID.

#### Obtener un planeta por su ID

Este endpoint devuelve los detalles de un planeta específico basado en su ID.

#### Obtener una persona por su ID

Este endpoint devuelve los detalles de una persona específica basado en su ID.


### POST

### NOTA: si no metes los ID requeridos donde toca, mostrara un error


#### Crear una nueva persona

Este endpoint permite crear una nueva persona. Debes proporcionar los siguientes campos en el cuerpo de la solicitud:

#### Crear un nuevo planeta

Este endpoint permite crear una nueva persona. Debes proporcionar los siguientes campos en el cuerpo de la solicitud:


#### Crear una nueva dimension


Este endpoint permite crear una nueva persona. Debes proporcionar los siguientes campos en el cuerpo de la solicitud:


#### Crear una nueva TARDIS

Este endpoint permite crear una nueva TARDIS. Debes proporcionar los siguientes campos en el cuerpo de la solicitud:




### PUT

#### Actualizar una TARDIS existente por su ID

Este endpoint permite actualizar los detalles de una TARDIS existente. Debes proporcionar los mismos campos que se mencionaron en el endpoint de creación.

#### Actualizar una dimension existente por su ID

Este endpoint permite actualizar los detalles de una dimensión existente. Debes proporcionar los mismos campos que se mencionaron en el endpoint de creación.

#### Actualizar un planeta existente por su ID

Este endpoint permite actualizar los detalles de un planeta existente. Debes proporcionar los mismos campos que se mencionaron en el endpoint de creación.

#### Actualizar una persona existente por su ID

Este endpoint permite actualizar los detalles de una persona existente. Debes proporcionar los mismos campos que se mencionaron en el endpoint de creación.




### DELETE

#### Eliminar una TARDIS por su ID

Este endpoint permite eliminar una TARDIS de la base de datos según su ID

#### Eliminar una dimension por su ID

Este endpoint permite eliminar una dimension de la base de datos según su ID

#### Eliminar un planeta por su ID

Este endpoint permite eliminar un planeta de la base de datos según su ID

#### Eliminar una persona por su ID

Este endpoint permite eliminar una persona de la base de datos según su ID
