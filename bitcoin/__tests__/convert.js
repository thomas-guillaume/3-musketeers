'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning then default ifself', () => {
  expect(convert(2, 'BTC', 'BTC')).toBe(2);
});

test('should return a number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Number')).toBe(2);
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big')).toEqual(new Big(2));
});

test('should return a string', () => {
  expect(convert(2100, 'mBTC', 'BTC', 'String')).toBe('2.1');
});

test('should convert a number from interger', () => {
  expect(convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toBe(1234567.89012345);
});

test('should convert a number from float', () => {
  expect(convert(1234567.89012345, 'BTC', 'Satoshi', 'Number')).toBe(123456789012345);
});

test('should convert a string', () => {
  expect(convert('2', 'BTC', 'BTC', 'String')).toBe('2');
});

test('should convert a Big number', () => {
  expect(convert(new Big(2), 'BTC', 'BTC', 'Number')).toBe(2);
});

test('should convert a NaN to a number', () => {
  expect(convert(NaN, 'BTC', 'BTC', 'Number')).toBe(NaN);
  expect(convert(NaN, 'BTC', 'mBTC', 'Number')).toBe(NaN);
});

test('should convert a NaN to a string', () => {
  expect(convert(NaN, 'BTC', 'BTC', 'String')).toBe('NaN');
  expect(convert(NaN, 'BTC', 'mBTC', 'String')).toBe('NaN');
});

test('should not convert a NaN to a Big', () => {
  expect(() => {convert(NaN, 'BTC', 'BTC', 'Big')}).toThrowError('NaN');
});

test('should handle rounding errors', () => {
  expect(convert(4.6, 'Satoshi', 'BTC', 'Number')).toBe(0.000000046);
  expect(convert(0.000000046, 'BTC', 'Satoshi', 'Number')).toBe(4.6);
});

test('should throw when untest is undefined', () => {
  expect(() => {convert(new Big(2), 'x', 'BTC', 'Number')}).toThrow(/is not a bitcoin unit/);
  expect(() => {convert(new Big(2), 'BTC', 'x', 'Number')}).toThrow(/is not a bitcoin unit/);
  expect(() => {convert(NaN, 'x', 'BTC', 'Number')}).toThrow(/is not a bitcoin unit/);
  expect(() => {convert(NaN, 'BTC', 'x', 'Number')}).toThrow(/is not a bitcoin unit/);
});

test('should throw when representaion is undefined', () => {
  expect(() => {convert(2, 'BTC', 'mBTC', 'x')}).toThrow(/is not a valid representation/);
  expect(() => {convert(NaN, 'BTC', 'mBTC', 'x')}).toThrow(/is not a valid representation/);
});

test('should allow untest aliases', () => {
  expect(convert(4.6, 'Satoshi', 'sat')).toBe(4.6);
  expect(convert(4.6, 'μBTC', 'bit')).toBe(4.6);
});

test('Should throw when unit already exists with a different factor', () => {
  expect(() => {convert.addUnit('BTC', 0.01)}).toThrow();
});

test('Should throws when unit is pre-defined', () => {
  expect(() => {convert.removeUnit('μBTC')}).toThrow();
});
