import { Module } from '@nestjs/common';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';
import { FileRepository } from './file.repository';
import { FileModel, FileSchema } from './file.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FileModel.name, schema: FileSchema },
    ]),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: configService.get('file-management.uploadPath'),
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        },
      ],
    }),
  ],
  providers: [FileUploaderService, FileRepository],
  controllers: [FileUploaderController]
})
export class FileUploaderModule {}
