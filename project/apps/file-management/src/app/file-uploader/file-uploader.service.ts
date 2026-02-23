import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { fileManagementConfig, type FileManagementConfig } from '@project/file-management-config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { ensureDir } from 'fs-extra';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import { StoredFile } from '@project/types';
import { FileEntity } from './file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(fileManagementConfig.KEY)
    private readonly config: FileManagementConfig,
    private readonly fileRepository: FileRepository,
  ) {}

  private get uploadPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadPath, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.uploadPath, filename);
  }

  private getStaticRelativeDir(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return `${year}/${month}`;
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const subDirectory = this.getStaticRelativeDir();
      const fileExtension = extension(file.mimetype) || 'bin';
      const filename = `${randomUUID()}.${fileExtension}`;
      const destinationFile = this.getDestinationFilePath(filename);

      await ensureDir(this.uploadPath);
      await writeFile(destinationFile, file.buffer);

      const path = `${this.config.serveRoot}/${this.getStaticRelativeDir()}/${filename}`;
      return {
        fileExtension,
        filename,
        path,
        subDirectory,
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error instanceof Error ? error.message : 'Unknown error'}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = FileEntity.fromObject({
      hashName: storedFile.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
    });

    return this.fileRepository.save(fileEntity);
  }

  public async getFile(fileId: string): Promise<FileEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (! existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return existFile;
  }
}


