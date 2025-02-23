import { Component } from '@angular/core';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-context',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './context.component.html',
  styleUrl: './context.component.scss'
})
export class ContextComponent {

}
