import {createRequire} from 'module';
const require = createRequire(import.meta.url);

const SVGSpriter = require('svg-sprite');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const url = require('url');

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argv = (key) => {
  const value = process.argv.find((element) => element.startsWith(`--${key}=`));

  // Return null if the key does not exist and a value is not defined
  if (!value) return undefined;

  return value.replace(`--${key}=`, '');
};

const readFiles = async (dirname: string, additionalIconsPath?: any) => {
  let icons = {};
  const filenames = fs
    .readdirSync(dirname, {withFileTypes: true})
    .filter((file) => file.isFile() && file.name.includes('.js'))
    .map((file) => dirname + '/' + file.name);

  for (const file of filenames) {
    const content = await import(file);
    icons = {...icons, ...(content.default || content)};
    console.info('Loaded default file:', path.basename(file));
  }

  if (additionalIconsPath) {
    filenames.push(additionalIconsPath);
    try {
      const content = require(additionalIconsPath);
      icons = {...icons, ...content};
      console.info('Loaded extra icons file:', path.basename(additionalIconsPath));
    } catch (e) {
      console.error('Can not parse additional icons set', e);
    }
  }
  return icons;
};

const generateIconsSprite = async (outPutDirectory?: string, additionalIconsPath?: any) => {
  const icons = await readFiles(path.resolve(__dirname, './icons'), additionalIconsPath);
  const spriter = new SVGSpriter({
    dest: outPutDirectory || './assets/sprites',
    mode: {
      symbol: true
    }
  });

  Object.keys(icons).map((x) => {
    let icon = icons[x].trim();
    icon = icon.startsWith('<svg')
      ? icon
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    ${icon}
                    </svg>`;
    spriter.add(_.kebabCase(x), null, icon);
  });

  const {result} = await spriter.compileAsync();

  const resource = result['symbol']['sprite'];
  const outputPath = resource.path.replace('symbol/svg/', '').replace('sprite.symbol.svg', 'sprite.svg');

  console.info('Output: ', outputPath);

  fs.mkdirSync(path.dirname(outputPath), {recursive: true});
  fs.writeFileSync(outputPath, resource.contents);
};

generateIconsSprite(argv('output'), argv('icons'));
