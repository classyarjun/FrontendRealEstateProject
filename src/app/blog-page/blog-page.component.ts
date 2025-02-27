import { BlogService } from 'src/services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/modal/blog';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})


export class BlogPageComponent implements OnInit {


  blogs: Blog[] = [];

  constructor(private BlogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.BlogService.getAllBlogs().subscribe((data: Blog[]) => {
        this.blogs = data.map(blog => {
        blog.imagePath = `data:image/jpeg;base64,${blog.imagePath}`;
        console.log(blog.imagePath);
        return blog;
      });
    });
  }



  }




