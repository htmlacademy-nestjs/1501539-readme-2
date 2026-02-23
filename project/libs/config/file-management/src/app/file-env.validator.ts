import {BaseValidator} from "@project/validator";
import { IsIn, IsInt, IsOptional, Max, Min, IsString } from "class-validator";
import { ENVIRONMENTS, DEFAULT_PORT } from "@project/constants";
import { FileEnvValidationMessage } from "./file-env.validator-messages";

export class FileEnvValidator extends BaseValidator {
  @IsIn(ENVIRONMENTS, {message: FileEnvValidationMessage.Environment})
  public environment!: string;

  @IsOptional()
  @IsInt()
  @Min(1, {message: FileEnvValidationMessage.Port})
  @Max(65535, {message: FileEnvValidationMessage.Port})
  public port: number = DEFAULT_PORT;

  @IsString({ message: FileEnvValidationMessage.UploadPath })
  public uploadPath!: string;

  @IsOptional()
  @IsString()
  public serveRoot: string = '/static';
}
