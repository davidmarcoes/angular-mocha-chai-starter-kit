/* tslint:disable:no-unused-variable */
/* tslint:disable:no-unused-expression */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { expect } from 'chai';
import * as sinon from 'sinon';

describe('AppComponent', () => {
  let fixture;
  let componentInstance;
  let mockDependency;

  /* Required after mock.verify() */
  function buildNewMock() {
    mockDependency = sinon.mock(componentInstance.dependency);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    componentInstance = fixture.componentInstance;

    buildNewMock();
  });

  describe('#methodUnderTest', () => {

    it('should do wonderful things', async(() => {
      let result;

      // 'expects' is (internally) creating a full-fledged sinon stub, and replacing 'sayHello' with it
      // 'returns' is setting some pre-programmed behavior on such stub
      mockDependency.expects('sayHello').returns('Hello, my name is JJ!');


      // ...of course we can see the already mentioned stub in action
      result = componentInstance.methodUnderTest('David');
      expect(result).to.equal('Hello, my name is JJ!');


      // ...at this moment the mock lacks of pre-programmed expectations so 'verify' is happy
      mockDependency.verify();


      // ...but mocks must contain pre-programmed expectations to be mocks!
      buildNewMock();
      mockDependency.expects('sayHello').withArgs('JJ');


      // ...now the test only pass if we meet the expectations
      componentInstance.methodUnderTest('JJ');
      mockDependency.verify();


      // ...or we act/assert against the logical inputs/outputs (the stub magic is gone)
      buildNewMock();
      mockDependency.expects('sayHello').withArgs('David').returns('Hello, my name is David!');
      result = componentInstance.methodUnderTest('David');
      expect(result).to.equal('Hello, my name is David!');




      // The moral is:
      //
      // (because) mocks responsibility is validate that given some behavior, some expectations are meet
      // (they are) not a way to create test doubles (mocks or/and spies) and act over them (asserts, returns, ...)

      // (because) they are tightly coupled to the implementations details
      // (they should be) used to test the SUT (not their external dependencies)
      //
      //
      //   mock.expects('createTodo').calledTwice();  -> arrange
      //   mock.expects('notifyDevices').calledOnce();  -> arrange
      //   sut.addTodoList('Call someone', 'Go somewhere');  -> act
      //   mock.verify()  -> assert
      //

      // if you need to double a dependency, do not use mocks!
      mockDependency.restore();
      const stubSayHello = sinon.stub(componentInstance.dependency, 'sayHello');

      stubSayHello.returns('Hello, my name is JJ!');
      result = componentInstance.methodUnderTest();
      expect(result).to.equal('Hello, my name is JJ!');

      stubSayHello.withArgs('David').returns('Hello, my name is David!');
      result = componentInstance.methodUnderTest('David');
      expect(result).to.equal('Hello, my name is David!');


      // The full history in http://sinonjs.org/releases/v2.3.8/mocks/ :)

    }));
  });
});
