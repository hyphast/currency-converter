import { RefObject, useState, useMemo } from 'react'
import { useClickOutside } from './useClickOutside'

type UseDropdownReturn = [
  boolean,
  {
    closeDropdown: () => void
    toggleDropdown: () => void
  }
]
export const useDropdown = <T extends HTMLElement = HTMLElement>(
  dropdownRef: RefObject<T>
): UseDropdownReturn => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handlers = {
    closeDropdown: () => {
      setIsDropdownVisible(false)
    },
    toggleDropdown: () => {
      setIsDropdownVisible((prev) => !prev)
    },
  }

  useClickOutside(dropdownRef, handlers.closeDropdown)

  return [isDropdownVisible, handlers]
}
