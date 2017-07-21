import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private dependency = {
    sayHello: (name: string) => {
      return `Hello, my name is ${name}!`;
    }
  };

  methodUnderTest(name: string) {
    return this.dependency.sayHello(name);
  }
}
