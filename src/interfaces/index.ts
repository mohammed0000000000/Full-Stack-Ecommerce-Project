export interface IProduct {
  id?: number | string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  buttonText?: string;
}
export interface IProductItem {
  id: number;
  title: string;
  price: number;
  quantity: number,
  thumbnail: IThumbnail
}
interface Format {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
}

interface Formats {
  medium: Format;
  small: Format;
  thumbnail: Format;
}

interface ThumbnailAttributes {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string;
  ext: string;
  formats: Formats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  sizeInBytes: number;
  url: string;
  width: number;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  updatedAt: string;
}
export interface CategoriesAttributes {
  id: number;
  attributes?: unknown; // Replace `any` with the actual type of category attributes if known
}

export interface CategoriesData {
  data: CategoriesAttributes[];
}
export interface IData {
  attributes: ThumbnailAttributes,
  id: number;
}
export interface IThumbnail {
  data: IData,
}
export interface Attributes {
  categories: CategoriesData;
  createdAt: string;
  description: string;
  price: number;
  publishedAt: string;
  stock: number;
  thumbnail: IThumbnail;
  title: string;
  updatedAt: string;
}

export interface IProductResponse {
  id: number;
  attributes: Attributes;
}