import 'aurelia-polyfills';
import {Options} from 'aurelia-loader-nodejs';
import {globalize} from 'aurelia-pal-nodejs';
import 'aurelia-binding';
import 'aurelia-templating';
import 'aurelia-binding';
import * as path from 'path';
import { setJestCucumberConfiguration } from 'jest-cucumber';

setJestCucumberConfiguration({
  tagFilter: 'not @excluded',
  scenarioNameTemplate: (vars) => {
      return `${vars.featureTitle} - ${vars.scenarioTitle}}`;
  }
});

Options.relativeToDir = path.join(__dirname, 'features');
globalize();

