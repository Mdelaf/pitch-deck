export function getBase64EncodedContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const fileContent = event?.target?.result as string;
      const fileContentOnly = fileContent.split(',')[1];
      resolve(fileContentOnly);
    };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
}
