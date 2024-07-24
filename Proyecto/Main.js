window.addEventListener("load", async function(evt) {
  let canvas = document.getElementById("the_canvas");
  const gl = canvas.getContext("webgl2");

  if (!gl) throw "WebGL no soportado";

  // Ajustar el tamaño del canvas para que ocupe toda la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  try {
    // Cargar las imágenes de las texturas
    let estrellas = await loadImage("estrellas.jpg");
    let texMercurio = await loadImage("texturas/mercurio.jpg");
    let texVenus = await loadImage("texturas/venus.jpg");
    let texTierra = await loadImage("texturas/tierra.jpg");
    let texMarte = await loadImage("texturas/marte.jpg");
    let texJupiter = await loadImage("texturas/jupiter.jpg");
    let texSaturno = await loadImage("texturas/saturno.jpg");
    let texAnillos = await loadImage("texturas/anillo.png");
    let texUrano= await loadImage("texturas/urano.jpg");
    let texNeptuno= await loadImage("texturas/neptuno.jpg");
    let texSol = await loadImage("texturas/sol.jpg");

    // Crear una fuente de luz en la posición del sol
    let sunPosition = new Vector4(0, 0, 0, 1);
    let sunLight = new LuzPuntual(
      sunPosition,
      [0.2, 0.2, 0.0], // Color ambiental de la luz (amarillo)
      [1.0, 1.0, 0.0], // Color difuso de la luz (amarillo)
      [1.0, 1.0, 0.0]  // Color especular de la luz (amarillo)
    );

    // Crear el material para el sol, con alta emisión para que actúe como fuente de luz
    let sunMaterial = new TextureMaterial(gl, texSol, [1.0, 1.0, 0.0]);

    // Crear geometrías y materiales para cada objeto en la escena
    let geometry = [
      // Crear el sol
      new Sol(
        gl,
        2, 16, 16, // Radio y segmentos para crear la esfera del sol
        sunMaterial,
        new Matrix4(),
        0,
        0.3,
        0.1
      ),
      // Crear una esfera de estrellas para el fondo
      new Esfera(
        gl,
        500, 16, 16, // Radio y segmentos para crear la esfera de estrellas
        new TextureMaterial(gl, estrellas, [0.0, 0.0, 0.0]),
        new Matrix4(),
        10,
        0.1,
        0.1
      ),
      // Crear el planeta Mercurio
      new Mercurio(
        gl,
        0.4, 16, 16, // Radio y segmentos para crear la esfera de Mercurio
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texMercurio // Textura
        ),
        new Matrix4(),
        3,  // Distancia estética desde el sol
        1 / 0.24,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear el planeta Venus
      new Venus(
        gl,
        0.7, 16, 16, // Radio y segmentos para crear la esfera de Venus
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texVenus // Textura
        ),
        new Matrix4(),
        6,  // Distancia estética desde el sol
        1 / 0.62,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear el planeta Tierra
      new Tierra(
        gl,
        1, 16, 16, // Radio y segmentos para crear la esfera de la Tierra
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texTierra // Textura
        ),
        new Matrix4(),
        9,  // Distancia estética desde el sol
        1 / 1.0,  // Velocidad relativa basada en el periodo orbital
        0.4
      ),
      // Crear el planeta Marte
      new Marte(
        gl,
        0.8, 16, 16, // Radio y segmentos para crear la esfera de Marte
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texMarte // Textura
        ),
        new Matrix4(),
        12,  // Distancia estética desde el sol
        1 / 1.88,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear el planeta Júpiter
      new Jupiter(
        gl,
        2, 16, 16, // Radio y segmentos para crear la esfera de Júpiter
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texJupiter // Textura
        ),
        new Matrix4(),
        18,  // Distancia estética desde el sol
        1 / 11.86,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear el planeta Saturno
      new Saturno(
        gl,
        2, 16, 16, // Radio y segmentos para crear la esfera de Saturno
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texSaturno // Textura
        ),
        new Matrix4(),
        24,  // Distancia estética desde el sol
        1 / 29.46,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear los anillos de Saturno
      new Anillos(
        gl,
        new TextureAlphaMaterial(gl, texAnillos),  
        Matrix4.translate(new Vector3(24, 0, 0)),  // Posición inicial específica
        24, // Radio de órbita (igual que Saturno)
        1 / 29.46,  // Velocidad de órbita (igual que Saturno)
        0,  // Velocidad de rotación
        Math.PI / 6 // Ángulo de inclinación de 30 grados
      ),
      // Crear el planeta Urano
      new Urano(
        gl,
        2, 16, 16, // Radio y segmentos para crear la esfera de Urano
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texUrano // Textura
        ),
        new Matrix4(),
        30,  // Distancia estética desde el sol
        1 / 84.01,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
      // Crear el planeta Neptuno
      new Neptuno(
        gl,
        2, 16, 16, // Radio y segmentos para crear la esfera de Neptuno
        new PhongTextureMaterial(
          gl, 
          [0.1, 0.1, 0.1], // Coeficientes de reflexión ambiental
          [1, 1, 1], // Coeficientes de reflexión difusa
          [1, 1, 1], // Coeficientes de reflexión especular
          50, // Brillo
          texNeptuno // Textura
        ),
        new Matrix4(),
        36,  // Distancia estética desde el sol
        1 / 164.8,  // Velocidad relativa basada en el periodo orbital
        0.8
      ),
    ];
    
    // Crear la cámara en una posición lateral de los planetas
    let camera = new OrbitCamera(
      new Vector3(65, 0, 10),  // Establece la posición inicial de la cámara en (x=65, y=0, z=10)
      new Vector3(0, 0, 0),  // Establece el punto de referencia hacia el que la cámara está mirando (en este caso, el origen)
      new Vector3(0, 1, 0)  // Establece el vector "arriba" de la cámara (en este caso, el eje y positivo)
    );
    
    // Crear la matriz de proyección de la cámara
    let projectionMatrix = Matrix4.perspective(75 * Math.PI / 180, canvas.width / canvas.height, 1, 2000);

    // Posición de la luz para la iluminación de la escena
    let lightPosition = new Vector4(5, 5, 5, 1);

    // Habilitar el test de profundidad para ocultar correctamente los objetos detrás de otros
    gl.enable(gl.DEPTH_TEST);
    // Configurar la función de mezcla para las texturas con transparencia
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    // Ajustar el viewport al tamaño del canvas
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // Establecer el color de borrado del buffer de color a negro
    gl.clearColor(0, 0, 0, 0);

    // Función para actualizar la posición y rotación de los objetos en la escena
    function update(elapsed) {
      for (let i = 0; i < geometry.length; i++) {
        geometry[i].update(elapsed);
      }
    }

    // Función para dibujar la escena
    function draw() {
      // Borrar el buffer de color y el buffer de profundidad
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // Obtener la matriz de vista de la cámara
      let viewMatrix = camera.getMatrix();
      // Transformar la posición de la luz a la vista de la cámara
      let trans_lightPosition = viewMatrix.multiplyVector(lightPosition);
      let trans_sunLightPosition = viewMatrix.multiplyVector(sunPosition);

      // Dibujar cada objeto en la geometría
      for (let i = 0; i < geometry.length; i++) {
        geometry[i].draw(
          gl,
          projectionMatrix,
          viewMatrix,
          {
            pos: [
              trans_sunLightPosition.x,
              trans_sunLightPosition.y,
              trans_sunLightPosition.z
            ],
            ambient: [1.0, 0.5, 0.0], // Color ambiental (amarillo)
            diffuse: [1.0, 1.0, 1.0], // Color difuso (blanco)
            especular: [1.0, 0.5, 0.0] // Color especular (amarillo)
          }
        );
      }
    }

    draw();
    // Registrar eventos del mouse para controlar la cámara
    camera.registerMouseEvents(gl.canvas, draw);

    let lastTime = Date.now();
    let current = 0;
    let elapsed = 0;
    let max_elapsed_wait = 30 / 1000;

    // Bucle principal del juego para actualizar y dibujar la escena
    function gameLoop() {
      current = Date.now();
      elapsed = (current - lastTime) / 1000;
      lastTime = current;

      if (elapsed > max_elapsed_wait) {
        elapsed = max_elapsed_wait;
      }

      update(elapsed);
      draw();

      window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
  } catch (error) {
    console.error("Error durante la inicialización:", error);
  }
});
