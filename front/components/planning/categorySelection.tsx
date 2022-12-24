/**
 * The external imports
 */
import { FC, useMemo, useEffect, useContext } from 'react'
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { RiArrowDownSFill } from 'react-icons/ri'

/**
 * Type imports
 */
import { ICategory } from '../../lib/types'
import { ModalContext } from '../../lib/contexts'

/**
 * Type definitions
 */
export type CategorySelectionProps = {
  category: ICategory
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>
}

const CategorySelection: FC<CategorySelectionProps> = ({
  category,
  setCategory,
}) => {
  const { t } = useTranslation('planning')

  const { selectedDay } = useContext(ModalContext)

  const categories = useMemo(
    () => [
      {
        key: 'accommodation',
        label: t('categories.accommodations'),
        variant: 'teal',
        isMulti: false,
      },
      {
        key: 'restaurant',
        label: t('categories.restaurants'),
        variant: 'salmon',
        isMulti: true,
      },
      {
        key: 'activity',
        label: t('categories.activities'),
        variant: 'turquoise',
        isMulti: true,
      },
    ],
    []
  )

  useEffect(() => {
    if (Object.keys(selectedDay).length > 0) {
      const newSlot = selectedDay.schedule.find(slot => slot.selected)
      if (newSlot) {
        const newCategory = categories.find(
          category => category.key === newSlot.type
        )
        if (newCategory) {
          setCategory(newCategory)
        }
      }
    } else {
      setCategory({} as ICategory)
    }
  }, [selectedDay])

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={RiArrowDownSFill} h={7} w={7} />}
        variant={category.variant || 'default'}
        w='22%'
      >
        {category.label || t('categories.title')}
      </MenuButton>
      <MenuList p={0} borderRadius='lg'>
        {categories.map(category => (
          <MenuItem
            key={category.label}
            bg={category.variant}
            onClick={() => setCategory(category)}
            _first={{ borderTopRadius: 'lg' }}
            _last={{ borderBottomRadius: 'lg' }}
            p={4}
            color='white'
            fontWeight='bold'
            justifyContent='center'
          >
            {category.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CategorySelection
