import React from "react"
import { TabId, ViewMode } from "../types"

interface TabBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  viewMode: ViewMode
  cartCount?: number
}

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  viewMode,
  cartCount = 0,
}) => {
  const isNoText = viewMode === "notext"

  const tabs: {
    id: TabId
    nameCn: string
    nameEn: string
    icon: (isActive: boolean) => React.ReactNode
  }[] = [
    {
      id: "home",
      nameCn: "首页",
      nameEn: "HOME",
      icon: (isActive) => (
        <svg
          className="w-[22px] h-[22px] transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle house roof with ribbon curve */}
          <path
            d="M3 10.5L12 3.5L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
            fill={isActive ? "#6C6C6A" : "none"}
            stroke={isActive ? "#6C6C6A" : "#989895"}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Active roof crest dot */}
          {isActive && <circle cx="12" cy="8" r="1.2" fill="#FFFBF0" />}
        </svg>
      ),
    },
    {
      id: "order",
      nameCn: "下单",
      nameEn: "ORDER",
      icon: (isActive) => (
        <div className="relative">
          <svg
            className="w-[22px] h-[22px] transition-transform duration-200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bag Body */}
            <path
              d="M5 8H19L20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20L5 8Z"
              fill={isActive ? "#6C6C6A" : "none"}
              stroke={isActive ? "#6C6C6A" : "#989895"}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Bag Handle */}
            <path
              d="M8.5 8V6C8.5 4.067 10.067 2.5 12 2.5C13.933 2.5 15.5 4.067 15.5 6V8"
              stroke={isActive ? "#6C6C6A" : "#989895"}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-[5px] -right-[7px] min-w-[15px] h-[15px] px-[3px] rounded-full bg-[#E8CCD7] border border-[#6C6C6A]/20 text-[#6C6C6A] font-bold text-[9px] flex items-center justify-center font-sans-app">
              {cartCount}
            </span>
          )}
        </div>
      ),
    },
    {
      id: "orders",
      nameCn: "订单",
      nameEn: "ORDERS",
      icon: (isActive) => (
        <svg
          className="w-[22px] h-[22px] transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Order receipt / ticket */}
          <path
            d="M6 3H18C18.5523 3 19 3.44772 19 4V21L15.5 19.5L12 21L8.5 19.5L5 21V4C5 3.44772 5.44772 3 6 3Z"
            fill={isActive ? "#6C6C6A" : "none"}
            stroke={isActive ? "#6C6C6A" : "#989895"}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          {/* Lines */}
          <line
            x1="8.5"
            y1="8"
            x2="15.5"
            y2="8"
            stroke={isActive ? "#FFFBF0" : "#989895"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="8.5"
            y1="12"
            x2="13.5"
            y2="12"
            stroke={isActive ? "#FFFBF0" : "#989895"}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: "me",
      nameCn: "我的",
      nameEn: "ME",
      icon: (isActive) => (
        <svg
          className="w-[22px] h-[22px] transition-transform duration-200"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* User head */}
          <circle
            cx="12"
            cy="8"
            r="4.2"
            fill={isActive ? "#6C6C6A" : "none"}
            stroke={isActive ? "#6C6C6A" : "#989895"}
            strokeWidth="1.6"
          />
          {/* User shoulders */}
          <path
            d="M4.5 19.5C4.5 16.5 7.5 14.5 12 14.5C16.5 14.5 19.5 16.5 19.5 19.5"
            stroke={isActive ? "#6C6C6A" : "#989895"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <nav
      className="relative w-full h-[52px] px-3 bg-[#FFFBF0]/92 backdrop-blur-xl border-t border-[#6C6C6A]/12 flex items-center justify-around select-none z-30"
      aria-label="Bottom Navigation"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 h-full flex flex-col items-center justify-center cursor-pointer transition-colors duration-150 relative ${
              isActive
                ? "text-[#6C6C6A]"
                : "text-[#989895] hover:text-[#6C6C6A]"
            }`}
          >
            {/* Tab Icon */}
            <div className="flex items-center justify-center h-[24px]">
              {tab.icon(isActive)}
            </div>

            {/* Tab Label: 12px caption (Chinese + English) */}
            {!isNoText ? (
              <div className="flex items-center gap-[2px] leading-none mt-[2px]">
                <span
                  className={`mp-text-12 font-serif-cn ${
                    isActive ? "font-semibold text-[#6C6C6A]" : "text-[#989895]"
                  }`}
                >
                  {tab.nameCn}
                </span>
                <span
                  className={`text-[9px] font-serif-en tracking-wider ${
                    isActive
                      ? "font-medium text-[#6C6C6A]"
                      : "text-[#989895]/80"
                  }`}
                >
                  {tab.nameEn}
                </span>
              </div>
            ) : (
              <div className="w-[28px] h-[6px] rounded-xs bg-[#6C6C6A]/25 mt-[3px]" />
            )}

            {/* Subtle Active Pill Bar */}
            {isActive && (
              <span className="absolute bottom-[2px] w-[14px] h-[2px] rounded-full bg-[#6C6C6A]" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
