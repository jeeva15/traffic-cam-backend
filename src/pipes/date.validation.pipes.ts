import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { TopSearchRequest } from 'src/modules/search-reports/dtos/top.search.dtos';
import { reverseDateFormat } from '../utils/utils';

@Injectable()
export class DateValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

    const object:any = plainToClass(TopSearchRequest, { date: value });
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Invalid date value');
    }
    
    //string to valid date
    const dateValue = new Date(Date.parse(value));

    if (dateValue instanceof Date) {
      return reverseDateFormat(value); 
    }
    

    throw new BadRequestException('Invalid date format');
  }
}