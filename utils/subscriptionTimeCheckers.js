function hasLastedMoreThanAWeek(subscriptionDate) {
  //TODO: Parse the subscription date string to create a Date object

  const parts = subscriptionDate.split('-').map(Number);
  const subscriptionDateObject = new Date(parts[2], parts[1] - 1, parts[0]); //converts date to ISO 8601 format

  //TODO: month is 0-indexed.
  // TODO: convert parts to --- 2023-11-24T23:00:00.000Z

  //TODO: Calculate the difference in milliseconds between the current date and subscription date
  const currentDate = new Date();
  const timeDifference = currentDate - subscriptionDateObject;

  //TODO: Calculate the number of milliseconds in a week
  const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  //TODO: Check if the time difference is greater than a week
  return timeDifference > oneWeekInMilliseconds;
}

// TODO: Check month  -----------

function hasLastedMoreThanAMonth(subscriptionDate) {
  //TODO: Parse the subscription date string to create a Date object

  const parts = subscriptionDate.split('-').map(Number);
  const subscriptionDateObject = new Date(parts[2], parts[1] - 1, parts[0]); //converts date to ISO 8601 format

  //TODO: month is 0-indexed.
  // TODO: convert parts to --- 2023-11-24T23:00:00.000Z

  //TODO: Calculate the difference in milliseconds between the current date and subscription date
  const currentDate = new Date();
  const timeDifference = currentDate - subscriptionDateObject;

  //TODO: Calculate the number of milliseconds in a months
  const oneWeekInMilliseconds = 30 * 24 * 60 * 60 * 1000;

  //TODO: Check if the time difference is greater than a week
  return timeDifference > oneWeekInMilliseconds;
}

module.exports = { hasLastedMoreThanAWeek, hasLastedMoreThanAMonth };
