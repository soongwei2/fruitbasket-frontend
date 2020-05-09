import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { RootState } from 'src/app/store';
import { UpdateBasket } from 'src/app/store/basket/basket.action';
import { selectBasket } from 'src/app/store/basket/basket.reducer';
import { selectProduct } from 'src/app/store/product/product.reducer';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductsService {
  productList$ = this.store.select(selectProduct.list);
  basketList$ = this.store.select(selectBasket.list);
  constructor(public store: Store<RootState>) {
    console.log("SUB Product list")
    this.productList$.subscribe((productList) => {
      //update product list in basket
      this.basketList$.pipe(take(1)).toPromise().then((basketList) => {
        console.log("basketList: " ,basketList)
        const newBasketList = basketList.map((eachItem) => {
          console.log("eachItem: " ,eachItem)
          const newProduct = productList.find((product) => product.id == eachItem.product.id);
          console.log("newProduct: " ,newProduct)
          if(newProduct){
            return { ...eachItem, product: newProduct };
          }else{
            return { ...eachItem}
          }
         
        })

        this.store.dispatch(UpdateBasket({ list: newBasketList }));
      })
    })
  }
}
