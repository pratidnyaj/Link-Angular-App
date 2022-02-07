import { ProductsModule } from "./products.module";
describe('productsModule', () => {
  let productsModule: ProductsModule;

  beforeEach(() => {
    productsModule = new ProductsModule();
  });

  it('should create an instance', () => {
    expect(productsModule).toBeTruthy();
  });
});
