import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateCommentDto {

  @ApiProperty()
  @IsString()
  public text: string;

  @ApiProperty()
  @IsString()
  public rating: number;

  @ApiProperty()
  @IsString()
  public trainingId: string;
}
