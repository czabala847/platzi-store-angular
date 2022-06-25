export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface ProductCreateDTO extends Omit<Product, '_id'> {}

export interface ProductUpdateDTO extends Partial<ProductCreateDTO> {}
