import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { createText } from '../helpers/createText';
import { loadFonts } from '../helpers/loadFonts';
import GestureHandler from '../gameCubeLogic/GestureHandler';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [fontJson, setFontJson] = useState(null);
  const cubeRef = useRef(null);

  useEffect(() => {
    const loadFont = async () => {
      try {
        const loadedFontJson = await loadFonts();
        setFontJson(loadedFontJson);
      } catch (e) {
        console.error('Error loading font', e);
      }
    };

    loadFont();
  }, []);

  const onContextCreate = async (gl) => {
    if (!fontJson) {
      console.error('Font JSON not loaded yet');
      return;
    }
  
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
    camera.position.z = 10;
  
    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x7A6FB5, side: THREE.DoubleSide });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);
  
    const positions = [
      // Front face
      { pos: [-1.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -1.5, 2], rotation: [0, 0, 0] },
      // Back face
      { pos: [-1.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -1.5, -2], rotation: [0, Math.PI, 0] },
      // Top face
      { pos: [-1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },
      // Bottom face
      { pos: [-1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },
      // Left face
      { pos: [-2, 1.5, 1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, 1.5, 0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, 1.5, -0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, 1.5, -1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, 0.5, 1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, 0.5, 0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, 0.5, -0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, 0.5, -1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, -0.5, 1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, -0.5, 0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, -0.5, -0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, -0.5, -1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, -1.5, 1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, -1.5, 0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      { pos: [-2, -1.5, -0.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] }, { pos: [-2, -1.5, -1.5], rotation: [Math.PI / 2, -Math.PI / 2, Math.PI / 2 ] },
      // Right face
      { pos: [2, 1.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, 1.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, 1.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, 1.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, 0.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, 0.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, 0.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, 0.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, -0.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, -0.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, -0.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, -0.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, -1.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, -1.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [2, -1.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [2, -1.5, -1.5], rotation: [0, Math.PI / 2, 0] },
    ];
  
    try {
      for (let i = 0; i < positions.length; i++) {
        const letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        const textMesh = createText(letter, positions[i].pos, fontJson, positions[i].rotation);
        cube.add(textMesh);
      }
    } catch (error) {
      console.error('Error creating text:', error);
    }
  
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
  
    animate();
  };
  
  const handleRotate = ({ translationX, translationY }) => {
    
    if(cubeRef.current) {
      cubeRef.current.rotation.y += translationX * 0.00009;
      cubeRef.current.rotation.x += translationY * 0.00009;
    }
  }

  return (
    <View style={styles.container}> 
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
      <GestureHandler onRotate={handleRotate}  /> 
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    width: width, 
    height: height, 
    position: 'absolute',
  },
});