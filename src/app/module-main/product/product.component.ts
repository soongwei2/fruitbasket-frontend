import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/store';
import { GetProduct } from 'src/app/store/product/product.action';
import { selectProduct } from 'src/app/store/product/product.reducer';
import { IProduct } from 'src/app/shared/models/product';
import { AddToBasket } from 'src/app/store/basket/basket.action';
import { showSnackBar } from 'src/app/store/layout/layout.action';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {
 
  isLoading$ = this.store.select(selectProduct.isLoading);
  list$ = this.store.select(selectProduct.list);

  constructor(private store: Store<RootState>) { }

  ngOnInit(): void {
    this.store.dispatch(GetProduct({ product: { deleted: false } }));
  }

  onAddToCart(product: IProduct){
    this.store.dispatch(AddToBasket({product}));
    this.store.dispatch(showSnackBar({message: product.name + " added to basket"}))
  }
}
