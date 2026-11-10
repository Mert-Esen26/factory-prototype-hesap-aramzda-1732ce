import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateBalances } from '../src/settlement.js';

test('toplam tutarı katılımcılara eşit böler ve ödeyeni mahsuplaştırır', () => {
  const result = calculateBalances(['Mert', 'Ece', 'Can'], [{ description: 'Yemek', amount: 300, paidBy: 'Mert' }]);
  assert.deepEqual(result, { Mert: 200, Ece: -100, Can: -100 });
});

test('birden fazla harcamada kişi bazlı net dengeyi hesaplar', () => {
  const result = calculateBalances(['Mert', 'Ece'], [{ amount: 100, paidBy: 'Mert' }, { amount: 40, paidBy: 'Ece' }]);
  assert.deepEqual(result, { Mert: 30, Ece: -30 });
});
