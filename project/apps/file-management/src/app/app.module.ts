import { Module } from '@nestjs/common';
import { FileManagementConfigModule, getMongooseOptions } from '@project/file-management-config';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    FileManagementConfigModule,
    FileUploaderModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
  ],
})
export class AppModule {}
