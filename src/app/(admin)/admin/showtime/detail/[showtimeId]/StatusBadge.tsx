import { CheckCircle, Clock, X } from 'lucide-react';
import { addMinutes, isAfter, parseISO } from 'date-fns';

interface StatusBadgeProps {
  isConfirm: boolean;
  createdAt: string
}

const StatusBadge = ({ isConfirm , createdAt}: StatusBadgeProps) => {
  const createdTime = parseISO(createdAt)
  const now = new Date()
  var status = isConfirm ? 'confirmed' : isAfter(addMinutes(createdTime, 2), now) ? 'pending' : 'cancel';
  return (
    <span className={`px-4 py-2 rounded-lg text-[0.85rem] font-semibold flex items-center gap-2 border ${
      status == 'confirmed' 
      ? 'bg-green-500/20 text-green-300 border-green-500/30'
      : status == 'pending'
      ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
      : 'bg-red-500/20 text-red-300 border-red-500/30'
    }`}>
      {status == 'confirmed' ? <CheckCircle size={14} /> :  status == 'pending'? <Clock size={14} />: < X size={14} />}
      {status == 'confirmed' ? 'Đã thanh toán' : status == 'pending' ? 'Đang thanh toán' : 'Hủy thanh toán'}
    </span>
  );
};

export default StatusBadge;