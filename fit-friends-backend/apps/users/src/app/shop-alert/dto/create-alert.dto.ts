import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateAlertDto {

  @ApiProperty()
  @IsString()
  public createdAt: Date;

  @ApiProperty()
  @IsString()
  public userId: string;

  @ApiProperty()
  @IsString()
  public alertText: string;

}
