import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import calculator_values = require('./TestData/calculatorData.json');

describe('AppController', () => {
  let appController: AppController;

  const body = {
    expression: '25+300-(5*10)',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  console.log(calculator_values);

  describe('Testing add', () => {
    it(`The expression ${calculator_values.add.expression} should return ${calculator_values.add.result}`, () => {
      expect(appController.getResult(calculator_values.add)).toBe(
        calculator_values.add.result,
      );
    });
  });

  describe('Testing subtract', () => {
    it(`The expression ${calculator_values.subtract.expression} should return ${calculator_values.subtract.result}`, () => {
      expect(appController.getResult(calculator_values.subtract)).toBe(
        calculator_values.subtract.result,
      );
    });
  });

  describe('Testing multiply', () => {
    it(`The expression ${calculator_values.multiply.expression} should return ${calculator_values.multiply.result}`, () => {
      expect(appController.getResult(calculator_values.multiply)).toBe(
        calculator_values.multiply.result,
      );
    });
  });

  describe('Testing divide', () => {
    it(`The expression ${calculator_values.divide.expression} should return ${calculator_values.divide.result}`, () => {
      expect(appController.getResult(calculator_values.divide)).toBe(
        calculator_values.divide.result,
      );
    });
  });

  describe('Testing several_operations_with_parenthesis', () => {
    it(`The expression ${calculator_values.several_operations_with_parenthesis.expression} should return ${calculator_values.several_operations_with_parenthesis.result}`, () => {
      expect(
        appController.getResult(
          calculator_values.several_operations_with_parenthesis,
        ),
      ).toBe(calculator_values.several_operations_with_parenthesis.result);
    });
  });
});
