// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';
import pick from '../../../utils/pick';

let testObj: any = null;

describe('pick Utils Test Cases', () => {
	beforeAll(() => {
		testObj = {
			keyA: 'keyA',
			keyB: 'keyB',
			keyC: 'keyC',
			keyD: 'keyD',
			keyE: 'keyE',
		};
	});

	test('should return empty object when no keys are passed', () => {
		expect(pick(testObj, [])).toStrictEqual({});
	});

	test('should return empty object when wrong keys are passed', () => {
		expect(pick(testObj, ['keyF'])).toStrictEqual({});
	});

	test('should return object with correct keys when correct keys are passed', () => {
		expect(pick(testObj, ['keyA', 'keyB', 'keyC'])).toStrictEqual({
			keyA: 'keyA',
			keyB: 'keyB',
			keyC: 'keyC',
		});
	});

	test('should return object with new keys when one or more keys are passed as an array', () => {
		expect(pick(testObj, [['keyA', 'newKeyA'], ['keyB', 'newKeyB'], 'keyC'])).toStrictEqual({
			newKeyA: 'keyA',
			newKeyB: 'keyB',
			keyC: 'keyC',
		});
	});
});
