'use client'

import React, { useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn, slugify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from '@/components/ui/command'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function CategoriesCombobox({ categories, initialCategory }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   function getCategoryTitle() {
      for (const category of categories) {
         if (slugify(category.title) === slugify(value)) return category.title
      }
   }

   useEffect(() => {
      setValue(initialCategory)
   }, [initialCategory])

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full justify-between"
            >
               {value ? getCategoryTitle() : 'Select category...'}
               <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command>
               <CommandInput placeholder="Search category..." />
               <CommandEmpty>No category found.</CommandEmpty>
               <CommandGroup>
                  {categories.map((category) => (
                     <CommandItem
                        key={category.title}
                        onSelect={(currentValue) => {
                           const current = new URLSearchParams(
                              Array.from(searchParams.entries())
                           )

                           if (currentValue === value) {
                              current.delete('category')
                              setValue('')
                           } else {
                              current.set('category', currentValue)
                              setValue(currentValue)
                           }

                           // cast to string
                           const search = current.toString()
                           // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                           const query = search ? `?${search}` : ''

                           router.replace(`${pathname}${query}`, {
                              scroll: false,
                           })

                           setOpen(false)
                        }}
                     >
                        <Check
                           className={cn(
                              'mr-2 h-4',
                              value === category.title
                                 ? 'opacity-100'
                                 : 'opacity-0'
                           )}
                        />
                        {category.title}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export function BrandCombobox({ brands, initialBrand }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()

   const [open, setOpen] = React.useState(false)
   const [value, setValue] = React.useState('')

   function getBrandTitle() {
      for (const brand of brands) {
         if (slugify(brand.title) === slugify(value)) return brand.title
      }
   }

   useEffect(() => {
      setValue(initialBrand)
   }, [initialBrand])

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="w-full justify-between"
            >
               {value ? getBrandTitle() : 'Select brand...'}
               <ChevronsUpDown className="ml-2 h-4 shrink-0 opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-full p-0">
            <Command>
               <CommandInput placeholder="Search brand..." />
               <CommandEmpty>No brand found.</CommandEmpty>
               <CommandGroup>
                  {brands.map((brand) => (
                     <CommandItem
                        key={brand.title}
                        onSelect={(currentValue) => {
                           const current = new URLSearchParams(
                              Array.from(searchParams.entries())
                           )

                           if (currentValue === value) {
                              current.delete('brand')
                              setValue('')
                           } else {
                              current.set('brand', currentValue)
                              setValue(currentValue)
                           }

                           // cast to string
                           const search = current.toString()
                           // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                           const query = search ? `?${search}` : ''

                           router.replace(`${pathname}${query}`, {
                              scroll: false,
                           })

                           setOpen(false)
                        }}
                     >
                        <Check
                           className={cn(
                              'mr-2 h-4',
                              value === brand.title
                                 ? 'opacity-100'
                                 : 'opacity-0'
                           )}
                        />
                        {brand.title}
                     </CommandItem>
                  ))}
               </CommandGroup>
            </Command>
         </PopoverContent>
      </Popover>
   )
}

export function AvailableToggle({ initialAvailability }) {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [value, setValue] = React.useState(false)

   useEffect(() => {
      setValue(initialAvailability === 'true' ? true : false)
   }, [initialAvailability])

   return (
      <div className="flex w-full border rounded-md items-center space-x-2">
         <div className="mx-auto flex gap-2 items-center">
            <Switch
               checked={value}
               onCheckedChange={(currentValue: boolean) => {
                  const current = new URLSearchParams(
                     Array.from(searchParams.entries())
                  )

                  current.set(
                     'isAvailable',
                     currentValue == true ? 'true' : 'false'
                  )
                  setValue(currentValue)

                  // cast to string
                  const search = current.toString()
                  // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                  const query = search ? `?${search}` : ''

                  router.replace(`${pathname}${query}`, {
                     scroll: false,
                  })
               }}
               id="airplane-mode"
            />
            <Label htmlFor="airplane-mode">Only Available</Label>
         </div>
      </div>
   )
}
