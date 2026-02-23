import { BaseValidator } from "@project/validator";
import { IsString } from "class-validator";
import { JWTEnvValidationMessage } from "./jwt-env.validator-messages";

export class JWTEnvValidator extends BaseValidator {
  @IsString({ message: JWTEnvValidationMessage.AccessTokenSecretRequired })
  public accessTokenSecret!: string;

  @IsString({ message: JWTEnvValidationMessage.AccessTokenExpiresInRequired })
  public accessTokenExpiresIn!: string;
}
