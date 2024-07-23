import { PanGestureHandler, State } from 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { View } from 'react-native';

export default function GestureHandler({ onRotate }) {
  // Refs to handle simultaneous gestures
  const panRef = useRef();

  // Handle pan (drag) gesture with two fingers
  const handlePanGesture = (event) => {
    if (event.nativeEvent.numberOfPointers === 2) {
      // Call the onRotate callback with the event's native data
      onRotate(event.nativeEvent);
    }
  };

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={handlePanGesture}
      minPointers={2} // Only activate pan handler if there are at least 2 touch points
    >
        <View style={{ flex: 1 }} />
      
    </PanGestureHandler>
  );
}