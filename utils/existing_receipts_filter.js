import existingReceiptItem from "@/components/AllReceipts/ExistingReceiptItem";

function getWeekNumber(d) {
  const date = new Date(d)
  // Copy date so don't modify original
  d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  // Get first day of year
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  // Calculate full weeks to nearest Thursday
  let weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  // Return array of year and week number
  return {year: d.getUTCFullYear(), week: weekNo};
}

export function filter_this_week (receipts) {
  const date = new Date()
  let date_year_week = getWeekNumber(date)
  receipts.map(receipt => receipt.year_week = getWeekNumber(receipt.createdAt))
  return receipts.filter(item => item.year_week.year === date_year_week.year && item.year_week.week === date_year_week.week)
}

export function filter_this_month (receipts) {
  const date = new Date()
  console.log(receipts)
  return receipts.filter(receipt => new Date(receipt.createdAt).getFullYear() === date.getFullYear() && new Date(receipt.createdAt).getMonth() === date.getMonth())
}


