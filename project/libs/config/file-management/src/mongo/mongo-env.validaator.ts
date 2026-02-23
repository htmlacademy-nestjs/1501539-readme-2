import { BaseValidator } from "@project/validator";
import { IsString, IsNumber } from "class-validator";
import { MongoEnvValidationMessage } from "./mongo-env.validator-messages";

export class MongoEnvValidator extends BaseValidator {
  @IsString({ message: MongoEnvValidationMessage.Host })
  public host!: string;

  @IsNumber({}, { message: MongoEnvValidationMessage.Port })
  public port!: number;

  @IsString({ message: MongoEnvValidationMessage.Database })
  public database!: string;

  @IsString({ message: MongoEnvValidationMessage.AuthDatabase })
  public authDatabase!: string;

  @IsString({ message: MongoEnvValidationMessage.Username })
  public user!: string;

  @IsString({ message: MongoEnvValidationMessage.Password })
  public password!: string;
}
