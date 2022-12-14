/**
 * The external imports
 */
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'

/**
 * Type definitions
 */
interface CategoryType {
  label?: string
  variant?: string
}
interface CategorySelectionPropTypes {
  categories: CategoryType[]
  category: CategoryType
  setCategory: React.Dispatch<React.SetStateAction<CategoryType>>
}

const CategorySelection = (props: CategorySelectionPropTypes) => {
  const { categories, category, setCategory } = props

  const { t } = useTranslation('planning')

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant={category.variant || 'default'}
        w='15%'
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
          >
            {category.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default CategorySelection
