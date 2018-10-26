const chai = require('chai');
const expect = chai.expect;
const dataUtilities = require('../src/js/dataUtilities');
const { json, processedData, parseString } = require('./spec.helper');

describe('dataUtilities', () => {
  it('getCategoriesToVisualise returns a filtered array', () => {
    expect(dataUtilities.getCategoriesToVisualise(processedData, 'date')).to.be.an('array').that.does.not.include('date');
  });

  it('getMaxOfData returns the max value of every object in the array', () => {
    expect(dataUtilities.getMaxOfData(processedData)).to.equal(0.26);
  });

  it('processRawData should take a JSON and convert it into an array of objects', () => {
    expect(dataUtilities.processRawData(json)).to.deep.equal(processedData);
    expect(dataUtilities.processRawData(json)).to.have.lengthOf(2);
  });
  it('ariaLabelNegativeFormat formats negative aria labels using plaintext', () => {
    expect(dataUtilities.ariaLabelNegativeFormat(-0.12)).to.equal('minus 0.12');
    expect(dataUtilities.ariaLabelNegativeFormat(0)).to.equal(0);
    expect(dataUtilities.ariaLabelNegativeFormat(1.23)).to.equal(1.23);
  });
});

