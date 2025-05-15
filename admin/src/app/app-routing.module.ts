import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
  {path:"" , component: LandingPageComponent},
  {path:"students" , component:StudentlistComponent},
  {path:"courses" , component:AddCourseComponent},
  {path:"viewcourses",component:CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
