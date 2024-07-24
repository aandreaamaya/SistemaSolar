class LuzPuntual {
  constructor(pos=[0,0,0], ambient=[0.2,0.2,0.2], diffuse=[1,1,1], especular=[0.5,0,0]) {
    this.position = pos;
    this.ambient = ambient;
    this.diffuse = diffuse;
    this.especular = especular;
    this.position_transform = [0,0,0];
  }

  update(viewMatrix) {
    this.position_transform = Matrix4.multiply(viewMatrix, this.position);
  }

  getPosition() {
    return [this.position_transform[0], this.position_transform[1], this.position_transform[2]];
  }
}
