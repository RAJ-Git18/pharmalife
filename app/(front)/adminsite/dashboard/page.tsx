import WeeklySales from '@/components/ui/WeeklySales';
import TotalOrders from '@/components/ui/TotalOrders';
import TotalSales from '@/components/ui/TotalSales';

const page = () => {
  return (
    <div className="mt-3 flex flex-col min-h-screen w-full p-2 gap-6">

      {/* Top section with two cards - responsive wrap */}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <div className="bg-white rounded-lg w-full md:w-1/2 p-4 shadow-md">
          <WeeklySales />
        </div>
        <div className="bg-white rounded-lg w-full md:w-1/2 p-4 shadow-md">
          <TotalOrders />
        </div>
      </div>

      {/* Full width bottom chart */}
      <div className="bg-white rounded-lg w-full p-4 shadow-md flex-1">
        <TotalSales />
      </div>
    </div>
  );
};

export default page;
