/**
 * The external imports
 */
import { FC } from 'react'
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

/**
 * Type definitions
 */
export type CategorySelectionProps = {
  categories: ICategory[]
  category: ICategory
  setCategory: React.Dispatch<React.SetStateAction<ICategory>>
}

const CategorySelection: FC<CategorySelectionProps> = ({
  categories,
  category,
  setCategory,
}) => {
  const { t } = useTranslation('planning')

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
