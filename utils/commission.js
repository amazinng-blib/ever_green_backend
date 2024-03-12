function getCommission(plan, amount) {
  let commission;

  if (plan === 'Intro') {
    const com = (20 / 100) * amount;
    return (commission = com);
  }

  if (plan === 'Pro') {
    const com = (20 / 100) * amount;
    return (commission = com);
  }
  if (plan === 'Vip') {
    const com = (20 / 100) * amount;
    return (commission = com);
  }

  return commission;
}

module.exports = getCommission;
