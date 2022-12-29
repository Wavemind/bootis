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
  useLazyGetCategoriesByRegionQuery,
} from '../../../lib/services/modules/category'

/**
 * Type imports
 */
import { IStep, ICategoryProps, IElement } from '../../../lib/types'

/**
 * Type definitions
 */
interface ISelectBarProps extends ICategoryProps {
  selectedValues: IElement[]
  setSelectedValues: React.Dispatch<React.SetStateAction<IElement[]>>
}

const SelectBar: FC<ISelectBarProps> = ({
  categoryType,
  setCategoryType,
  selectedValues,
  setSelectedValues,
}) => {
  const { t } = useTranslation('planning')

  const { data: activityCategories = [] } = useGetActivityCategoriesQuery()

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
  }, [voyageFormData])

  /**
   * Set initial selected values from voyage form data
   */
  useEffect(() => {
    if (categoryType.key) {
      if (categoryType.key === 'restaurant') {
        setSelectedValues(voyageFormData.restaurants)
      } else {
        setSelectedValues(voyageFormData.activities)
      }
    }
  }, [voyageFormData, categoryType])

  /**
   * Provide the correct options and preselected values to the selec
   */
  const selectOptions = useMemo(() => {
    if (!categoryType.key) {
      return []
    }

    if (categoryType.key === 'restaurant') {
      return restaurantTypes
    } else {
      return activityCategories.map(activity => ({
        ...activity,
        isDisabled: !categoriesByRegion.includes(activity.id),
      }))
    }
  }, [categoryType, categoriesByRegion])

  /**
   * Updates the local state with the selected elements
   * @param newValue Array of selected Elements
   */
  const handleChange = (newValue: IElement[]) => {
    setSelectedValues(newValue)
  }

  return (
    <HStack bg='blue' py={2} px={4} borderRadius='xl' spacing={6} mx={2}>
      <Box w='full'>
        <Select
          closeMenuOnSelect={!categoryType.isMulti}
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
          value={selectedValues}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(newValue: any) => handleChange(newValue)}
          isMulti={categoryType.isMulti}
          useBasicStyles
          options={selectOptions as IElement[]}
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
      <CategorySelection
        categoryType={categoryType}
        setCategoryType={setCategoryType}
      />
    </HStack>
  )
}

export default SelectBar
