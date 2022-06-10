# Notas explicativas

Remix es un framework de React de los creadores de ReactRouter

Usa la fetch api (native web) para obtener los datos de un formulario atravez de un request asi como para manejar los headers, entre otros

# Components

```jsx
<Outlet />
```
Renderiza la ruta mas por debajo

```jsx
<ScrollRestoration />
```
Se usa para inicializar el scroll al ir atras

```jsx
<Meta />
```
Este componente toma los datos que definamos exportando la funcion Meta podemos usarlo en cualquier archivo de la carpeta routes

```jsx
<Links/>
```
este componente toma los datos que definamos exportando la funcion Meta podemos usarlo en cualquier archivo de la carpeta routes, esta funcion debe exportar una lista de objetos que contengan un rel y un href


# Rutas

#### Rutas estaticas

Para crear rutas basta con crear archivos o carpeta dentro de la carpeta routes
- routes/about.jsx -> dirige a /about
- routes/posts/create.jsx -> dirige a /posts/create

* Rutas dinamicas
Para crear rutas dinamicas basta con anteponer $ al nombre del archivo
y el nombre del dato a recuperar
- routes/posts/$postId -> dirige a /posts/1234 o /posts/este-es-un-post

para acceder al dato usamos useParams y con esto obtenemos el postId

#### Rutas Anidades / Nested

Para crear rutas anidadas se crea una carpeta y un archivo del mismo nombre ejemplo section/ and section.jsx y dentro del section.jsx agregamos el Outlet con esto todas las routes que estan dentro de la carpeta section se cargaran dentro del outlet de section.jsx si deseamos que tenga un contenido por defecto creamos un index.jsx en la carpeta section

# Cargar datos en el servidor

para realizar la carga de datos desde el servidor se usa la funcion loader fuera del componente y para recuperar los datos en el componente se utiliza el useLoaderData

# Formulario 

para usar el formulario remix nos aporta un metodo llamado action el cual nos trae dentro del objeto request, mediante el cual podemos obtener los datos de la siguiente forma:

```js
const form = await request.formData()
const title = form.get('title')
```

```jsx
<Form />
```
si se usa el formulario como componente se puede usar use transition

Para el manejo de errores podemos retornar un objeto con los errores del formulario y un estatus 400 y obtenerlos con el setActionData 

# Manejo de errores

Con la funcion ErrorBoundary podemos manejar los errores de
la pagina sin romper todo el sitio

# Prisma.io

ORM para bases da datos con typescript

* Instalación
```sh
yarn add prisma -D
```

dentro de la carpeta prisma nos crea un schema y en este definimos las tablas a utilizar 

* Generar la base de datos segun el esquema correr el comando
```sh
npx prisma db push
```

* Generar el cliente
```sh
npx prisma generate 
```
esto nos agrega el autocompletado

* Ver una web con la base de datos
```sh
npx prisma studio
```