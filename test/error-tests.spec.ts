import 'mocha';
import { expect } from 'chai';

import * as checkError from 'check-error';

describe('checkError', function() {
    it('check-error-tests.ts should run without errors', () => {
        require('../types/check-error/check-error-tests');
    });

    it('compatibleInstance', function() {
        const errorInstance = new Error('I am an instance');
        const sameInstance = errorInstance;
        const otherInstance = new Error('I an another instance');
        expect(checkError.compatibleInstance(errorInstance, sameInstance)).to.be.true;
        expect(checkError.compatibleInstance(errorInstance, otherInstance)).to.be.false;
    });

    it('compatibleConstructor', function() {
        const errorInstance = new Error('I am an instance');
        const sameInstance = errorInstance;
        const otherInstance = new Error('I an another instance');
        const derivedInstance = new TypeError('I inherit from Error');
        expect(checkError.compatibleConstructor(errorInstance, sameInstance)).to.be.true;
        expect(checkError.compatibleConstructor(errorInstance, otherInstance)).to.be.true;
        expect(checkError.compatibleConstructor(derivedInstance, errorInstance)).to.be.true;
        expect(checkError.compatibleConstructor(errorInstance, derivedInstance)).to.be.false;

        expect(checkError.compatibleConstructor(errorInstance, Error)).to.be.true;
        expect(checkError.compatibleConstructor(derivedInstance, TypeError)).to.be.true;
        expect(checkError.compatibleConstructor(errorInstance, TypeError)).to.be.false;
    });

    it('compatibleMessage', function() {
        const errorInstance = new Error('I am an instance');
        const derivedInstance = new TypeError('I inherit from Error');
        const thrownMessage = 'Imagine I have been thrown';
        expect(checkError.compatibleMessage(errorInstance, /instance$/)).to.be.true;
        expect(checkError.compatibleMessage(derivedInstance, /Error$/)).to.be.true;
        expect(checkError.compatibleMessage(errorInstance, /unicorn$/)).to.be.false;
        expect(checkError.compatibleMessage(derivedInstance, /dinosaur$/)).to.be.false;

        expect(checkError.compatibleMessage(errorInstance, 'instance')).to.be.true;
        expect(checkError.compatibleMessage(derivedInstance, 'Error')).to.be.true;
        expect(checkError.compatibleMessage(errorInstance, 'unicorn')).to.be.false;
        expect(checkError.compatibleMessage(derivedInstance, 'dinosaur')).to.be.false;

        expect(checkError.compatibleMessage(thrownMessage, /thrown$/)).to.be.true;
        expect(checkError.compatibleMessage(thrownMessage, /^Imagine/)).to.be.true;
        expect(checkError.compatibleMessage(thrownMessage, /unicorn$/)).to.be.false;
        expect(checkError.compatibleMessage(thrownMessage, /dinosaur$/)).to.be.false;
    });

    it('constructorName', function() {
        const errorInstance = new Error('I am an instance');
        const derivedInstance = new TypeError('I inherit from Error');
        expect(checkError.getConstructorName(errorInstance)).to.equal('Error');
        expect(checkError.getConstructorName(derivedInstance)).to.equal('TypeError');

        expect(checkError.getConstructorName(Error)).to.equal('Error');
        expect(checkError.getConstructorName(TypeError)).to.equal('TypeError');
    });

    it('getMessage', function() {
        const errorInstance = new Error('I am an instance');
        const derivedInstance = new TypeError('I inherit from Error');
        const thrownMessage = 'Imagine I have been thrown';
        const errorExpMsg = errorInstance.message;
        const derivedExpMsg = derivedInstance.message;
        expect(checkError.getMessage(errorInstance)).to.equal(errorExpMsg);
        expect(checkError.getMessage(derivedInstance)).to.equal(derivedExpMsg);

        expect(checkError.getMessage(thrownMessage)).to.equal('Imagine I have been thrown');

        expect(checkError.getMessage(Error())).to.equal('');
        expect(checkError.getMessage(TypeError())).to.equal('');
    });
});
