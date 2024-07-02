import { IsNotEmpty } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  in: string;

  @IsNotEmpty()
  out: string;

  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  student: string;
}
