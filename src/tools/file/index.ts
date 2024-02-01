export class FileTools {
  static uploadFile(
    allowedExtensions: string[] = [],
    callback?: (file: File) => void
  ): Promise<File | null> {
    return new Promise((resolve) => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';

      // Set the accept attribute if allowedExtensions are provided
      if (allowedExtensions.length > 0) {
        fileInput.accept = allowedExtensions.map((ext) => `.${ext}`).join(',');
      }

      fileInput.addEventListener('change', (event) => {
        const target = event.target as HTMLInputElement;
        const file: File | null = target.files ? target.files[0] : null;

        if (file) {
          // Extract the file extension and check if it's allowed
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          if (
            (fileExtension && allowedExtensions.includes(fileExtension)) ||
            allowedExtensions.length === 0
          ) {
            if (callback) {
              callback(file);
            }
            resolve(file);
          } else {
            alert(
              `File format not supported. Please upload a ${allowedExtensions.join(
                ', '
              )} file.`
            );
            resolve(null);
          }
        } else {
          resolve(null);
        }
      });

      fileInput.click();
    });
  }

  static getFileExtension(filename: string): string | null {
    let extension = filename.split('.').pop() ?? null;
    return extension !== filename ? extension : null;
  }
}
