/**
 * The external imports
 */
import { useMemo, FC, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, HStack, Icon } from '@chakra-ui/react'
import { Select, chakraComponents, ControlProps } from 'chakra-react-select'
import { BsSearch } from 'react-icons/bs'

/**
 * The internal imports
 */
import CategorySelection from './categorySelection'
import restaurantTypes from '../../../lib/config/restaurantTypes'
import {
  useGetActivityCategoriesQuery,
  useGetAccommodationCategoriesQuery,
  useLazyGetCategoriesByRegionQuery,
} from '../../../lib/services/modules/category'

/**
 * Type imports
 */
import { IStep, ICategoryProps, IElement } from '../../../lib/types'

const SelectBar: FC<ICategoryProps> = ({ category, setCategory }) => {
  const { t } = useTranslation('planning')

  const { data: activityCategories = [] } = useGetActivityCategoriesQuery()
  const { data: accommodationCategories = [] } =
    useGetAccommodationCategoriesQuery()

  const [getCategoriesByRegion, { data: categoriesByRegion = [] }] =
    useLazyGetCategoriesByRegionQuery()

  // Gets voyage form data from the localStorage
  const voyageFormData = useMemo(() => {
    const stepsData = JSON.parse(localStorage.getItem('steps') as string)
    return stepsData.find((step: IStep) => step.key === 'voyageForm').formValues
  }, [])

  /**
   * Gets the categories by region on component load
   */
  useEffect(() => {
    if (voyageFormData) {
      getCategoriesByRegion(voyageFormData.destination.name)
    }
  }, [])

  /**
   * Provide the correct options and preselected values to the selec
   */
  const selectInfo = useMemo(() => {
    if (!category.key) {
      return { option: [], preselectedValues: [] }
    }

    if (category.key === 'accommodation') {
      return {
        options: accommodationCategories,
        preselectedValues: voyageFormData.accommodation,
      }
    } else if (category.key === 'restaurant') {
      return {
        options: restaurantTypes,
        preselectedValues: restaurantTypes,
      }
    } else {
      return {
        options: activityCategories.map(activity => ({
          ...activity,
          isDisabled: !categoriesByRegion.includes(activity.id),
        })),
        preselectedValues: voyageFormData.activities,
      }
    }
  }, [category])

  return (
    <HStack bg='blue' py={2} px={4} borderRadius='xl' spacing={6} mx={2}>
      <Box w='full'>
        <Select
          closeMenuOnSelect={!category.isMulti}
          components={{
            Control: (props: ControlProps<IElement>) => (
              <chakraComponents.Control {...props}>
                <HStack w='full' ml={3}>
                  <Icon as={BsSearch} h={5} w={5} />
                  {props.children}
                </HStack>
              </chakraComponents.Control>
            ),
          }}
          value={selectInfo.preselectedValues}
          isMulti={category.isMulti}
          useBasicStyles
          options={selectInfo.options as IElement[]}
          getOptionValue={(option: IElement) => String(option.id)}
          noOptionsMessage={() => t('selectCategory')}
          chakraStyles={{
            option: (provided, { isSelected }) => ({
              ...provided,
              ...(isSelected && {
                backgroundColor: 'blueLight',
              }),
            }),
            control: provided => ({
              ...provided,
              height: 'full',
              borderRadius: 'full',
              bg: 'white',
              py: 1,
            }),
            multiValue: provided => ({
              ...provided,
              backgroundColor: 'black',
              borderRadius: 'full',
              px: 4,
              py: 1,
            }),
            multiValueLabel: provided => ({
              ...provided,
              color: 'white',
            }),
            multiValueRemove: provided => ({
              ...provided,
              color: 'white',
            }),
          }}
        />
      </Box>
      <CategorySelection category={category} setCategory={setCategory} />
    </HStack>
  )
}

export default SelectBar
