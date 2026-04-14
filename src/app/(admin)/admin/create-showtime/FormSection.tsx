import { ReactNode } from 'react';
import * as Icons from 'lucide-react';

interface FormSectionProps {
  title: string;
  icon: keyof typeof Icons;
  children: ReactNode;
}

const FormSection = ({ title, icon, children }: FormSectionProps) => {
  const Icon = Icons[icon] as any;
  return (
    <div className="bg-slate-800/60 border border-slate-400/15 rounded-[1.5rem] p-8 backdrop-blur-md mb-8">
      <div className="flex items-center gap-3 text-xl font-bold text-slate-200 mb-6">
        <Icon className="w-6 h-6 text-purple-500" />
        {title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};

export default FormSection;