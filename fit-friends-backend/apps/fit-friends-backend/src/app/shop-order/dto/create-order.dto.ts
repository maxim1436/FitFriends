import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class CreateOrderDto {

  @ApiProperty()
  @IsString()
  public orderType: string;

  @ApiProperty()
  @IsNumber()
  public price: number;

  @ApiProperty()
  @IsNumber()
  public amount: number;

  @ApiProperty()
  @IsString()
  public paymentType: string;

  @ApiProperty()
  @IsString()
  public dateBirth: string;
}
