import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private  categoryService: CategoriesService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let {name, capacity} = form.value;
    if (capacity < 0) {
      capacity = capacity * -1;
    }

    const category = new Category(name, capacity);

    this.categoryService.addCategory(category)
      .subscribe((cat: Category) => {
        console.log(cat);
        form.reset();
        form.form.patchValue({capacity: 1});
      });

  }
}
