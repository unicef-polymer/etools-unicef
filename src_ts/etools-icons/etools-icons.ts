import defaultIcons from './icons/icons-icons';
import {registerIconLibrary} from '@shoelace-style/shoelace/dist/utilities/icon-library.js';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';

export enum EtoolsIconSet {
  av = 'av',
  communication = 'communication',
  device = 'device',
  editor = 'editor',
  hardware = 'hardware',
  image = 'image',
  maps = 'maps',
  notification = 'notification',
  places = 'places',
  icons = 'icons',
  social = 'social',
  custom = 'custom'
}

export const initializeIcons = async (
  iconSetsToLoad: EtoolsIconSet[] = [],
  additionalIcons: Record<string, string> = {}
) => {
  const iconSets = await Promise.all(
    iconSetsToLoad.map(async (iconSet) => ({
      [iconSet]: (
        await import(
          import.meta && import.meta.url
            ? new URL(`icons/${iconSet}-icons.js`, import.meta.url).toString()
            : `./icons/${iconSet}-icons.js`
        )
      )?.default
    }))
  );

  const icons = Object.assign(
    {
      default: {
        ...defaultIcons,
        ...additionalIcons
      }
    },
    ...iconSets
  );

  registerIconLibrary('default', {
    resolver: (name: string) => {
      const explodedName = name.split(':');
      const setName = explodedName.length > 1 ? explodedName[0] : 'default';
      const iconName = camelCase(explodedName[explodedName.length - 1]);
      if (setName in icons && iconName in icons[setName]) {
        return `data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="icon icon-${kebabCase(
            iconName
          )}" viewBox="0 0 24 24">
                ${icons[setName][iconName]}
                </svg>`
        )}`;
      }
      return '';
    }
  });
};
