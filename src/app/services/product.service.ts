import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';
import { ProductPayload } from '../components/create-product/create-product.payload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() :Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  getProductById(id: string) :Observable<Product>{
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  createProduct(product: ProductPayload) :Observable<Product>{
    return this.http.post<Product>('http://localhost:3000/products', product);
  }

  updateProduct(product: Product) :Observable<Product>{
    return this.http.put<Product>('http://localhost:3000/products', product);
  }

  deleteProduct(id: string) :Observable<void>{
    return this.http.delete<void>('http://localhost:3000/products/' + id);
  }
  
}
