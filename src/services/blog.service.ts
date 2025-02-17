import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/modal/blog';


@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private apiUrl = 'http://localhost:8080/api/blog'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Save a new blog
  saveBlog(blog: Blog, image: File): Observable<Blog> {
    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog));
    formData.append('image', image);

    return this.http.post<Blog>(`${this.apiUrl}/saveBlog`, formData);
  }

  // Get all blogs
  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/getAllBlog`);
  }

  // Get a blog by ID
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/getBlogById/${id}`);
  }

  // Update a blog
  updateBlog(id: number, blog: Blog, image?: File): Observable<Blog> {
    const formData = new FormData();
    formData.append('blog', JSON.stringify(blog));
    if (image) {
      formData.append('image', image);
    }

    return this.http.put<Blog>(`${this.apiUrl}/update/${id}`, formData);
  }

  // Delete a blog
  deleteBlog(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`);
  }
}
 