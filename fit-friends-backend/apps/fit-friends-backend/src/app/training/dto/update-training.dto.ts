import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';

export class UpdateTrainingDto {

  @ApiProperty()
  @IsOptional()
  @IsString()
  public title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public preview?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public level?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public type?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public time?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public price?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public calories?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public description?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public videoLink?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public rating?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public special?: boolean;
}
