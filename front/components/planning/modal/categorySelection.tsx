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
 * The internal imports
 */
import { ModalContext } from '../../../lib/contexts'

/**
 * Type imports
 */
import { ICategory, ICategoryProps } from '../../../lib/types'

const CategorySelection: FC<ICategoryProps> = ({
  categoryType,
  setCategoryType,
}) => {
  const { t } = useTranslation('planning')

  const { selectedDay } = useContext(ModalContext)

  const categoryTypes = useMemo(
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
      const selectedSlot = selectedDay.activities.find(slot => slot.selected)
      if (selectedSlot) {
        const categoryType = categoryTypes.find(
          category => category.key === selectedSlot.type
        )
        if (categoryType) {
          setCategoryType(categoryType)
        }
      }
    } else {
      setCategoryType({} as ICategory)
    }
  }, [selectedDay])

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<Icon as={RiArrowDownSFill} h={7} w={7} />}
        variant={categoryType.variant || 'default'}
        w='22%'
      >
        {categoryType.label || t('categories.title')}
      </MenuButton>
      <MenuList p={0} borderRadius='lg'>
        {categoryTypes.map(category => (
          <MenuItem
            key={category.label}
            bg={category.variant}
            onClick={() => setCategoryType(category)}
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
