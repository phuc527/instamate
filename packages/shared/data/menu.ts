import { Calendar, Package, Layers } from "react-feather";

const menus = [
    {
        id: 1,
        label: "Calendar",
        url: "/apps/calendar",
        Icon: Calendar,
    },
    {
        id: 2,
        label: "Tickets",
        url: "/tickets",
        Icon: Package,
    },
    {
        id: 3,
        label: "Contacts",
        url: "/contacts",
        Icon: Layers,
    },
];

export default menus;
