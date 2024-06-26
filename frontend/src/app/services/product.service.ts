import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { map, Observable } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.shopApiUrl + '/products';
  private categoryUrl = environment.shopApiUrl + '/product-categories';
  private searchUrl = environment.shopApiUrl + '/products/search';

  constructor (private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {

    const searchUrl = `${ this.baseUrl }/products/category?id=${ theCategoryId }`;
    return this.getProducts(searchUrl);
  }

  getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<ApiResponseProduct>(searchUrl)
      .pipe(map(response => response.content));
  }

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<ApiResponseProduct> {

    const searchUrl = `${ this.baseUrl }`;

    return this.httpClient.get<ApiResponseProduct>(searchUrl)
      .pipe(map(response => response));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ResponseProductCategory>(this.categoryUrl)
      .pipe(map(response => response.content));

  }

  searchProducts(theKeyword: string | null): Observable<Product[]> {
    console.log('searching...');
    const searchUrl = `${ this.baseUrl }?name=${ theKeyword }`;
    console.log(searchUrl);
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string): Observable<ApiResponseProduct> {

    const searchUrl = `${ this.baseUrl }?name=${ theKeyword }`
      + `&page=${ thePage }&size=${ thePageSize }`;
        //  const searchUrl = `${ this.baseUrl }?name=${ theKeyword }`;

    console.log("Searching...");  
    return this.httpClient.get<ApiResponseProduct>(searchUrl)
      .pipe(map(response => response));
  }

  getOneProductById(id: number): Observable<Product> {
    const url = `${ this.baseUrl }/${ id }`;
  console.log('the url to get product ==' +url)
    return this.httpClient.get<Product>(url)
      .pipe(map(product => product));
  }


}

interface ApiResponseProduct {
  content: Product[];
  totalPages: number;
  size: number;
  totalElements: number,
  number: number,
  first: boolean,
  last: boolean,
  empty: boolean;

}

interface ResponseProductCategory {
  content: ProductCategory[];
}
