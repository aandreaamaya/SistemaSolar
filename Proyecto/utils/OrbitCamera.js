class OrbitCamera {
  constructor(pos = new Vector3(0, 0, 1), coi = new Vector3(0, 0, 0), up = new Vector3(0, 1, 0)) {
    this.pos = pos;
    this.coi = coi;
    this.up = up;

    this.radius = Vector3.distance(this.pos, this.coi);
    let direction = this.pos.subtract(this.coi);

    this.theta = Math.atan2(direction.z, direction.x);
    this.phi = Math.atan2(direction.y, direction.z);
  }

  getMatrix() {
    return Matrix4.lookAt(this.pos, this.coi, this.up);
  }

  finishMove(init_mouse, current_mouse) {
    let angles = this.getAngles(init_mouse, current_mouse);

    this.theta = angles.theta;
    this.phi = angles.phi;
  }

  rotate(init_mouse, current_mouse) {
    let angles = this.getAngles(init_mouse, current_mouse);

    this.pos = new Vector3(
      this.coi.x + this.radius * Math.cos(angles.phi) * Math.cos(angles.theta),
      this.coi.y + this.radius * Math.sin(angles.phi),
      this.coi.z + this.radius * Math.cos(angles.phi) * Math.sin(angles.theta)
    );
  }

  getAngles(init_mouse, current_mouse) {
    const EPSILON = 0.01;

    let theta = this.theta + (current_mouse.x - init_mouse.x) / 100;
    let phi = Math.min(
      Math.max(
        this.phi + (current_mouse.y - init_mouse.y) / 100,
        -Math.PI / 2 + EPSILON
      ),
      Math.PI / 2 - EPSILON
    );

    return {
      theta: theta,
      phi: phi
    };
  }

  zoom(displace) {
    const pixel_scale = 0.5;

    displace = Math.sign(displace) * pixel_scale;

    let w = this.pos.subtract(this.coi).normalize();
    let vec_displace = new Vector3(w.x * displace, w.y * displace, w.z * displace);

    let new_position = new Vector3(
      this.pos.x + vec_displace.x,
      this.pos.y + vec_displace.y,
      this.pos.z + vec_displace.z
    );

    if (Vector3.distance(this.coi, new_position) > 0.2) {
      this.pos = new_position;
    }

    this.radius = Vector3.distance(this.pos, this.coi);
  }

  registerMouseEvents(canvas, draw_callback) {
    let initial_mouse_position = null;

    const mousemove = (evt) => {
      this.rotate(initial_mouse_position, getMousePositionInElement(evt, canvas));
      draw_callback();
    };

    canvas.addEventListener("mousedown", (evt) => {
      initial_mouse_position = getMousePositionInElement(evt, canvas);
      window.addEventListener("mousemove", mousemove);
    });

    canvas.addEventListener("wheel", (evt) => {
      this.zoom(evt.deltaY);
      draw_callback();
    });

    window.addEventListener("mouseup", (evt) => {
      if (initial_mouse_position != null) {
        this.finishMove(initial_mouse_position, getMousePositionInElement(evt, canvas));
        window.removeEventListener("mousemove", mousemove);
      }
      initial_mouse_position = null;
    });
  }
}

// Helper function to get mouse position in the canvas
function getMousePositionInElement(evt, element) {
  const rect = element.getBoundingClientRect();
  return { 
    x: evt.clientX - rect.left, 
    y: evt.clientY - rect.top 
  };
}
