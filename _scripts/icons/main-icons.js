const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

const svgDir = path.join(rootDir, 'projects', 'main', 'src', 'app', 'icons', 'svg');
const outputDir = path.join(rootDir, 'projects', 'main', 'src', 'app', 'icons', 'definitions');
const indexFile = path.join(outputDir, 'index.ts');
const iconsModuleFile = path.join(rootDir, 'projects', 'main', 'src', 'app', 'icons', 'icons.module.ts');

// Создание директории outputDir, если она не существует
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

function getSvgFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getSvgFiles(filePath, fileList);
        } else if (file.endsWith('.svg')) {
            fileList.push(filePath);
        }
    });
    return fileList;
}

function generateIconName(filePath) {
    const fileName = path.basename(filePath, '.svg');
    return fileName.replace(/-./g, match => match[1].toUpperCase());
}

function generateIconFileContent(svgContent, iconName) {
    return `export const ${iconName} = { name: '${iconName}', theme: 'outline', icon: \`${svgContent}\` };\n`;
    // return `export const ${iconName} = { name: '${iconName}-o', theme: 'outline', icon: \`${svgContent}\` };\n`;
}

function generateIconsModuleContent(iconNames) {
    const imports = iconNames.map(iconName => `import { ${iconName} } from './definitions/${iconName}';`).join('\n');
    const icons = iconNames.join(',\n  ');

    return `
import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
${imports}

@NgModule({
  imports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: [
      ${icons}
    ]}
  ]
})
export class IconsModule {}
  `;
}

const svgFiles = getSvgFiles(svgDir);
const indexExports = [];
const iconNames = [];

svgFiles.forEach(filePath => {
    const svgContent = fs.readFileSync(filePath, 'utf8');
    const iconName = generateIconName(filePath);
    const iconFileContent = generateIconFileContent(svgContent, iconName);
    const iconFilePath = path.join(outputDir, `${iconName}.ts`);
    fs.writeFileSync(iconFilePath, iconFileContent, 'utf8');
    indexExports.push(`export * from './${iconName}';`);
    iconNames.push(iconName);
});

fs.writeFileSync(indexFile, indexExports.join('\n'), 'utf8');

const iconsModuleContent = generateIconsModuleContent(iconNames);
fs.writeFileSync(iconsModuleFile, iconsModuleContent, 'utf8');

console.log('SVG definitions and icons module generated successfully.');
