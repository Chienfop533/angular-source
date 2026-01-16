export function cloneData(data: any) {
  return JSON.parse(JSON.stringify(data));
}
export function blobToFile(theBlob: Blob, fileName: string): File {
  var b: any = theBlob;
  b.lastModifiedDate = new Date();
  b.name = fileName;
  return <File>theBlob;
}
export function objectToFormData(
  obj: any,
  formData = new FormData(),
  namespace = ''
): FormData {
  for (let property in obj) {
    if (obj[property] == 'userId') {
      debugger;
    }
    let formKey = namespace ? `${namespace}[${property}]` : property;

    if (obj[property] instanceof Date) {
      formData.append(formKey, obj[property].toISOString());
    } else if (
      typeof obj[property] === 'object' &&
      !(obj[property] instanceof File)
    ) {
      objectToFormData(obj[property], formData, formKey);
    } else if (obj[property] instanceof Number) {
      formData.append(formKey, obj[property].toString());
    } else {
      formData.append(formKey, obj[property]);
    }
  }

  return formData;
}
export function convertFormData(
  entity: any,
  files: any[] = [],
  fileKey: string,
  clearKeys: string[] = []
) {
  const newEntity = removeKeys(entity, clearKeys);
  const formData = objectToFormData(newEntity);
  files?.forEach((file) => {
    formData.append(fileKey, file);
  });
  return formData;
}
export function removeKeys(entity: any, keys: string[]): any {
  const newEntity: any = {};
  for (const key in entity) {
    if (entity.hasOwnProperty(key) && !keys.includes(key)) {
      newEntity[key] = entity[key];
    }
  }
  return newEntity;
}
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
