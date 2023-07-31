// assets
import { IconCalendarEvent } from "@tabler/icons";

// constant
const icons = { IconCalendarEvent };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const booking = {
  id: "booking",
  // title: "Dashboard",
  type: "group",
  children: [
    {
      id: "booking",
      title: "Lịch đặt",
      type: "item",
      url: "/booking",
      icon: icons.IconCalendarEvent,
      breadcrumbs: false,
    },
  ],
};

export default booking;
