import { BaseValidator } from '@project/validator';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { DatabaseEnvValidationMessage } from './database-env.validator.messages';

export class DatabaseEnvValidator extends BaseValidator {
  @IsString({ message: DatabaseEnvValidationMessage.DatabaseUrl })
  @IsNotEmpty({ message: DatabaseEnvValidationMessage.DatabaseUrl })
  @MinLength(10, { message: DatabaseEnvValidationMessage.DatabaseUrl })
  @Matches(/^postgresql:\/\//i, {
    message: DatabaseEnvValidationMessage.DatabaseUrl,
  })
  public databaseUrl!: string;
}
