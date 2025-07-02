import { Menu, ClipboardList } from "lucide-react";

export default function HomeNav() {
  return (
    <div className="w-full flex items-center justify-between text-gray-600 pt-2 pb-4">
      <Menu size="28" />
      <div className="flex gap-4  items-center">
        <ClipboardList size="28" />
        {/* profile pic */}
        <div className="w-10 h-10 bg-red-400 rounded-full profilePic"></div>
      </div>
    </div>
  );
}
