import { IsNotEmpty, IsString } from 'class-validator';

export class FindByIdDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}
