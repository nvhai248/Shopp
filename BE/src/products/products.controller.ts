import { Controller, Get, Query, Render } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CATEGORY_TYPE, SITE_DOMAIN } from 'src/utils/const';
import { PublishersService } from 'src/publishers/publishers.service';

@Controller('/')
export class ProductController {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
    private readonly publisherService: PublishersService,
  ) {}

  @Get('/category-product')
  @Render('pages/product/category-product')
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
    const products = await this.productService.returnSearchProduct({
      page: 0,
      limit: 10,
      keyword: null,
      isOnSale: undefined,
    });

    return {
      backend_base_url: SITE_DOMAIN,
      categories: result,
      products: products.data,
    };
  }

  @Get('/create-category-product')
  @Render('pages/product/create-product')
  async createProduct() {
    const categories = await this.categoryService.findMany(
      CATEGORY_TYPE.CHILDREN,
      undefined,
    );

    const publishers = await this.publisherService.findMany();

    return {
      backend_base_url: SITE_DOMAIN,
      categories: categories,
      publishers: publishers,
    };
  }

  @Get('/update-category-product')
  @Render('pages/product/update-product')
  async updateProduct(@Query('id') id: string) {
    const categories = await this.categoryService.findMany(
      CATEGORY_TYPE.CHILDREN,
      undefined,
    );

    const publishers = await this.publisherService.findMany();

    const product = await this.productService.findOne(id);

    return {
      backend_base_url: SITE_DOMAIN,
      categories: categories,
      publishers: publishers,
      product: product,
    };
  }

  @Get('/on-sale')
  @Render('pages/product/on-sale')
  async onSale() {
    const products = await this.productService.returnSearchProduct({
      isOnSale: true,
      page: 1,
      limit: 10,
      keyword: null,
    });

    return {
      backend_base_url: SITE_DOMAIN,
      products: products.data,
    };
  }
}
