import { CheckCircle, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'confirmed' | 'pending';
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const isConfirmed = status === 'confirmed';
  
  return (
    <span className={`px-4 py-2 rounded-lg text-[0.85rem] font-semibold flex items-center gap-2 border ${
      isConfirmed 
      ? 'bg-green-500/20 text-green-300 border-green-500/30' 
      : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
    }`}>
      {isConfirmed ? <CheckCircle size={14} /> : <Clock size={14} />}
      {isConfirmed ? 'Xác Nhận' : 'Chờ Xử Lý'}
    </span>
  );
};

export default StatusBadge;