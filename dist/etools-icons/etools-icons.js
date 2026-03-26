import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';
import camelCase from 'lodash-es/camelCase';
import kebabCase from 'lodash-es/kebabCase';
export var EtoolsIconSet;
(function (EtoolsIconSet) {
    EtoolsIconSet["av"] = "av";
    EtoolsIconSet["communication"] = "communication";
    EtoolsIconSet["device"] = "device";
    EtoolsIconSet["editor"] = "editor";
    EtoolsIconSet["hardware"] = "hardware";
    EtoolsIconSet["image"] = "image";
    EtoolsIconSet["maps"] = "maps";
    EtoolsIconSet["notification"] = "notification";
    EtoolsIconSet["places"] = "places";
    EtoolsIconSet["icons"] = "icons";
    EtoolsIconSet["social"] = "social";
    EtoolsIconSet["custom"] = "custom";
})(EtoolsIconSet || (EtoolsIconSet = {}));
export const initializeIcons = async (spritePath = 'assets/icons/sprite.svg') => {
    var link = document.createElement('link');
    link.href = spritePath;
    link.type = 'text/css';
    link.rel = 'prefetch';
    link.as = 'image';
    link.type = 'image/svg+xml';
    document.getElementsByTagName('head')[0].appendChild(link);
    const resolver = (name) => {
        const explodedName = name.split(':');
        const iconName = camelCase(explodedName[explodedName.length - 1]);
        return `${spritePath}#${kebabCase(iconName)}`;
    };
    const mutator = (svg) => {
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');
    };
    const libraryConfig = {
        resolver,
        mutator,
        spriteSheet: true
    };
    registerIconLibrary('default', libraryConfig);
    registerIconLibrary('system', libraryConfig);
};
