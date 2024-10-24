export interface IProduct {
  id?: number | string;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  buttonText?: string;
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
interface CategoriesAttributes {
  id: number;
  attributes?: unknown; // Replace `any` with the actual type of category attributes if known
}

interface CategoriesData {
  data: CategoriesAttributes[];
}
interface IData {
  attributes: ThumbnailAttributes,
  id: number;
}
interface IThumbnail {
  data: IData,
}
interface Attributes {
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