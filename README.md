# 📚 CursosApp Frontend

> ⚠️ **En desarrollo**  
> Este repositorio contiene únicamente el **Frontend** de una plataforma de cursos.  
> El **Backend** (API REST en .NET Core 8) vive en otro repositorio.

[![Estado](https://img.shields.io/badge/estado-desarrollo-orange.svg)](#estado)  

---

## 🔍 Descripción

**CursosApp** es una SPA responsiva construida con **Angular 18**.  
Permite a **estudiantes** e **instructores**:
- Registrarse y loguearse (flujo multi-step con validaciones).
- Ver, buscar y filtrar cursos.
- Gestionar inscripciones y, para instructores, crear nuevos cursos.

La interfaz está diseñada para ofrecer una experiencia limpia, rápida y accesible.

---

## 🛠️ Tecnologías

- **Framework**: Angular 18  
- **CSS**: Tailwind CSS (global) + estilos por componente  
- **Formularios**: Reactive Forms  
- **Autenticación**: JWT + `AuthGuard`  
- **Gestión de estado**: RxJS / Observables  
- **Lint & Build**: ESLint, Prettier, Angular CLI  

---

## 📂 Estructura del proyecto

```bash
src/
┣ app/
┃ ┣ core/                # Módulo central: guards, modelos y servicios
┃ ┃ ┣ guards/
┃ ┃ ┃ ┗ auth.guard.ts
┃ ┃ ┣ models/
┃ ┃ ┃ ┣ curso.model.ts
┃ ┃ ┃ ┗ usuario.model.ts
┃ ┃ ┣ services/
┃ ┃ ┃ ┣ auth.service.ts
┃ ┃ ┃ ┣ cursos.service.ts
┃ ┃ ┃ ┗ usuarios.service.ts
┃ ┃ ┣ core.module.ts
┃ ┃ ┗ index.ts
┃ ┣ features/            # Futuras feature-modules (ej. dashboard)
┃ ┣ shared/              # Componentes, directivas y pipes reutilizables
┃ ┃ ┣ components/
┃ ┃ ┃ ┣ footer/
┃ ┃ ┃ ┃ ┣ footer.component.*
┃ ┃ ┃ ┗ navbar/
┃ ┃ ┃   ┣ navbar.component.*
┃ ┃ ┣ directives/
┃ ┃ ┣ pipes/
┃ ┃ ┗ shared.module.ts
┃ ┣ views/               # Vistas principales (rutas)
┃ ┃ ┣ auth/
┃ ┃ ┃ ┣ login/           # Login
┃ ┃ ┃ ┗ registro/        # Registro multi-step
┃ ┃ ┣ cursos/            # Listado + filtros
┃ ┃ ┣ Estudiante/        # Dashboard de estudiante
┃ ┃ ┣ home/              # Página principal
┃ ┃ ┗ instructores/      # Vista instructores
┃ ┣ app.component.*
┃ ┗ app.module.ts
┣ index.html
┣ main.ts
┗ styles.css
```

---

## ⚙️ Instalación

1. Clona el repositorio  
   ```bash
   git clone https://github.com/Jhony445/CursosFrontEnd.git
   cd CursosFrontEnd
   ```
2. Instala dependencias  
   ```bash
   npm install
   ```
3. Configura tus variables de entorno en  
   `src/environments/environment.ts` (copia desde `environment.example.ts`).
4. Arranca en modo desarrollo  
   ```bash
   ng serve --open
   ```
   Se abrirá en `http://localhost:4200/`.

---

## 🚥 Estado del desarrollo

| Módulo                          | Estado          |
|---------------------------------|-----------------|
| Registro multi-step (1–3)       | ✅ Completo     |
| Selección de rol                | ✅ Completo     |
| Login / Logout                  | ✅ Completo     |
| Listado de cursos               | ⚙️ En progreso  |
| Detalle de curso                | ⚙️ En progreso  |
| Responsive & Mobile-first       | ⚙️ En progreso  |
| Integración con API .NET Core 8 | 🔜 Pendiente    |
| Dashboard de instructores       | 🔜 Pendiente    |
| Búsqueda y filtros              | 🔜 Pendiente    |

---


## 👤 Autor

**Jhony445**  
Desarrollador FullStack | [GitHub](https://github.com/Jhony445) | [Portafolio](https://myportfolio-jonathanquistian.netlify.app/)
