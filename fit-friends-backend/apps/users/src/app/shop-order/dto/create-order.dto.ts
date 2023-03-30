import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateOrderDto {

  @IsString()
  public orderType: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public amount: number;

  @IsString()
  public paymentType: string;

  @IsString()
  public dateBirth: string;
}
