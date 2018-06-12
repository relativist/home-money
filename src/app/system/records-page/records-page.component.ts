import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/models/category.model';
import {CategoriesService} from '../shared/services/categories.service';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(private catService: CategoriesService) {
  }

  categories: Category[] = [];
  isLoaded = false;

  ngOnInit() {
    this.catService.getCategories()
      .subscribe((cat: Category[]) => {
        this.categories = cat;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    // add to array;
    this.categories.push(category);
  }

  categoryWasEdited(cat: Category) {
    const idx = this.categories.findIndex(c => c.id === cat.id);
    this.categories[idx] = cat;
  }

}
