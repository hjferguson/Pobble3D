import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { View } from 'react-native';

// This component handles two types of gestures: pan (drag) and pinch (zoom).
// It accepts two props: onRotate and onPinch, which are callback functions for handling these gestures.
export default function GestureHandler({ onRotate, onPinch }) {
  // Refs to handle simultaneous gestures
  const panRef = useRef();
  const pinchRef = useRef();

  // Handle pan (drag) gesture with two fingers
  const handlePanGesture = (event) => {
    if (event.nativeEvent.numberOfPointers === 2) {
      // Call the onRotate callback with the event's native data
      onRotate(event.nativeEvent);
    }
  };

  // Handle pinch (zoom) gesture
  const handlePinchGesture = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Call the onPinch callback with the scale of the pinch gesture
      onPinch(event.nativeEvent.scale);
    }
  };

  // Return PanGestureHandler and PinchGestureHandler components wrapped around a View
  // These components detect and manage the gestures
  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={handlePanGesture}
      simultaneousHandlers={pinchRef}
      minPointers={2} // Only activate pan handler if there are at least 2 touch points
    >
      <PinchGestureHandler
        ref={pinchRef}
        onGestureEvent={handlePinchGesture}
        simultaneousHandlers={panRef}
      >
        <View style={{ flex: 1 }} />
      </PinchGestureHandler>
    </PanGestureHandler>
  );
}
