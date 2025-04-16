import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrls: ['./filter-project.component.css']
})
export class FilterProjectComponent implements OnInit, OnDestroy {

  categorySub: Subscription = new Subscription();
  selectedCategory: string = '';
  categories: any[] = [];
  @Output() selectCategory: EventEmitter<string> = new EventEmitter<string>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categorySub = this.productService.getAllGategories().subscribe(
      (response) => {
        this.categories = response;
        console.log(this.categories);
      }
    )
  }

  onChangeCategory($event: any) {
    this.selectCategory.emit($event.value);
  }

  ngOnDestroy(): void {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }

}
