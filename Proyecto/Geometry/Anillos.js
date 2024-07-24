class Anillos {
  constructor(gl, material = new TextureAlphaMaterial(gl), initialPosition = new Vector3(0, 0, 0), orbitRadius = 10, orbitSpeed = 1, rotationSpeed = 1, tiltAngle = 0) {
    this.material = material;
    this.orbitRadius = orbitRadius;
    this.orbitSpeed = orbitSpeed;
    this.rotationSpeed = rotationSpeed;
    this.tiltAngle = tiltAngle; // Ángulo de inclinación en radianes
    this.theta = 0;
    this.phi = 0;

    // Guardar la transformación original
    this.originalTransform = Matrix4.translate(initialPosition);
    this.transform = this.originalTransform.clone();

    let vertices = this.getVertices();
    let uv = this.getUVCoordinates();

    this.geometryVAO = gl.createVertexArray();
    gl.bindVertexArray(this.geometryVAO);

    let positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.material.getAttribute("a_position"));
    gl.vertexAttribPointer(this.material.getAttribute("a_position"), 3, gl.FLOAT, false, 0, 0);

    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(this.material.getAttribute("a_texcoord"));
    gl.vertexAttribPointer(this.material.getAttribute("a_texcoord"), 2, gl.FLOAT, false, 0, 0);

    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.num_elements = vertices.length / 3;
  }

  draw(gl, projectionMatrix, viewMatrix, light) {
    let viewModelMatrix = Matrix4.multiply(viewMatrix, this.transform);
    let projectionViewModelMatrix = Matrix4.multiply(projectionMatrix, viewModelMatrix);

    // Aplicación del programa y seteo de matrices
    gl.useProgram(this.material.program);
    gl.uniformMatrix4fv(this.material.getUniform("u_PVM_matrix"), true, projectionViewModelMatrix.toArray());

    // Activar textura y dibujar
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
    gl.uniform1i(this.material.getUniform("u_texture"), 0);

    // Dibujar arreglo de vértices
    gl.bindVertexArray(this.geometryVAO);
    gl.drawArrays(gl.TRIANGLES, 0, this.num_elements);
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  update(elapsed) {
    // Incrementar ángulos según la velocidad de orbita y rotación
    this.theta += this.orbitSpeed * elapsed;
    this.phi += this.rotationSpeed * elapsed;

    // Calcular la nueva posición orbital
    let x = this.orbitRadius * Math.cos(this.theta);
    let z = this.orbitRadius * Math.sin(this.theta);

    // Crear transformaciones de traslación y rotación
    let orbitTransform = Matrix4.translate(new Vector3(x, 0, z));
    let rotationTransform = Matrix4.rotateY(this.phi);

    // Aplicar primero la rotación y luego la traslación sobre la transformación original
    this.transform = Matrix4.multiply(this.originalTransform, Matrix4.multiply(orbitTransform, rotationTransform));
  }

  getVertices() {
    // Aplicar la rotación de inclinación a los vértices
    const scale = 4; // Ajusta este valor según sea necesario para que los anillos se vean proporcionales a Saturno
    const tiltMatrix = Matrix4.rotateX(this.tiltAngle);

    const vertices = [
      scale * 1, 0,  scale * 1,
      scale * 1, 0, -scale * 1,
     -scale * 1, 0,  scale * 1,
     -scale * 1, 0,  scale * 1,
      scale * 1, 0, -scale * 1,
     -scale * 1, 0, -scale * 1
    ];

    const tiltedVertices = [];
    for (let i = 0; i < vertices.length; i += 3) {
      let v = new Vector4(vertices[i], vertices[i+1], vertices[i+2], 1);
      v = tiltMatrix.multiplyVector(v);
      tiltedVertices.push(v.x, v.y, v.z);
    }

    return tiltedVertices;
  }

  getUVCoordinates() {
    return [
      1, 0,
      1, 1,
      0, 0,
      0, 0,
      1, 1,
      0, 1
    ];
  }
}

