import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { iCategory } from '../interfaces/i-category';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl = environment.categoryUrl;

  private categoriesSubject = new BehaviorSubject<iCategory[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllCategory(): Observable<iCategory[]> {
    if (this.categoriesSubject.value.length < 1) {
      return this.http
        .get<iCategory[]>(this.categoryUrl)
        .pipe(tap((categories) => this.categoriesSubject.next(categories)));
    } else {
      return this.categories$;
    }
  }

  createCategory(category: string): Observable<iCategory> {
    return this.http.post<iCategory>(this.categoryUrl, category);
  }
}
