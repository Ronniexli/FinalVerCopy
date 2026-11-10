import React, { useState } from "react"
import { Address } from "../types"
import { EtoileNavbar } from "../components/EtoileNavbar"
import { MapPin, Plus, Check, Edit2, Trash2 } from "lucide-react"

interface AddressListScreenProps {
  addresses: Address[]
  selectedAddressId: string | null
  onBack: () => void
  onSelectAddress: (address: Address) => void
  onAddNew: () => void
  onEdit: (addressId: string) => void
  onDelete: (addressId: string) => void
}

export const AddressListScreen: React.FC<AddressListScreenProps> = ({
  addresses,
  selectedAddressId,
  onBack,
  onSelectAddress,
  onAddNew,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar showBack={true} onBack={onBack} title="收货地址管理" />

      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-3 pb-[90px] space-y-3">
        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id

          return (
            <div
              key={addr.id}
              onClick={() => onSelectAddress(addr)}
              className={`p-4 rounded-[8px] border transition-all cursor-pointer relative shadow-xs ${
                isSelected
                  ? "bg-[#DEE5ED]/70 border-[#46414E] ring-1 ring-[#46414E]"
                  : "bg-white border-[#46414E]/12 hover:border-[#46414E]/30"
              }`}
            >
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-sans font-medium text-[#46414E]">
                    {addr.receiver}
                  </span>
                  <span className="text-[13px] font-sans text-[#6C6C6A]">
                    {addr.phone}
                  </span>
                  {addr.isDefault && (
                    <span className="px-1.5 py-0.5 rounded-[4px] bg-[#E8CCD7] text-[#46414E] text-[10px] font-medium font-sans">
                      默认
                    </span>
                  )}
                </div>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onEdit(addr.id)}
                    className="p-1 text-[#6C6C6A] hover:text-[#46414E] cursor-pointer"
                    title="编辑地址"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDelete(addr.id)}
                      className="p-1 text-[#6C6C6A] hover:text-[#46414E] cursor-pointer"
                      title="删除地址"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-[12px] font-sans text-[#6C6C6A] leading-relaxed pr-6">
                {addr.province} {addr.city} {addr.district} {addr.detail}
              </p>

              {isSelected && (
                <div className="absolute right-3 bottom-3 w-5 h-5 rounded-[4px] bg-[#46414E] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Add New Address Button (Fixed Bottom, h-48, rounded-8px) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px]">
        <button
          type="button"
          onClick={onAddNew}
          className="w-full h-[48px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[14px] font-sans font-medium flex items-center justify-center gap-2 hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>新增收货地址</span>
        </button>
      </div>
    </div>
  )
}

interface AddressEditScreenProps {
  initialAddress: Address | null
  onBack: () => void
  onSave: (address: Address) => void
}

export const AddressEditScreen: React.FC<AddressEditScreenProps> = ({
  initialAddress,
  onBack,
  onSave,
}) => {
  const [receiver, setReceiver] = useState(initialAddress?.receiver || "")
  const [phone, setPhone] = useState(initialAddress?.phone || "")
  const [province, setProvince] = useState(initialAddress?.province || "上海市")
  const [city, setCity] = useState(initialAddress?.city || "上海市")
  const [district, setDistrict] = useState(initialAddress?.district || "静安区")
  const [detail, setDetail] = useState(initialAddress?.detail || "")
  const [isDefault, setIsDefault] = useState(initialAddress?.isDefault || false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = () => {
    if (!receiver.trim()) {
      setError("请输入收件人姓名")
      return
    }
    if (!phone.trim()) {
      setError("请输入联系电话")
      return
    }
    if (!detail.trim()) {
      setError("请输入详细门牌地址")
      return
    }

    const newAddress: Address = {
      id: initialAddress?.id || `addr-${Date.now()}`,
      receiver: receiver.trim(),
      phone: phone.trim(),
      province,
      city,
      district,
      detail: detail.trim(),
      isDefault,
    }

    onSave(newAddress)
  }

  return (
    <div className="relative w-full min-h-full flex flex-col bg-[#FFFBF0] text-[#46414E]">
      <EtoileNavbar
        showBack={true}
        onBack={onBack}
        title={initialAddress ? "编辑收货地址" : "新增收货地址"}
      />

      <div className="flex-1 w-full overflow-y-auto no-scrollbar px-5 pt-3 pb-[100px] space-y-3">
        {error && (
          <div className="p-3 rounded-[8px] bg-[#E8CCD7]/40 border border-[#E8CCD7] text-[12px] font-sans text-[#46414E]">
            {error}
          </div>
        )}

        <div className="p-4 rounded-[8px] bg-white border border-[#46414E]/12 space-y-3.5 shadow-xs">
          <div>
            <label className="text-[12px] font-sans font-medium text-[#46414E] block mb-1">
              收件人
            </label>
            <input
              type="text"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="请输入真实姓名"
              className="w-full text-[13px] font-sans text-[#46414E] p-2.5 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none"
            />
          </div>

          <div>
            <label className="text-[12px] font-sans font-medium text-[#46414E] block mb-1">
              联系电话
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="手机号码"
              className="w-full text-[13px] font-sans text-[#46414E] p-2.5 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-sans font-medium text-[#46414E] block mb-1">
                省份
              </label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full text-[12px] font-sans text-[#46414E] p-2 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-sans font-medium text-[#46414E] block mb-1">
                城市
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-[12px] font-sans text-[#46414E] p-2 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-sans font-medium text-[#46414E] block mb-1">
                区县
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-[12px] font-sans text-[#46414E] p-2 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[12px] font-sans font-medium text-[#46414E] block mb-1">
              详细地址
            </label>
            <textarea
              rows={3}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="街道门牌、楼层房号等详细信息"
              className="w-full text-[13px] font-sans text-[#46414E] p-2.5 rounded-[6px] border border-[#46414E]/15 bg-[#FFFBF0]/50 outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#46414E]/8">
            <span className="text-[13px] font-sans text-[#46414E]">
              设为默认收货地址
            </span>
            <button
              type="button"
              onClick={() => setIsDefault(!isDefault)}
              className={`w-11 h-6 rounded-[8px] transition-colors p-0.5 cursor-pointer ${
                isDefault ? "bg-[#46414E]" : "bg-[#DEE5ED]"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-[6px] bg-white transition-transform ${
                  isDefault ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button (Fixed Bottom, h-48, rounded-8px) */}
      <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#FFFBF0]/95 backdrop-blur-xl border-t border-[#46414E]/10 px-5 pt-2.5 pb-[22px]">
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-[48px] rounded-[8px] bg-[#46414E] text-[#FFFBF0] text-[15px] font-sans font-medium flex items-center justify-center hover:bg-[#38343f] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
        >
          保存并使用
        </button>
      </div>
    </div>
  )
}
