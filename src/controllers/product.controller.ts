import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Product } from 'src/schemas/product.schema';
import { ProductService } from 'src/services/product/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  fetchAll(): Promise<Product[]> {
    return this.productService.getAll();
  }

  // @Get()
  // @Redirect('https://mail.ru', 301)
  // fetchAll(@Req() req: Request, @Res() res: Response) {
  //   return req;
  // }

  @Get(':id')
  fetchOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  // @Header('Cache-Control', 'none')
  create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.create(dto);
  }

  @Put(':id')
  update(
    @Body() productDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, productDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }
}
