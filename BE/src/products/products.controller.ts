import { Controller, Get, Render } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CATEGORY_TYPE } from 'src/utils/const';

@Controller('/')
export class ProductController {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Get('/category-product')
  @Render('pages/category-product')
  async categoryProduct() {
    const parents = await this.categoryService.findMany(
      CATEGORY_TYPE.PARENT,
      null,
    );

    let result = [];
    for (let category of parents) {
      const childs = await this.categoryService.findMany(
        CATEGORY_TYPE.CHILDREN,
        category.id,
      );
      result.push({
        parent: category,
        childs: childs,
      });
    }
    const products = await this.productService.returnSearchProduct(10, 1);

    return {
      categories: result,
      products: products.data,
    };
  }

  @Get('/create-category-product')
  @Render('pages/create-product')
  async createProduct() {}
}
