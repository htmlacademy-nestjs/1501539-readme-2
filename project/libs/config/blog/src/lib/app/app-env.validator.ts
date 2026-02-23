import {BaseValidator} from "@project/validator";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";
import { AppEnvValidationMessage } from "./app-end-validator.messages";
import { ENVIRONMENTS, DEFAULT_PORT } from "@project/constants";

export class AppEnvValidator extends BaseValidator {
  @IsIn(ENVIRONMENTS, {message: AppEnvValidationMessage.AppEnvironment})
  public environment!: string;

  @IsOptional()
  @IsInt()
  @Min(1, {message: AppEnvValidationMessage.AppPort})
  @Max(65535, {message: AppEnvValidationMessage.AppPort})
  public port: number = DEFAULT_PORT;
}
