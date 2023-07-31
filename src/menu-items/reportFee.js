// assets
import { IconReportMoney } from "@tabler/icons";

// constant
const icons = { IconReportMoney };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const report = {
  id: "report",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "report",
      title: "Hóa đơn",
      type: "item",
      url: "/order",
      icon: icons.IconReportMoney,
      breadcrumbs: false,
    },
  ],
};

export default report;
