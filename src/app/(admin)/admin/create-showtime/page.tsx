import FormSection from './FormSection';
import { RotateCcw, Plus } from 'lucide-react';

export default function AddShowtime() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white relative overflow-hidden font-sans">
      {/* Background Animation & Effects */}
      <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_30%_50%,rgba(168,85,247,0.08)_0%,transparent_50%),radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.06)_0%,transparent_40%)] animate-[drift_20s_ease-in-out_infinite]" />
      <main className="relative z-10 py-12 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black font-playfair text-slate-200 mb-2">
              Thêm Suất Chiếu Mới
            </h1>
            <p className="text-slate-400">
              Điền thông tin đầy đủ để thêm một suất chiếu mới vào hệ thống
            </p>
          </div>

          <form className="space-y-8">
            {/* Section 1: Movie Info */}
            <FormSection title="Thông Tin Phim" icon="Film">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Tên phim</label>
                <input type="text" placeholder="VD: Dune: Part Two" className="input-style" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Định dạng chiếu</label>
                <select className="input-style">
                  <option value="">-- Chọn định dạng --</option>
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="IMAX">IMAX</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ngày chiếu</label>
                <input type="date" className="input-style" />
              </div>
            </FormSection>

            {/* Section 2: Location */}
            <FormSection title="Vị Trí Rạp Chiếu" icon="Building2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Thành phố</label>
                <select className="input-style">
                  <option value="">-- Chọn thành phố --</option>
                  <option value="Hà Nội">Hà Nội</option>
                  <option value="TP HCM">TP HCM</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Rạp chiếu</label>
                <select className="input-style">
                  <option value="">-- Chọn rạp --</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 lg:col-span-3">
                <label className="text-xs font-bold text-slate-400 uppercase">Địa chỉ</label>
                <input type="text" readOnly className="input-style bg-slate-900/40" />
              </div>
            </FormSection>

            {/* Section 3: Room & Time */}
            <FormSection title="Phòng & Giờ Chiếu" icon="DoorOpen">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Số phòng</label>
                <input type="number" placeholder="1" className="input-style" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Sức chứa</label>
                <input type="number" defaultValue="60" className="input-style" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Giờ chiếu</label>
                <select className="input-style">
                  <option value="">-- Chọn giờ --</option>
                  <option value="19:00">19:00</option>
                  <option value="20:30">20:30</option>
                </select>
              </div>
            </FormSection>

            {/* Section 4: Pricing */}
            <FormSection title="Giá Vé" icon="Ticket">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế Thường (₫)</label>
                <input type="number" placeholder="100000" className="input-style" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế VIP (₫)</label>
                <input type="number" placeholder="150000" className="input-style" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Ghế Couple (₫)</label>
                <input type="number" placeholder="250000" className="input-style" />
              </div>
            </FormSection>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-12">
              <button type="button" className="px-8 py-3.5 rounded-xl bg-slate-700/30 border border-slate-400/20 text-slate-300 font-bold hover:bg-slate-700/50 transition flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" /> Xóa
              </button>
              <button type="button" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:translate-y-[-2px] hover:shadow-[0_10px_25px_rgba(168,85,247,0.3)] transition flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Thêm Suất Chiếu
              </button>
            </div>
          </form>
        </div>
      </main>
      
    </div>
  );
}