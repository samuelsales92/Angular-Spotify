import { Component } from '@angular/core';
import { IMusica } from '../../Interfaces/IMusica';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  musicas: IMusica[] = []


  ngOnInit(): void {

  }

}
