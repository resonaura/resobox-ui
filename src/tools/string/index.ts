import moment, { MomentInput } from 'moment';

interface IFileType {
  extension: string;
  title: string;
  mime: string;
}

export class StringTools {
  static numWord(value: number, words: string[]): string {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) {
      return words[2];
    }
    if (num > 1 && num < 5) {
      return words[1];
    }
    if (num === 1) {
      return words[0];
    }
    return words[2];
  }

  static replaceByIndex(
    str: string,
    start: number,
    end: number,
    replacement: string,
  ) {
    const before = str.substring(0, start);
    const after = str.substring(end);
    return before + replacement + after;
  }

  static truncate(input: string, maxLength: number = 25) {
    if (input.length > maxLength) {
      return input.substring(0, maxLength) + '...';
    }
    return input;
  }

  static capitalizeFirstLetter(source: string): string {
    return source.charAt(0).toUpperCase() + source.slice(1);
  }

  static capitalizeFirstTwoLetters(word: string): string {
    if (word && word.length >= 2) {
      return word.substring(0, 2).toUpperCase();
    }
    return word.toUpperCase();
  }

  static lowercaseFirstLetter(source: string): string {
    return source.charAt(0).toLowerCase() + source.slice(1);
  }

  static formatDate(date: Date): string {
    const safeDate = new Date(date);

    const day = safeDate.getDate().toString().padStart(2, '0');
    const month = (safeDate.getMonth() + 1).toString().padStart(2, '0');
    const year = safeDate.getFullYear();
    const hours = safeDate.getHours().toString().padStart(2, '0');
    const minutes = safeDate.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year}`;
  }

  static countOfLines(source: string): number {
    return source.split(/\r\n|\r|\n/).length;
  }

  static isValidURL(string: string): boolean {
    var res = string.match(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
    );
    return res !== null;
  }

  static extractFileName(uri: string): string {
    return uri.substring(uri.lastIndexOf('/') + 1);
  }

  static getFileTypeInfo(filename: string): IFileType | null {
    const extensionMap: { [key: string]: { title: string; mime: string } } = {
      py: { title: 'Python', mime: 'text/x-python' },
      js: { title: 'JavaScript', mime: 'application/javascript' },
      ts: { title: 'TypeScript', mime: 'application/x-typescript' },
      html: { title: 'HTML', mime: 'text/html' },
      css: { title: 'CSS', mime: 'text/css' },
      java: { title: 'Java', mime: 'text/x-java-source' },
      cpp: { title: 'C++', mime: 'text/x-c++src' },
      c: { title: 'C', mime: 'text/x-csrc' },
      cs: { title: 'C#', mime: 'text/plain' }, // No standard MIME for C#
      php: { title: 'PHP', mime: 'text/php' },
      rb: { title: 'Ruby', mime: 'text/x-ruby' },
      go: { title: 'Go', mime: 'text/x-go' },
      rs: { title: 'Rust', mime: 'text/rust' },
      swift: { title: 'Swift', mime: 'text/x-swift' },
      kt: { title: 'Kotlin', mime: 'text/x-kotlin' },
      txt: { title: 'Text', mime: 'text/plain' },
      md: { title: 'Markdown', mime: 'text/markdown' },
      json: { title: 'JSON', mime: 'application/json' },
      xml: { title: 'XML', mime: 'application/xml' },
      yaml: { title: 'YAML', mime: 'text/yaml' },
      csv: { title: 'CSV', mime: 'text/csv' },
      pdf: { title: 'PDF', mime: 'application/pdf' },
      docx: {
        title: 'Microsoft Word',
        mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      pptx: {
        title: 'Microsoft PowerPoint',
        mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      },
      xlsx: {
        title: 'Microsoft Excel',
        mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
      jpg: { title: 'JPEG Image', mime: 'image/jpeg' },
      jpeg: { title: 'JPEG Image', mime: 'image/jpeg' },
      png: { title: 'PNG Image', mime: 'image/png' },
      gif: { title: 'GIF Image', mime: 'image/gif' },
      bmp: { title: 'Bitmap Image', mime: 'image/bmp' },
      svg: { title: 'SVG Image', mime: 'image/svg+xml' },
      webp: { title: 'WebP Image', mime: 'image/webp' },
      mp3: { title: 'MP3 Audio', mime: 'audio/mpeg' },
      wav: { title: 'WAV Audio', mime: 'audio/wav' },
      ogg: { title: 'OGG Audio', mime: 'audio/ogg' },
      flac: { title: 'FLAC Audio', mime: 'audio/flac' },
      mp4: { title: 'MP4 Video', mime: 'video/mp4' },
      mov: { title: 'MOV Video', mime: 'video/quicktime' },
      avi: { title: 'AVI Video', mime: 'video/x-msvideo' },
      mkv: { title: 'MKV Video', mime: 'video/x-matroska' },
      webm: { title: 'WebM Video', mime: 'video/webm' },
      flv: { title: 'FLV Video', mime: 'video/x-flv' },
      // More file types can be added here
    };

    const match = filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
    if (match) {
      const ext = match[1].toLowerCase();
      const fileType = extensionMap[ext];
      if (fileType) {
        return { extension: ext, title: fileType.title, mime: fileType.mime };
      }
    }

    return null;
  }

  static promptProcessNumber(number: number) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      const remainder = number % 1000;
      if (remainder === 0 || remainder < 100) {
        return Math.floor(number / 1000) + 'K';
      } else {
        return Math.floor(number / 100) / 10 + 'K';
      }
    } else {
      const remainder = number % 1000000;
      if (remainder === 0 || remainder < 100000) {
        return Math.floor(number / 1000000) + 'M';
      } else {
        return Math.floor(number / 100000) / 10 + 'M';
      }
    }
  }

  static isValidUUID(uuid: string) {
    const regex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  }

  static base64EncodeUnicode(source: string): string {
    return btoa(
      encodeURIComponent(source).replace(
        /%([0-9A-F]{2})/g,
        function (_match, p1) {
          return String.fromCharCode(parseInt(p1, 16));
        },
      ),
    );
  }

  static base64DecodeUnicode(source: string) {
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(source), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
  }

  static parseCommand(cmd: string) {
    const commandMatch = cmd.match(/^(\w+)\((.*)\)$/);

    if (commandMatch) {
      const commandName = commandMatch[1];
      const args = commandMatch[2].split(',').map((arg) => arg.trim());

      return {
        command: commandName,
        args: args,
      };
    }
  }

  static getBingCommandFromText(
    text: string,
  ): { command: string; args: any[] } | null {
    const commandPattern = /^\w+\([^\)]*\)/gm;
    const commands = text.match(commandPattern);

    return commands?.map(StringTools.parseCommand)?.[0] ?? null;
  }

  static formatDateLabel(date: MomentInput): string {
    const today = moment();
    const yesterday = moment().subtract(1, 'day');

    if (moment(date).isSame(today, 'day')) {
      return 'Today';
    } else if (moment(date).isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else if (moment(date).isAfter(moment().subtract(7, 'days'))) {
      return 'Last week';
    } else if (moment(date).isAfter(moment().subtract(30, 'days'))) {
      return 'Previous 30 days';
    } else if (moment(date).isSame(today, 'year')) {
      return moment(date).format('MMMM');
    } else {
      return moment(date).format('MMMM YYYY');
    }
  }

  static isEmailValid(email: string): boolean {
    return /^[\w-.+üÜäÄöÖß]+@([\w-üÜäÄöÖß]+\.)+[\w-üÜäÄöÖß]{2,20}$/.test(email);
  }
}
