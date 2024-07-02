# Mercado Libre Next.js

## Descripción

Este proyecto está construido con con **Next.js 14**, que utiliza **Tailwind CSS** para los estilos y una estructura de carpetas sencilla recomendada por la documentación oficial.

## Requisitos

- Node.js (versión 18 o superior)
- Yarn

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/oss05/MeLi.git
   cd MeLi

    # Instalar dependencias
    yarn install

    # Correr la aplicación en modo de desarrollo
    yarn run dev

    # Para correr el testing usar
    yarn run test
   ```

## Consideraciones Adicionales

### Manejo del Estado:

Utilicé la API de React Context para manejar el estado global de la aplicación, lo que facilita la persistencia de datos y el acceso a ellos a través de los componentes.

### Componentes y Hooks Personalizados:

Creé componentes y hooks personalizados para encapsular la lógica y mejorar la reutilización del código.

### Estilos y Tema:

Utilicé Tailwind CSS ya que nos permite personalizar rápidamente los estilos y mantener la coherencia visual en toda la aplicación.

### Estructura de Carpetas:

Seguí una estructura de carpetas sencilla y eficiente, recomendada por la documentación oficial de Next.js.

### Archivos Especiales de Next.js:

Implementé archivos especiales como `layout`, `loading` y `notfound` para manejar de manera eficiente los diferentes estados de la aplicación.

### Next Router y Next Link:

Para la navegación y el enrutamiento dentro de la aplicación, utilicé las herramientas proporcionadas por Next.js, lo que garantiza una experiencia de usuario fluida.

### Validación de Formularios:

Validé que los datos ingresados por los usuarios sean correctos y válidos antes de procesarlos.

### Hooks Avanzados:

Empleé useMemo y useCallback para optimizar el rendimiento y evitar renderizados innecesarios.

### Paginación:

Implementé la paginación de resultados para manejar grandes conjuntos de datos de manera eficiente.
