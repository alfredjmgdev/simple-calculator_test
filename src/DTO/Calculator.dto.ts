import { ApiProperty } from '@nestjs/swagger';

export class CalculatorDto {
  @ApiProperty({ required: true })
  readonly expression: string;
}
