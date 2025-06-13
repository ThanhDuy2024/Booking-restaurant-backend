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
    if (item.createdAt.getFullYear() === currentYears) {
      arrayTotalPriceDayInMonth[day] += item.totalPrice;
    }
  }

  res.status(200).json({
    data: arrayTotalPriceDayInMonth
  })
}

export const revenueMonth = async (req, res) => {
  let arrayTotalPriceMonthInYear = Array(12).fill(0);

  const timeLine = new Date();
  const currentYears = timeLine.getFullYear();

  const record = await Order.find({
    deleted: false,
    status: "completed"
  });

  for (const item of record) {
    const month = item.createdAt.getMonth(); // Trả về số ngày (1 -> 31)
    if (item.createdAt.getFullYear() === currentYears) {
      arrayTotalPriceMonthInYear[month] += item.totalPrice;
    }
  }
  res.status(200).json({
    data: arrayTotalPriceMonthInYear,
  })
}

export const revenueYears = async (req, res) => {
  const record = await Order.find({
    deleted: false,
    status: "completed"
  });

  let arrayYears = [];
  for (const item of record) {
    const years = item.createdAt.getFullYear(); // Trả về số ngày (1 -> 31)
    arrayYears.push(years);
  }

  const uniqueYears = new Set(arrayYears);
  const uniqueArrayYears = [...uniqueYears];
  uniqueArrayYears.sort();

  let totalPriceInYears = [];
  uniqueArrayYears.forEach(item => {
    const orderItem = record.filter(year => year.createdAt.getFullYear() === item);
    const totalPrice = orderItem.reduce((sum, order) => {
      return sum + (order.totalPrice);
    }, 0);

    totalPriceInYears.push(totalPrice);
  })


  res.status(200).json({
    years: uniqueArrayYears,
    totalPriceInYears: totalPriceInYears
  })
}

export const revenueBranchDay = async (req, res) => {
  const timeLine = new Date();

  const currentMonth = timeLine.getMonth() + 1; //Lay ra thang
  const currentYears = timeLine.getFullYear(); //Lay ra nam
  const days = new Date(currentYears, currentMonth, 0).getDate();
  let arrayTotalPriceDayInMonth = Array(days).fill(0);

  const record = await Order.find({
    deleted: false,
    status: "completed",
    branchId: req.accountAdmin.branch,
  });

  for (const item of record) {
    const day = item.createdAt.getDate(); // Trả về số ngày (1 -> 31)
    if (item.createdAt.getFullYear() === currentYears) {
      arrayTotalPriceDayInMonth[day] += item.totalPrice;
    }
  }

  res.status(200).json({
    data: arrayTotalPriceDayInMonth
  })
}