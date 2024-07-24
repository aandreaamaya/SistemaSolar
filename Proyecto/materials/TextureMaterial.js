class TextureMaterial extends Material {
  constructor(gl, image, emission) {
    let vertexShaderSource = 
    `#version 300 es
    in vec4 a_position;
    in vec2 a_texcoord;
    out vec2 v_texcoord;
    uniform mat4 u_PVM_matrix;
    void main() {
      v_texcoord = a_texcoord;
      gl_Position = u_PVM_matrix * a_position;
    }`;

    let fragmentShaderSource =
    `#version 300 es
    precision mediump float;
    in vec2 v_texcoord;
    uniform sampler2D u_texture;
    uniform vec3 u_emission; // Emission component
    out vec4 pixelColor;
    void main() {
      vec4 texColor = texture(u_texture, v_texcoord);
      vec3 emission = u_emission; // Add emission color
      pixelColor = vec4(texColor.rgb + emission, texColor.a);
    }`;

    super(gl, [1, 1, 1, 1], vertexShaderSource, fragmentShaderSource);

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindTexture(gl.TEXTURE_2D, null);

    this.emission = emission || [0, 0, 0];
  }

  getUniformsList(gl) {
    let uniforms = super.getUniformsList(gl);
    uniforms['u_emission'] = gl.getUniformLocation(this.program, 'u_emission');
    return uniforms;
  }

  setEmission(gl, emission) {
    this.emission = emission;
    gl.useProgram(this.program);
    gl.uniform3fv(this.getUniform('u_emission'), this.emission);
  }

  use(gl) {
    super.use(gl);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform3fv(this.getUniform('u_emission'), this.emission);
  }
}
