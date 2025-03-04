import { IsEmpty, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateDutyDTO {
  @IsNotEmpty()
  title: string;
  @IsEmpty()
  description: string;
  @IsUUID()
  @IsEmpty()
  userId: string;
}
