import Order from "../../models/order.model.js";

export const revenueDay = async (req, res) => {
  const timeLine = new Date();

  const currentMonth = timeLine.getMonth() + 1; //Lay ra thang
  const currentYears = timeLine.getFullYear(); //Lay ra nam
  const days = new Date(currentYears, currentMonth, 0).getDate();
  let arrayTotalPriceDayInMonth = Array(days).fill(0);

  const record = await Order.find({
    deleted: false,
    status: "completed"
  });

  for (const item of record) {
    const day = item.createdAt.getDate(); // Trả về số ngày (1 -> 31)
    arrayTotalPriceDayInMonth[day] += item.totalPrice;
  }

  res.status(200).json({
    data: arrayTotalPriceDayInMonth
  })
}

export const revenueMonth = async (req, res) => {
  let arrayTotalPriceMonthInYear = Array(12).fill(0);

  const record = await Order.find({
    deleted: false,
    status: "completed"
  });

  for (const item of record) {
    const month = item.createdAt.getMonth(); // Trả về số ngày (1 -> 31)
    arrayTotalPriceMonthInYear[month] += item.totalPrice;
  }
  res.status(200).json({
    data: arrayTotalPriceMonthInYear,
  })
}