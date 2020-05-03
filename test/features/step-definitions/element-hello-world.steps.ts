import { defineFeature, loadFeature } from "jest-cucumber";
import {StageComponent, ComponentTester} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

const feature = loadFeature('./test/features/element-hello-world.feature');


defineFeature(feature, test => {

  let component: ComponentTester<any>;
  
  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  test(`It says hello world with bound message`, ({
    when,
    then
  }) => {

    
    when(/^I have the model with message (.*)$/, async (arg0) => {

      let model = { message: arg0 };

      component = StageComponent
        .withResources('elements/hello-world')
        .inView('<hello-world message.bind="message"></hello-world>')
        .boundTo(model);

    });

    then(/^I expect to see the text (.*)$/, async (arg1) => {

      await component.create(bootstrap).then(() => {
        const view = component.element;
        expect(view.textContent.trim()).toBe(arg1);        
      }).catch(e => {
        fail(e);
      });
    });
  });

  test('It says hello world with message', ({
    when,
    then
  }) => {
    when(/^I have the model with message (.*)$/, async (arg0) => {
      component = StageComponent
        .withResources('elements/hello-world')
        .inView(`<hello-world message="${arg0}"></hello-world>`)
    });
  
    then(/^I expect to see the text (.*)$/, async (arg1) => {
      await component.create(bootstrap).then(() => {
        const view = component.element;
        expect(view.textContent.trim()).toBe(arg1);        
      }).catch(e => {
        fail(e);
      });
    });
  });
});
