import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./ui/components/header/header.component";
import { FooterComponent } from "./ui/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: 'main__layout'
    // '[class.main__layout]': 'true'
  }  
})
export class AppComponent {
  title = 'mentor-storify';
}
