import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-botao-play',
  standalone: false,
  templateUrl: './botao-play.component.html',
  styleUrl: './botao-play.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotaoPlayComponent { }
