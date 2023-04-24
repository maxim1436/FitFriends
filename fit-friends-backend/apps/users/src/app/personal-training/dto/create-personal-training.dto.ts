import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreatePersonalTrainingDto {

  @ApiProperty()
  @IsString()
  public anotherUserId: string;

}
