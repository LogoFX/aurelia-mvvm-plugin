import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';

describe('HelloWorld', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('hello-world')
      .inView('<span>${msg}</span>')
      .boundTo({ msg: 'Hello Aurelia Plugins' });
  });

  it('should render first name', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('span');
      expect(nameElement.innerHTML).toBe('Hello Aurelia Plugins');
      done();
    }).catch(e => { console.log(e.toString()); });
  });

  afterEach(() => {
    component.dispose();
  });
});
