import { calculateBalances, formatMoney } from '../src/settlement.js';

const key = 'hesap-aramizda-state-v1';
const $ = (id) => document.getElementById(id);
const initial = { groupName: '', members: [], expenses: [] };
let state = load();

function load() { try { return { ...initial, ...JSON.parse(localStorage.getItem(key) || '{}') }; } catch { return { ...initial }; } }
function save() { localStorage.setItem(key, JSON.stringify(state)); }
function show(message) { $('notice').textContent = message; window.setTimeout(() => { if ($('notice').textContent === message) $('notice').textContent = ''; }, 2800); }
function render() {
  $('group-name').value = state.groupName;
  $('members').value = state.members.join(', ');
  $('summary-title').textContent = state.groupName || 'Grubunu oluştur';
  $('paid-by').innerHTML = state.members.length ? state.members.map((name) => `<option>${escapeHtml(name)}</option>`).join('') : '<option value="">Önce katılımcı ekle</option>';
  const total = state.expenses.reduce((sum, item) => sum + item.amount, 0);
  $('total').textContent = formatMoney(total); $('expense-count').textContent = state.expenses.length;
  const balances = calculateBalances(state.members, state.expenses);
  $('balances').innerHTML = state.members.length ? state.members.map((name) => `<div class="balance-row"><span>${escapeHtml(name)}</span><strong class="${balances[name] < 0 ? 'owe' : ''}">${balances[name] >= 0 ? '+' : ''}${formatMoney(balances[name])}</strong></div>`).join('') : '<p class="empty-light">İlk harcamayı eklediğinde borç dengesi burada görünür.</p>';
  $('history').innerHTML = state.expenses.length ? [...state.expenses].reverse().map((item) => `<div class="history-item"><div><p class="description">${escapeHtml(item.description)}</p><small>${escapeHtml(item.paidBy)} ödedi</small></div><strong>${formatMoney(item.amount)}</strong></div>`).join('') : '<p class="empty">Henüz harcama yok. İlk harcamayı ekleyin.</p>';
}
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c])); }

$('group-form').addEventListener('submit', (event) => { event.preventDefault(); const members = $('members').value.split(',').map((name) => name.trim()).filter(Boolean); if (members.length < 2) return show('En az iki katılımcı ekleyin.'); state = { ...state, groupName: $('group-name').value.trim(), members: [...new Set(members)] }; save(); render(); show('Grup kaydedildi.'); });
$('expense-form').addEventListener('submit', (event) => { event.preventDefault(); if (!state.members.length) return show('Önce grup bilgilerini kaydedin.'); const amount = Number($('amount').value); if (!Number.isFinite(amount) || amount <= 0) return show('Geçerli bir tutar girin.'); state.expenses.push({ description: $('description').value.trim(), amount: Math.round(amount * 100) / 100, paidBy: $('paid-by').value }); save(); event.target.reset(); render(); show('Harcama eklendi, borç özeti güncellendi.'); });
render();
