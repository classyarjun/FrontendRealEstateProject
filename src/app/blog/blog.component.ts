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
    this.blogService.getAllBlogs().subscribe((data: Blog[]) => {
        this.blogs = data.map(blog => {
        blog.imagePath = `data:image/jpeg;base64,${blog.imagePath}`;
        console.log(blog.imagePath);
        return blog;
      });
    });
  }



  deleteBlog(id: number): void {
    if(confirm('Are you sure you want to delete this blog?')){
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
};

