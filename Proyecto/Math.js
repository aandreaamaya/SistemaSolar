let epsilon = 0.000001;

/** 
 * La clase Vector3 representa vectores de tres componentes, x, y y z.
 */
class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
/*Para la cámara  */
  subtract(v) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  normalize() {
    const length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  cross(v) {
    return new Vector3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  /**
   * Función que devuelve la distancia euclidiana que hay entre sus argumentos.
   * @param {Vector3} u
   * @param {Vector3} v
   * @return {Number}
   */
  static distance(u, v) {
    return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2 + (u.z - v.z) ** 2);
  }

}

/** 
 * La clase Matrix3 representa matrices de 3 × 3. Y se utilizará para la representación y construcción de transformaciones en dos dimensiones.
 */
class Matrix3 {
  constructor(
    a00=1, a01=0, a02=0, 
    a10=0, a11=1, a12=0, 
    a20=0, a21=0, a22=1
  ) {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

/** 
 * La clase Vector4 representa vectores de cuadro componentes, x, y, z y w. 
 */
class Vector4 {
  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   */
  constructor(x=0, y=0, z=0, w=0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Función que devuelve la suma de sus argumentos.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Vector4}
   */
  static add(u, v) {
    return new Vector4(u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w);
  }

  /**
   * Función que devuelve un objeto el cual contiene los mismos valores que el objeto desde el cual se invocó la función.
   * @return {Vector4}
   */
  clone() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  /**
   * Función que devuelve la distancia euclidiana que hay entre sus argumentos.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Number}
   */
  static distance(u, v) {
    return Math.sqrt((u.x - v.x) ** 2 + (u.y - v.y) ** 2 + (u.z - v.z) ** 2 + (u.w - v.w) ** 2);
  }
  

  /**
   * Función que devuelve el producto punto de sus argumentos.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Number}
   */
  static dot(u, v) {
    return u.x * v.x + u.y * v.y + u.z * v.z + u.w * v.w;
  }

  /**
   * Función que devuelve verdadero en caso de que sus argumentos sean aproximadamente iguales (con una epsilon = 0.000001) y falso en caso contrario.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Boolean}
   */
  static equals(u, v) {
    return Math.abs(u.x - v.x) < epsilon &&
           Math.abs(u.y - v.y) < epsilon &&
           Math.abs(u.z - v.z) < epsilon &&
           Math.abs(u.w - v.w) < epsilon;
  }

  /**
   * Función que devuelve verdadero en caso de que sus argumentos sean exactamente iguales y falso en caso contrario.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Boolean}
   */
  static exactEquals(u, v) {
    return u.x === v.x && u.y === v.y && u.z === v.z && u.w === v.w;
  }

  /**
   * Función que devuelve el vector resultado de la normalización del vector que invoca la función.
   * @return {Vector4}
   */
  normalize() {
    const v = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    if (v === 0) {
      return new Vector4(); // Devuelve un vector nulo si la longitud es cero
    } else {
      return new Vector4(this.x / v, this.y / v, this.z / v, this.w / v);
    }
  }

  /**
   * Función que asigna nuevos valores a los componentes del vector con que se llama.
   * @param {Number} x
   * @param {Number} y
   * @param {Number} z
   * @param {Number} w
   */
  set(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  /**
   * Función que devuelve la resta de sus argumentos.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Vector4}
   */
  static subtract(u, v) {
    return new Vector4(u.x - v.x, u.y - v.y, u.z - v.z, u.w - v.w);
  }

  /**
   * Función que devuelve la distancia euclidiana al cuadrado que hay entre sus argumentos.
   * @param {Vector4} u
   * @param {Vector4} v
   * @return {Number}
   */
  static squaredDistance(u, v) {
    return (u.x - v.x) ** 2 + (u.y - v.y) ** 2 + (u.z - v.z) ** 2 + (u.w - v.w) ** 2;
  }

  /**
   * Función que asigna cero a cada componente del vector que invoca la función.
   */
  zero() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.w = 0;
  }
}

/** 
 * La clase Matrix4 representa matrices de 4 × 4, y nos permitirán representar y construir las transformaciones en tres dimensiones.
 */
class Matrix4 {
  /**
   * @param {number} a00
   * @param {number} a01
   * @param {number} a02
   * @param {number} a03
   * @param {number} a10
   * @param {number} a11
   * @param {number} a12
   * @param {number} a13
   * @param {number} a20
   * @param {number} a21
   * @param {number} a22
   * @param {number} a23
   * @param {number} a30
   * @param {number} a31
   * @param {number} a32
   * @param {number} a33
   */
  constructor(
    a00 = 1, a01 = 0, a02 = 0, a03 = 0,
    a10 = 0, a11 = 1, a12 = 0, a13 = 0,
    a20 = 0, a21 = 0, a22 = 1, a23 = 0,
    a30 = 0, a31 = 0, a32 = 0, a33 = 1
  ) {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a03 = a03;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a13 = a13;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
    this.a23 = a23;
    this.a30 = a30;
    this.a31 = a31;
    this.a32 = a32;
    this.a33 = a33;
  }
  
  

  /**
   * Función que devuelve la suma de dos matrices.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Matrix4}
   */
  static add(m1, m2) {
    return new Matrix4(
      m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02, m1.a03 + m2.a03,
      m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12, m1.a13 + m2.a13,
      m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22, m1.a23 + m2.a23,
      m1.a30 + m2.a30, m1.a31 + m2.a31, m1.a32 + m2.a32, m1.a33 + m2.a33
    );
  }

  /**
   * Función que devuelve la matriz adjunta (o matriz de cofactores), de la matriz con que se invoca la función.
   * @return {Matrix4}
   */
  adjoint() {
    const {
      a00, a01, a02, a03,
      a10, a11, a12, a13,
      a20, a21, a22, a23,
      a30, a31, a32, a33
    } = this;
  
    const b00 = a11 * (a22 * a33 - a32 * a23) - a12 * (a21 * a33 - a31 * a23) + a13 * (a21 * a32 - a31 * a22);
    const b01 = -(a01 * (a22 * a33 - a32 * a23) - a02 * (a21 * a33 - a31 * a23) + a03 * (a21 * a32 - a31 * a22));
    const b02 = a01 * (a12 * a33 - a32 * a13) - a02 * (a11 * a33 - a31 * a13) + a03 * (a11 * a32 - a31 * a12);
    const b03 = -(a01 * (a12 * a23 - a22 * a13) - a02 * (a11 * a23 - a21 * a13) + a03 * (a11 * a22 - a21 * a12));
  
    const b10 = -(a10 * (a22 * a33 - a32 * a23) - a12 * (a20 * a33 - a30 * a23) + a13 * (a20 * a32 - a30 * a22));
    const b11 = a00 * (a22 * a33 - a32 * a23) - a02 * (a20 * a33 - a30 * a23) + a03 * (a20 * a32 - a30 * a22);
    const b12 = -(a00 * (a12 * a33 - a32 * a13) - a02 * (a10 * a33 - a30 * a13) + a03 * (a10 * a32 - a30 * a12));
    const b13 = a00 * (a12 * a23 - a22 * a13) - a02 * (a10 * a23 - a20 * a13) + a03 * (a10 * a22 - a20 * a12);
  
    const b20 = a10 * (a21 * a33 - a31 * a23) - a11 * (a20 * a33 - a30 * a23) + a13 * (a20 * a31 - a30 * a21);
    const b21 = -(a00 * (a21 * a33 - a31 * a23) - a01 * (a20 * a33 - a30 * a23) + a03 * (a20 * a31 - a30 * a21));
    const b22 = a00 * (a11 * a33 - a31 * a13) - a01 * (a10 * a33 - a30 * a13) + a03 * (a10 * a31 - a30 * a11);
    const b23 = -(a00 * (a11 * a23 - a21 * a13) - a01 * (a10 * a23 - a20 * a13) + a03 * (a10 * a21 - a20 * a11));
  
    const b30 = -(a10 * (a21 * a32 - a31 * a22) - a11 * (a20 * a32 - a30 * a22) + a12 * (a20 * a31 - a30 * a21));
    const b31 = a00 * (a21 * a32 - a31 * a22) - a01 * (a20 * a32 - a30 * a22) + a02 * (a20 * a31 - a30 * a21);
    const b32 = -(a00 * (a11 * a32 - a31 * a12) - a01 * (a10 * a32 - a30 * a12) + a02 * (a10 * a31 - a30 * a11));
    const b33 = a00 * (a11 * a22 - a21 * a12) - a01 * (a10 * a22 - a20 * a12) + a02 * (a10 * a21 - a20 * a11);
  
    return new Matrix4(
      b00, b10, b20, b30,
      b01, b11, b21, b31,
      b02, b12, b22, b32,
      b03, b13, b23, b33
    );
    
}
transposeOfAdjoint() {
  let adj = this.adjoint(); // Obtén la matriz adjunta
  return adj.transpose(); // Devuelve su transpuesta
}

  
  /**
   * Función que devuelve un objeto el cual contiene los mismos valores que el objeto desde el cual se invocó la función.
   * @return {Matrix4}
   */
  clone() {
    return new Matrix4(
      this.a00, this.a01, this.a02, this.a03,
      this.a10, this.a11, this.a12, this.a13,
      this.a20, this.a21, this.a22, this.a23,
      this.a30, this.a31, this.a32, this.a33
    );
  }
  

  /**
   * Función que devuelve el determinante de la matriz.
   * @return {Number}
   */
  determinant() {
    return (
      this.a00 * this.a11 * this.a22 * this.a33 + this.a00 * this.a12 * this.a23 * this.a31 + this.a00 * this.a13 * this.a21 * this.a32 +
      this.a01 * this.a10 * this.a23 * this.a32 + this.a01 * this.a12 * this.a20 * this.a33 + this.a01 * this.a13 * this.a22 * this.a30 +
      this.a02 * this.a10 * this.a21 * this.a33 + this.a02 * this.a11 * this.a23 * this.a30 + this.a02 * this.a13 * this.a20 * this.a31 +
      this.a03 * this.a10 * this.a22 * this.a31 + this.a03 * this.a11 * this.a20 * this.a32 + this.a03 * this.a12 * this.a21 * this.a30 -
      this.a00 * this.a11 * this.a23 * this.a32 - this.a00 * this.a12 * this.a21 * this.a33 - this.a00 * this.a13 * this.a22 * this.a31 -
      this.a01 * this.a10 * this.a22 * this.a33 - this.a01 * this.a12 * this.a23 * this.a30 - this.a01 * this.a13 * this.a20 * this.a32 -
      this.a02 * this.a10 * this.a23 * this.a31 - this.a02 * this.a11 * this.a20 * this.a33 - this.a02 * this.a13 * this.a21 * this.a30 -
      this.a03 * this.a10 * this.a21 * this.a32 - this.a03 * this.a11 * this.a22 * this.a30 - this.a03 * this.a12 * this.a20 * this.a31
    );
  }
  

  /**
   * Función que devuelve verdadero en caso de que sus argumentos sean aproximadamente iguales (con una epsilon = 0.000001) y falso en caso contrario.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Boolean}
   */
  static equals(m1, m2) {
    return (
      Math.abs(m1.a00 - m2.a00) < 0.000001 &&
      Math.abs(m1.a01 - m2.a01) < 0.000001 &&
      Math.abs(m1.a02 - m2.a02) < 0.000001 &&
      Math.abs(m1.a03 - m2.a03) < 0.000001 &&
      Math.abs(m1.a10 - m2.a10) < 0.000001 &&
      Math.abs(m1.a11 - m2.a11) < 0.000001 &&
      Math.abs(m1.a12 - m2.a12) < 0.000001 &&
      Math.abs(m1.a13 - m2.a13) < 0.000001 &&
      Math.abs(m1.a20 - m2.a20) < 0.000001 &&
      Math.abs(m1.a21 - m2.a21) < 0.000001 &&
      Math.abs(m1.a22 - m2.a22) < 0.000001 &&
      Math.abs(m1.a23 - m2.a23) < 0.000001 &&
      Math.abs(m1.a30 - m2.a30) < 0.000001 &&
      Math.abs(m1.a31 - m2.a31) < 0.000001 &&
      Math.abs(m1.a32 - m2.a32) < 0.000001 &&
      Math.abs(m1.a33 - m2.a33) < 0.000001
    );
  }
  

  /**
   * Función que devuelve verdadero en caso de que sus argumentos sean exactamente iguales y falso en caso contrario.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Boolean}
   */
  static exactEquals(m1, m2) {
    return (
      m1.a00 === m2.a00 &&
      m1.a01 === m2.a01 &&
      m1.a02 === m2.a02 &&
      m1.a03 === m2.a03 &&
      m1.a10 === m2.a10 &&
      m1.a11 === m2.a11 &&
      m1.a12 === m2.a12 &&
      m1.a13 === m2.a13 &&
      m1.a20 === m2.a20 &&
      m1.a21 === m2.a21 &&
      m1.a22 === m2.a22 &&
      m1.a23 === m2.a23 &&
      m1.a30 === m2.a30 &&
      m1.a31 === m2.a31 &&
      m1.a32 === m2.a32 &&
      m1.a33 === m2.a33
    );
  }
  

  /**
   * Función que construye una matriz que representa la pirámide truncada (view frustum), determinada por los planos dados por los parámetros left, right, bottom, top, near y far.
   * @param {Number} left
   * @param {Number} right
   * @param {Number} bottom
   * @param {Number} top
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static frustum(left, right, bottom, top, near, far) {
    const a00 = 2 * near / (right - left);
    const a11 = 2 * near / (top - bottom);
    const a02 = (right + left) / (right - left);
    const a12 = (top + bottom) / (top - bottom);
    const a22 = -(far + near) / (far - near);
    const a23 = -2 * far * near / (far - near);
    const a32 = -1;
  
    return new Matrix4(
      a00, 0, a02, 0,
      0, a11, a12, 0,
      0, 0, a22, a23,
      0, 0, a32, 0
    );
  }
  

  /**
   * Función que asigna los valores de la matriz identidad a la matriz desde donde se invocó la función.
   */
  identity() {
    this.a00 = 1; this.a01 = 0; this.a02 = 0; this.a03 = 0;
    this.a10 = 0; this.a11 = 1; this.a12 = 0; this.a13 = 0;
    this.a20 = 0; this.a21 = 0; this.a22 = 1; this.a23 = 0;
    this.a30 = 0; this.a31 = 0; this.a32 = 0; this.a33 = 1;
    return this;
  }
  

  /**
   * Función que devuelve la matriz inversa de la matriz con la que se invocó la función.
   * @return {Matrix4}
   */
  invert() {
    const det = this.determinant();
    if (det === 0) {
        throw new Error("No se puede invertir la matriz, el determinante es 0");
    }
    const invDet = 1.0 / det;

    return new Matrix4(
        this.a00 * invDet, this.a01 * invDet, this.a02 * invDet, this.a03 * invDet,
        this.a10 * invDet, this.a11 * invDet, this.a12 * invDet, this.a13 * invDet,
        this.a20 * invDet, this.a21 * invDet, this.a22 * invDet, this.a23 * invDet,
        this.a30 * invDet, this.a31 * invDet, this.a32 * invDet, this.a33 * invDet
    );
}

  

  /**
   * Función que devuelve la matriz de vista a partir de la posición del ojo (eye) el centro de interés (center) y el vector hacia arriba (up).
   * @param {Vector3} eye
   * @param {Vector3} center
   * @param {Vector3} up
   * @return {Matrix4}
   */
  static lookAt(eye, center, up) {
  
    let zAxis = eye.subtract(center).normalize(); // Dirección de visión
    let xAxis = up.cross(zAxis).normalize(); // Eje horizontal
    let yAxis = zAxis.cross(xAxis).normalize(); // Eje vertical

    return new Matrix4(
        xAxis.x, xAxis.y, xAxis.z, -Vector3.dot(xAxis, eye),
        yAxis.x, yAxis.y, yAxis.z, -Vector3.dot(yAxis, eye),
        zAxis.x, zAxis.y, zAxis.z, -Vector3.dot(zAxis, eye),
        0, 0, 0, 1
    );
}




  
  /**
   * Función que devuelve la multiplicación de dos matrices.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Matrix4}
   */
  static multiply(m1, m2) {
    return new Matrix4(
        m1.a00 * m2.a00 + m1.a01 * m2.a10 + m1.a02 * m2.a20 + m1.a03 * m2.a30,
        m1.a00 * m2.a01 + m1.a01 * m2.a11 + m1.a02 * m2.a21 + m1.a03 * m2.a31,
        m1.a00 * m2.a02 + m1.a01 * m2.a12 + m1.a02 * m2.a22 + m1.a03 * m2.a32,
        m1.a00 * m2.a03 + m1.a01 * m2.a13 + m1.a02 * m2.a23 + m1.a03 * m2.a33,

        m1.a10 * m2.a00 + m1.a11 * m2.a10 + m1.a12 * m2.a20 + m1.a13 * m2.a30,
        m1.a10 * m2.a01 + m1.a11 * m2.a11 + m1.a12 * m2.a21 + m1.a13 * m2.a31,
        m1.a10 * m2.a02 + m1.a11 * m2.a12 + m1.a12 * m2.a22 + m1.a13 * m2.a32,
        m1.a10 * m2.a03 + m1.a11 * m2.a13 + m1.a12 * m2.a23 + m1.a13 * m2.a33,

        m1.a20 * m2.a00 + m1.a21 * m2.a10 + m1.a22 * m2.a20 + m1.a23 * m2.a30,
        m1.a20 * m2.a01 + m1.a21 * m2.a11 + m1.a22 * m2.a21 + m1.a23 * m2.a31,
        m1.a20 * m2.a02 + m1.a21 * m2.a12 + m1.a22 * m2.a22 + m1.a23 * m2.a32,
        m1.a20 * m2.a03 + m1.a21 * m2.a13 + m1.a22 * m2.a23 + m1.a23 * m2.a33,

        m1.a30 * m2.a00 + m1.a31 * m2.a10 + m1.a32 * m2.a20 + m1.a33 * m2.a30,
        m1.a30 * m2.a01 + m1.a31 * m2.a11 + m1.a32 * m2.a21 + m1.a33 * m2.a31,
        m1.a30 * m2.a02 + m1.a31 * m2.a12 + m1.a32 * m2.a22 + m1.a33 * m2.a32,
        m1.a30 * m2.a03 + m1.a31 * m2.a13 + m1.a32 * m2.a23 + m1.a33 * m2.a33
    );
}


  

  /**
   * Función que devuelve una matriz que es el resultado de multiplicar cada componente por un escalar.
   * @param {Matrix4} m1
   * @param {Number} c
   * @return {Matrix4}
   */
  static multiplyScalar(m1, c) {
    return new Matrix4(
      m1.a00 * c, m1.a01 * c, m1.a02 * c, m1.a03 * c,
      m1.a10 * c, m1.a11 * c, m1.a12 * c, m1.a13 * c,
      m1.a20 * c, m1.a21 * c, m1.a22 * c, m1.a23 * c,
      m1.a30 * c, m1.a31 * c, m1.a32 * c, m1.a33 * c
    );
  }
  

  /**
   * Función que devuelve el vector resultado de multiplicar el vector v por la matriz con que se llama la función. Esta función es la que se va a llamar cuando se apliquen las transformaciones sobre los vectores.
   * @param {Vector4} v
   * @return {Vector4}
   */
  multiplyVector(v) {
    return new Vector4(
      this.a00 * v.x + this.a01 * v.y + this.a02 * v.z + this.a03 * v.w,
      this.a10 * v.x + this.a11 * v.y + this.a12 * v.z + this.a13 * v.w,
      this.a20 * v.x + this.a21 * v.y + this.a22 * v.z + this.a23 * v.w,
      this.a30 * v.x + this.a31 * v.y + this.a32 * v.z + this.a33 * v.w
    );
  }
  

  /**
   * Función que devuelve una matriz que corresponde a una proyección ortogonal, determinada por los planos dados por los parámetros left, right, bottom, top, near y far.
   * @param {Number} left
   * @param {Number} right
   * @param {Number} bottom
   * @param {Number} top
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static orthographic(left, right, bottom, top, near, far) {
    const a00 = 2 / (right - left);
    const a11 = 2 / (top - bottom);
    const a22 = -2 / (far - near);
    const a03 = -(right + left) / (right - left);
    const a13 = -(top + bottom) / (top - bottom);
    const a23 = -(far + near) / (far - near);
  
    return new Matrix4(
      a00, 0, 0, a03,
      0, a11, 0, a13,
      0, 0, a22, a23,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que devuelve una matriz que corresponde a una proyección en perspectiva. El parámetro fovy corresponde al campo de visión vertical (field of view), el parámetro aspect corresponde a la relación de aspecto, near es la distancia del plano más cercano y far es la distancia del plano más lejano.
   * @param {Number} fovy
   * @param {Number} aspect
   * @param {Number} near
   * @param {Number} far
   * @return {Matrix4}
   */
  static perspective(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const a00 = f / aspect;
    const a11 = f;
    const a22 = (far + near) / (near - far);
    const a23 = (2 * far * near) / (near - far);
    const a32 = -1;
  
    return new Matrix4(
      a00, 0, 0, 0,
      0, a11, 0, 0,
      0, 0, a22, a23,
      0, 0, a32, 0
    );
  }
  

  /**
   * Función que devuelve una matriz de rotación en 3D sobre el eje X con el ángulo (en radianes) dado por el parámetro theta.
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateX(theta) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
  
    return new Matrix4(
      1, 0, 0, 0,
      0, cosTheta, -sinTheta, 0,
      0, sinTheta, cosTheta, 0,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que devuelve una matriz de rotación en 3D sobre el eje Y con el ángulo (en radianes) dado por el parámetro theta.
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateY(theta) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
  
    return new Matrix4(
      cosTheta, 0, sinTheta, 0,
      0, 1, 0, 0,
      -sinTheta, 0, cosTheta, 0,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que devuelve una matriz de rotación en 3D sobre el eje Z con el ángulo (en radianes) dado por el parámetro theta.
   * @param {Number} theta
   * @return {Matrix4}
   */
  static rotateZ(theta) {
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);
  
    return new Matrix4(
      cosTheta, -sinTheta, 0, 0,
      sinTheta, cosTheta, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que devuelve una matriz de escalamiento en 3D con los factores de escala determinados por las componentes del vector v.
   * @param {Vector3} v
   * @return {Matrix4}
   */
  static scale(v) {
    return new Matrix4(
      v.x, 0, 0, 0,
      0, v.y, 0, 0,
      0, 0, v.z, 0,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que asigna nuevos valores a los componentes de la matriz con que se llama.
   * @param {Number} a00
   * @param {Number} a01
   * @param {Number} a02
   * @param {Number} a03
   * @param {Number} a10
   * @param {Number} a11
   * @param {Number} a12
   * @param {Number} a13
   * @param {Number} a20
   * @param {Number} a21
   * @param {Number} a22
   * @param {Number} a23
   * @param {Number} a30
   * @param {Number} a31
   * @param {Number} a32
   * @param {Number} a33
   */
  set(
    a00, a01, a02, a03, 
    a10, a11, a12, a13, 
    a20, a21, a22, a23, 
    a30, a31, a32, a33
  ) {
    this.a00 = a00;
    this.a01 = a01;
    this.a02 = a02;
    this.a03 = a03;
    this.a10 = a10;
    this.a11 = a11;
    this.a12 = a12;
    this.a13 = a13;
    this.a20 = a20;
    this.a21 = a21;
    this.a22 = a22;
    this.a23 = a23;
    this.a30 = a30;
    this.a31 = a31;
    this.a32 = a32;
    this.a33 = a33;
  }
  

  /**
   * Función que sustrae componente a componente la matriz m2 de la matriz m1.
   * @param {Matrix4} m1
   * @param {Matrix4} m2
   * @return {Matrix4}
   */
  static subtract(m1, m2) {
    return new Matrix4(
      m1.a00 - m2.a00, m1.a01 - m2.a01, m1.a02 - m2.a02, m1.a03 - m2.a03,
      m1.a10 - m2.a10, m1.a11 - m2.a11, m1.a12 - m2.a12, m1.a13 - m2.a13,
      m1.a20 - m2.a20, m1.a21 - m2.a21, m1.a22 - m2.a22, m1.a23 - m2.a23,
      m1.a30 - m2.a30, m1.a31 - m2.a31, m1.a32 - m2.a32, m1.a33 - m2.a33
    );
  }
  

  /**
   * Función que devuelve una matriz de traslación en 3D con los factores de desplazamiento dados por las componentes del vector v.
   * @param {Vector3} v
   * @return {Matrix4}
   */
  static translate(v) {
    return new Matrix4(
      1, 0, 0, v.x,
      0, 1, 0, v.y,
      0, 0, 1, v.z,
      0, 0, 0, 1
    );
  }
  

  /**
   * Función que devuelve la matriz transpuesta de la matriz desde donde se invocó la función.
   * @return {Matrix4}
   */
  transpose() {
    return new Matrix4(
      this.a00, this.a10, this.a20, this.a30,
      this.a01, this.a11, this.a21, this.a31,
      this.a02, this.a12, this.a22, this.a32,
      this.a03, this.a13, this.a23, this.a33
    );
  }
  toArray() {
    return [
      this.a00, this.a01, this.a02, this.a03,
      this.a10, this.a11, this.a12, this.a13,
      this.a20, this.a21, this.a22, this.a23,
      this.a30, this.a31, this.a32, this.a33
    ];
  }

}
