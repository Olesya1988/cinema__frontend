export default function getDate() {
  let today = new Date();
  let todayTime = today.getTime();
  let hours = 24;
  let dateArr: string[] = [];

  let firstDay = today.getDate();
  let firstMonth: number | string = today.getMonth() + 1;

  if (firstMonth < 10) {
    firstMonth = "0" + firstMonth;
  }

  let date = firstDay + "." + firstMonth;

  dateArr.push(date);

  for (let i = 0; i < 6; i++) {
    let currDate = new Date(todayTime + hours * 3600 * 1000);
    let day = currDate.getDate();
    let month: number | string = currDate.getMonth() + 1;

    if (month < 10) {
      month = "0" + month;
    }

    let date = day + "." + month;
    hours = hours + 24;
    dateArr.push(date);
  }

  return dateArr;
}
