import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

export function createText(letter, position, font, rotation) {
  try {
    if (!font) throw new Error('Font data is not loaded');

    const textGeometry = new TextGeometry(letter, {
      font: font,
      size: 0.5,
      height: 0.1,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(position[0], position[1], position[2]);
    textMesh.rotation.set(rotation[0], rotation[1], rotation[2]);

    return textMesh;
  } catch (error) {
    console.error('Error in createText:', error);
    throw error;
  }
}