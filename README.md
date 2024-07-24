
# Proyecto final: Sistema Solar  #
# Amaya Navarrete Andrea Uxue    #
# Fecha: 09/06/24     #
# Materia: Graficación por computadora #

## Descripción

Este proyecto implementa una simulación del sistema solar utilizando WebGL. Los planetas, el sol y las estrellas están representados en una vista tridimensional, donde se pueden observar las órbitas y rotaciones de cada cuerpo celeste. La cámara se puede controlar para explorar la escena desde diferentes ángulos.

## Características Principales

1. Visualización en 3D: Representación tridimensional del sistema solar con órbitas y rotaciones realistas.
2. Texturas Detalladas: Cada planeta, el sol y las estrellas tienen texturas detalladas.
3. Cámara Orbit: La cámara se puede controlar para orbitar alrededor del sistema solar y ver los planetas desde diferentes ángulos.
4. Simulación de Iluminación: Simulación de iluminación básica para dar un efecto más realista.
5. Ajuste de Escala: Las distancias y tamaños de los planetas están ajustados para una visualización estética.

## Instalación y Ejecución

1. Descargar el Proyecto: Descargar todos los archivos del proyecto en una carpeta.
2. Estructura de Archivos:
   - `index.html`: Archivo HTML principal que contiene el canvas y carga los scripts.
   - `script.js`: Archivo JavaScript que contiene toda la lógica y configuración de WebGL.
   - `texturas/`: Carpeta que contiene todas las texturas utilizadas para los planetas, el sol y las estrellas.
   - `estrellas.jpg`, `texturas/mercurio.jpg`, `texturas/venus.jpg`, etc.: Archivos de imágenes utilizados como texturas.

3. Abrir el Proyecto: Abrir el archivo `index.html` en un navegador web que soporte WebGL.

## Interacción con la Aplicación

### Controles de la Cámara

- Click Izquierdo y Arrastrar: Orbita la cámara alrededor del sistema solar.
- Rueda del Mouse: Zoom in y zoom out para acercarse o alejarse del sistema solar.

### Características Técnicas

- WebGL2: Utiliza el contexto WebGL2 para una mejor compatibilidad y rendimiento.
- Shaders: Vertex y fragment shaders para el mapeo de texturas y la simulación de iluminación.
- Matrices de Transformación: Utiliza matrices de transformación para la traslación, rotación y escalado de los objetos en la escena.
- Bucle de Animación: Implementación de un bucle de animación para actualizar y dibujar la escena continuamente.
- PhongTextureMaterial: Utilizado para los planetas con textura, permitiendo el mapeo de texturas y la simulación de iluminación con el modelo de iluminación Phong.
- Luz Puntual: Utilizada para simular la luz del sol, proporcionando iluminación ambiental, difusa y especular a los planetas.
- TextureAlphaMaterial: Utilizado para el mapa de los anillos de Saturno con textura transparente.

## Notas Adicionales

- Escala de Distancias: Las distancias entre los planetas y el sol están ajustadas para que todos los planetas se vean en una visualización de distancia de 60 unidades.
- Órbitas y Rotaciones: Las órbitas y rotaciones de los planetas están basadas en sus periodos orbitales reales, ajustados para una visualización fluida.

## Requisitos

- Navegador Compatible: Un navegador web que soporte WebGL2 (por ejemplo, Google Chrome, Firefox).

## Créditos y referencias
Texturas:
Solar System scope. (n.d.). Solar System Scope. https://www.solarsystemscope.com/textures/

Velocidad real orbital:
Wikipedia contributors. (2024, May 25). Orbital speed. Wikipedia. https://en.wikipedia.org/wiki/Orbital_speed

