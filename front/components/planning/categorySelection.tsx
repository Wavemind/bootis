/**
 * The external imports
 */
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
 * Type definitions
 */
interface CategoryType {
  key: string
  label: string
  variant: string
  isMulti: boolean
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
        rightIcon={<Icon as={RiArrowDownSFill} h={7} w={7} />}
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
