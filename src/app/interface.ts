export interface getAllProductInt {
  price: getAllPriceInt;
  category: getAllCategoryInt;
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: images[];
}

export interface images {
  images: string;
}

export interface getAllPriceInt {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface getAllCategoryInt {
  id: string;
  name: string;
  image: string;
}

export interface getAllProductResponseInt {
  total: number;
  limit: number;
  page: number;
  skip: number;
  products: getAllProductInt[];
}

//კატეგორია
export interface getAllCategoriesInt {
  id: number;
  name: string;
  image: string;
}

//ბრენდები

export interface getAllBrandsInt {}

//რეგისტრაცია
export interface registInt {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: string;
}

//შესვლა

export interface signInInt {
  email: string;
  password: string;
}

//კალათაში დამატება

export interface addToCartInt {
  id: string;
  quantity: number;

}

export interface CartProductInt {
  productId: string;
  quantity: number;
  pricePerQuantity: number;
  title: string;
  thumbnail: string;
}

export interface CartProductInt {
  quantity: number;
  pricePerQuantity: number;
  product: getAllProductInt;
}

export interface getCartInt {
  _id: string;
  total: { quantity: number; price: { current: number; beforeDiscount: number } };
  products: CartProductInt[];
}

//change Pass
export interface changePassInt {
  oldPassword: string;
  newPassword: string;
}

//update profile
export interface updateDetailsInt {
  firstName: string;
  lastName: string;
  age: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: string;
}

//rate Prod
export interface rateProdInt {
  productId: string;
  rate: number;
}
