import { Priority, Status } from '@prisma/client';
import { IsEmpty, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

// enum Priority {
//   LOW,
//   MEDIUM,
//   HIGH,
// }
// enum Status {
//   BACKLOG,
//   TODO,
//   INPROGRESS,
//   DONE,
// }

export class UpdateBodyDTO {
  @IsEmpty()
  title: string;
  @IsEmpty()
  description: string;
  @IsUUID()
  @IsEmpty()
  userId: string;
  @IsEmpty()
  priority: Priority;
  @IsEmpty()
  status: Status;
}
