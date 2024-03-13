function hasPlanExpired(purchaseDate, plan_duration) {
  //todo: Get the current date
  const currentDate = new Date();

  if (plan_duration === 'Monthly Plan') {
    //todo: Calculate the end date of the plan by adding durationInDays to the purchaseDate
    const endDate = new Date(purchaseDate);
    endDate.setDate(endDate.getDate() + 30);

    //todo: Check if the current date is after the end date of the plan
    return currentDate > endDate;
  }
  if (plan_duration === '3 Months Plan') {
    //todo: Calculate the end date of the plan by adding durationInDays to the purchaseDate
    const endDate = new Date(purchaseDate);
    endDate.setDate(endDate.getDate() + 30 * 3);

    //todo: Check if the current date is after the end date of the plan
    return currentDate > endDate;
  }
  if (plan_duration === '6 Months Plan') {
    //todo: Calculate the end date of the plan by adding durationInDays to the purchaseDate
    const endDate = new Date(purchaseDate);
    endDate.setDate(endDate.getDate() + 30 * 6);

    //todo: Check if the current date is after the end date of the plan
    return currentDate > endDate;
  }
  if (plan_duration === 'Yearly Plan') {
    //todo: Calculate the end date of the plan by adding durationInDays to the purchaseDate
    const endDate = new Date(purchaseDate);
    endDate.setDate(endDate.getDate() + 30 * 12);

    //todo: Check if the current date is after the end date of the plan
    return currentDate > endDate;
  }
}

module.exports = hasPlanExpired;
