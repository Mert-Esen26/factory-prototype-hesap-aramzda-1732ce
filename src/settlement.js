export function calculateBalances(members, expenses) {
  const balances = Object.fromEntries(members.map((member) => [member, 0]));
  for (const expense of expenses) {
    if (!members.includes(expense.paidBy) || !Number.isFinite(expense.amount) || expense.amount <= 0) continue;
    const share = expense.amount / members.length;
    balances[expense.paidBy] += expense.amount;
    for (const member of members) balances[member] -= share;
  }
  return Object.fromEntries(Object.entries(balances).map(([name, value]) => [name, Math.round(value * 100) / 100]));
}

export function formatMoney(amount) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
}
