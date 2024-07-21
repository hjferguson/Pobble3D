import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';

export default function GameScreen() {
  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(120, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: '#7A6FB5' , wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.001;
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    
    animate();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
