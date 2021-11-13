import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('canvas')
  canvas!: ElementRef<HTMLCanvasElement>;

  // Scene
  scene = new THREE.Scene();

  geometry = new THREE.BoxGeometry(1, 1, 1)
  material = new THREE.MeshBasicMaterial({
    color: 0xff0000
  })
  mesh = new THREE.Mesh(this.geometry, this.material)

  sizes = {
    width: 800,
    height: 600
  }

  camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height)

  ngAfterViewInit() {
    // Mesh
    this.scene.add(this.mesh)

    // Camera
    this.camera.position.z = 3
    this.scene.add(this.camera)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas.nativeElement
    })
    renderer.setSize(this.sizes.width, this.sizes.height)
    renderer.render(this.scene, this.camera)
  }


}
