import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateOrderDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public amount?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public paymentType?: string;

}
