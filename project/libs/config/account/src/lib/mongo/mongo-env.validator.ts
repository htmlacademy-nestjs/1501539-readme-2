import {BaseValidator} from "@project/validator";
import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { MongoEnvValidationMessage } from "./mongo-env-validation.message";

export const MIN_PORT = 0;
export const MAX_PORT = 65535;
export const DEFAULT_MONGO_PORT = 27017;

export class MongoEnvValidator extends BaseValidator {
  @IsString({ message: MongoEnvValidationMessage.DBNameRequired })
  public name!: string;

  @IsString({ message: MongoEnvValidationMessage.DBHostRequired })
  public host!: string;

  @IsOptional()
  @IsNumber({}, { message: MongoEnvValidationMessage.DBPortRequired })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number = DEFAULT_MONGO_PORT;

  @IsString({ message: MongoEnvValidationMessage.DBUserRequired })
  public user!: string;

  @IsString({ message: MongoEnvValidationMessage.DBPasswordRequired })
  public password!: string;

  @IsString({ message: MongoEnvValidationMessage.DBBaseAuthRequired })
  public authBase!: string;
}
