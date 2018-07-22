// mocha is for writing and running test cases, mocha is configured to be used in package.json file

// expect is assertions library
const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		// store res in variable
		var from = 'Jen';
		var text = 'Some message';
		var message = generateMessage(from, text);
		// assert from match
		expect(message.createdAt).toBeA('number');
		// this will check that message object should have these two filed as from and text
		expect(message).toInclude({from, text});
		// assert text match
		// assert createdAt is number
	});
});