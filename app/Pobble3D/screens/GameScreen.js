import React, { useEffect, useState, useRef } from 'react';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { createText } from '../helpers/createText';
import { loadFonts } from '../helpers/loadFonts';
import GestureHandler from '../gameCubeLogic/GestureHandler';

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
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 10;

    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x7A6FB5 });
    const cube = new THREE.Mesh(geometry, material);
    cubeRef.current = cube;
    scene.add(cube);

    //6 sides, 16 letters per size
    const positions = [
      //side 1
      { pos: [-1.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -1.5, 2], rotation: [0, 0, 0] },
      //side2
      { pos: [-1.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -1.5, -2], rotation: [0, Math.PI, 0] },
      //side3
      { pos: [-1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },
      //side4
      { pos: [-1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },
      //side5
      { pos: [2, 1.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 1.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 1.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 1.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 0.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 0.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 0.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 0.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -0.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -0.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -0.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -0.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -1.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -1.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -1.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -1.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      //side6
      { pos: [-2, 1.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, 1.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, 1.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, 1.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, 0.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, 0.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, 0.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, 0.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, -0.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, -0.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, -0.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, -0.5, -1.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, -1.5, 1.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, -1.5, 0.5], rotation: [0, Math.PI / 2, 0] },
      { pos: [-2, -1.5, -0.5], rotation: [0, Math.PI / 2, 0] }, { pos: [-2, -1.5, -1.5], rotation: [0, Math.PI / 2, 0] }
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
    console.log('handleRotate called with', translationX, translationY);
    if(cubeRef.current) {
      cubeRef.current.rotation.y += translationX * 0.001;
      cubeRef.current.rotation.x += translationY * 0.001;
      console.log('Rotate x:', cubeRef.current.rotation.x, 'Rotate y:', cubeRef.current.rotation.y);
    }
  }

  const handlePinch = (scale) => {
    console.log("handlePinch called");
    if(cubeRef.current) {
      cubeRef.current.scale.set(scale, scale, scale);
      console.log('Pinch scale:', scale);
    }
  }

  return (
    <>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
      <GestureHandler onRotate={handleRotate} onPinch={handlePinch} />
    </>
  );
}
