import { Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  mouse = new THREE.Vector3(0, 0, 1);
  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  canvas: any
  scene = new THREE.Scene();
  geometry = new THREE.BufferGeometry();
  material = new THREE.MeshBasicMaterial({
    color: 0xffff00
  });
  camera = new THREE.PerspectiveCamera(
    75,
    this.sizes.width / this.sizes.height,
    0.1,
    100
  );
  positions: any
  points: any
  renderer: any


  ngOnInit() {
    this.canvas = document.querySelector("canvas.webgl");
    this.positions = this.setPosition(new Float32Array(150 * 3));

    this.geometry.setAttribute("position", new THREE.BufferAttribute(this.positions, 3));

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);

    window.addEventListener("mousemove", (e) => {
      this.handleMouseMove(e)
    });

    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.tick()
  }

  setPosition(array: any) {
    for (let i = 0; i < 150; i++) {
      const i3 = i * 3;

      const x = (i / (150 - 1) - 0.5) * 3;
      const y = Math.sin(i / 10.5) * 0.5;

      array[i3] = x;
      array[i3 + 1] = y;
      array[i3 + 2] = 1;
    }
    return array;
  }

  // Mouse Move
  handleMouseMove(event: any) {
    this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
    this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    this.mouse.z = 1;

    // convert screen coordinates to threejs world position
    // https://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z

    var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
    vector.unproject(this.camera);
    var dir = vector.sub(this.camera.position).normalize();
    var distance = -this.camera.position.z / dir.z;
    var pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

    this.mouse = pos;
  }

  tick = () => {
    this.renderer.render(this.scene, this.camera);

    for (let i = 0; i < 150; i++) {
      const i3 = i * 3;
      const previous = (i - 1) * 3;

      if (i3 === 0) {
        this.positions[0] = this.mouse.x;
        this.positions[1] = this.mouse.y + 0.05;
        this.positions[2] = this.mouse.z;
      } else {
        const currentPoint = new THREE.Vector3(
          this.positions[i3],
          this.positions[i3 + 1],
          this.positions[i3 + 2]
        );

        const previousPoint = new THREE.Vector3(
          this.positions[previous],
          this.positions[previous + 1],
          this.positions[previous + 2]
        );

        const lerpPoint = currentPoint.lerp(previousPoint, 0.9);

        this.positions[i3] = lerpPoint.x;
        this.positions[i3 + 1] = lerpPoint.y;
        this.positions[i3 + 2] = this.mouse.z;
      }
    }
    this.geometry.attributes.position.needsUpdate = true;

    window.requestAnimationFrame(this.tick);
  };

}

