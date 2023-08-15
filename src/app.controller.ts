import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Query,
  Req,
  Version,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller('path')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get()
  getHelloV1(): string {
    return this.appService.getHello();
  }

  @Version('2') // api/v2/path
  @Get()
  getHelloV2(): string {
    return this.appService.getHello() + ' v2';
  }

  @Get('subpath')
  @HttpCode(200) // 200 is the default
  testEndpoint(
    @Req() request: Request,
    @Query('queryParamPathName') queryParamVariableName: number,
  ): { data: string } {
    console.log(request, 'request');
    console.log(queryParamVariableName, 'queryParamVariableName');
    return { data: this.appService.getHello() };
  }

  @Get('testException')
  async testException(): Promise<any[]> {
    // Built-in exceptions: https://docs.nestjs.com/exception-filters#built-in-http-exceptions
    throw new BadRequestException('Something bad happened', {
      description: 'Some error description',
    });
    // This will automatically be caught by the global exception filter
    // and return a response with the following body:
    // {
    //   "statusCode": 400,
    //   "message": "Bad Request",
    //   "error": "Some error description"
    // }

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // This will automatically be caught by the global exception filter
    // and return a response with the following body:
    // {
    //   "statusCode": 403,
    //   "message": "Forbidden"
    // }
  }
}
