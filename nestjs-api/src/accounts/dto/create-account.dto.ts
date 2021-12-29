import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  subdomain: string;
}
