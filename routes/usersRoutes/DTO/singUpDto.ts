import { IsNotEmpty, IsString, Validate } from "class-validator";
import { MatchPasswords } from "../../../decorators/matchPasswords.decorator";
import { LogInDto } from "./logInDto";

export class SingUpDto extends LogInDto {
  @IsString()
  @IsNotEmpty()
  @Validate(MatchPasswords, ["password"])
  passwordConfirm: string;
}
