import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit{
  lightClasses = 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100'
  darkClasses = 'bg-slate-700 text-slate-100 dark:bg-slate-100 dark:text-slate-700'

  ngAfterViewInit() {
    const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDarkTheme) this.changeTheme();
  }

  changeTheme() {
    document.body.classList.toggle('custom_dark_theme')
  }
}
