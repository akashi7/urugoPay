/*eslint-disable*/
import { useEffect } from 'react';

import Orientation, { OrientationType } from 'react-native-orientation-locker';

export function useLockOrientationPortrait() {
  Orientation.lockToPortrait();
}

export function useAnyOrientation() {

  useEffect(() => {
    let previousOrientation = OrientationType;
    Orientation.getOrientation(orientations => {
      previousOrientation = orientations;
      Orientation.unlockAllOrientations();
    });

    return () => {
      switch (previousOrientation) {
        case 'LANDSCAPE-LEFT':
          Orientation.lockToLandscapeLeft();
          break;
        case 'LANDSCAPE-RIGHT':
          Orientation.lockToLandscapeRight();
          break;
        default:
          Orientation.lockToPortrait();
          break;
      }
    };
  }, []);

}