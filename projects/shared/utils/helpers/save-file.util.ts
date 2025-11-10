import {saveAs} from 'file-saver';

export function saveFile(data: BlobPart, filename: string, extension: string = 'txt'): void {
  const blob = new Blob([data], { type: getMimeType(extension) });
  saveAs(blob, `${filename}.${extension}`);
}

export function saveAsCSV(responseBody: string, filename: string = `Отчёт ${getCurrentDate('ru-RU')}`): void {
  saveFile(responseBody, filename, 'csv');
}

export function saveAsJSON(responseObject: object, filename: string = `Data ${getCurrentDate()}`): void {
  saveFile(JSON.stringify(responseObject), filename, 'json');
}

function getCurrentDate(locale: string = 'en-US'): string {
  return new Date().toLocaleDateString(locale);
}

function getMimeType(extension: string): string {
  switch (extension) {
    case 'csv':
      return 'text/csv';
    case 'json':
      return 'application/json';
    case 'txt':
      return 'text/plain';
    default:
      return 'application/octet-stream';
  }
}
