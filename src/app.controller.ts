import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { CalculatorDto } from './DTO/Calculator.dto';

@ApiTags('calculator')
@Controller('calculator')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  getResult(@Body() calcaulatorDto: CalculatorDto) {
    this.appService.checkEmptyValue(calcaulatorDto.expression);
    const expression = this.appService.sanitizeExpression(
      calcaulatorDto.expression,
    );
    const expression_list = this.appService.getParameters(expression);
    return this.appService.calculate(expression_list);
  }
}
