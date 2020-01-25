import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import QUnit from 'qunit';
import td from 'testdouble';
import installVerifyAssertion from 'testdouble-qunit';

setApplication(Application.create(config.APP));

installVerifyAssertion(QUnit, td);

start();
