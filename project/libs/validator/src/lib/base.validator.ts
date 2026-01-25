import { Validator } from "./validator.interface";
import { validateOrReject } from "class-validator";

export abstract class BaseValidator implements Validator {
  public async validate(): Promise<void> {
    await validateOrReject(this)
  }
}
