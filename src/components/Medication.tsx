import { useState } from 'react';
import { ArrowLeft, Pill, MapPin, Package, Truck, Check } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface MedicationProps {
  onNavigate: (page: string) => void;
}

export function Medication({ onNavigate }: MedicationProps) {
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);

  const prescriptions = [
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      refillDate: 'Nov 25, 2025',
      refillsLeft: 3,
      price: 'SR 45.00',
      copay: 'SR 0.00'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      refillDate: 'Nov 28, 2025',
      refillsLeft: 2,
      price: 'SR 38.00',
      copay: 'SR 0.00'
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily at night',
      refillDate: 'Dec 5, 2025',
      refillsLeft: 4,
      price: 'SR 52.00',
      copay: 'SR 10.00'
    }
  ];

  const orderHistory = [
    {
      id: 'ord1',
      date: 'Nov 10, 2025',
      status: 'Delivered',
      items: 2,
      total: 'SR 83.00',
      trackingNumber: 'BPA123456789'
    },
    {
      id: 'ord2',
      date: 'Oct 15, 2025',
      status: 'Delivered',
      items: 3,
      total: 'SR 135.00',
      trackingNumber: 'BPA987654321'
    }
  ];

  const toggleSelection = (id: string) => {
    if (selectedMeds.includes(id)) {
      setSelectedMeds(selectedMeds.filter(medId => medId !== id));
    } else {
      setSelectedMeds([...selectedMeds, id]);
    }
  };

  const handleOrder = () => {
    // Process order
    alert('Order placed successfully! We\'ll deliver your medication soon.');
    setSelectedMeds([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-gray-900">Order Medication</h1>
            <p className="text-xs text-gray-500">Refill your prescriptions</p>
          </div>
        </div>
      </header>

      <div className="px-5 py-6">
        {/* Current Prescriptions */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Available for Refill</h2>
          <div className="space-y-3">
            {prescriptions.map((med) => {
              const isSelected = selectedMeds.includes(med.id);
              return (
                <Card
                  key={med.id}
                  onClick={() => toggleSelection(med.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-[#005EB8] bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-[#005EB8]' : 'bg-gray-100'
                    }`}>
                      {isSelected ? (
                        <Check className="text-white" size={20} />
                      ) : (
                        <Pill className="text-gray-600" size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{med.name}</h3>
                          <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        </div>
                        <Badge variant="outline" className="ml-2">
                          {med.refillsLeft} refills
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Next refill: {med.refillDate}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-gray-500">Price: </span>
                          <span className="line-through text-gray-400">{med.price}</span>
                          {med.copay !== 'SR 0.00' && (
                            <span className="text-[#005EB8] ml-2">Co-pay: {med.copay}</span>
                          )}
                          {med.copay === 'SR 0.00' && (
                            <span className="text-green-600 ml-2">Fully Covered</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Delivery Address */}
        {selectedMeds.length > 0 && (
          <div className="mb-6">
            <h3 className="text-gray-900 mb-3">Delivery Address</h3>
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-[#005EB8] flex-shrink-0" size={20} />
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">Home</p>
                  <p className="text-sm text-gray-600">
                    King Fahd Road, Al Olaya District<br />
                    Riyadh 12213, Saudi Arabia
                  </p>
                </div>
                <button className="text-[#005EB8] text-sm">Change</button>
              </div>
            </Card>
          </div>
        )}

        {/* Order Summary */}
        {selectedMeds.length > 0 && (
          <div className="mb-6">
            <Card className="p-4 bg-blue-50 border-2 border-[#005EB8]">
              <h3 className="text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Items selected:</span>
                  <span className="text-gray-900">{selectedMeds.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">SR 135.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Co-pay:</span>
                  <span className="text-gray-900">SR 10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery:</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-[#005EB8]">SR 10.00</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck size={16} />
                <span>Estimated delivery: 1-2 business days</span>
              </div>
            </Card>
          </div>
        )}

        {/* Order Button */}
        {selectedMeds.length > 0 && (
          <Button 
            onClick={handleOrder}
            className="w-full bg-[#005EB8] hover:bg-[#004A94] text-white py-6 mb-6"
          >
            <Package className="mr-2" size={20} />
            Place Order ({selectedMeds.length} items)
          </Button>
        )}

        {/* Order History */}
        <div>
          <h2 className="text-gray-900 mb-3">Recent Orders</h2>
          <div className="space-y-3">
            {orderHistory.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="text-[#005EB8]" size={16} />
                      <span className="text-sm text-gray-900">Order #{order.trackingNumber}</span>
                    </div>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{order.items} items</span>
                  <span className="text-gray-900">{order.total}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
