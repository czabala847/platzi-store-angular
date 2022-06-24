export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CategoryCreateDTO extends Omit<Category, '_id'> {}

export interface CategoryUpdateDTO extends Partial<CategoryCreateDTO> {}
