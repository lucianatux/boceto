# 🌱 Proyecto React + Firebase: Página web como regalo

Este proyecto es una página web hecha con **React** y **Firebase**, pensada como regalo para mi papá.\
Tiene contenido dinámico (cards con links, imágenes, descripciones) y un modo de edición solo accesible para nosotros, protegido por login.

---

## ✨ Características principales

✅ Página de inicio con carrusel de imágenes.\
✅ Cards editables y eliminables desde la propia web.\
✅ Modo edición (solo para usuarios autenticados).\
✅ Login con Firebase Authentication.\
✅ Datos en tiempo real con Firestore.\
✅ Subida de imágenes a Firebase Storage.\
✅ Diseño responsivo usando React-Bootstrap.\
✅ Estructura modular y escalable.

---

## 🧬 Estructura del proyecto

```plaintext
/src
  /components
    /Auth
      AuthContext.js         ← Contexto global de autenticación
      Login.js               ← Formulario de login
    /Cards
      CardForm.js            ← Formulario para crear cards
      CardList.js            ← Lista de cards (lee y borra)
      EditableCard.js        ← Permite editar cards existentes
    /Layout
      Header.js              ← Encabezado con logo y frase
      Footer.js              ← Footer con redes sociales
      Menu.js                ← Menú de navegación
      Home.js                ← Portada con carrusel
    /Content
      /Videos
        VideoList.js         ← Lista de videos
    /Articles
      ArticleForm.js         ← Formulario para artículos
  /assets                    ← Imágenes y logos
  App.js                     ← Rutas y layout principal
  index.js                   ← Punto de entrada
  firebase.js                ← Configuración de Firebase
  App.css / index.css        ← Estilos globales
```

---

## ⚙️ Tecnologías usadas

- React
- React Router DOM
- React-Bootstrap
- Firebase (Auth, Firestore, Storage)
- Context API (para manejo de estado global)

---

## 🚀 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone <url-del-repo>
cd <carpeta>
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` con tu clave de Firebase:

```env
REACT_APP_FIREBASE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

4. Ejecutar el proyecto:

```bash
npm start
```

La web se abrirá en [http://localhost:3000](http://localhost:3000).

---

## 🔑 Flujo de la aplicación

- Usuario visita la web (`/`): ve Home, Menu, Footer y lista de cards.
- Si entra a `/login`, puede loguearse (sólo el autor).
- Si está logueado:
  - Ve el botón “Salir de modo edición” en el header.
  - Puede agregar, editar y eliminar cards.
  - Puede acceder a `/articleform` para cargar artículos.

---

## ✏️ Cosas pendientes / mejoras

- Agregar sección de comentarios de la gente.
- Mejorar diseño visual (estilos y detalles).
- Loader mientras cargan datos.
- Validaciones de formulario.
- Mensajes de éxito / error.

---

## ❤️ Autor

Hecho con cariño por Luciana, como regalo para su papá. 🌱✨
