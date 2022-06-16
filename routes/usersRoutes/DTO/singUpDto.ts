import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import { MatchPasswords } from "../../../decorators/matchPasswords.decorator";

export class singUpDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswords, ["password"])
  passwordConfirm: string;
}
