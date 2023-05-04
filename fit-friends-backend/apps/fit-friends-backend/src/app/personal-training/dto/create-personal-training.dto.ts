import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreatePersonalTrainingDto {

  @ApiProperty()
  @IsString()
  public companionId: string;

}
