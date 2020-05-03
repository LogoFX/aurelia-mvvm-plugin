import { defineFeature, loadFeature } from "jest-cucumber";
import {StageComponent, ComponentTester} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

const feature = loadFeature('./test/features/attributes-color.feature');

defineFeature(feature, test => {  
  let component: ComponentTester<any>;
  let model = { color: 'Yellow' };

  afterEach(() => {
    if (component) {
      component.dispose();
      component = null;
    }
  });

  test('It sets font color with bound value', ({
    given,
    when,
    and,
    then
  }) => {

    given(/^I have the model with property color set to value (.*)$/, async (arg0) => {
      model.color = arg0;
    });
  
    when(/^I have the view composed with (.*) tag$/, async (arg0) => {
      component = StageComponent
        .withResources('attributes/color')
        .inView(`<p color.bind="color"></p>`)
        .boundTo(model);  
    });
  
    and(/^I set the color value to (.*)$/, async (arg0) => {
      model.color = arg0;
    });
  
    then(/^I expect to see the (.*) background$/, async (arg0) => {
      await component.create(bootstrap).then(() => {
      
        const view = <any>component.element;
        expect(view.style.color).toBe(arg0);

      }).catch((e: any) => {
        fail(e);
      });
    });
  });


  test('It sets font color with hard coded value', ({
    given,
    when,
    then
  }) => {
    given(`I have the view composed with "p" tag`, () => {
      //
    });
  
    when(/^I set the color value to (.*)$/, async (arg0) => {
      component = StageComponent
        .withResources('attributes/color')
        .inView(`<p color="${arg0}"></p>`);
    });
  
    then(/^I expect to see (.*) background$/, async (arg0) => {

      await component.create(bootstrap).then(() => {
      
        const view = <any>component.element;
        expect(view.style.color).toBe(arg0);

      }).catch((e: any) => {
        fail(e);
      });
    });
  });
});
