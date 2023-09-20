import {avIcons} from './icons/av-icons';
import {communicationIcons} from './icons/communication-icons';
import {deviceIcons} from './icons/device-icons';
import {editorIcons} from './icons/editor-icons';
import {hardwareIcons} from './icons/hardware-icons';
import {imageIcons} from './icons/image-icons';
import {ironIcons} from './icons/iron-icons';
import {mapsIcons} from './icons/maps-icons';
import {notificationIcons} from './icons/notification-icons';
import {placesIcons} from './icons/places-icons';
import {socialIcons} from './icons/social-icons';
import {customIcons} from './icons/custom-icons';
import {registerIconLibrary} from '@shoelace-style/shoelace/dist/utilities/icon-library.js';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';

export const initializeIcons = (additionalIcons: Record<string, string> = {}) => {
  const icons = Object.assign(
    {},
    ...[
      avIcons,
      communicationIcons,
      deviceIcons,
      editorIcons,
      hardwareIcons,
      imageIcons,
      ironIcons,
      mapsIcons,
      notificationIcons,
      placesIcons,
      socialIcons,
      customIcons,
      additionalIcons
    ]
  );

  registerIconLibrary('default', {
    resolver: (name: string) => {
      const iconName = camelCase(name);
      if (iconName in icons) {
        return `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="icon icon-${kebabCase(
            iconName
          )}" viewBox="0 0 24 24">
            ${(icons as any)[iconName]}
            </svg>`
        )}`;
      }
      return '';
    }
  });
};
