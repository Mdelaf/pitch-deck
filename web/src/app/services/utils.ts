export function getBase64EncodedContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => { resolve(event?.target?.result as string) };
    fileReader.onerror = reject;
    fileReader.readAsDataURL(file);
  });
}
