import React, { useEffect, useState } from 'react';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { createText } from '../helpers/createText';
import { loadFonts } from '../helpers/loadFonts';

export default function GameScreen() {
  const [fontJson, setFontJson] = useState(null);

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
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;

    const geometry = new THREE.BoxGeometry(4, 4, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x7A6FB5, wireframe: false });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const positions = [
      { pos: [-1.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 1.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, 0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, 0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -0.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -0.5, 2], rotation: [0, 0, 0] },
      { pos: [-1.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [-0.5, -1.5, 2], rotation: [0, 0, 0] },
      { pos: [0.5, -1.5, 2], rotation: [0, 0, 0] }, { pos: [1.5, -1.5, 2], rotation: [0, 0, 0] },

      { pos: [-1.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, 0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, 0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -0.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -0.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [-1.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [-0.5, -1.5, -2], rotation: [0, Math.PI, 0] },
      { pos: [0.5, -1.5, -2], rotation: [0, Math.PI, 0] }, { pos: [1.5, -1.5, -2], rotation: [0, Math.PI, 0] },

      { pos: [-1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, 0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -0.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [-1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [-0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },
      { pos: [0.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] }, { pos: [1.5, 2, -1.5], rotation: [-Math.PI / 2, 0, 0] },

      { pos: [-1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, 0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -0.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [-1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [-0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },
      { pos: [0.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] }, { pos: [1.5, -2, -1.5], rotation: [Math.PI / 2, 0, 0] },

      { pos: [2, 1.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 1.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 1.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 1.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 0.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 0.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, 0.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, 0.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -0.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -0.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -0.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -0.5, -1.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -1.5, 1.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -1.5, 0.5], rotation: [0, -Math.PI / 2, 0] },
      { pos: [2, -1.5, -0.5], rotation: [0, -Math.PI / 2, 0] }, { pos: [2, -1.5, -1.5], rotation: [0, -Math.PI / 2, 0] },

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
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
