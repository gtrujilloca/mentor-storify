import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./ui/components/header/header.component";
import { FooterComponent } from "./ui/components/footer/footer.component";
import { LoaderComponent } from "./ui/components/loader/loader.component";
import { AlertComponent } from "./ui/components/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, LoaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'main__layout'
  }  
})
export class AppComponent {
  title = 'mentor-storify';
}
