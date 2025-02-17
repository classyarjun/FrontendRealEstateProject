import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/modal/blog';
import { BlogService } from 'src/services/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  blogs: Blog[] = [];

  blog: Blog = {
    title: '',
    date: new Date(),
    description: '',
  };
  imageFile?: File;

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  onFileChange(event: any): void {
    this.imageFile = event.target.files[0];
  }

  saveBlog(): void {
    if (this.imageFile) {
      this.blogService.saveBlog(this.blog, this.imageFile).subscribe(
        (data) => {
          alert('Blog saved successfully:');
          console.log('Blog saved successfully:', data);
        },
        (error) => {
          console.error('Error saving blog:', error);
        }
      );
      this.loadBlogs();
    }
  }

  loadBlogs(): void {
    this.blogService.getAllBlogs().subscribe(
      (data) => {
        this.blogs = data;
        console.log('Blogs:', this.blogs);
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe(
      () => {
        this.blogs = this.blogs.filter((blog) => blog.id !== id);
      },
      (error) => {
        console.error('Error deleting blog:', error);
      }
    );
    this.loadBlogs();
  }
}
