import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  subject: string;
}
