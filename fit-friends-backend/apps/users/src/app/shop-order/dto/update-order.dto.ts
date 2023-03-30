import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateOrderDto {

  @IsOptional()
  @IsNumber()
  public amount?: number;

  @IsOptional()
  @IsString()
  public paymentType?: string;

}
