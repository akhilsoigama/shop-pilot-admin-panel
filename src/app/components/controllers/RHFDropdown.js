'use client'

import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

export function RHFDropdown({
    name,
    label,
    control,
    errors,
    categories = [],
}) {
    return (
        <div >
            

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className={cn('mb-4 w-full space-y-1')}>
                        <Label htmlFor={name} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {label}
                        </Label>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger
                                className={cn(
                                    'w-full border dark:border-neutral-700 dark:bg-neutral-800 bg-white text-gray-800 dark:text-gray-200',
                                    errors?.[name] && 'border-red-500 focus:ring-red-500'
                                )}
                            >
                                <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            />

            {errors?.[name] && (
                <p className="text-sm text-red-500">{errors[name]?.message}</p>
            )}
        </div>
    )
}
