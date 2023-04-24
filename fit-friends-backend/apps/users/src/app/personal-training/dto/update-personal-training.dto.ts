import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { PersonalTrainingStatus } from '@fit-friends-backend/shared-types';

export class UpdatePersonalTrainingDto {

  @ApiProperty()
  @IsString()
  public status: PersonalTrainingStatus;

}
