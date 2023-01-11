import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // List of available operators
  operators = [
    {
      id: '*',
      numOperands: 2,
      symbol: ' x ',
      calc: function (a, b) {
        return a * b;
      },
    },
    {
      id: '/',
      numOperands: 2,
      symbol: ' ÷ ',
      calc: function (a, b) {
        return a / b;
      },
    },
    {
      id: '+',
      numOperands: 2,
      symbol: ' + ',
      calc: function (a, b) {
        return a + b;
      },
    },
    {
      id: '-',
      numOperands: 2,
      symbol: ' - ',
      calc: function (a, b) {
        return a - b;
      },
    },
  ];

  // Get the operator object for a given operator ID
  getOperator(opID): any {
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i].id === opID) {
        return this.operators[i];
      }
    }
    return undefined;
  }

  // Get the precedence of an operator given its ID
  getOpPrecedence(opID): any {
    for (let i = 0; i < this.operators.length; i++) {
      if (this.operators[i].id === opID) {
        return i;
      }
    }
    // If the given ID does not return an operator, then return a large value that will always lose in precedence
    return 1000;
  }

  hasPrecedence(op1, op2): any {
    if (this.getOperator(op1) != undefined) {
      return this.getOpPrecedence(op1) <= this.getOpPrecedence(op2);
    }
  }

  // A list of every token (number or operator) currently in the expression
  tokenList = [];

  // Returns the result of applying the given unary or binary operator on the top values of the value stack
  applyOperator(operator, vals): any {
    const valA = vals[0];
    let result;

    if (vals.length === 1) {
      result = operator.calc(parseFloat(valA));
    } else {
      const valB = vals[1];
      result = operator.calc(parseFloat(valB), parseFloat(valA));
    }

    return result;
  }

  // Evaluates the expression and outputs the result
  calculate(expressionList): string {
    // Check if brackets are balanced
    let count = 0;
    for (let i = 0; i < expressionList.length; i++) {
      if (expressionList[i] === '(') {
        count++;
      } else if (expressionList[i] === ')') {
        count--;
      }
    }
    if (count !== 0) {
      // return 'Error: unbalanced brackets';
      throw new BadRequestException('Error: unbalanced brackets');
    }

    // Evaluate the expression
    const valStack = [];
    const opStack = [];

    for (let i = 0; i < expressionList.length; i++) {
      if (!isNaN(expressionList[i])) {
        valStack.push(expressionList[i]);
      } else if (expressionList[i] === '(') {
        opStack.push(expressionList[i]);
      } else if (expressionList[i] === ')') {
        while (opStack[opStack.length - 1] !== '(') {
          const operator = this.getOperator(opStack.pop());
          if (operator.numOperands === 1)
            valStack.push(this.applyOperator(operator, [valStack.pop()]));
          else
            valStack.push(
              this.applyOperator(operator, [valStack.pop(), valStack.pop()]),
            );
        }
        opStack.pop();
      } else {
        while (
          opStack.length > 0 &&
          this.hasPrecedence(opStack[opStack.length - 1], expressionList[i])
        ) {
          const operator = this.getOperator(opStack.pop());
          if (operator.numOperands === 1)
            valStack.push(this.applyOperator(operator, [valStack.pop()]));
          else
            valStack.push(
              this.applyOperator(operator, [valStack.pop(), valStack.pop()]),
            );
        }
        opStack.push(expressionList[i]);
      }
    }

    while (opStack.length > 0) {
      const operator = this.getOperator(opStack.pop());
      if (operator.numOperands === 1)
        valStack.push(this.applyOperator(operator, [valStack.pop()]));
      else
        valStack.push(
          this.applyOperator(operator, [valStack.pop(), valStack.pop()]),
        );
    }
    return valStack[0].toString();
  }

  // * Expressions helpers *

  sanitizeExpression(expression): string {
    expression = expression.trim();
    expression = expression.replace(/ /g, '');
    return expression;
  }

  getParameters(expression): Array<string> {
    const expression_list = expression.split(/(?<!^)(?=\D)|(?<=\D)/g);

    // NOTE: another method to get the math parameters
    // const characters = [];
    // let numberString = '';
    // expression.split('').forEach((char) => {
    //   if (isNaN(Number(char))) {
    //     if (numberString) {
    //       characters.push(numberString);
    //     }
    //     characters.push(char);
    //     numberString = '';
    //   } else {
    //     numberString = numberString + char;
    //   }
    // });

    return expression_list;
  }

  checkEmptyValue(expression): boolean {
    if (!expression || expression === '') {
      throw new BadRequestException('Expression can not be empty');
    }
    return true;
  }
}
