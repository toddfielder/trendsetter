import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription }       from 'rxjs/Subscription';

import { ICategory } from '../category';
import { CategoryService } from '../category.service';

//https://scotch.io/tutorials/3-ways-to-pass-async-data-to-angular-2-child-components#which-one-should-i-use
@Component({
  selector: 'app-categorydetail',
  templateUrl: './categorydetail.component.html',
  styleUrls: ['./categorydetail.component.css']
})
export class CategoryDetailComponent implements OnInit {
    category: ICategory;
    errorMessage: string;
    private sub: Subscription;
    
    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _categoryService: CategoryService) {
    }

    ngOnInit(): void {
        console.log("CategoryDetailComponent::ngOnInit()");
        this.sub = this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getCategory(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getCategory(id: number) {
        this._categoryService.getCategory(id).subscribe(
            category => this.category = category,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/category']);
    }

}
